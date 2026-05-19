/* ── ROUTER ───────────────────────────── */
const Router = {
  current: 'overview',
  go(id) {
    const mod = MODULES[id]; if (!mod) return;
    Router.current = id;
    document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.module === id));
    document.getElementById('moduleTitle').textContent = mod.title;
    document.getElementById('moduleDesc').textContent = mod.desc;
    document.getElementById('moduleContent').innerHTML = mod.render();
    document.getElementById('sidebar').classList.remove('open');
    if (id === 'crm') CRM.render();
  }
};

/* ── WEBSITE GENERATOR ─────────────────── */
const WEB = {
  genPlan() {
    const name = document.getElementById('wb-name').value.trim() || 'the business';
    const ind  = document.getElementById('wb-industry').value;
    const desc = document.getElementById('wb-desc').value.trim();
    const style= document.getElementById('wb-style').value;
    const pages= document.getElementById('wb-pages').value;
    const goal = document.getElementById('wb-goal').value;
    document.getElementById('wb-tab-label').textContent = 'PLAN';
    const out  = document.getElementById('wb-output');
    out.classList.remove('empty');
    const sys = `You are LUXORIQ's senior web strategist. Create detailed, actionable website plans. Use markdown formatting with ## headers, bullet points, and clear sections.`;
    const prompt = `Create a complete website plan for:\n- Business: ${name}\n- Industry: ${ind}\n- Description: ${desc}\n- Style: ${style}\n- Pages: ${pages}\n- Primary Goal: ${goal}\n\nInclude:\n## Website Strategy\n## Site Structure & Pages\n## Hero Section Copy (headline + subheadline + CTA)\n## Key Sections for Each Page\n## Color & Design Direction\n## SEO Keywords to Target\n## Recommended Features\n## Launch Checklist`;
    LX.stream(sys, prompt, out);
  },
  genCode() {
    const name = document.getElementById('wb-name').value.trim() || 'Business';
    const ind  = document.getElementById('wb-industry').value;
    const style= document.getElementById('wb-style').value;
    const goal = document.getElementById('wb-goal').value;
    document.getElementById('wb-tab-label').textContent = 'CODE';
    const out  = document.getElementById('wb-output');
    const codeCard = document.getElementById('wb-code-card');
    const codeEl   = document.getElementById('wb-code');
    codeCard.style.display = 'block';
    codeEl.textContent = 'Generating HTML code...';
    const sys = `You are an expert web developer. Generate complete, production-ready single-file HTML websites with embedded CSS and JS. Output ONLY the HTML code, no explanations.`;
    const prompt = `Generate a complete single-file HTML landing page for:\n- Business: ${name}\n- Industry: ${ind}\n- Style: ${style}\n- Goal: ${goal}\n\nRequirements:\n- Dark luxury design with CSS variables\n- Fully responsive mobile-first\n- Navigation, hero with CTA, services/features section, testimonials, contact form, footer\n- Smooth scroll animations\n- Modern typography using Google Fonts\n- Working contact form with basic validation\n- Professional copy tailored to the industry\nOutput only the complete HTML file starting with <!DOCTYPE html>`;
    LX.stream(sys, prompt, out, (full) => {
      const match = full.match(/<!DOCTYPE html>[\s\S]*/i);
      codeEl.textContent = match ? match[0] : full;
    });
  }
};

