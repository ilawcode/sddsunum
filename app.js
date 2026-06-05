/* global TRAINING_META, SDD_CONTENT, BMAD_AGENTS, BMAD_COMMANDS_TABLE,
   OPENSPEC_CONCEPTS, OPENSPEC_ACTORS, OPENSPEC_COMMANDS_TABLE,
   COMPARISON_TABLE, SCENARIOS, LEARNING_OUTCOMES */

const STEPS = [
  {
    tabLabel: "Kurulum",
    phase: "Kurulum",
    title: "BMAD Kurulumu",
    desc: "Turkcell Akademi eğitmen portalı projesinde BMAD'ı tek komutla kurun.",
    command: "npx bmad-method install",
    alias: null,
    prompt: "~/akademi-portal $",
    required: true,
    explain:
      "Proje klasöründe bmad-method yükleyicisini çalıştırır. Modül (bmm), IDE (cursor) ve dil tercihlerini sorar. _bmad/ ve _bmad-output/ oluşturur.",
    output: [
      { text: "  ╔══════════════════════════════════════╗", cls: "info" },
      { text: "  ║       BMAD Method Installer          ║", cls: "info" },
      { text: "  ╚══════════════════════════════════════╝", cls: "info" },
      { text: "? Proje: turkcell-akademi-egitmen-portali", cls: "warn" },
      { text: "? Modüller: core, bmm", cls: "warn" },
      { text: "? AI aracı: cursor", cls: "warn" },
      { text: "✓ Kurulum tamamlandı", cls: "success" },
      { text: "→ Cursor'da projeyi açın", cls: "dim" },
    ],
  },
  {
    tabLabel: "Help",
    phase: "Yönlendirme",
    title: "bmad-help — Yol Haritası",
    desc: "Proje durumunu analiz eder; sonraki adımları önerir.",
    command: "bmad-help",
    alias: null,
    prompt: "Cursor Chat ›",
    required: true,
    explain: "Kurulu modülleri ve tamamlanan işleri tarar. Analiz araçları ile bmad-create-prd arasındaki yolu gösterir.",
    output: [
      { text: "🔍 Proje: Turkcell Akademi Eğitmen Portalı", cls: "info" },
      { text: "Tamamlanan: Kurulum ✓", cls: "success" },
      { text: "Önerilen sıra:", cls: "warn" },
      { text: "  [MR][DR][TR] Araştırma (opsiyonel)", cls: "dim" },
      { text: "  [CB] bmad-create-brf → ürün amacı", cls: "highlight" },
      { text: "  [CP] bmad-create-prd → gereksinimler", cls: "highlight" },
    ],
  },
  {
    tabLabel: "Brainstorm",
    phase: "Analiz",
    title: "bmad-brainstorming",
    desc: "Eğitmen portalı fikrini netleştirmek için rehberli beyin fırtınası.",
    command: "bmad-brainstorming",
    alias: null,
    prompt: "Cursor Chat › (yeni chat)",
    optional: true,
    result: "Fikir listesi brainstorming-results.md olarak kaydedilir.",
    explain: "Analyst/PM perspektifiyle alternatifleri keşfeder. Portal ihtiyacı henüz dağınıksa kullanılır.",
    output: [
      { text: "💡 Eğitmen kayıt, performans, puanlama temaları...", cls: "info" },
      { text: "✓ 3 ana tema belirlendi", cls: "success" },
      { text: "✓ brainstorming-results.md", cls: "success" },
    ],
  },
  {
    tabLabel: "Pazar",
    phase: "Analiz",
    title: "bmad-market-research",
    desc: "Eğitim teknolojileri pazarı ve benzer portal çözümlerini araştırır.",
    command: "bmad-market-research",
    alias: "MR",
    prompt: "Cursor Chat › (yeni chat)",
    optional: true,
    result: "Pazar içgörüleri market-research.md raporuna dönüşür.",
    explain: "Rakipler, müşteri segmentleri ve değer önerisini güçlendirir.",
    output: [
      { text: "📊 Pazar araştırması...", cls: "info" },
      { text: "✓ Rakip portal analizi", cls: "success" },
      { text: "✓ market-research.md", cls: "success" },
    ],
  },
  {
    tabLabel: "Domain",
    phase: "Analiz",
    title: "bmad-domain-research",
    desc: "Eğitim sektörü, eğitmen yönetimi ve performans kavramlarını netleştirir.",
    command: "bmad-domain-research",
    alias: "DR",
    prompt: "Cursor Chat › (yeni chat)",
    optional: true,
    result: "Domain özeti domain-research.md dosyasında toplanır.",
    explain: "Sektör terimleri, iş kuralları ve domain risklerini belgeler.",
    output: [
      { text: "🏛️  Domain: eğitim & eğitmen yönetimi", cls: "info" },
      { text: "✓ domain-research.md", cls: "success" },
    ],
  },
  {
    tabLabel: "Teknik",
    phase: "Analiz",
    title: "bmad-technical-research",
    desc: "Portal için tech stack ve entegrasyon seçeneklerini değerlendirir.",
    command: "bmad-technical-research",
    alias: "TR",
    prompt: "Cursor Chat › (yeni chat)",
    optional: true,
    result: "Teknik değerlendirme technical-research.md olarak üretilir.",
    explain: "Mimari karar öncesi teknik risk ve uygulanabilirlik analizi.",
    output: [
      { text: "⚙️  Tech stack karşılaştırması...", cls: "info" },
      { text: "✓ technical-research.md", cls: "success" },
    ],
  },
  {
    tabLabel: "BRF",
    phase: "Ürün Tanımı",
    title: "bmad-create-brf",
    desc: "Eğitmen portalının amacını ve kapsamını product brief ile netleştirir.",
    command: "bmad-create-brf",
    alias: "CB",
    prompt: "Cursor Chat › (yeni chat)",
    optional: false,
    result: "Product brief — vizyon, hedef kitle, temel özellikler.",
    explain:
      "Neyi neden yapıyoruz? sorusuna yanıt verir. Eğitmen kaydı, bilgi yönetimi, performans takibi ve puanlama hedeflerini özetler. PRD öncesi kritik geçiş noktasıdır.",
    output: [
      { text: "📝 Product Brief oluşturuluyor...", cls: "info" },
      { text: "  • Vizyon: eğitmen yaşam döngüsü yönetimi", cls: "dim" },
      { text: "  • Hedef: performans & puanlama", cls: "dim" },
      { text: "✓ product-brief.md", cls: "success" },
      { text: "→ Sonraki: bmad-create-prd", cls: "highlight" },
    ],
  },
  {
    tabLabel: "PRD",
    phase: "Gereksinim",
    title: "bmad-create-prd",
    desc: "Brief ve araştırma çıktılarından PRD dokümanını oluşturur.",
    command: "bmad-create-prd",
    alias: "CP",
    prompt: "Cursor Chat › (yeni chat)",
    required: true,
    result: "Gereksinim dokümanı (PRD.md) oluşturulur.",
    explain: "Araştırma ve brief girdilerini kullanarak fonksiyonel gereksinimleri, kullanıcı hikayelerini ve kabul kriterlerini tanımlar.",
    output: [
      { text: "📋 PRD oluşturuluyor...", cls: "info" },
      { text: "Kaynak: product-brief.md + araştırmalar", cls: "dim" },
      { text: "✓ PRD.md oluşturuldu", cls: "success" },
      { text: "✓ decision-log.md", cls: "success" },
      { text: "→ Sonraki: bmad-validate-prd", cls: "highlight" },
    ],
  },
  {
    tabLabel: "Doğrula",
    phase: "Kalite",
    title: "bmad-validate-prd",
    desc: "PRD'yi checklist ile doğrular; eksikleri raporlar.",
    command: "bmad-validate-prd",
    alias: "VP",
    prompt: "Cursor Chat › (yeni chat)",
    optional: true,
    isFinal: true,
    result: "Doğrulanmış / iyileştirilmiş PRD ve validation raporu.",
    explain: "PRD finalize edilmeden önce kalite kontrolü. Sunum demosunda bu adım bilgilendirme amaçlıdır — simülasyon burada sonlanır.",
    output: [
      { text: "🔎 PRD doğrulama...", cls: "info" },
      { text: "✓ 24/28 kriter geçti", cls: "success" },
      { text: "✓ validation-report.html", cls: "success" },
      { text: "🎉 Analiz & gereksinim fazı tamamlandı", cls: "highlight" },
      { text: "→ Sonraki fazlar: UX, mimari, epic/story (BMAD tablosu)", cls: "dim" },
    ],
  },
];

