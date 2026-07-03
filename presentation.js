/* global TRAINING_META, SDD_CONTENT, INSTRUCTORS, BMAD_AGENTS, BMAD_COMMANDS_TABLE,
   OPENSPEC_CONCEPTS, OPENSPEC_ACTORS, OPENSPEC_COMMANDS_TABLE,
   COMPARISON_TABLE, SCENARIOS, LEARNING_OUTCOMES, QUALITY_GATES,
   STAGE_TONES, BMAD_INVENTORY_CHUNKS, OPENSPEC_INVENTORY_CHUNKS */

const TC_EMBLEM = `<svg class="tc-emblem" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="50" cy="50" r="45" fill="#FFC000"/>
  <circle cx="38" cy="38" r="9" fill="#001480"/>
  <circle cx="62" cy="54" r="9" fill="#001480"/>
  <path d="M 38 38 Q 44 65 62 54" stroke="#001480" stroke-width="9" stroke-linecap="round" fill="none"/>
</svg>`;

const AK_LOGO = `<div class="ak-brand" aria-label="Akademi">
  ${TC_EMBLEM}
  <span class="ak-logo-stack"><span class="ak-logo-name">AKADEMI</span><span class="ak-logo-sub">GENEL</span></span>
</div>`;

const AK_LOGO_COVER = `<div class="ak-brand ak-brand-cover" aria-label="Akademi">
  ${TC_EMBLEM}
  <span class="ak-logo-stack"><span class="ak-logo-name">AKADEMI</span></span>
</div>`;

function buildPresentationSlides() {
  const slides = [
    { id: "welcome", section: "Giriş", type: "welcome", layout: "cover" },
    { id: "purpose", section: "Giriş", type: "purpose", title: "EĞİTİM AMACI" },
    { id: "sdd-what", section: "SDD", type: "sdd-what", title: "SDD NEDİR?" },
    { id: "sdd-why", section: "SDD", type: "sdd-why", title: "NEDEN SDD?" },
    { id: "positioning", section: "Çerçeve", type: "positioning", title: "BMAD & OPENSPEC" },
    { id: "bmad-intro", section: "BMAD", type: "bmad-intro", title: "BMAD NEDİR?" },
    { id: "bmad-agents", section: "BMAD", type: "bmad-agents", title: "UZMAN AJAN KADROSU" },
    { id: "bmad-flow", section: "BMAD", type: "command-flow", framework: "bmad", title: "BMAD KOMUT AKIŞI" },
  ];

  BMAD_INVENTORY_CHUNKS.forEach((chunk, i) => {
    slides.push({
      id: `bmad-inv-${i}`,
      section: "BMAD",
      type: "command-inventory",
      framework: "bmad",
      chunk,
      title: chunk.title,
      footLabel: chunk.footLabel,
    });
  });

  slides.push(
    { id: "bmad-brf", section: "BMAD", type: "highlight-cmd", cmd: "bmad-create-brf", framework: "bmad", title: "ÖNE ÇIKAN KOMUT" },
    { id: "quality-gates", section: "BMAD", type: "quality-gates", title: "KALİTE KAPILARI" },
    { id: "opsx-intro", section: "OpenSpec", type: "opsx-intro", title: "OPENSPEC NEDİR?" },
    { id: "opsx-concepts", section: "OpenSpec", type: "opsx-concepts", title: "OPENSPEC KAVRAMLARI" },
    { id: "opsx-flow", section: "OpenSpec", type: "opsx-pipeline", title: "OPENSPEC ANA AKIŞ" }
  );

  OPENSPEC_INVENTORY_CHUNKS.forEach((chunk, i) => {
    slides.push({
      id: `opsx-inv-${i}`,
      section: "OpenSpec",
      type: "command-inventory",
      framework: "openspec",
      chunk,
      title: chunk.title,
      footLabel: chunk.footLabel,
    });
  });

  slides.push(
    { id: "outcomes", section: "Kapanış", type: "outcomes", title: "EĞİTİM KAZANIMLARI" },
    { id: "demo-cta", section: "Kapanış", type: "demo-cta", title: "CANLI DEMO", layout: "cover" }
  );

  return slides;
}

const PRESENTATION_SLIDES = buildPresentationSlides();