/* ── SEO TOOLS ─────────────────────────── */
const SEO = {
  tab(id, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const sys = `You are LUXORIQ's SEO specialist. Provide detailed, actionable SEO analysis with specific examples, real keyword ideas, and concrete next steps.`;
    const forms = {
      audit: `<div class="card-grid-2"><div class="card"><div class="card-title">🔍 SEO Audit</div><div class="form-group"><label class="form-label">BUSINESS NAME</label><input class="form-input" id="seo-name" placeholder="Your business"/></div><div class="form-group"><label class="form-label">WEBSITE URL</label><input class="form-input" id="seo-url" placeholder="https://..."/></div><div class="form-group"><label class="form-label">INDUSTRY / LOCATION</label><input class="form-input" id="seo-industry" placeholder="e.g. fine dining London"/></div><button class="btn btn-blue btn-full" onclick="SEO.run('audit')">Run Audit</button></div><div class="card"><div class="card-title">📊 Report</div><div class="output-area empty" id="seo-output">Results appear here...</div><div class="output-actions"><button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('seo-output').innerText,this)">📋 Copy</button></div></div></div>`,
      keywords: `<div class="card-grid-2"><div class="card"><div class="card-title">🔑 Keyword Research</div><div class="form-group"><label class="form-label">NICHE / INDUSTRY</label><input class="form-input" id="seo-name" placeholder="e.g. luxury spa treatments"/></div><div class="form-group"><label class="form-label">LOCATION</label><input class="form-input" id="seo-url" placeholder="e.g. Dubai"/></div><div class="form-group"><label class="form-label">SEED KEYWORDS</label><input class="form-input" id="seo-industry" placeholder="e.g. facial, massage, wellness"/></div><button class="btn btn-blue btn-full" onclick="SEO.run('keywords')">Find Keywords</button></div><div class="card"><div class="card-title">📋 Keyword List</div><div class="output-area empty" id="seo-output">Keywords appear here...</div><div class="output-actions"><button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('seo-output').innerText,this)">📋 Copy</button></div></div></div>`,
      meta: `<div class="card-grid-2"><div class="card"><div class="card-title">🏷 Meta Tag Generator</div><div class="form-group"><label class="form-label">BUSINESS NAME</label><input class="form-input" id="seo-name" placeholder="Business name"/></div><div class="form-group"><label class="form-label">PAGE TYPE</label><input class="form-input" id="seo-url" placeholder="e.g. Homepage, About, Services"/></div><div class="form-group"><label class="form-label">MAIN KEYWORDS</label><input class="form-input" id="seo-industry" placeholder="e.g. luxury spa, London, facials"/></div><button class="btn btn-blue btn-full" onclick="SEO.run('meta')">Generate Meta Tags</button></div><div class="card"><div class="card-title">🏷 Meta Tags</div><div class="output-area empty" id="seo-output">Meta tags appear here...</div><div class="output-actions"><button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('seo-output').innerText,this)">📋 Copy</button></div></div></div>`,
      content: `<div class="card-grid-2"><div class="card"><div class="card-title">📅 Content Plan</div><div class="form-group"><label class="form-label">BUSINESS TYPE</label><input class="form-input" id="seo-name" placeholder="e.g. Luxury hotel"/></div><div class="form-group"><label class="form-label">TARGET AUDIENCE</label><input class="form-input" id="seo-url" placeholder="e.g. affluent travelers"/></div><div class="form-group"><label class="form-label">DURATION</label><input class="form-input" id="seo-industry" placeholder="e.g. 30-day content plan"/></div><button class="btn btn-blue btn-full" onclick="SEO.run('content')">Generate Plan</button></div><div class="card"><div class="card-title">📅 Content Calendar</div><div class="output-area empty" id="seo-output">Plan appears here...</div><div class="output-actions"><button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('seo-output').innerText,this)">📋 Copy</button></div></div></div>`
    };
    document.getElementById('seo-panel').innerHTML = forms[id] || forms.audit;
  },
  run(type) {
    const name = document.getElementById('seo-name')?.value.trim() || '';
    const url  = document.getElementById('seo-url')?.value.trim() || '';
    const ind  = document.getElementById('seo-industry')?.value.trim() || '';
    const out  = document.getElementById('seo-output');
    if (!out) return;
    out.classList.remove('empty');
    const prompts = {
      audit: `Perform a comprehensive SEO audit for "${name}" (${ind}). Website: ${url}.\n\n## Technical SEO Checklist\n## On-Page SEO Analysis\n## 20 Target Keywords with search intent\n## Content Gaps\n## Local SEO Strategy\n## Top 5 Priority Actions`,
      keywords: `Generate 30 SEO keywords for "${name}" in ${ind} targeting ${url}.\nFor each keyword include: keyword phrase, search intent (info/commercial/transactional), difficulty (low/med/high), content type to create.\n\n## Primary Keywords (high intent)\n## Long-tail Keywords\n## Local Keywords\n## Content Topic Ideas`,
      meta: `Generate optimized meta tags for "${name}" - ${url} page. Industry: ${ind}.\n\nProvide:\n## Title Tag (50-60 chars)\n## Meta Description (150-160 chars)\n## OG Title & Description\n## H1 Tag\n## Schema Markup (JSON-LD)\n## 5 Alt Text examples for images`,
      content: `Create a ${ind} content plan for "${name}" targeting ${url}.\n\n## Week 1-4 Content Calendar\n## Blog Post Ideas (10 topics with headlines)\n## Social Media Content Mix\n## Email Newsletter Schedule\n## SEO Content Priorities`
    };
    LX.stream(`You are LUXORIQ's senior SEO specialist. Provide specific, actionable advice with real examples.`, prompts[type] || prompts.audit, out);
  }
};