const OPSX_STEPS = [
  {
    tabLabel: "Explore",
    phase: "Ön Keşif",
    title: "/opsx:explore",
    desc: "Gamer ek paket ihtiyacını ve mevcut mobil uygulama bağlamını keşfeder.",
    command: "/opsx:explore",
    prompt: "Cursor Chat ›",
    optional: true,
    result: "Keşif notları ve problem alanı özeti.",
    explain: "Çözüm yönü net değilken problem alanı, seçenekler ve etkilenmiş alanlar araştırılır. Mevcut projeye feature eklemede bağlam toplama kritiktir.",
    output: [
      { text: "🔍 Keşif: Turkcell Mobil — gamer segmenti", cls: "info" },
      { text: "? Mevcut ek paket akışı nasıl çalışıyor?", cls: "warn" },
      { text: "✓ Etkilenen modüller belirlendi", cls: "success" },
      { text: "✓ explore-notları kaydedildi", cls: "success" },
    ],
  },
  {
    tabLabel: "New",
    phase: "Başlangıç",
    title: "/opsx:new",
    desc: "Yeni change için iskelet yapı oluşturur.",
    command: "/opsx:new",
    prompt: "Cursor Chat ›",
    required: true,
    result: "Change başlangıç yapısı (openspec/ altında).",
    explain: "gamer-ek-paket-ekrani change'i için klasör ve metadata iskeleti oluşturulur. Kontrollü değişikliğin ilk resmi adımıdır.",
    output: [
      { text: "📁 Change iskeleti oluşturuluyor...", cls: "info" },
      { text: "✓ openspec/changes/gamer-ek-paket-ekrani/", cls: "success" },
      { text: "✓ change metadata hazır", cls: "success" },
    ],
  },
  {
    tabLabel: "Propose",
    phase: "Planlama",
    title: "/opsx:propose",
    desc: "Intent, proposal ve spec sürecini başlatır.",
    command: "/opsx:propose",
    prompt: "Cursor Chat ›",
    required: true,
    result: "proposal.md + specs/ davranış tanımları.",
    explain: "Gamer kullanıcılar için ek paket listeleme ve satın alma yönlendirme intent'i yazılır. Yalnızca değişen davranışlar spec olarak tanımlanır.",
    output: [
      { text: "📄 Proposal oluşturuluyor...", cls: "info" },
      { text: "Intent: gamer segmentine özel ek paket ekranı", cls: "dim" },
      { text: "✓ proposal.md", cls: "success" },
      { text: "✓ specs/ek-paket-listesi.spec.md", cls: "success" },
      { text: "✓ specs/satin-alma-yonlendirme.spec.md", cls: "success" },
    ],
  },
  {
    tabLabel: "Verify",
    phase: "Doğrulama",
    title: "/opsx:verify",
    desc: "Proposal ve spec uyumunu kontrol eder.",
    command: "/opsx:verify",
    prompt: "Cursor Chat ›",
    optional: true,
    result: "Doğrulama sonucu ve iyileştirme noktaları.",
    explain: "Reviewer/QA perspektifiyle proposal-spec tutarlılığı ve integration riskleri gözden geçirilir.",
    output: [
      { text: "🔎 Doğrulama başlatılıyor...", cls: "info" },
      { text: "✓ Proposal-spec uyumu: geçti", cls: "success" },
      { text: "⚠ 1 integration notu eklendi", cls: "warn" },
      { text: "✓ verify raporu kaydedildi", cls: "success" },
    ],
  },
  {
    tabLabel: "Apply",
    phase: "Uygulama",
    title: "/opsx:apply",
    desc: "Tasks ve spec doğrultusunda uygulamayı yürütür.",
    command: "/opsx:apply",
    prompt: "Cursor Chat ›",
    required: true,
    result: "Uygulanmış değişiklik — ekran ve entegrasyon.",
    explain: "Task listesi üzerinden ek paket ekranı ve satın alma akışı geliştirilir. Developer + AI aynı spec referansıyla çalışır.",
    output: [
      { text: "⚡ Uygulama başlatılıyor...", cls: "info" },
      { text: "✓ Task 1: Ek paket listesi UI", cls: "success" },
      { text: "✓ Task 2: Gamer segment filtresi", cls: "success" },
      { text: "✓ Task 3: Satın alma yönlendirme", cls: "success" },
      { text: "✓ Tüm tasks tamamlandı", cls: "highlight" },
    ],
  },
  {
    tabLabel: "Archive",
    phase: "Kapanış",
    title: "/opsx:archive",
    desc: "Tamamlanan change'i arşivler.",
    command: "/opsx:archive",
    prompt: "Cursor Chat ›",
    isFinal: true,
    result: "Arşivlenmiş change kaydı — kurumsal hafıza.",
    explain: "Uygulama ve doğrulama tamamlandıktan sonra change arşive alınır. SDD disiplininin kapanış adımıdır.",
    output: [
      { text: "📦 Change arşivleniyor...", cls: "info" },
      { text: "✓ archive/gamer-ek-paket-ekrani", cls: "success" },
      { text: "🎉 OpenSpec akışı tamamlandı", cls: "highlight" },
      { text: "→ Intent + spec + uygulama kayıt altında", cls: "dim" },
    ],
  },
];

