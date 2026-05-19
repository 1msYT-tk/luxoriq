/* ── LUXORIQ MODULES ─────────────────────────────────────── */

const MODULES = {

  /* ── OVERVIEW ─────────────────────────── */
  overview: {
    title: 'Overview', desc: 'Your AI business command center',
    render() {
      return `
      <div class="card-grid-3">
        <div class="stat-card"><div class="stat-label">MODULES ACTIVE</div><div class="stat-value stat-blue">7</div><div class="stat-sub">AI-powered tools</div></div>
        <div class="stat-card"><div class="stat-label">LEADS IN CRM</div><div class="stat-value stat-gold">${LX.crmGet().length}</div><div class="stat-sub">Contacts tracked</div></div>
        <div class="stat-card"><div class="stat-label">AI STATUS</div><div class="stat-value stat-green">Live</div><div class="stat-sub">OpenRouter connected</div></div>
      </div>
      <div class="card-grid-2">
        <div class="card">
          <div class="card-title">⚡ Quick Actions</div>
          <div class="quick-actions">
            <button class="quick-action" onclick="Router.go('website')"><div class="qa-icon">🌐</div><div class="qa-label">Generate Website</div><div class="qa-desc">AI-built in minutes</div></button>
            <button class="quick-action" onclick="Router.go('seo')"><div class="qa-icon">🔍</div><div class="qa-label">Run SEO Audit</div><div class="qa-desc">Keywords & meta tags</div></button>
            <button class="quick-action" onclick="Router.go('brand')"><div class="qa-icon">🎨</div><div class="qa-label">Build Brand Kit</div><div class="qa-desc">Colors, fonts, voice</div></button>
            <button class="quick-action" onclick="Router.go('chatbot')"><div class="qa-icon">🤖</div><div class="qa-label">Build Chatbot</div><div class="qa-desc">Custom AI assistant</div></button>
            <button class="quick-action" onclick="Router.go('content')"><div class="qa-icon">✍️</div><div class="qa-label">Write Content</div><div class="qa-desc">Blog, social, email</div></button>
            <button class="quick-action" onclick="Router.go('assistant')"><div class="qa-icon">💬</div><div class="qa-label">AI Assistant</div><div class="qa-desc">Ask anything</div></button>
          </div>
        </div>
        <div class="card">
          <div class="card-title">📋 Recent Activity</div>
          <div id="activityFeed">
            <div class="activity-item"><div class="activity-dot" style="background:#00F0FF"></div><div class="activity-text"><strong>LUXORIQ AI Agent</strong> is ready</div><div class="activity-time">${LX.time()}</div></div>
            <div class="activity-item"><div class="activity-dot" style="background:#C0A062"></div><div class="activity-text">Enter your <strong>OpenRouter API key</strong> in the sidebar to begin</div><div class="activity-time">Now</div></div>
            <div class="activity-item"><div class="activity-dot" style="background:#00FF88"></div><div class="activity-text">7 AI modules <strong>loaded and ready</strong></div><div class="activity-time">Now</div></div>
          </div>
        </div>
      </div>`;
    }
  },

  /* ── WEBSITE GENERATOR ────────────────── */
  website: {
    title: 'AI Website Generator', desc: 'Generate a complete website with code and copy',
    render() {
      return `
      <div class="card-grid-2">
        <div class="card">
          <div class="card-title">🌐 Business Details</div>
          <div class="form-group"><label class="form-label">BUSINESS NAME</label><input class="form-input" id="wb-name" placeholder="e.g. Renaldi's Fine Dining"/></div>
          <div class="form-group"><label class="form-label">INDUSTRY</label>
            <select class="form-select" id="wb-industry">
              <option>Restaurant / F&B</option><option>Hotel / Hospitality</option><option>Clinic / Healthcare</option>
              <option>Gym / Fitness</option><option>Real Estate</option><option>Salon / Beauty</option>
              <option>Law Firm</option><option>E-Commerce</option><option>SaaS / Tech</option><option>Consulting</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">BUSINESS DESCRIPTION</label><textarea class="form-textarea" id="wb-desc" placeholder="What do you offer? Who are your customers? What makes you unique?"></textarea></div>
          <div class="form-group"><label class="form-label">STYLE / VIBE</label>
            <select class="form-select" id="wb-style">
              <option>Luxury & Premium</option><option>Modern & Minimal</option><option>Bold & Energetic</option>
              <option>Warm & Friendly</option><option>Professional & Corporate</option><option>Playful & Creative</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">PAGES NEEDED</label>
            <select class="form-select" id="wb-pages">
              <option>1-page (Landing)</option><option>3-page (Home, About, Contact)</option>
              <option>5-page (Full site)</option><option>10+ pages (Large site)</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">PRIMARY GOAL</label>
            <select class="form-select" id="wb-goal">
              <option>Generate leads / inquiries</option><option>Online bookings</option>
              <option>E-commerce sales</option><option>Brand awareness</option><option>Portfolio showcase</option>
            </select>
          </div>
          <div style="display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn btn-blue" id="wb-gen-plan" onclick="WEB.genPlan()">⚡ Generate Website Plan</button>
            <button class="btn btn-outline" onclick="WEB.genCode()">{'<>'} Generate HTML Code</button>
          </div>
        </div>
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div class="card-title">📄 AI Output <span id="wb-tab-label" class="tag tag-blue" style="font-size:0.65rem">PLAN</span></div>
          <div class="output-area empty" id="wb-output">Your website plan will appear here...</div>
          <div class="output-actions">
            <button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('wb-output').innerText,this)">📋 Copy</button>
            <button class="btn btn-ghost btn-sm" onclick="WEB.genCode()">{'<>'} Get HTML Code</button>
          </div>
        </div>
      </div>
      <div class="card" id="wb-code-card" style="display:none">
        <div class="card-title">{'<>'} Generated HTML Code</div>
        <div class="code-block-header"><span>index.html</span><button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('wb-code').innerText,this)">📋 Copy Code</button></div>
        <pre class="code-block" id="wb-code"></pre>
      </div>`;
    }
  },

  /* ── SEO TOOLS ────────────────────────── */
  seo: {
    title: 'SEO Automation', desc: 'AI-powered keyword research, meta tags, and content strategy',
    render() {
      return `
      <div class="tabs">
        <button class="tab active" onclick="SEO.tab('audit',this)">SEO Audit</button>
        <button class="tab" onclick="SEO.tab('keywords',this)">Keyword Research</button>
        <button class="tab" onclick="SEO.tab('meta',this)">Meta Generator</button>
        <button class="tab" onclick="SEO.tab('content',this)">Content Plan</button>
      </div>
      <div id="seo-panel">
        <div class="card-grid-2">
          <div class="card">
            <div class="card-title">🔍 SEO Audit</div>
            <div class="form-group"><label class="form-label">BUSINESS NAME</label><input class="form-input" id="seo-name" placeholder="Your business name"/></div>
            <div class="form-group"><label class="form-label">WEBSITE URL (optional)</label><input class="form-input" id="seo-url" placeholder="https://yourbusiness.com"/></div>
            <div class="form-group"><label class="form-label">INDUSTRY / NICHE</label><input class="form-input" id="seo-industry" placeholder="e.g. luxury restaurant London"/></div>
            <div class="form-group"><label class="form-label">TARGET LOCATION</label><input class="form-input" id="seo-location" placeholder="e.g. New York, USA"/></div>
            <div class="form-group"><label class="form-label">MAIN COMPETITORS (optional)</label><input class="form-input" id="seo-competitors" placeholder="e.g. competitor1.com, competitor2.com"/></div>
            <button class="btn btn-blue btn-full" onclick="SEO.run()">🚀 Run AI SEO Analysis</button>
          </div>
          <div class="card" style="display:flex;flex-direction:column;gap:12px">
            <div class="card-title">📊 SEO Report</div>
            <div class="output-area empty" id="seo-output">Your SEO analysis will appear here...</div>
            <div class="output-actions">
              <button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('seo-output').innerText,this)">📋 Copy Report</button>
            </div>
          </div>
        </div>
      </div>`;
    }
  },

  /* ── BRAND STUDIO ─────────────────────── */
  brand: {
    title: 'Brand Studio', desc: 'AI-generated brand identity, colors, fonts, and voice',
    render() {
      return `
      <div class="card-grid-2">
        <div class="card">
          <div class="card-title">🎨 Brand Brief</div>
          <div class="form-group"><label class="form-label">BUSINESS NAME</label><input class="form-input" id="br-name" placeholder="e.g. Elara Wellness"/></div>
          <div class="form-group"><label class="form-label">INDUSTRY</label><input class="form-input" id="br-industry" placeholder="e.g. Luxury wellness clinic"/></div>
          <div class="form-group"><label class="form-label">TARGET AUDIENCE</label><input class="form-input" id="br-audience" placeholder="e.g. affluent women 30-55, health-conscious"/></div>
          <div class="form-group"><label class="form-label">PERSONALITY (pick 3)</label>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:4px" id="br-tags">
              ${['Luxurious','Modern','Trustworthy','Bold','Playful','Elegant','Innovative','Warm','Professional','Edgy','Minimalist','Premium'].map(t=>`<button class="tag tag-blue" style="cursor:pointer;background:var(--glass)" onclick="BRAND.toggleTag(this,'${t}')" data-tag="${t}">${t}</button>`).join('')}
            </div>
          </div>
          <div class="form-group"><label class="form-label">BRAND MISSION (1 sentence)</label><textarea class="form-textarea" id="br-mission" placeholder="What does your brand stand for?" style="min-height:60px"></textarea></div>
          <button class="btn btn-blue btn-full" onclick="BRAND.generate()">✨ Generate Brand Kit</button>
        </div>
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div class="card-title">🎯 Brand Kit Output</div>
          <div class="output-area empty" id="br-output">Your brand identity will be generated here...</div>
          <div id="br-palette" style="display:none">
            <div class="form-label" style="margin-bottom:8px">GENERATED COLOR PALETTE</div>
            <div class="color-palette" id="br-colors"></div>
          </div>
          <div class="output-actions">
            <button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('br-output').innerText,this)">📋 Copy Brand Kit</button>
          </div>
        </div>
      </div>`;
    }
  },

  /* ── CHATBOT BUILDER ──────────────────── */
  chatbot: {
    title: 'Chatbot Builder', desc: 'Configure and test a custom AI chatbot for any business',
    render() {
      return `
      <div class="card-grid-2">
        <div class="card">
          <div class="card-title">🤖 Chatbot Configuration</div>
          <div class="form-group"><label class="form-label">BUSINESS NAME</label><input class="form-input" id="cb-name" placeholder="Your business name"/></div>
          <div class="form-group"><label class="form-label">CHATBOT PURPOSE</label>
            <select class="form-select" id="cb-purpose">
              <option>Answer FAQs & general inquiries</option><option>Book appointments</option>
              <option>Qualify sales leads</option><option>Customer support</option>
              <option>Product recommendations</option><option>Restaurant reservations</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">CHATBOT TONE</label>
            <select class="form-select" id="cb-tone">
              <option>Professional & Formal</option><option>Friendly & Warm</option>
              <option>Luxury & Elegant</option><option>Energetic & Bold</option><option>Casual & Relaxed</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">KEY INFORMATION (FAQs, hours, pricing, etc.)</label><textarea class="form-textarea" id="cb-info" placeholder="Opening hours: Mon-Sat 9am-9pm&#10;Location: 123 Main St&#10;Services: Haircut $50, Color $120&#10;Book via: WhatsApp or online..." style="min-height:120px"></textarea></div>
          <div class="form-group"><label class="form-label">THINGS TO AVOID</label><input class="form-input" id="cb-avoid" placeholder="e.g. Discussing competitors, giving refunds without manager approval"/></div>
          <button class="btn btn-blue btn-full" onclick="CHATBOT.generate()">⚡ Generate System Prompt</button>
        </div>
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div class="card-title">📝 Generated System Prompt</div>
          <div class="output-area empty" id="cb-output" style="min-height:200px">Your custom chatbot prompt will appear here...</div>
          <div class="output-actions">
            <button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('cb-output').innerText,this)">📋 Copy Prompt</button>
            <button class="btn btn-blue btn-sm" onclick="CHATBOT.startTest()">🧪 Test Chatbot</button>
          </div>
        </div>
      </div>
      <div class="card" id="cb-test-card" style="display:none">
        <div class="card-title">🧪 Live Chatbot Test</div>
        <div id="cb-chat-msgs" style="min-height:200px;max-height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;padding:8px 0;margin-bottom:12px"></div>
        <div style="display:flex;gap:10px">
          <input class="form-input" id="cb-test-input" placeholder="Test your chatbot..." onkeydown="if(event.key==='Enter')CHATBOT.sendTest()"/>
          <button class="btn btn-blue" onclick="CHATBOT.sendTest()">Send</button>
        </div>
      </div>`;
    }
  },

  /* ── CONTENT ENGINE ───────────────────── */
  content: {
    title: 'Content Engine', desc: 'AI-generated blog posts, social media, and email campaigns',
    render() {
      return `
      <div class="tabs">
        <button class="tab active" onclick="CONTENT.tab('blog',this)">Blog Post</button>
        <button class="tab" onclick="CONTENT.tab('social',this)">Social Media</button>
        <button class="tab" onclick="CONTENT.tab('email',this)">Email Campaign</button>
        <button class="tab" onclick="CONTENT.tab('ad',this)">Ad Copy</button>
      </div>
      <div class="card-grid-2">
        <div class="card" id="content-form">
          <div class="card-title">✍️ Content Brief</div>
          <div class="form-group"><label class="form-label">BUSINESS / BRAND</label><input class="form-input" id="ct-brand" placeholder="Business name or context"/></div>
          <div id="ct-dynamic">
            <div class="form-group"><label class="form-label">BLOG TOPIC</label><input class="form-input" id="ct-topic" placeholder="e.g. 5 reasons AI is transforming restaurants"/></div>
            <div class="form-group"><label class="form-label">TARGET AUDIENCE</label><input class="form-input" id="ct-audience" placeholder="e.g. restaurant owners in London"/></div>
            <div class="form-group"><label class="form-label">TONE</label>
              <select class="form-select" id="ct-tone">
                <option>Professional & Authoritative</option><option>Friendly & Conversational</option>
                <option>Luxury & Premium</option><option>Educational & Informative</option><option>Persuasive & Sales-focused</option>
              </select>
            </div>
            <div class="form-group"><label class="form-label">LENGTH</label>
              <select class="form-select" id="ct-length">
                <option>Short (300-500 words)</option><option>Medium (600-900 words)</option><option>Long (1000-1500 words)</option>
              </select>
            </div>
          </div>
          <button class="btn btn-blue btn-full" onclick="CONTENT.generate()">✨ Generate Content</button>
        </div>
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div class="card-title">📄 Generated Content <span id="ct-type-badge" class="tag tag-blue">BLOG POST</span></div>
          <div class="output-area empty" id="ct-output" style="min-height:280px">Your content will be generated here...</div>
          <div class="output-actions">
            <button class="btn btn-ghost btn-sm" onclick="LX.copy(document.getElementById('ct-output').innerText,this)">📋 Copy</button>
            <button class="btn btn-ghost btn-sm" onclick="CONTENT.generate()">🔄 Regenerate</button>
          </div>
        </div>
      </div>`;
    }
  },

  /* ── CRM ──────────────────────────────── */
  crm: {
    title: 'CRM Lite', desc: 'Manage leads, clients, and follow-ups in one place',
    render() {
      return `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div></div>
        <button class="btn btn-blue btn-sm" onclick="CRM.openAdd()">+ Add Contact</button>
      </div>
      <div class="card-grid-2" style="align-items:start">
        <div class="card">
          <div class="card-title">👥 All Contacts</div>
          <div id="crm-list"><div class="empty-state"><div class="empty-icon">👥</div><div class="empty-title">No contacts yet</div><div class="empty-desc">Add your first lead or client to get started</div></div></div>
        </div>
        <div class="card">
          <div class="card-title">📊 Pipeline</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
            ${['Lead','Qualified','Proposal','Client'].map(s=>`<div><div class="pipeline-header">${s}</div><div class="pipeline-col" id="pipe-${s.toLowerCase()}"></div></div>`).join('')}
          </div>
        </div>
      </div>
      <div class="modal-overlay hidden" id="crm-modal">
        <div class="modal">
          <div class="modal-title">Add Contact <button class="modal-close" onclick="CRM.closeAdd()">✕</button></div>
          <div class="form-group"><label class="form-label">NAME</label><input class="form-input" id="crm-fname" placeholder="Full name"/></div>
          <div class="form-group"><label class="form-label">BUSINESS</label><input class="form-input" id="crm-fbiz" placeholder="Company name"/></div>
          <div class="form-group"><label class="form-label">EMAIL</label><input class="form-input" id="crm-femail" placeholder="email@company.com" type="email"/></div>
          <div class="form-group"><label class="form-label">PHONE</label><input class="form-input" id="crm-fphone" placeholder="+1 555 000 0000"/></div>
          <div class="form-group"><label class="form-label">INDUSTRY</label><input class="form-input" id="crm-find" placeholder="e.g. Restaurant"/></div>
          <div class="form-group"><label class="form-label">STAGE</label>
            <select class="form-select" id="crm-fstage">
              <option>Lead</option><option>Qualified</option><option>Proposal</option><option>Client</option>
            </select>
          </div>
          <div class="form-group"><label class="form-label">NOTES</label><textarea class="form-textarea" id="crm-fnotes" placeholder="Notes about this contact..." style="min-height:60px"></textarea></div>
          <div style="display:flex;gap:10px">
            <button class="btn btn-blue btn-full" onclick="CRM.save()">Save Contact</button>
            <button class="btn btn-ghost" onclick="CRM.closeAdd()">Cancel</button>
          </div>
          <div style="margin-top:12px;border-top:1px solid var(--border);padding-top:12px">
            <button class="btn btn-outline btn-full btn-sm" onclick="CRM.genFollowup()">🤖 AI: Generate Follow-up Email</button>
            <div class="output-area" id="crm-followup" style="margin-top:10px;min-height:60px;display:none"></div>
          </div>
        </div>
      </div>`;
    }
  },

  /* ── AI ASSISTANT ─────────────────────── */
  assistant: {
    title: 'AI Assistant', desc: 'LUXORIQ CORE AI — your premium business strategist',
    render() {
      return `
      <div class="card" style="display:flex;flex-direction:column;height:calc(100vh - 180px);padding:0;overflow:hidden">
        <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;flex-shrink:0">
          <div style="width:36px;height:36px;border-radius:10px;background:var(--blue-dim);border:1px solid rgba(0,240,255,0.25);display:flex;align-items:center;justify-content:center">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><polygon points="16,2 30,10 30,22 16,30 2,22 2,10" stroke="#00F0FF" stroke-width="1.5" fill="none"/><circle cx="16" cy="16" r="3" fill="#00F0FF"/></svg>
          </div>
          <div><div style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:0.9rem">LUXORIQ CORE AI</div><div style="font-size:0.7rem;color:#00FF88">● Online</div></div>
          <button class="btn btn-ghost btn-sm" style="margin-left:auto" onclick="ASSISTANT.clear()">↺ Clear</button>
        </div>
        <div class="chat-messages" id="ast-messages">
          <div class="chat-msg ai">
            <div class="chat-avatar">LX</div>
            <div><div class="chat-bubble">
              <strong>LUXORIQ CORE AI online.</strong><br/><br/>
              I'm your premium business intelligence assistant. I can help you with strategy, marketing, automation, pricing, content, and more.<br/><br/>
              What are you working on today?
            </div><div style="font-size:0.65rem;color:var(--muted);margin-top:4px">${LX.time()}</div></div>
          </div>
        </div>
        <div class="chat-input-area" style="flex-shrink:0">
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px" id="ast-chips">
            ${['How do I get my first client?','Write me a pricing strategy','What automation should I set up first?','Review my business idea'].map(q=>`<button class="tag tag-blue" style="cursor:pointer" onclick="ASSISTANT.chip('${q}')">${q}</button>`).join('')}
          </div>
          <div style="display:flex;gap:10px;align-items:flex-end">
            <textarea class="chat-textarea" id="ast-input" placeholder="Ask LUXORIQ CORE AI anything..." rows="1" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();ASSISTANT.send()}"></textarea>
            <button class="chat-send" id="ast-send" onclick="ASSISTANT.send()">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8l13-6-4 6 4 6-13-6z" fill="#000"/></svg>
            </button>
          </div>
        </div>
      </div>`;
    }
  }
};