/* ── BRAND STUDIO ──────────────────────── */
const BRAND = {
  selectedTags: [],
  toggleTag(btn, tag) {
    const idx = this.selectedTags.indexOf(tag);
    if (idx > -1) { this.selectedTags.splice(idx,1); btn.style.background='var(--glass)'; btn.style.borderColor='rgba(0,240,255,0.2)'; }
    else { this.selectedTags.push(tag); btn.style.background='var(--blue-dim)'; btn.style.borderColor='var(--blue)'; }
  },
  generate() {
    const name    = document.getElementById('br-name').value.trim() || 'the brand';
    const ind     = document.getElementById('br-industry').value.trim();
    const audience= document.getElementById('br-audience').value.trim();
    const mission = document.getElementById('br-mission').value.trim();
    const tags    = this.selectedTags.join(', ') || 'Professional, Modern';
    const out     = document.getElementById('br-output');
    out.classList.remove('empty');
    const sys = `You are LUXORIQ's senior brand strategist. Generate complete, premium brand identities. Be specific with hex codes, font names, and concrete examples.`;
    const prompt = `Create a complete brand identity kit for:\n- Brand: ${name}\n- Industry: ${ind}\n- Target Audience: ${audience}\n- Personality: ${tags}\n- Mission: ${mission}\n\n## Brand Name Analysis\n## Brand Positioning Statement\n## 5 Tagline Options (ordered by strength)\n## Voice & Tone Guide (with examples)\n## Color Palette (5 colors with exact hex codes, usage rules)\n## Typography System (heading font, body font, accent font + why)\n## Logo Concept Description\n## Brand Story (2 paragraphs)\n## Competitor Differentiation\n## Brand Do's and Don'ts`;
    LX.stream(sys, prompt, out, (full) => {
      // Extract hex colors and show swatches
      const hexes = [...new Set(full.match(/#[0-9A-Fa-f]{6}/g) || [])].slice(0,6);
      if (hexes.length) {
        const palette = document.getElementById('br-palette');
        const colors  = document.getElementById('br-colors');
        palette.style.display = 'block';
        colors.innerHTML = hexes.map(h => `<div style="position:relative;margin-bottom:24px"><div class="swatch" style="background:${h}" title="${h}" onclick="LX.copy('${h}',{textContent:'${h}'})"></div><div class="swatch-label">${h}</div></div>`).join('');
      }
    });
  }
};

/* ── CHATBOT BUILDER ───────────────────── */
const CHATBOT = {
  systemPrompt: '',
  generate() {
    const name   = document.getElementById('cb-name').value.trim() || 'our business';
    const purpose= document.getElementById('cb-purpose').value;
    const tone   = document.getElementById('cb-tone').value;
    const info   = document.getElementById('cb-info').value.trim();
    const avoid  = document.getElementById('cb-avoid').value.trim();
    const out    = document.getElementById('cb-output');
    out.classList.remove('empty');
    const sys = `You are LUXORIQ's AI systems architect. Generate precise, professional chatbot system prompts that make AI assistants genuinely useful for businesses.`;
    const prompt = `Generate a complete, production-ready chatbot system prompt for:\n- Business: ${name}\n- Purpose: ${purpose}\n- Tone: ${tone}\n- Key Info: ${info}\n- Avoid: ${avoid}\n\nThe output should be the actual system prompt text (ready to paste into any AI platform), followed by:\n## Example Conversations (3 realistic exchanges)\n## Setup Instructions\n## Recommended Platforms`;
    LX.stream(sys, prompt, out, (full) => { this.systemPrompt = full; });
  },
  startTest() {
    if (!this.systemPrompt) { LX.toast('Generate a system prompt first','error'); return; }
    document.getElementById('cb-test-card').style.display = 'block';
    document.getElementById('cb-test-card').scrollIntoView({ behavior:'smooth' });
    this.msgs = [{ role:'system', content: this.systemPrompt }];
    document.getElementById('cb-chat-msgs').innerHTML = '';
    this.addBubble('ai', 'Hello! How can I help you today?');
  },
  addBubble(role, text) {
    const c = document.getElementById('cb-chat-msgs');
    const d = document.createElement('div');
    d.className = `chat-msg ${role}`;
    d.innerHTML = `<div class="chat-avatar">${role==='ai'?'BOT':'YOU'}</div><div class="chat-bubble">${LX.md(text)}</div>`;
    c.appendChild(d); c.scrollTop = c.scrollHeight;
    return d;
  },
  msgs: [],
  async sendTest() {
    const inp = document.getElementById('cb-test-input');
    const text = inp.value.trim(); if (!text) return;
    inp.value = '';
    this.addBubble('user', text);
    this.msgs.push({ role:'user', content: text });
    const bubble = this.addBubble('ai', '<div class="typing-dots"><span></span><span></span><span></span></div>');
    await LX.chat(this.msgs,
      (full) => { bubble.querySelector('.chat-bubble').innerHTML = LX.md(full) + '<span class="lx-cursor"></span>'; },
      (full) => { bubble.querySelector('.chat-bubble').innerHTML = LX.md(full); this.msgs.push({ role:'assistant', content: full }); }
    );
  }
};

/* ── CONTENT ENGINE ────────────────────── */
const CONTENT = {
  type: 'blog',
  tab(id, btn) {
    this.type = id;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const badge = document.getElementById('ct-type-badge');
    const labels = { blog:'BLOG POST', social:'SOCIAL MEDIA', email:'EMAIL', ad:'AD COPY' };
    if (badge) badge.textContent = labels[id] || id.toUpperCase();
    const dyn = document.getElementById('ct-dynamic');
    if (!dyn) return;
    const forms = {
      blog: `<div class="form-group"><label class="form-label">BLOG TOPIC</label><input class="form-input" id="ct-topic" placeholder="e.g. 5 ways AI is transforming restaurants"/></div><div class="form-group"><label class="form-label">TARGET READER</label><input class="form-input" id="ct-audience" placeholder="e.g. restaurant owners"/></div><div class="form-group"><label class="form-label">TONE</label><select class="form-select" id="ct-tone"><option>Professional</option><option>Friendly</option><option>Luxury</option><option>Educational</option></select></div><div class="form-group"><label class="form-label">LENGTH</label><select class="form-select" id="ct-length"><option>Short (400w)</option><option>Medium (800w)</option><option>Long (1500w)</option></select></div>`,
      social: `<div class="form-group"><label class="form-label">PLATFORM</label><select class="form-select" id="ct-topic"><option>LinkedIn</option><option>Instagram</option><option>Twitter/X</option><option>Facebook</option><option>TikTok caption</option></select></div><div class="form-group"><label class="form-label">TOPIC / HOOK</label><input class="form-input" id="ct-audience" placeholder="e.g. before/after website redesign, AI tip"/></div><div class="form-group"><label class="form-label">GOAL</label><select class="form-select" id="ct-tone"><option>Drive engagement</option><option>Generate leads</option><option>Build authority</option><option>Promote service</option></select></div>`,
      email: `<div class="form-group"><label class="form-label">EMAIL TYPE</label><select class="form-select" id="ct-topic"><option>Welcome email</option><option>Sales/Promotional</option><option>Newsletter</option><option>Follow-up</option><option>Re-engagement</option></select></div><div class="form-group"><label class="form-label">OFFER / SUBJECT</label><input class="form-input" id="ct-audience" placeholder="e.g. Free website audit, 20% off this week"/></div><div class="form-group"><label class="form-label">TONE</label><select class="form-select" id="ct-tone"><option>Professional</option><option>Urgent</option><option>Friendly</option><option>Luxury</option></select></div>`,
      ad: `<div class="form-group"><label class="form-label">PLATFORM</label><select class="form-select" id="ct-topic"><option>Google Ads</option><option>Facebook/Instagram Ads</option><option>LinkedIn Ads</option></select></div><div class="form-group"><label class="form-label">SERVICE / PRODUCT</label><input class="form-input" id="ct-audience" placeholder="e.g. AI website in 48 hours"/></div><div class="form-group"><label class="form-label">TARGET CUSTOMER PAIN</label><input class="form-input" id="ct-tone" placeholder="e.g. outdated website, losing customers online"/></div>`
    };
    dyn.innerHTML = forms[id] || forms.blog;
  },
  generate() {
    const brand   = document.getElementById('ct-brand')?.value.trim() || 'LUXORIQ client';
    const topic   = document.getElementById('ct-topic')?.value || '';
    const audience= document.getElementById('ct-audience')?.value.trim() || '';
    const tone    = document.getElementById('ct-tone')?.value || 'Professional';
    const length  = document.getElementById('ct-length')?.value || 'Medium';
    const out     = document.getElementById('ct-output');
    out.classList.remove('empty');
    const prompts = {
      blog: `Write a ${length} blog post for ${brand} targeting ${audience}.\nTopic: ${topic}\nTone: ${tone}\nInclude: compelling headline, introduction hook, 3-5 sections with subheadings, actionable takeaways, strong CTA. Format with markdown headers.`,
      social: `Write 3 variations of a ${topic} post for ${brand} on ${topic}.\nGoal: ${tone}\nFor each: write the post, suggest hashtags, and note the best posting time. Make it ${tone.toLowerCase()}.`,
      email: `Write a ${topic} email for ${brand}.\nOffer/Subject: ${audience}\nTone: ${tone}\nInclude: subject line, preview text, email body with clear sections, CTA button text, PS line.`,
      ad: `Write ${topic} ad copy for ${brand}.\nService: ${audience}\nCustomer pain: ${tone}\nInclude: 3 headline variations, 2 description variations, CTA options, targeting suggestions.`
    };
    LX.stream(`You are LUXORIQ's senior copywriter. Write premium, conversion-optimized content. Be specific, compelling, and brand-aware.`, prompts[this.type] || prompts.blog, out);
  }
};

/* ── CRM ───────────────────────────────── */
const CRM = {
  render() {
    const contacts = LX.crmGet();
    const list = document.getElementById('crm-list');
    if (!list) return;
    if (!contacts.length) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">👥</div><div class="empty-title">No contacts yet</div><div class="empty-desc">Add your first lead or client to get started</div></div>`;
    } else {
      list.innerHTML = `<table class="crm-table"><thead><tr><th>NAME</th><th>BUSINESS</th><th>STAGE</th><th>ACTION</th></tr></thead><tbody>${contacts.map((c,i)=>`<tr><td><strong style="color:var(--white)">${c.name}</strong><br/><span style="font-size:0.72rem">${c.email||''}</span></td><td>${c.biz||'—'}</td><td><span class="tag ${c.stage==='Client'?'tag-green':c.stage==='Proposal'?'tag-gold':'tag-blue'}">${c.stage}</span></td><td><button class="btn btn-danger btn-sm" onclick="CRM.del(${i})">✕</button></td></tr>`).join('')}</tbody></table>`;
    }
    ['lead','qualified','proposal','client'].forEach(s => {
      const col = document.getElementById(`pipe-${s}`);
      if (!col) return;
      const items = contacts.filter(c => c.stage?.toLowerCase() === s);
      col.innerHTML = items.length ? items.map(c=>`<div class="pipeline-card"><div class="pipeline-card-name">${c.name}</div><div class="pipeline-card-meta">${c.biz||c.industry||'—'}</div></div>`).join('') : `<div style="font-size:0.72rem;color:var(--muted);padding:8px 0">Empty</div>`;
    });
  },
  openAdd() { document.getElementById('crm-modal').classList.remove('hidden'); },
  closeAdd() { document.getElementById('crm-modal').classList.add('hidden'); },
  save() {
    const c = {
      name: document.getElementById('crm-fname').value.trim(),
      biz:  document.getElementById('crm-fbiz').value.trim(),
      email:document.getElementById('crm-femail').value.trim(),
      phone:document.getElementById('crm-fphone').value.trim(),
      industry:document.getElementById('crm-find').value.trim(),
      stage:document.getElementById('crm-fstage').value,
      notes:document.getElementById('crm-fnotes').value.trim(),
      added: new Date().toLocaleDateString()
    };
    if (!c.name) { LX.toast('Name is required','error'); return; }
    const contacts = LX.crmGet(); contacts.push(c); LX.crmSave(contacts);
    this.closeAdd(); this.render(); LX.toast(`${c.name} added to CRM`);
  },
  del(i) {
    const contacts = LX.crmGet(); contacts.splice(i,1); LX.crmSave(contacts); this.render();
  },
  genFollowup() {
    const name  = document.getElementById('crm-fname').value.trim() || 'the lead';
    const biz   = document.getElementById('crm-fbiz').value.trim();
    const notes = document.getElementById('crm-fnotes').value.trim();
    const out   = document.getElementById('crm-followup');
    out.style.display = 'block';
    LX.stream(`You are a premium sales consultant. Write concise, non-pushy follow-up emails.`,
      `Write a professional follow-up email for:\nContact: ${name}\nBusiness: ${biz}\nContext/Notes: ${notes}\n\nInclude: subject line, short personal email body (3-4 sentences), soft CTA. No fluff.`, out);
  }
};

/* ── AI ASSISTANT ──────────────────────── */
const ASSISTANT = {
  msgs: [{ role:'system', content:`You are LUXORIQ CORE AI — a premium futuristic AI business assistant. Help users build and scale businesses using AI, automation, and digital strategy. Be strategic, concise, and premium. Use bullet points and bold headers. Never use filler phrases. End with a follow-up question.` }],
  streaming: false,
  chip(text) {
    document.getElementById('ast-chips').style.display = 'none';
    document.getElementById('ast-input').value = text;
    this.send();
  },
  addMsg(role, text, streaming=false) {
    const c = document.getElementById('ast-messages');
    const d = document.createElement('div');
    d.className = `chat-msg ${role}`;
    d.innerHTML = `<div class="chat-avatar">${role==='ai'?'LX':'YOU'}</div><div><div class="chat-bubble">${streaming ? '<div class="typing-dots"><span></span><span></span><span></span></div>' : LX.md(text)}</div><div style="font-size:0.65rem;color:var(--muted);margin-top:4px;text-align:${role==='user'?'right':'left'}">${LX.time()}</div></div>`;
    c.appendChild(d); c.scrollTop = c.scrollHeight;
    return d;
  },
  async send() {
    if (this.streaming) return;
    const inp = document.getElementById('ast-input');
    const text = inp.value.trim(); if (!text) return;
    const key = LX.getKey();
    inp.value = ''; inp.style.height = 'auto';
    document.getElementById('ast-chips').style.display = 'none';
    this.addMsg('user', text);
    this.msgs.push({ role:'user', content: text });
    if (!key) { this.addMsg('ai', '**API key required.**\n\nEnter your OpenRouter key in the sidebar to activate LUXORIQ CORE AI.\n\n[Get a free key →](https://openrouter.ai/keys)'); return; }
    const aiEl = this.addMsg('ai', '', true);
    const bubble = aiEl.querySelector('.chat-bubble');
    this.streaming = true;
    document.getElementById('ast-send').disabled = true;
    await LX.chat(this.msgs,
      (full) => { bubble.innerHTML = LX.md(full) + '<span class="lx-cursor"></span>'; aiEl.scrollIntoView({ behavior:'smooth', block:'end' }); },
      (full) => { bubble.innerHTML = LX.md(full); this.msgs.push({ role:'assistant', content: full }); this.streaming = false; document.getElementById('ast-send').disabled = false; }
    );
  },
  clear() {
    this.msgs = [this.msgs[0]]; // keep system prompt
    document.getElementById('ast-messages').innerHTML = `<div class="chat-msg ai"><div class="chat-avatar">LX</div><div><div class="chat-bubble">Conversation cleared. What would you like to work on?</div></div></div>`;
    document.getElementById('ast-chips').style.display = 'flex';
  }
};

/* ── INIT ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Toast element
  const toast = document.createElement('div');
  toast.id = 'lx-toast'; toast.className = 'toast hidden';
  toast.innerHTML = '<span class="toast-icon">✓</span><span class="toast-msg"></span>';
  document.body.appendChild(toast);

  // Mobile sidebar
  document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Nav items
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => Router.go(btn.dataset.module));
  });

  // Auto-resize chat textarea
  document.addEventListener('input', e => {
    if (e.target.classList.contains('chat-textarea')) {
      e.target.style.height = 'auto';
      e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
    }
  });

  // Load initial module
  Router.go('overview');
});