const VIEW_KEY = "sdd-training-view";
const BMAD_CONTENT_KEY = "sdd-training-content-tab-bmad";
const OPSX_CONTENT_KEY = "sdd-training-content-tab-opsx";
const BMAD_AUTO_KEY = "sdd-training-auto-advance-bmad";
const OPSX_AUTO_KEY = "sdd-training-auto-advance-opsx";

let currentView = "presentation";
let presentationDeck = null;

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function renderHistory(el, history) {
  el.innerHTML = "";
  history.forEach(({ text, cls }) => {
    const line = document.createElement("span");
    line.className = `line ${cls}`.trim();
    line.textContent = text || "\u00A0";
    el.appendChild(line);
  });
  el.parentElement.scrollTop = el.parentElement.scrollHeight;
}

async function typeInto(el, cmd) {
  for (let i = 0; i <= cmd.length; i++) {
    el.textContent = cmd.slice(0, i);
    await sleep(25);
  }
}

function setView(viewId, demoSub) {
  currentView = viewId;
  localStorage.setItem(VIEW_KEY, viewId);
  $$(".app-tab").forEach((t) => t.classList.toggle("active", t.dataset.view === viewId));
  $$(".view").forEach((v) => v.classList.toggle("active", v.dataset.view === viewId));
  if (viewId === "demo") {
    setDemoSub(demoSub || localStorage.getItem("sdd-demo-sub") || "guide");
  }
}