function akBullet(title, text) {
  return `<li class="ak-bullet-item"><span class="ak-check" aria-hidden="true">✓</span><p><strong>${title}:</strong> ${text}</p></li>`;
}

function wrapAkademiSlide(slide, index, body) {
  const total = PRESENTATION_SLIDES.length;
  const footLeft = slide.footLabel
    ? `Akademi · ${slide.footLabel}`
    : "Akademi © 2026";
  const foot = `<footer class="ak-foot"><span>${footLeft}</span><span class="ak-foot-num">Slayt ${index + 1} / ${total}</span></footer>`;
  const lumos = `<div class="ak-lumos" aria-hidden="true"></div>`;
  const bodyInv = slide.type === "command-inventory" ? " ak-body-inventory" : "";
  const denseTypes = new Set([
    "command-inventory", "bmad-agents", "command-flow", "opsx-concepts",
    "opsx-pipeline", "compare", "quality-gates", "scenario", "highlight-cmd",
  ]);
  const bodyLayout = denseTypes.has(slide.type) ? " ak-body-dense" : " ak-body-centered";

  if (slide.layout === "cover" && slide.type === "welcome") {
    return `<div class="slide-inner akademi-slide ak-cover">
      <header class="ak-cover-top">
        ${AK_LOGO_COVER}
        <span class="ak-confidential">GENEL</span>
      </header>
      <main class="ak-body ak-body-cover">${body}</main>
      <footer class="ak-cover-foot">
        <span>Eğitmenler: Uğur Erdem & Berrin Büyüklü</span>
        <span></span>
      </footer>
      ${lumos}
    </div>`;
  }

  if (slide.layout === "cover") {
    return `<div class="slide-inner akademi-slide ak-cover ak-cover-alt">
      <header class="ak-cover-top">
        ${AK_LOGO_COVER}
        <span class="ak-confidential">GENEL</span>
      </header>
      <main class="ak-body ak-body-cover">${body}</main>
      ${foot}${lumos}
    </div>`;
  }

  const title = slide.title || slide.section.toUpperCase();
  return `<div class="slide-inner akademi-slide">
    <header class="ak-head">
      <h2 class="ak-title">${title}</h2>
      ${AK_LOGO}
    </header>
    <main class="ak-body${bodyInv}${bodyLayout}">${body}</main>
    ${foot}${lumos}
  </div>`;
}

const BMAD_PHASES = [
  { label: "Keşif", cmds: ["bmad-brainstorming", "bmad-market-research", "bmad-domain-research", "bmad-technical-research"], color: "phase-discover" },
  { label: "Tanım", cmds: ["bmad-create-brf", "bmad-create-prd", "bmad-validate-prd"], color: "phase-define" },
  { label: "Tasarım", cmds: ["bmad-create-ux-design", "bmad-create-architecture"], color: "phase-design" },
  { label: "Plan", cmds: ["bmad-create-epics-and-stories", "bmad-sprint-planning", "bmad-sprint-status", "bmad-create-story"], color: "phase-plan" },
  { label: "Uygula", cmds: ["bmad-dev-story"], color: "phase-build" },
];

const OPSX_PIPELINE = [
  { cmd: "/opsx:explore", label: "Keşif", optional: true },
  { cmd: "/opsx:new", label: "Başlat" },
  { cmd: "/opsx:propose", label: "Öner", highlight: true },
  { cmd: "/opsx:verify", label: "Doğrula", optional: true },
  { cmd: "/opsx:apply", label: "Uygula", highlight: true },
  { cmd: "/opsx:archive", label: "Arşivle", highlight: true },
];

