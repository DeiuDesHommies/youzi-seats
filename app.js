const personaIds = [
  "chen-xiaoqun",
  "zhangmengzhu",
  "chaogu-yangjia",
  "zuoshou-xinyi"
];

const state = {
  personas: [],
  selectedId: "chen-xiaoqun",
  filteredIds: [],
  compareIds: ["chen-xiaoqun", "zhangmengzhu", "chaogu-yangjia"]
};

async function fetchJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

async function fetchText(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.text();
}

async function loadPersonas() {
  const personas = await Promise.all(
    personaIds.map(async (id) => {
      const [metadata, sources, cases, skill] = await Promise.all([
        fetchJson(`./skills/${id}/metadata.json`),
        fetchJson(`./skills/${id}/evidence/sources.json`),
        fetchJson(`./skills/${id}/cases/cases.json`),
        fetchText(`./skills/${id}/skill.md`)
      ]);
      return { id, metadata, sources, cases, skill };
    })
  );
  state.personas = personas;
}

async function loadIndexes() {
  const [personas, seats, styles, tags] = await Promise.all([
    fetchJson("./indexes/personas.json"),
    fetchJson("./indexes/seats.json"),
    fetchJson("./indexes/styles.json"),
    fetchJson("./indexes/tags.json")
  ]);
  return { personas, seats, styles, tags };
}

function fillSelect(select, label, options, valueGetter) {
  select.innerHTML = "";
  const all = document.createElement("option");
  all.value = "";
  all.textContent = `全部${label}`;
  select.appendChild(all);
  options.forEach((option) => {
    const el = document.createElement("option");
    el.value = valueGetter(option);
    el.textContent = valueGetter(option);
    select.appendChild(el);
  });
}

function renderPersonaList(personas) {
  const container = document.getElementById("persona-list");
  container.innerHTML = "";
  personas.forEach((persona) => {
    const button = document.createElement("button");
    button.className = "persona-button" + (state.selectedId === persona.id ? " active" : "");
    button.type = "button";
    button.innerHTML = `<strong>${persona.metadata.name}</strong><small>${persona.metadata.oneLineSummary}</small>`;
    button.addEventListener("click", () => {
      state.selectedId = persona.id;
      renderPersonaList(state.personas);
      renderPersonaDetail();
    });
    container.appendChild(button);
  });
}

function renderComparePicker() {
  const container = document.getElementById("compare-picker");
  container.innerHTML = "";
  state.personas.forEach((persona) => {
    const wrapper = document.createElement("label");
    wrapper.className = "persona-toggle";
    wrapper.innerHTML = `
      <input type="checkbox" ${state.compareIds.includes(persona.id) ? "checked" : ""} />
      <span>
        <strong>${persona.metadata.name}</strong><br />
        <small class="muted">${persona.metadata.oneLineSummary}</small>
      </span>
    `;
    const checkbox = wrapper.querySelector("input");
    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        if (!state.compareIds.includes(persona.id)) {
          state.compareIds = [...state.compareIds, persona.id].slice(0, 3);
        }
      } else {
        state.compareIds = state.compareIds.filter((id) => id !== persona.id);
      }
      renderComparePicker();
      renderCompareView();
    });
    container.appendChild(wrapper);
  });
}

function renderFilteredResults(ids) {
  const container = document.getElementById("filter-results");
  container.innerHTML = "";
  const personas = ids.length
    ? ids.map((id) => state.personas.find((item) => item.id === id)).filter(Boolean)
    : [];

  if (!personas.length) {
    container.innerHTML = `<p class="muted">当前没有激活筛选结果，或筛选维度未命中。</p>`;
    return;
  }

  personas.forEach((persona) => {
    const button = document.createElement("button");
    button.className = "persona-button";
    button.type = "button";
    button.innerHTML = `<strong>${persona.metadata.name}</strong><small>${persona.metadata.oneLineSummary}</small>`;
    button.addEventListener("click", () => {
      state.selectedId = persona.id;
      renderPersonaList(state.personas);
      renderPersonaDetail();
      renderCompareView();
    });
    container.appendChild(button);
  });
}

function renderList(items) {
  return `<ul class="bullet-list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderRichSkill(markdown) {
  const lines = markdown.split("\n");
  let html = "";
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      closeList();
      continue;
    }

    if (line.startsWith("# ")) {
      closeList();
      html += `<h3>${escapeInline(line.slice(2))}</h3>`;
      continue;
    }
    if (line.startsWith("## ")) {
      closeList();
      html += `<h4>${escapeInline(line.slice(3))}</h4>`;
      continue;
    }
    if (line.startsWith("### ")) {
      closeList();
      html += `<h4>${escapeInline(line.slice(4))}</h4>`;
      continue;
    }
    if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${escapeInline(line.slice(2))}</li>`;
      continue;
    }

    closeList();
    html += `<p>${escapeInline(line)}</p>`;
  }

  closeList();
  return html;
}