function setDemoSub(subId) {
  localStorage.setItem("sdd-demo-sub", subId);
  $$(".demo-sub-tab").forEach((t) => t.classList.toggle("active", t.dataset.demo === subId));
  $$(".demo-panel").forEach((p) => p.classList.toggle("active", p.dataset.demo === subId));
  currentView = subId;
}

function createGuideSimulator(config) {
  const state = { current: 0, animating: false, history: [...config.initialHistory] };

  const isLast = (i = state.current) =>
    config.steps[i]?.isFinal || i === config.steps.length - 1;

  const setContentTab = (tabId) => {
    localStorage.setItem(config.contentKey, tabId);
    $$(config.contentTabSelector).forEach((t) => {
      t.classList.toggle("active", t.getAttribute(config.contentTabAttr) === tabId);
    });
    $$(config.panelSelector).forEach((p) => {
      p.classList.toggle("active", p.getAttribute(config.contentTabAttr) === tabId);
    });
  };

  const updateFooter = () => {
    const onLast = isLast();
    const auto = config.autoAdvanceEl.checked;
    if (onLast) {
      config.els.run.disabled = true;
      config.els.run.textContent = "Simülasyon tamamlandı";
      config.els.restart.hidden = false;
      config.els.completeMsg.hidden = false;
    } else {
      config.els.run.disabled = state.animating;
      config.els.run.textContent = auto ? "Çalıştır ve İlerle ▶" : "Komutu Çalıştır ▶";
      config.els.restart.hidden = true;
      config.els.completeMsg.hidden = true;
    }
    config.els.prev.disabled = state.animating || state.current === 0;
    config.els.next.disabled = state.animating || isLast();
  };

  const renderStepTabs = () => {
    config.els.stepTabs.innerHTML = "";
    config.steps.forEach((step, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "step-tab";
      btn.dataset.step = i;
      if (step.optional) btn.classList.add("optional");
      if (step.required || step.isFinal) btn.classList.add("required");
      if (i === state.current) btn.classList.add("active");
      btn.innerHTML = `<span class="step-tab-num">${i + 1}</span>${step.tabLabel}`;
      btn.addEventListener("click", () => { if (!state.animating) renderStep(i); });
      config.els.stepTabs.appendChild(btn);
    });
  };

  const renderStep = (index) => {
    const step = config.steps[index];
    state.current = index;
    const e = config.els;

    e.badge.textContent = `Adım ${index + 1} / ${config.steps.length}`;
    e.phase.textContent = step.phase;
    e.title.textContent = step.title;
    e.desc.textContent = step.desc;
    e.command.textContent = step.command;
    e.prompt.textContent = step.prompt;
    e.explain.textContent = step.explain;
    e.promptLabel.textContent = step.prompt;

    if (e.alias) {
      if (step.alias) {
        e.alias.hidden = false;
        e.alias.textContent = `Alias: ${step.alias}`;
      } else e.alias.hidden = true;
    }

    if (step.result) {
      e.result.hidden = false;
      e.result.textContent = `→ ${step.result}`;
    } else e.result.hidden = true;

    if (step.optional) {
      e.optional.hidden = false;
      e.optional.textContent = "Opsiyonel";
      e.optional.className = "step-optional";
    } else if (step.required || step.isFinal) {
      e.optional.hidden = false;
      e.optional.textContent = step.isFinal ? "Kapanış" : "Zorunlu";
      e.optional.className = step.isFinal ? "step-optional" : "step-required";
    } else e.optional.hidden = true;

    e.progress.style.width = `${((index + 1) / config.steps.length) * 100}%`;
    e.typed.textContent = "";
    e.cursor.style.display = "inline";
    updateFooter();
    renderStepTabs();
    config.els.stepTabs.querySelector(`[data-step="${index}"]`)?.scrollIntoView({
      inline: "center", block: "nearest", behavior: "smooth",
    });
  };

  const run = async () => {
    if (state.animating || isLast()) return;
    state.animating = true;
    updateFooter();
    setContentTab("terminal");
    setView("demo", config.viewId);

    const step = config.steps[state.current];
    await typeInto(config.els.typed, step.command);
    await sleep(350);
    config.els.cursor.style.display = "none";
    state.history.push({ text: `${step.prompt} ${step.command}`, cls: "cmd-echo" });
    for (const line of step.output) {
      await sleep(80);
      state.history.push(line);
      renderHistory(config.els.output, state.history);
    }
    state.history.push({ text: "", cls: "" });
    renderHistory(config.els.output, state.history);
    config.els.typed.textContent = "";
    config.els.cursor.style.display = "inline";
    state.animating = false;
    updateFooter();

    if (config.autoAdvanceEl.checked && !isLast()) {
      await sleep(500);
      renderStep(state.current + 1);
    }
  };

  const restart = () => {
    if (state.animating) return;
    state.history = [...config.restartHistory];
    renderHistory(config.els.output, state.history);
    renderStep(0);
    setContentTab("terminal");
    setView("demo", config.viewId);
  };

  $$(config.contentTabSelector).forEach((tab) => {
    tab.addEventListener("click", () => {
      setContentTab(tab.getAttribute(config.contentTabAttr));
    });
  });

  config.els.prev.addEventListener("click", () => {
    if (state.current > 0) renderStep(state.current - 1);
  });
  config.els.next.addEventListener("click", () => {
    if (!isLast()) renderStep(state.current + 1);
  });
  config.els.run.addEventListener("click", run);
  config.els.restart.addEventListener("click", restart);
  config.els.copy.addEventListener("click", async () => {
    await navigator.clipboard.writeText(config.steps[state.current].command);
    config.els.copy.textContent = "Kopyalandı!";
    setTimeout(() => { config.els.copy.textContent = "Kopyala"; }, 1200);
  });
  config.autoAdvanceEl.addEventListener("change", () => {
    localStorage.setItem(config.autoKey, config.autoAdvanceEl.checked);
    updateFooter();
  });

  const savedAuto = localStorage.getItem(config.autoKey);
  if (savedAuto !== null) config.autoAdvanceEl.checked = savedAuto === "true";
  const savedTab = localStorage.getItem(config.contentKey);
  if (savedTab) setContentTab(savedTab);

  renderHistory(config.els.output, state.history);
  renderStep(0);

  return {
    viewId: config.viewId,
    renderStep,
    run,
    restart,
    handleKey(e) {
      if (currentView !== config.viewId) return;
      if (e.key === "ArrowRight" && !isLast()) renderStep(state.current + 1);
      if (e.key === "ArrowLeft" && state.current > 0) renderStep(state.current - 1);
      if (e.key === "Enter" && !isLast()) run();
    },
  };
}

