/* ── LUXORIQ CORE AI AGENT — ENGINE ────────────────────────── */
(function(){
'use strict';

const SYSTEM_PROMPT = `You are LUXORIQ CORE AI — a premium futuristic AI business assistant built by LUXORIQ.

Your mission:
- Help users build and scale businesses using AI, automation, and digital strategy
- Generate actionable marketing plans, branding concepts, and workflow automations
- Explain technology simply for beginners; go deep for advanced users
- Suggest tools, write copy, outline systems, and critique business ideas honestly
- Help users understand LUXORIQ's services: AI Website Generator, Smart Dashboard, SEO Automation, AI Chatbots, Booking & CRM Systems, Branding & Marketing

Your personality:
- Professional, strategic, concise, premium — like a SaaS founder and automation engineer combined
- Encouraging but realistic — no fake promises or misleading financial claims
- Always explain step-by-step and simplify difficult concepts
- Never use filler phrases like "Certainly!" or "Of course!" — get straight to value

Response formatting rules:
- Use **bold** for key terms and section headers
- Use bullet lists for options and features
- Use numbered lists for steps and processes
- Keep paragraphs short (2-3 sentences max)
- End responses with a relevant follow-up question to keep the conversation moving

Rules:
- Never provide illegal, harmful, or unethical advice
- Never guarantee specific revenue or investment returns
- When uncertain, say so and suggest how to find the answer
- Focus on long-term systems over quick hacks
- If asked about LUXORIQ pricing: Starter $499/mo, Professional $1499/mo, Enterprise is custom`;

const MODELS = [
  { id: 'meta-llama/llama-3.3-70b-instruct:free', label: 'Llama 3.3 70B (Free)' },
  { id: 'deepseek/deepseek-chat-v3-0324:free', label: 'DeepSeek V3 (Free)' },
  { id: 'mistralai/mistral-7b-instruct:free', label: 'Mistral 7B (Free)' },
  { id: 'openai/gpt-4o-mini', label: 'GPT-4o Mini' },
  { id: 'openai/gpt-4o', label: 'GPT-4o' },
  { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
];

const QUICK_PROMPTS = [
  '🚀 How do I get my first client?',
  '🌐 What\'s included in a website build?',
  '🤖 How does your AI chatbot work?',
  '💰 Which plan should I choose?',
];

let messages = [];
let isStreaming = false;
let apiKey = localStorage.getItem('lx_api_key') || '';

// ── Build DOM ────────────────────────────────────────────────

function buildUI() {
  // Inject CSS link
  if (!document.getElementById('lx-agent-css')) {
    const link = document.createElement('link');
    link.id = 'lx-agent-css';
    link.rel = 'stylesheet';
    link.href = 'agent.css';
    document.head.appendChild(link);
  }

  // Trigger button
  const trigger = document.createElement('button');
  trigger.id = 'lx-trigger';
  trigger.setAttribute('aria-label', 'Open LUXORIQ AI');
  trigger.innerHTML = `
    <svg class="lx-icon-chat" width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M13 2C6.925 2 2 6.477 2 12c0 1.821.48 3.53 1.32 5.012L2 23l6.182-1.3A11.074 11.074 0 0013 22c6.075 0 11-4.477 11-10S19.075 2 13 2z" fill="#000" stroke="#000" stroke-width="0"/>
      <path d="M13 2C6.925 2 2 6.477 2 12c0 1.821.48 3.53 1.32 5.012L2 23l6.182-1.3A11.074 11.074 0 0013 22c6.075 0 11-4.477 11-10S19.075 2 13 2z" fill="rgba(0,0,0,0.85)"/>
      <circle cx="8.5" cy="12" r="1.5" fill="#0A0A0A"/>
      <circle cx="13" cy="12" r="1.5" fill="#0A0A0A"/>
      <circle cx="17.5" cy="12" r="1.5" fill="#0A0A0A"/>
    </svg>
    <svg class="lx-icon-close" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 4l12 12M16 4L4 16" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
    <div id="lx-notif"></div>`;
  document.body.appendChild(trigger);

  // Panel
  const panel = document.createElement('div');
  panel.id = 'lx-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'LUXORIQ AI Assistant');
  panel.innerHTML = `
    <div class="lx-header">
      <div class="lx-avatar">
        <svg class="lx-avatar-inner" viewBox="0 0 32 32" fill="none">
          <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#00F0FF" stroke-width="1.5" fill="none"/>
          <polygon points="16,8 24,13 24,21 16,26 8,21 8,13" fill="#00F0FF" opacity="0.2"/>
          <circle cx="16" cy="16" r="3" fill="#00F0FF"/>
        </svg>
        <div class="lx-status-dot"></div>
      </div>
      <div class="lx-header-info">
        <div class="lx-header-name">LUXORIQ CORE AI</div>
        <div class="lx-header-status">● Online — Ready to Build</div>
      </div>
      <div class="lx-header-actions">
        <button class="lx-hbtn" id="lx-clear-btn" title="Clear conversation">↺</button>
      </div>
    </div>

    <div class="lx-model-bar">
      <span class="lx-model-label">MODEL</span>
      <select class="lx-model-select" id="lx-model">
        ${MODELS.map(m => `<option value="${m.id}"${m.id.includes('llama') ? ' selected' : ''}>${m.label}</option>`).join('')}
      </select>
    </div>

    <div class="lx-messages" id="lx-messages">
      <div class="lx-welcome">
        <div class="lx-welcome-icon">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#00F0FF" stroke-width="1.5" fill="none"/>
            <circle cx="16" cy="16" r="3" fill="#00F0FF"/>
          </svg>
        </div>
        <h3>LUXORIQ CORE AI</h3>
        <p>Your premium AI business strategist. Ask me anything about building, automating, and scaling your business.</p>
      </div>
    </div>

    <div class="lx-quick" id="lx-quick">
      ${QUICK_PROMPTS.map(q => `<button class="lx-chip">${q}</button>`).join('')}
    </div>

    <div class="lx-input-area">
      <div class="lx-key-row">
        <span class="lx-key-label">API KEY</span>
        <input type="password" class="lx-key-input" id="lx-key" placeholder="sk-or-... (OpenRouter key)" value="${apiKey}" spellcheck="false"/>
      </div>
      <div class="lx-compose">
        <textarea class="lx-textarea" id="lx-input" placeholder="Ask LUXORIQ CORE AI anything..." rows="1"></textarea>
        <button class="lx-send" id="lx-send" aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 9l14-7-5 7 5 7-14-7z" fill="#000"/>
          </svg>
        </button>
      </div>
      <div class="lx-footer-note">Powered by OpenRouter · <a href="https://openrouter.ai/keys" target="_blank" style="color:#00F0FF;text-decoration:none;">Get free API key →</a></div>
    </div>`;
  document.body.appendChild(panel);

  bindEvents(trigger, panel);
  addWelcomeMessage();
}

// ── Events ───────────────────────────────────────────────────

function bindEvents(trigger, panel) {
  // Toggle panel
  trigger.addEventListener('click', () => {
    const open = panel.classList.toggle('open');
    trigger.classList.toggle('open', open);
    const notif = document.getElementById('lx-notif');
    if (notif) notif.remove();
    if (open) setTimeout(() => document.getElementById('lx-input').focus(), 350);
  });

  // Quick chips
  panel.querySelectorAll('.lx-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.textContent.replace(/^[^\s]+\s/, '');
      sendMessage(text);
      document.getElementById('lx-quick').style.display = 'none';
    });
  });

  // Send button
  document.getElementById('lx-send').addEventListener('click', handleSend);

  // Textarea enter
  document.getElementById('lx-input').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });

  // Auto-resize textarea
  document.getElementById('lx-input').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 140) + 'px';
  });

  // API key save
  document.getElementById('lx-key').addEventListener('change', function() {
    apiKey = this.value.trim();
    localStorage.setItem('lx_api_key', apiKey);
    this.classList.toggle('active', apiKey.length > 10);
  });
  if (apiKey.length > 10) document.getElementById('lx-key').classList.add('active');

  // Clear
  document.getElementById('lx-clear-btn').addEventListener('click', () => {
    messages = [];
    const msgContainer = document.getElementById('lx-messages');
    msgContainer.innerHTML = `<div class="lx-welcome">
      <div class="lx-welcome-icon"><svg width="28" height="28" viewBox="0 0 32 32" fill="none"><polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#00F0FF" stroke-width="1.5" fill="none"/><circle cx="16" cy="16" r="3" fill="#00F0FF"/></svg></div>
      <h3>Conversation cleared</h3>
      <p>Start a new conversation with LUXORIQ CORE AI.</p>
    </div>`;
    document.getElementById('lx-quick').style.display = 'flex';
    // Re-bind chips
    document.querySelectorAll('.lx-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.replace(/^[^\s]+\s/, '');
        sendMessage(text);
        document.getElementById('lx-quick').style.display = 'none';
      });
    });
  });
}