function renderSources(sources) {
  return sources
    .map(
      (source) => `
        <div class="source-card">
          <h3>${source.title}</h3>
          <div class="source-meta">
            <span>${source.tier}</span>
            <span>${source.freshness}</span>
            <span>${source.verifiability}</span>
            <span>${source.contradictionStatus}</span>
          </div>
          <p class="muted">${source.note}</p>
          <a href="${source.url}" target="_blank" rel="noreferrer">查看来源</a>
        </div>
      `
    )
    .join("");
}

function renderCases(cases) {
  return cases
    .map(
      (entry) => `
        <div class="case-card">
          <h3>${entry.stock}</h3>
          <p class="muted">${entry.date}</p>
          <p>${entry.summary}</p>
          <p><strong>为什么重要：</strong>${entry.whyItMatters}</p>
        </div>
      `
    )
    .join("");
}

function renderPersonaDetail() {
  const persona = state.personas.find((item) => item.id === state.selectedId) ?? state.personas[0];
  if (!persona) return;
  const meta = persona.metadata;
  const sourceCount = persona.sources.length;
  const caseCount = persona.cases.length;

  const skillFull = persona.skill;

  const provenanceForClaim = (index) => {
    const mapping = meta.claimProvenance?.[index] ?? [];
    const matched = mapping.map((sourceIndex) => persona.sources[sourceIndex]).filter(Boolean);
    if (!matched.length) {
      return `<p class="muted">暂无 claim 级 provenance 绑定。</p>`;
    }
    return matched
      .map(
        (source) => `<div class="source-meta"><span>${source.tier}</span><span>${source.freshness}</span><span>${source.verifiability}</span><span>${source.contradictionStatus}</span></div><a href="${source.url}" target="_blank" rel="noreferrer">${source.title}</a>`
      )
      .join("");
  };

  document.getElementById("persona-detail").innerHTML = `
    <div class="panel hero-card">
      <div>
        <p class="eyebrow">${meta.launch ? "首发 persona" : "Dry Run persona"}</p>
        <h2>${meta.name}</h2>
        <p class="subtitle">${meta.oneLineSummary}</p>
      </div>
      <div class="chip-row">
        <span class="chip confidence ${meta.overallConfidence}">整体置信度：${meta.overallConfidence}</span>
        ${meta.styleTags.map((tag) => `<span class="chip">${tag}</span>`).join("")}
      </div>
      <div class="metric-grid">
        <div class="subpanel">
          <h3 class="section-title">Persona 定位</h3>
          <p>${meta.positioning}</p>
        </div>
        <div class="subpanel">
          <h3 class="section-title">结构概览</h3>
          <p>关联席位：${meta.associatedSeats.length} 个</p>
          <p>来源条目：${sourceCount} 条</p>
          <p>代表案例：${caseCount} 个</p>
        </div>
      </div>
    </div>

    <div class="detail-grid">
      <div class="panel">
        <h2>适用 / 不适用</h2>
        <h3 class="section-title">适用场景</h3>
        ${renderList(meta.preferredSetups)}
        <h3 class="section-title">不确定性说明</h3>
        ${renderList(meta.uncertaintyNotes)}
      </div>

      <div class="panel">
        <h2>风险与责任</h2>
        <h3 class="section-title">风险轨道</h3>
        <p>${meta.riskRail}</p>
        <h3 class="section-title">责任说明</h3>
        <p>${meta.responsibility}</p>
        <h3 class="section-title">误用警示</h3>
        ${renderList(meta.misuseWarnings)}
      </div>
    </div>

    <div class="panel claim-grid">
      <h2>Dual-Lens 结论</h2>
      ${meta.corePatterns
        .map(
          (pattern, index) => `
          <div class="claim-card">
            <h3>结论 ${index + 1}</h3>
            <div class="claim-columns">
              <div class="claim-box positive">
                <strong>价值侧</strong>
                <p>${pattern}</p>
              </div>
              <div class="claim-box warning">
                <strong>失败 / 误用侧</strong>
                <p>${meta.failureModes[index] ?? meta.failureModes[0] ?? "需要结合场景与后续证据谨慎理解。"}</p>
              </div>
            </div>
            <div class="subpanel">
              <h4 class="section-title">Claim 级 Provenance</h4>
              ${provenanceForClaim(index)}
            </div>
          </div>`
        )
        .join("")}
    </div>

    <div class="panel">
      <h2>公开来源与 Provenance</h2>
      ${renderSources(persona.sources)}
    </div>

    <div class="panel">
      <h2>代表案例</h2>
      ${renderCases(persona.cases)}
    </div>

    <div class="panel">
      <h2>Skill 原文</h2>
      <div class="rich-skill">${renderRichSkill(skillFull)}</div>
    </div>

    <div class="panel">
      <h2>持续扩展工作流</h2>
      <pre class="workflow">skills/&lt;persona-id&gt;/
  skill.md
  metadata.json
  evidence/sources.json
  cases/cases.json

新增 persona 时：
1. 新建一个 persona unit
2. 补 supporting materials
3. 更新 indexes/*.json
4. 页面自动接入同一套结构</pre>
    </div>
  `;
}