const bmadSim = createGuideSimulator({
  steps: STEPS,
  viewId: "guide",
  contentKey: BMAD_CONTENT_KEY,
  autoKey: BMAD_AUTO_KEY,
  contentTabSelector: "#contentTabs .content-tab",
  contentTabAttr: "data-content",
  panelSelector: "#view-demo .demo-panel[data-demo='guide'] .content-panel",
  autoAdvanceEl: $("#autoAdvance"),
  initialHistory: [
    { text: "SDD Eğitimi — BMAD Simülasyonu", cls: "info" },
    { text: "Senaryo: Turkcell Akademi Eğitmen Portalı", cls: "dim" },
    { text: "", cls: "" },
  ],
  restartHistory: [
    { text: "SDD Eğitimi — BMAD Simülasyonu (Turkcell Akademi)", cls: "info" },
    { text: "Baştan başlatıldı", cls: "dim" },
    { text: "", cls: "" },
  ],
  els: {
    stepTabs: $("#stepTabs"),
    badge: $("#stepBadge"),
    optional: $("#stepOptional"),
    phase: $("#stepPhase"),
    title: $("#stepTitle"),
    desc: $("#stepDesc"),
    command: $("#stepCommand"),
    alias: $("#stepAlias"),
    result: $("#stepResult"),
    prompt: $("#stepPrompt"),
    explain: $("#stepExplain"),
    output: $("#terminalOutput"),
    typed: $("#typedCmd"),
    cursor: $("#cursor"),
    promptLabel: $("#promptLabel"),
    progress: $("#progressFill"),
    prev: $("#prevStep"),
    next: $("#nextStep"),
    run: $("#runStep"),
    restart: $("#restartGuide"),
    completeMsg: $("#guideCompleteMsg"),
    copy: $("#copyCmd"),
  },
});