// ── Welcome message ──────────────────────────────────────────

function addWelcomeMessage() {
  setTimeout(() => {
    appendMessage('ai', "**Welcome to LUXORIQ CORE AI.**\n\nI'm your dedicated business intelligence assistant. Whether you're launching a brand, automating operations, or scaling globally — I'm built to help you execute at a premium level.\n\nWhat are you working on today?");
  }, 600);
}

// ── Send logic ───────────────────────────────────────────────

function handleSend() {
  const input = document.getElementById('lx-input');
  const text = input.value.trim();
  if (!text || isStreaming) return;
  input.value = '';
  input.style.height = 'auto';
  sendMessage(text);
}

async function sendMessage(text) {
  document.getElementById('lx-quick').style.display = 'none';
  appendMessage('user', text);
  messages.push({ role: 'user', content: text });

  const key = document.getElementById('lx-key').value.trim() || apiKey;
  if (!key) {
    appendMessage('ai', "**API key required.**\n\nTo use LUXORIQ CORE AI, enter your free OpenRouter API key in the field above. Get one at [openrouter.ai/keys](https://openrouter.ai/keys) — it takes 30 seconds and includes free credits.");
    return;
  }

  const model = document.getElementById('lx-model').value;
  showTyping();
  isStreaming = true;
  document.getElementById('lx-send').disabled = true;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        'HTTP-Referer': window.location.href,
        'X-Title': 'LUXORIQ CORE AI'
      },
      body: JSON.stringify({
        model,
        stream: true,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-20)
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    hideTyping();
    const aiMsgEl = appendMessage('ai', '', true);
    const bubbleEl = aiMsgEl.querySelector('.lx-bubble');
    let fullText = '';

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        const trimmed = line.replace(/^data: /, '').trim();
        if (!trimmed || trimmed === '[DONE]') continue;
        try {
          const json = JSON.parse(trimmed);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            bubbleEl.innerHTML = renderMarkdown(fullText) + '<span class="lx-cursor"></span>';
            scrollToBottom();
          }
        } catch {}
      }
    }

    // Remove cursor, finalize
    bubbleEl.innerHTML = renderMarkdown(fullText);
    messages.push({ role: 'assistant', content: fullText });
    addTimestamp(aiMsgEl);

  } catch (err) {
    hideTyping();
    appendMessage('ai', `**Connection error:**\n\n${err.message}\n\nCheck your API key and try again.`);
  } finally {
    isStreaming = false;
    document.getElementById('lx-send').disabled = false;
  }
}