function renderCompareView() {
  const compareRoot = document.getElementById("compare-view");
  const compareSourceIds = state.filteredIds.length ? state.filteredIds.slice(0, 3) : state.compareIds;
  const comparePersonas = compareSourceIds
    .map((id) => state.personas.find((item) => item.id === id))
    .filter(Boolean);

  compareRoot.innerHTML = `
    <div class="panel">
      <h2>Persona Compare View</h2>
      <div class="compare-grid">
        ${comparePersonas
          .map(
            (persona) => `
            <div class="compare-card">
              <h3>${persona.metadata.name}</h3>
              <p class="muted">${persona.metadata.oneLineSummary}</p>
              <p><strong>整体置信度：</strong>${persona.metadata.overallConfidence}</p>
              <p><strong>定位：</strong>${persona.metadata.positioning}</p>
              <p><strong>代表风格：</strong>${persona.metadata.styleTags.join(" / ")}</p>
              <p><strong>主要失效：</strong>${(persona.metadata.failureModes || []).join("；")}</p>
            </div>`
          )
          .join("")}
      </div>
    </div>
  `;
}

function idsFromIndexEntry(entry) {
  if (!entry) return [];
  return entry.personas ?? [];
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeInline(value) {
  return escapeHtml(value)
    .replaceAll("**", "")
    .replaceAll("`", "");
}

function wireFilters(indexes) {
  const personaSelect = document.getElementById("persona-select");
  const seatSelect = document.getElementById("seat-select");
  const styleSelect = document.getElementById("style-select");
  const tagSelect = document.getElementById("tag-select");

  fillSelect(personaSelect, "人物", indexes.personas, (item) => item.name);
  fillSelect(seatSelect, "席位", indexes.seats, (item) => item.seat);
  fillSelect(styleSelect, "风格", indexes.styles, (item) => item.style);
  fillSelect(tagSelect, "标签", indexes.tags, (item) => item.tag);

  tagSelect.addEventListener("change", (event) => {
    const tag = indexes.tags.find((item) => item.tag === event.target.value);
    state.filteredIds = idsFromIndexEntry(tag);
    if (state.filteredIds[0]) state.selectedId = state.filteredIds[0];
    renderPersonaList(state.personas);
    renderFilteredResults(state.filteredIds);
    renderPersonaDetail();
    renderCompareView();
  });

  seatSelect.addEventListener("change", (event) => {
    const seat = indexes.seats.find((item) => item.seat === event.target.value);
    state.filteredIds = idsFromIndexEntry(seat);
    if (state.filteredIds[0]) state.selectedId = state.filteredIds[0];
    renderPersonaList(state.personas);
    renderFilteredResults(state.filteredIds);
    renderPersonaDetail();
    renderCompareView();
  });

  styleSelect.addEventListener("change", (event) => {
    const style = indexes.styles.find((item) => item.style === event.target.value);
    state.filteredIds = idsFromIndexEntry(style);
    if (state.filteredIds[0]) state.selectedId = state.filteredIds[0];
    renderPersonaList(state.personas);
    renderFilteredResults(state.filteredIds);
    renderPersonaDetail();
    renderCompareView();
  });

  personaSelect.addEventListener("change", (event) => {
    const selectedName = event.target.value;
    const persona = state.personas.find((item) => item.metadata.name === selectedName);
    if (persona) {
      state.selectedId = persona.id;
      state.filteredIds = [persona.id];
    } else {
      state.filteredIds = [];
    }
    renderPersonaList(state.personas);
    renderFilteredResults(state.filteredIds);
    renderPersonaDetail();
    renderCompareView();
  });
}

async function main() {
  try {
    const indexes = await loadIndexes();
    await loadPersonas();
    wireFilters(indexes);
    renderPersonaList(state.personas);
    renderComparePicker();
    renderFilteredResults(state.filteredIds);
    renderPersonaDetail();
    renderCompareView();
  } catch (error) {
    document.getElementById("persona-detail").innerHTML = `<div class="panel"><h2>加载失败</h2><p>${error.message}</p></div>`;
  }
}

main();