function createPresentationDeck(deps) {
  const { onGoDemo } = deps;
  let current = 0;
  let modalCmd = null;
  let modalFramework = null;

  const stage = document.getElementById("slideStage");
  const sidebarList = document.getElementById("slideSidebarList");
  const countBadge = document.getElementById("slideCountBadge");
  const sectionLabel = document.getElementById("slideSection");
  const titleLabel = document.getElementById("slideTitleLabel");
  const progress = document.getElementById("slideProgress");
  const canvasWrap = document.getElementById("deckCanvasWrap");
  const slideCanvas = document.getElementById("slideCanvas");
  const prevBtn = document.getElementById("slidePrev");
  const nextBtn = document.getElementById("slideNext");
  const firstBtn = document.getElementById("slideFirst");
  const lastBtn = document.getElementById("slideLast");
  const modal = document.getElementById("commandModal");

  function scaleCanvas() {
    if (!canvasWrap || !slideCanvas) return;
    const pad = 24;
    const scale = Math.min(
      (canvasWrap.clientWidth - pad) / 1280,
      (canvasWrap.clientHeight - pad) / 720,
      1
    );
    slideCanvas.style.setProperty("--slide-scale", String(scale));
  }

  const cmdByName = (framework, cmd) => {
    const table = framework === "bmad" ? BMAD_COMMANDS_TABLE : OPENSPEC_COMMANDS_TABLE;
    return table.find((r) => r.cmd === cmd);
  };

  const tableFor = (framework) =>
    framework === "bmad" ? BMAD_COMMANDS_TABLE : OPENSPEC_COMMANDS_TABLE;

  function openCommandModal(framework, cmd) {
    const row = cmdByName(framework, cmd);
    if (!row) return;
    modalCmd = cmd;
    modalFramework = framework;
    modal.classList.add("open");
    document.body.classList.add("modal-open");

    const fwLabel = framework === "bmad" ? "BMAD" : "OpenSpec";
    modal.querySelector(".modal-fw").textContent = fwLabel;
    modal.querySelector(".modal-cmd").textContent = row.cmd;
    modal.querySelector(".modal-stage").textContent = row.stage;
    modal.querySelector(".modal-alias").textContent =
      row.alias && row.alias !== "-" ? `Alias: ${row.alias}` : "";
    modal.querySelector(".modal-purpose").textContent = row.purpose;
    modal.querySelector(".modal-when").textContent = row.when;
    modal.querySelector(".modal-output").textContent = row.output;
    modal.querySelector(".modal-actor").textContent = row.agent || row.actor;
    const noteEl = modal.querySelector(".modal-note");
    if (row.note) {
      noteEl.hidden = false;
      noteEl.querySelector("p").textContent = row.note;
    } else noteEl.hidden = true;
    modal.querySelector(".modal-order").textContent = `${row.order} / ${tableFor(framework).length}`;
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    modalCmd = null;
  }

  function bindCommandClicks(root, framework) {
    root.querySelectorAll("[data-cmd]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        openCommandModal(framework, el.dataset.cmd);
      });
    });
  }

  function renderWelcome() {
    const k = TRAINING_META;
    const instructors = INSTRUCTORS.map(
      (ins) =>
        `<div class="instructor-card">
          <span class="instructor-avatar" style="--av-bg:${ins.bg};--av-fg:${ins.fg}">${ins.initials}</span>
          <div><strong>${ins.name}</strong><span>${ins.title}</span></div>
        </div>`
    ).join("");
    return `
      <h1 class="ak-cover-h1">SDD MİMARİSİ EĞİTİMİ</h1>
      <p class="ak-cover-sub">YAPAY ZEKA DESTEKLİ ÇALIŞMA YÖNTEMLERİ · BMAD & OPENSPEC</p>
      <p class="cover-sub">Yapay zeka destekli yazılım geliştirmede <strong>BMAD</strong> ve <strong>OpenSpec</strong> ile kontrollü, izlenebilir SDD yaklaşımı</p>
      <div class="hero-meta">
        <span class="hero-pill">📅 ${k.date}</span>
        <span class="hero-pill">⏱ ${k.duration}</span>
        <span class="hero-pill">🎥 ${k.recording}</span>
      </div>
      <div class="instructor-row">${instructors}</div>`;
  }

  function renderPurpose() {
    return `<ul class="ak-bullet-list ak-bullet-spacious">
      ${akBullet("Eğitim hedefi", TRAINING_META.purpose)}
      ${akBullet("Temel mesaj", "Yalnızca kod üretmek yetmez — intent, gereksinim, plan ve uygulama akışı birlikte yönetilmelidir.")}
      ${akBullet("Kapsam", "BMAD ve OpenSpec frameworkleri üzerinden SDD mimarisinin başlangıç seviyesinde aktarımı")}
    </ul>`;
  }

  function renderSddWhat() {
    return `<ul class="ak-bullet-list ak-bullet-spacious">
      ${akBullet("Tanım", SDD_CONTENT.definition)}
      ${akBullet("İlke", SDD_CONTENT.quote)}
      ${akBullet("Çalışma biçimi", "Intent ve spec netleşir; hem insan hem AI aynı referans üzerinden ilerler.")}
      ${akBullet("Sonuç", "Önce ne yapılacağını tanımla, sonra geliştir — kontrollü ve izlenebilir akış.")}
    </ul>`;
  }

  function renderSddWhy() {
    const items = SDD_CONTENT.why.map((w) => akBullet("Neden", w)).join("");
    return `<ul class="ak-bullet-list ak-bullet-spacious">${items}</ul>`;
  }

  function renderFramework() {
    const items = SDD_CONTENT.framework.map((f) => akBullet(`Adım ${f.n}`, f.t)).join("");
    return `<ul class="ak-bullet-list ak-bullet-compact">${items}</ul>`;
  }

  function renderPositioning() {
    return `<ul class="ak-bullet-list ak-bullet-spacious">
      ${akBullet("BMAD", "Rol/ajan ve workflow merkezli — fikirden ürüne giden yolu yapılandırır. «Hangi uzmanlık perspektifiyle ilerliyoruz?»")}
      ${akBullet("OpenSpec", "Intent, proposal, spec ve archive ile değişikliği disipline eder. «Hangi değişikliği, neden yapıyoruz?»")}
      ${akBullet("İlişki", "İki framework rekabet etmez — SDD çatısı altında tamamlayıcıdır.")}
    </ul>`;
  }

  function renderBmadIntro() {
    return `<ul class="ak-bullet-list ak-bullet-spacious">
      ${akBullet("Framework", "Yapay zeka destekli, rol bazlı, yapılandırılmış çalışma yaklaşımı — fikirden delivery'ye akış.")}
      ${akBullet("Ajan perspektifleri", "Analyst, PM, Architect, Developer, QA ve daha fazlası — her biri farklı soruyu sorar.")}
      ${akBullet("Komut tabanlı workflow", "claude-saka üzerinden adım adım ilerleyen, tekrarlanabilir süreç komutları.")}
      ${akBullet("Ana akış", "Brief → PRD → UX / Mimari → Epic & Story → Uygulama")}
    </ul>`;
  }

  function renderBmadAgents() {
    const cards = BMAD_AGENTS.map(
      (a, i) =>
        `<article class="qg-panel agent-persona-card" style="--agent-color:${a.color};--i:${i}">
          <div class="agent-persona-top">
            <span class="agent-avatar" style="background:${a.color}">${a.initials}</span>
            <div>
              <h4>${a.persona} <span class="agent-role-tag">${a.role}</span></h4>
              <span class="agent-tr">${a.tr}</span>
            </div>
            <span class="agent-icon">${a.icon}</span>
          </div>
          <p class="agent-q">${a.q}</p>
          <span class="agent-where">${a.where}</span>
        </article>`
    ).join("");
    return `<p class="ak-body-lead">Her ajan farklı bir uzmanlık perspektifiyle süreci yönlendirir.</p><div class="agents-persona-grid">${cards}</div>`;
  }

  function renderCommandFlow() {
    const phases = BMAD_PHASES.map((ph) => {
      const pills = ph.cmds
        .map((c) => {
          const row = cmdByName("bmad", c);
          const hl = row?.highlight ? " pill-highlight" : "";
          return `<button type="button" class="cmd-pill${hl}" data-cmd="${c}" title="Detay için tıkla">${c.replace("bmad-", "")}</button>`;
        })
        .join("");
      return `<article class="qg-panel phase-col ${ph.color}"><span class="phase-label">${ph.label}</span><div class="phase-pills">${pills}</div></article>`;
    }).join("");
    return `<p class="ak-body-lead">Her komuta tıklayın — detaylı anlatım popup'ta açılır.</p><div class="phase-flow">${phases}</div>`;
  }

  function stagePill(stage) {
    const tone = STAGE_TONES[stage] || "stage-default";
    return `<span class="inv-stage ${tone}">${stage}</span>`;
  }

  function renderCommandInventory(slide) {
    const isBmad = slide.framework === "bmad";
    const table = tableFor(slide.framework);
    const [from, to] = slide.chunk.range;
    const rows = table.filter((r) => r.order >= from && r.order <= to);

    const trs = rows
      .map((r, i) => {
        const tone = STAGE_TONES[r.stage] || "stage-default";
        const alias = r.alias && r.alias !== "-" ? r.alias : "—";
        const actor = r.agent || r.actor;
        const zebra = i % 2 ? " corp-zebra" : "";
        const hi = r.highlight ? " corp-highlight" : "";
        return `<tr class="inv-row${zebra}${hi}" data-cmd="${r.cmd}" tabindex="0" role="button" title="Detay için tıkla">
          <td class="corp-order">${r.order}</td>
          <td class="corp-cmd"><code>${r.cmd}</code></td>
          ${isBmad ? `<td class="inv-alias ${tone}">${alias}</td>` : ""}
          <td class="corp-stage">${stagePill(r.stage)}</td>
          <td>${r.purpose}</td>
          <td>${r.when}</td>
          <td>${r.output}</td>
          <td class="corp-actor">${actor}</td>
        </tr>`;
      })
      .join("");

    const head = isBmad
      ? "<tr><th>Sıra</th><th>Komut</th><th>Alias</th><th>Aşama</th><th>Ne İşe Yarar?</th><th>Ne Zaman?</th><th>Beklenen Çıktı</th><th>Ajan</th></tr>"
      : "<tr><th>Sıra</th><th>Komut</th><th>Aşama</th><th>Ne İşe Yarar?</th><th>Ne Zaman?</th><th>Beklenen Çıktı</th><th>Aktör</th></tr>";

    return `<p class="ak-table-hint">Satıra tıklayın — komut detayı popup'ta açılır.</p>
      <div class="corp-table-wrap">
        <table class="corp-table ${isBmad ? "corp-bmad" : "corp-opsx"}">
          <thead>${head}</thead>
          <tbody>${trs}</tbody>
        </table>
      </div>`;
  }

  function bindInventoryRows(root, framework) {
    root.querySelectorAll(".inv-row[data-cmd]").forEach((row) => {
      const go = () => openCommandModal(framework, row.dataset.cmd);
      row.addEventListener("click", go);
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      });
    });
  }

  function renderHighlightCmd(slide) {
    const row = cmdByName(slide.framework, slide.cmd);
    return `<article class="qg-panel highlight-panel">
      <h3 class="cmd-inv-head">
        <span class="qg-icon cmd-num">★</span>
        <code class="evr-cmd">${row.cmd}</code>
        ${row.alias !== "-" ? `<span class="inv-alias stage-product">${row.alias}</span>` : ""}
        ${stagePill(row.stage)}
      </h3>
      <p class="slide-lead">${row.purpose}</p>
      <ul class="ak-bullet-list ak-bullet-compact">
        ${akBullet("Ne zaman", row.when)}
        ${akBullet("Çıktı", row.output)}
        ${akBullet("Ajan", row.agent)}
      </ul>
      ${row.note ? `<div class="presenter-tip">💡 Sunum notu: ${row.note}</div>` : ""}
      <button type="button" class="btn btn-ghost cmd-detail-btn" data-cmd="${row.cmd}">Tam detay →</button>
    </article>`;
  }

  function renderQualityGates() {
    const q = QUALITY_GATES;
    const deltaItems = q.delta.items.map((item) => akBullet("Delta", item)).join("");
    const evrSteps = q.evr.steps
      .map(
        (s) =>
          `<article class="evr-step tone-${s.tone}">
            <span class="evr-phase">${s.phase}</span>
            <code class="evr-cmd" data-cmd="${s.cmd}">${s.cmd}</code>
            <p>${s.desc}</p>
          </article>`
      )
      .join("");
    return `<p class="ak-body-lead">${q.subtitle}</p>
      <div class="qg-split">
        <article class="qg-panel delta-panel">
          <h3><span class="qg-icon warn">⚠</span> ${q.delta.title}</h3>
          <p>${q.delta.desc}</p>
          <ul class="ak-bullet-list">${deltaItems}</ul>
        </article>
        <article class="qg-panel evr-panel">
          <h3><span class="qg-icon sync">↻</span> ${q.evr.title}</h3>
          <div class="evr-steps">${evrSteps}</div>
          <p class="evr-footnote">« ${q.evr.footnote} »</p>
        </article>
      </div>`;
  }

  function renderOpsxIntro() {
    const actors = OPENSPEC_ACTORS.map((a) => akBullet("Aktör", a)).join("");
    return `<ul class="ak-bullet-list ak-bullet-spacious">
      ${akBullet("Framework", "Spec-driven development'ı güçlendirir — değişikliği önce tanımlar, sonra uygular.")}
      ${akBullet("Ana akış", "propose → apply → archive")}
      ${akBullet("Hizalama", "Sabit ajan listesi yerine tüm aktörlerin aynı intent ve spec üzerinde çalışması vurgulanır.")}
    </ul>
    <ul class="ak-bullet-list ak-bullet-compact ak-mt">${actors}</ul>`;
  }

  function renderOpsxConcepts() {
    const cards = OPENSPEC_CONCEPTS.map(
      (c, i) =>
        `<article class="qg-panel concept-slide-card" style="--i:${i}"><strong>${c.name}</strong><p>${c.desc}</p></article>`
    ).join("");
    return `<div class="concepts-slide-grid">${cards}</div>`;
  }

  function renderOpsxPipeline() {
    const nodes = OPSX_PIPELINE.map((n, i) => {
      const cls = [n.highlight ? "pipe-highlight" : "", n.optional ? "pipe-optional" : ""].filter(Boolean).join(" ");
      const arrow = i < OPSX_PIPELINE.length - 1 ? '<span class="pipe-arrow">→</span>' : "";
      return `<button type="button" class="qg-panel pipe-node ${cls}" data-cmd="${n.cmd}">
        <span class="pipe-cmd">${n.cmd}</span>
        <span class="pipe-label">${n.label}${n.optional ? " (ops.)" : ""}</span>
      </button>${arrow}`;
    }).join("");
    return `<p class="ak-body-lead">Komutlara tıklayarak detaylı anlatımı açın.</p><div class="pipeline-visual">${nodes}</div>`;
  }

  function renderCompare() {
    const rows = COMPARISON_TABLE.map(
      (r) => `<tr><td>${r.head}</td><td>${r.bmad}</td><td>${r.openspec}</td></tr>`
    ).join("");
    return `<article class="qg-panel compare-panel">
      <div class="inv-table-wrap">
        <table class="data-table compare-table">
          <thead><tr><th>Başlık</th><th>BMAD</th><th>OpenSpec</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </article>`;
  }

  function renderScenario(slide) {
    const s = SCENARIOS[slide.index];
    return `
      <h3 class="scenario-name">${s.name}</h3>
      <ul class="ak-bullet-list ak-bullet-spacious">
        ${akBullet("İş hedefi", s.goal)}
        ${akBullet("Öğrenim", s.learn)}
      </ul>
      <div class="scenario-split qg-split ak-mt">
        <article class="qg-panel scenario-col bmad-col"><h4><span class="qg-icon sync">↻</span> BMAD Akışı</h4><ul>${s.bmad.map((x) => `<li>${x}</li>`).join("")}</ul></article>
        <article class="qg-panel scenario-col opsx-col"><h4><span class="qg-icon sync">↻</span> OpenSpec Akışı</h4><ul>${s.openspec.map((x) => `<li>${x}</li>`).join("")}</ul></article>
      </div>`;
  }

  function renderOutcomes() {
    const items = LEARNING_OUTCOMES.map((o) => akBullet("Kazanım", o)).join("");
    return `<p class="ak-body-lead">1.5 saatlik oturum sonunda katılımcıların ulaşması beklenen seviye:</p>
      <ul class="ak-bullet-list ak-bullet-spacious">${items}</ul>`;
  }

  function renderDemoCta() {
    return `
      <h2 class="ak-cover-title ak-title">Simülasyonlara Geçelim</h2>
      <p class="ak-body-lead">İki senaryoyu adım adım terminal simülasyonunda deneyin.</p>
      <div class="demo-cta-cards">
        <article class="demo-cta-card bmad-cta">
          <span class="cta-emoji">🎓</span>
          <h3>BMAD Simülasyonu</h3>
          <p>Akademi Eğitmen Portalı — kurulum → analiz → PRD</p>
          <button type="button" class="btn btn-glow" id="ctaBmadSim">BMAD Demo →</button>
        </article>
        <article class="demo-cta-card opsx-cta">
          <span class="cta-emoji">📱</span>
          <h3>OpenSpec Simülasyonu</h3>
          <p>Gamer Ek Paket Ekranı — propose → apply → archive</p>
          <button type="button" class="btn btn-glow blue" id="ctaOpsxSim">OpenSpec Demo →</button>
        </article>
      </div>`;
  }

  const renderers = {
    welcome: renderWelcome,
    purpose: renderPurpose,
    "sdd-what": renderSddWhat,
    "sdd-why": renderSddWhy,
    framework: renderFramework,
    positioning: renderPositioning,
    "bmad-intro": renderBmadIntro,
    "bmad-agents": renderBmadAgents,
    "command-flow": () => renderCommandFlow(),
    "command-inventory": renderCommandInventory,
    "highlight-cmd": renderHighlightCmd,
    "quality-gates": renderQualityGates,
    "opsx-intro": renderOpsxIntro,
    "opsx-concepts": renderOpsxConcepts,
    "opsx-pipeline": renderOpsxPipeline,
    compare: renderCompare,
    scenario: renderScenario,
    outcomes: renderOutcomes,
    "demo-cta": renderDemoCta,
  };

  function renderSlide(index) {
    const slide = PRESENTATION_SLIDES[index];
    const body = renderers[slide.type](slide);
    const html = wrapAkademiSlide(slide, index, body);
    stage.innerHTML = `<div class="slide active slide-type-${slide.type}" data-slide="${index}">${html}</div>`;

    const fw = slide.framework || (slide.type === "opsx-pipeline" ? "openspec" : null);
    if (fw) bindCommandClicks(stage, fw);
    if (slide.type === "highlight-cmd") {
      stage.querySelector(".cmd-detail-btn")?.addEventListener("click", () =>
        openCommandModal(slide.framework, slide.cmd)
      );
    }
    if (slide.type === "command-inventory") {
      bindInventoryRows(stage, slide.framework);
    }
    if (slide.type === "demo-cta") {
      document.getElementById("ctaBmadSim")?.addEventListener("click", () => onGoDemo("bmad"));
      document.getElementById("ctaOpsxSim")?.addEventListener("click", () => onGoDemo("opsx"));
    }
    if (slide.type === "quality-gates") {
      stage.querySelectorAll(".evr-cmd[data-cmd]").forEach((el) => {
        if (cmdByName("bmad", el.dataset.cmd)) {
          el.style.cursor = "pointer";
          el.addEventListener("click", () => openCommandModal("bmad", el.dataset.cmd));
        }
      });
    }
  }

  function slideLabel(slide) {
    if (slide.type === "welcome") return "Eğitim Başlangıcı";
    if (slide.type === "demo-cta") return "Canlı Demo";
    return slide.title || slide.section;
  }

  function renderSidebar() {
    if (!sidebarList) return;
    sidebarList.innerHTML = PRESENTATION_SLIDES.map((s, i) => {
      const sectionChange = i === 0 || PRESENTATION_SLIDES[i - 1].section !== s.section;
      const sectionHdr = sectionChange
        ? `<div class="sidebar-section-label">${s.section}</div>`
        : "";
      return `${sectionHdr}<button type="button" class="sidebar-slide-btn ${i === current ? "active" : ""}" data-slide="${i}">
        <span class="sidebar-num">${i + 1}</span>
        <span class="sidebar-label">${slideLabel(s)}</span>
      </button>`;
    }).join("");
    sidebarList.querySelectorAll(".sidebar-slide-btn").forEach((btn) => {
      btn.addEventListener("click", () => goTo(Number(btn.dataset.slide)));
    });
    const activeBtn = sidebarList.querySelector(".sidebar-slide-btn.active");
    activeBtn?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function updateChrome() {
    const slide = PRESENTATION_SLIDES[current];
    sectionLabel.textContent = slide.section;
    if (titleLabel) titleLabel.textContent = slideLabel(slide);
    if (countBadge) countBadge.textContent = `${current + 1} / ${PRESENTATION_SLIDES.length}`;
    progress.style.width = `${((current + 1) / PRESENTATION_SLIDES.length) * 100}%`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === PRESENTATION_SLIDES.length - 1;
    if (firstBtn) firstBtn.disabled = current === 0;
    if (lastBtn) lastBtn.disabled = current === PRESENTATION_SLIDES.length - 1;
    renderSidebar();
    scaleCanvas();
  }

  function goTo(index) {
    if (index < 0 || index >= PRESENTATION_SLIDES.length) return;
    current = index;
    localStorage.setItem("sdd-presentation-slide", String(current));
    stage.querySelector(".slide")?.classList.add("leaving");
    setTimeout(() => {
      renderSlide(current);
      updateChrome();
    }, 120);
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
  firstBtn?.addEventListener("click", () => goTo(0));
  lastBtn?.addEventListener("click", () => goTo(PRESENTATION_SLIDES.length - 1));

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.querySelector(".modal-overlay-bg").addEventListener("click", closeModal);
  modal.querySelector(".modal-copy").addEventListener("click", async () => {
    if (!modalCmd) return;
    await navigator.clipboard.writeText(modalCmd);
    modal.querySelector(".modal-copy").textContent = "Kopyalandı!";
    setTimeout(() => {
      modal.querySelector(".modal-copy").textContent = "Komutu Kopyala";
    }, 1200);
  });
  modal.querySelector(".modal-prev-cmd").addEventListener("click", () => {
    if (!modalFramework || !modalCmd) return;
    const table = tableFor(modalFramework);
    const idx = table.findIndex((r) => r.cmd === modalCmd);
    if (idx > 0) openCommandModal(modalFramework, table[idx - 1].cmd);
  });
  modal.querySelector(".modal-next-cmd").addEventListener("click", () => {
    if (!modalFramework || !modalCmd) return;
    const table = tableFor(modalFramework);
    const idx = table.findIndex((r) => r.cmd === modalCmd);
    if (idx < table.length - 1) openCommandModal(modalFramework, table[idx + 1].cmd);
  });

  const saved = localStorage.getItem("sdd-presentation-slide");
  if (saved) current = Math.min(Math.max(0, Number(saved)), PRESENTATION_SLIDES.length - 1);

  renderSlide(current);
  updateChrome();
  window.addEventListener("resize", scaleCanvas);

  return {
    openCommandModal,
    handleKey(e) {
      if (document.body.classList.contains("modal-open")) {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") modal.querySelector(".modal-prev-cmd").click();
        if (e.key === "ArrowRight") modal.querySelector(".modal-next-cmd").click();
        return;
      }
      if (e.key === "ArrowRight" && current < PRESENTATION_SLIDES.length - 1) goTo(current + 1);
      if (e.key === "ArrowLeft" && current > 0) goTo(current - 1);
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(PRESENTATION_SLIDES.length - 1);
    },
    goTo,
  };
}

function renderReferenceTables() {
  const bmadTbody = document.querySelector("#refBmadTable tbody");
  if (bmadTbody) {
    bmadTbody.innerHTML = BMAD_COMMANDS_TABLE.map(
      (r) =>
        `<tr class="cmd-row ${r.highlight ? "row-highlight" : ""}" data-cmd="${r.cmd}" data-fw="bmad">
          <td>${r.order}</td><td><code>${r.cmd}</code></td><td>${r.alias}</td><td>${r.stage}</td>
          <td>${r.purpose}</td><td>${r.when}</td><td>${r.output}</td><td>${r.agent}</td></tr>`
    ).join("");
  }
  const opsxTbody = document.querySelector("#refOpsxTable tbody");
  if (opsxTbody) {
    opsxTbody.innerHTML = OPENSPEC_COMMANDS_TABLE.map(
      (r) =>
        `<tr class="cmd-row ${r.highlight ? "row-highlight" : ""}" data-cmd="${r.cmd}" data-fw="openspec">
          <td>${r.order}</td><td><code>${r.cmd}</code></td><td>${r.stage}</td>
          <td>${r.purpose}</td><td>${r.when}</td><td>${r.output}</td><td>${r.actor}</td></tr>`
    ).join("");
  }
}