// ── Message renderer ─────────────────────────────────────────

function renderMarkdown(text) {
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^### (.+)$/gm, '<strong>$1</strong>')
    .replace(/^## (.+)$/gm, '<strong>$1</strong>')
    .replace(/^# (.+)$/gm, '<strong>$1</strong>')
    .replace(/^\d+\. (.+)$/gm, (_, item) => `<div style="display:flex;gap:8px;margin:3px 0"><span style="color:#00F0FF;font-weight:700;min-width:16px">→</span><span>${item}</span></div>`)
    .replace(/^[-*] (.+)$/gm, (_, item) => `<div style="display:flex;gap:8px;margin:3px 0"><span style="color:#00F0FF;font-weight:700">•</span><span>${item}</span></div>`)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#00F0FF;text-decoration:underline">$1</a>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

function appendMessage(role, text, streaming = false) {
  const container = document.getElementById('lx-messages');
  const welcome = container.querySelector('.lx-welcome');
  if (welcome) welcome.remove();

  const wrap = document.createElement('div');
  wrap.className = `lx-msg ${role}`;
  wrap.innerHTML = `
    <div class="lx-msg-avatar">${role === 'ai' ? 'LX' : 'YOU'}</div>
    <div>
      <div class="lx-bubble">${renderMarkdown(text)}</div>
      ${!streaming ? `<div class="lx-time">${getTime()}</div>` : ''}
    </div>`;
  container.appendChild(wrap);
  scrollToBottom();
  return wrap;
}

function addTimestamp(el) {
  const time = document.createElement('div');
  time.className = 'lx-time';
  time.textContent = getTime();
  el.querySelector('div').appendChild(time);
}

function showTyping() {
  const container = document.getElementById('lx-messages');
  const el = document.createElement('div');
  el.className = 'lx-msg ai'; el.id = 'lx-typing-indicator';
  el.innerHTML = `<div class="lx-msg-avatar">LX</div><div class="lx-bubble lx-typing"><span></span><span></span><span></span></div>`;
  container.appendChild(el);
  scrollToBottom();
}

function hideTyping() {
  document.getElementById('lx-typing-indicator')?.remove();
}

function scrollToBottom() {
  const el = document.getElementById('lx-messages');
  el.scrollTop = el.scrollHeight;
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ── Init ─────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildUI);
} else {
  buildUI();
}

})();