const opsxSim = createGuideSimulator({
  steps: OPSX_STEPS,
  viewId: "opsx-guide",
  contentKey: OPSX_CONTENT_KEY,
  autoKey: OPSX_AUTO_KEY,
  contentTabSelector: "#opsxContentTabs .content-tab",
  contentTabAttr: "data-opsx-content",
  panelSelector: "#view-demo .demo-panel[data-demo='opsx-guide'] .content-panel",
  autoAdvanceEl: $("#opsxAutoAdvance"),
  initialHistory: [
    { text: "SDD Eğitimi — OpenSpec Simülasyonu", cls: "info" },
    { text: "Senaryo: Turkcell Mobil — Gamer Ek Paket Ekranı", cls: "dim" },
    { text: "Ana akış: propose → apply → archive", cls: "dim" },
    { text: "", cls: "" },
  ],
  restartHistory: [
    { text: "SDD Eğitimi — OpenSpec Simülasyonu", cls: "info" },
    { text: "Baştan başlatıldı — gamer ek paket senaryosu", cls: "dim" },
    { text: "", cls: "" },
  ],
  els: {
    stepTabs: $("#opsxStepTabsMain"),
    badge: $("#opsxStepBadge"),
    optional: $("#opsxStepOptional"),
    phase: $("#opsxStepPhase"),
    title: $("#opsxStepTitle"),
    desc: $("#opsxStepDesc"),
    command: $("#opsxStepCommand"),
    alias: null,
    result: $("#opsxStepResult"),
    prompt: $("#opsxStepPrompt"),
    explain: $("#opsxStepExplain"),
    output: $("#opsxTerminalOutput"),
    typed: $("#opsxTypedCmd"),
    cursor: $("#opsxCursorMain"),
    promptLabel: $("#opsxPromptLabel"),
    progress: $("#opsxProgressFill"),
    prev: $("#opsxPrevStep"),
    next: $("#opsxNextStep"),
    run: $("#opsxRunStep"),
    restart: $("#opsxRestartGuide"),
    completeMsg: $("#opsxGuideCompleteMsg"),
    copy: $("#opsxCopyCmd"),
  },
});

