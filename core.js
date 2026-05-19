/* ── LUXORIQ CORE ENGINE ─────────────────────────────────── */
const LX = {
  getKey: ()=> document.getElementById('globalApiKey')?.value.trim() || localStorage.getItem('lx_key') || '',
  getModel: ()=> document.getElementById('globalModel')?.value || 'meta-llama/llama-3.3-70b-instruct:free',

  async stream(systemPrompt, userPrompt, outputEl, onDone) {
    const key = LX.getKey();
    if (!key) {
      outputEl.innerHTML = '<span style="color:#FF4466">⚠ Enter your OpenRouter API key in the sidebar first.<br><a href="https://openrouter.ai/keys" target="_blank" style="color:#00F0FF">Get a free key →</a></span>';
      return;
    }
    outputEl.innerHTML = '';
    outputEl.classList.remove('empty');
    let full = '';
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${key}`, 'HTTP-Referer': location.href, 'X-Title':'LUXORIQ AI Agent' },
        body: JSON.stringify({ model: LX.getModel(), stream: true, temperature: 0.75, max_tokens: 1500,
          messages: [{ role:'system', content: systemPrompt }, { role:'user', content: userPrompt }] })
      });
      if (!res.ok) { const e = await res.json().catch(()=>{}); throw new Error(e?.error?.message || `HTTP ${res.status}`); }
      const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = '';
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n'); buf = lines.pop();
        for (const line of lines) {
          const t = line.replace(/^data: /,'').trim();
          if (!t || t === '[DONE]') continue;
          try { const d = JSON.parse(t).choices?.[0]?.delta?.content; if (d) { full += d; outputEl.innerHTML = LX.md(full) + '<span class="lx-cursor"></span>'; outputEl.scrollTop = outputEl.scrollHeight; } } catch {}
        }
      }
      outputEl.innerHTML = LX.md(full);
      if (onDone) onDone(full);
    } catch(e) {
      outputEl.innerHTML = `<span style="color:#FF4466">⚠ Error: ${e.message}</span>`;
    }
  },

  async chat(messages, onToken, onDone) {
    const key = LX.getKey();
    if (!key) { onDone && onDone('__nokey__'); return; }
    let full = '';
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${key}`, 'HTTP-Referer': location.href, 'X-Title':'LUXORIQ AI Agent' },
        body: JSON.stringify({ model: LX.getModel(), stream: true, temperature: 0.7, max_tokens: 1024, messages })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = '';
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n'); buf = lines.pop();
        for (const line of lines) {
          const t = line.replace(/^data: /,'').trim();
          if (!t || t === '[DONE]') continue;
          try { const d = JSON.parse(t).choices?.[0]?.delta?.content; if (d) { full += d; onToken && onToken(full); } } catch {}
        }
      }
      onDone && onDone(full);
    } catch(e) { onDone && onDone(`Error: ${e.message}`); }
  },

  md(text) {
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/^#### (.+)$/gm,'<span class="md-h" style="font-size:0.9rem">$1</span>')
      .replace(/^### (.+)$/gm,'<span class="md-h">$1</span>')
      .replace(/^## (.+)$/gm,'<span class="md-h" style="font-size:1.05rem">$1</span>')
      .replace(/^# (.+)$/gm,'<span class="md-h" style="font-size:1.1rem">$1</span>')
      .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
      .replace(/\*(.+?)\*/g,'<em>$1</em>')
      .replace(/`([^`]+)`/g,'<code>$1</code>')
      .replace(/^\d+\. (.+)$/gm,'<div class="md-step"><span class="md-step-num">→</span><span>$1</span></div>')
      .replace(/^[-*] (.+)$/gm,'<div class="md-bullet"><span class="md-dot">•</span><span>$1</span></div>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,'<a href="$2" target="_blank" style="color:#00F0FF;text-decoration:underline">$1</a>')
      .replace(/\n{2,}/g,'<br/><br/>')
      .replace(/\n/g,'<br/>');
  },

  copy(text, btn) {
    navigator.clipboard.writeText(text).then(()=>{ const o=btn.textContent; btn.textContent='Copied!'; setTimeout(()=>btn.textContent=o,1800); });
  },

  toast(msg, type='success') {
    const t = document.getElementById('lx-toast');
    if (!t) return;
    t.querySelector('.toast-msg').textContent = msg;
    t.querySelector('.toast-icon').textContent = type==='success' ? '✓' : '✕';
    t.className = `toast ${type}`;
    t.classList.remove('hidden');
    setTimeout(()=>t.classList.add('hidden'),3000);
  },

  time() { return new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); },

  crmGet() { return JSON.parse(localStorage.getItem('lx_crm') || '[]'); },
  crmSave(d) { localStorage.setItem('lx_crm', JSON.stringify(d)); }
};

// Auth logout
function AUTH_LOGOUT() {
  if (confirm('Sign out of LUXORIQ?')) {
    localStorage.removeItem('lx_auth');
    window.location.href = 'login.html';
  }
}

// Save API key on change + load user profile
document.addEventListener('DOMContentLoaded', ()=>{
  // API key
  const ki = document.getElementById('globalApiKey');
  const st = document.getElementById('apiStatus');
  const saved = localStorage.getItem('lx_key') || '';
  if (saved && ki) { ki.value = saved; st.textContent = '✓ Key saved'; st.className = 'api-status ok'; }
  ki?.addEventListener('change', ()=>{
    const v = ki.value.trim();
    localStorage.setItem('lx_key', v);
    if (v.length > 10) { st.textContent = '✓ Key saved'; st.className = 'api-status ok'; }
    else { st.textContent = '✕ Invalid key'; st.className = 'api-status err'; }
  });

  // User profile in topbar
  try {
    const auth = JSON.parse(localStorage.getItem('lx_auth') || '{}');
    if (auth.name) {
      const nameEl   = document.getElementById('userName');
      const bizEl    = document.getElementById('userBiz');
      const avatarEl = document.getElementById('userAvatar');
      if (nameEl)   nameEl.textContent   = auth.name;
      if (bizEl)    bizEl.textContent    = auth.biz || auth.email || '';
      if (avatarEl) avatarEl.textContent = auth.name.slice(0,2).toUpperCase();
    }
  } catch(e) {}
});