/* Reference content */
function renderReference() {
  $("#agentsGrid").innerHTML = BMAD_AGENTS.map(
    (a) => `<article class="agent-card ref-agent-card" style="--agent-color:${a.color}">
      <span class="agent-avatar" style="background:${a.color}">${a.initials}</span>
      <div><h4>${a.persona} · ${a.role}</h4><span class="agent-tr">${a.tr}</span>
      <p><strong>Soru:</strong> ${a.q}</p><p class="small muted">${a.where}</p></div></article>`
  ).join("");

  $("#conceptsList").innerHTML = OPENSPEC_CONCEPTS.map(
    (c) => `<div class="concept-item"><strong>${c.name}</strong><span>${c.desc}</span></div>`
  ).join("");

  renderReferenceTables();

  $$("#view-reference .cmd-row").forEach((row) => {
    row.addEventListener("click", () => {
      presentationDeck?.openCommandModal(row.dataset.fw, row.dataset.cmd);
    });
  });
}

/* Events */
$$(".app-tab").forEach((t) => t.addEventListener("click", () => setView(t.dataset.view)));
$$(".demo-sub-tab").forEach((t) =>
  t.addEventListener("click", () => setDemoSub(t.dataset.demo))
);

document.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (document.body.classList.contains("modal-open")) {
    presentationDeck?.handleKey(e);
    return;
  }
  if (currentView === "presentation") presentationDeck?.handleKey(e);
  else if (currentView === "guide") bmadSim.handleKey(e);
  else if (currentView === "opsx-guide") opsxSim.handleKey(e);
});

/* Init */
const savedView = localStorage.getItem(VIEW_KEY);
const validViews = ["presentation", "reference", "demo"];
if (savedView && validViews.includes(savedView)) {
  if (savedView === "demo") {
    const sub = localStorage.getItem("sdd-demo-sub") || "guide";
    setView("demo", sub);
  } else setView(savedView);
} else if (savedView === "guide" || savedView === "opsx-guide") {
  setView("demo", savedView);
} else if (["intro", "bmad", "openspec", "scenarios", "summary"].includes(savedView)) {
  setView("presentation");
}

presentationDeck = createPresentationDeck({
  onGoDemo(which) {
    setView("demo", which === "bmad" ? "guide" : "opsx-guide");
  },
});

renderReference();
