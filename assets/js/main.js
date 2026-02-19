  // Prioriza "pt-br" como primeiro filho da raiz "inpi"
  (function prioritizePtBr() {
    const inpiNode = document.querySelector("ul.root > li.node");
    const firstLevel = inpiNode?.querySelector(":scope > details > ul");
    if (!firstLevel) return;

    const ptBrNode = Array.from(firstLevel.children).find((li) => {
      const name = li.querySelector(":scope > details > summary .name")?.textContent?.trim().toLowerCase();
      return name === "pt-br";
    });

    if (ptBrNode) firstLevel.prepend(ptBrNode);
  })();

  // Menu do cabecalho com barra lateral deslizante
  const menuLinks = Array.from(document.querySelectorAll(".header-nav-link[data-panel]"));
  const menuSidebar = document.getElementById("menu-sidebar");
  const menuBackdrop = document.getElementById("menu-backdrop");
  const menuSidebarTitle = document.getElementById("menu-sidebar-title");
  const menuSidebarBody = document.getElementById("menu-sidebar-body");
  const menuSidebarClose = document.getElementById("menu-sidebar-close");

  const panelContent = {
    sobre: {
      title: "Sobre",
      html: `
        <article class="about-content">
          <p class="about-label">Projeto</p>
          <h3 class="about-project-title">Design de servicos aplicado ao conteudo digital de disseminacao de propriedade intelectual</h3>
          <p>O projeto tem como objetivo investigar e desenvolver estrategias de comunicacao para aprimorar a divulgacao das acoes da CGDI para os publicos interno e externo do INPI. A iniciativa responde a necessidade de modernizar os canais digitais, reduzindo gargalos de usabilidade e de arquitetura da informacao.</p>
          <p>Os resultados esperados incluem maior reconhecimento do valor institucional, melhor desempenho na experiencia do usuario e ampliacao do alcance das acoes de disseminacao. Como entregaveis obrigatorios, o projeto preve um Relatorio de Diagnostico da Comunicacao Institucional, um Plano Estrategico de Comunicacao Digital e o Prototipo da nova Pagina Eletronica da CGDI.</p>
          <section class="about-meta" aria-label="Responsaveis">
            <p class="about-meta-item"><span class="about-meta-label">Bolsista</span><span class="about-meta-value">Edital no 04/2025 · Rogerio J. Vieira Jr.</span></p>
            <p class="about-meta-item"><span class="about-meta-label">Responsavel Tecnico</span><span class="about-meta-value">Maria Eugenia Fortes Ramos da Silva Goncalves Gallotti</span></p>
            <p class="about-meta-item"><span class="about-meta-label">Responsavel Academico</span><span class="about-meta-value">Celso Luiz Salgueiro Lage</span></p>
          </section>
        </article>
      `
    },
    planilhas: {
      title: "Planilhas",
      paragraphs: [
        "Aqui voce pode centralizar links de planilhas, status de preenchimento e orientacoes de uso.",
        "Recomendacao: separar por ciclo mensal para facilitar a manutencao e o historico."
      ]
    },
    analise: {
      title: "Analise",
      paragraphs: [
        "Este espaco pode reunir indicadores de volume, cobertura e qualidade da arvore de conteudo.",
        "Inclua insights de performance e prioridades para a proxima iteracao."
      ]
    },
    "agendar-reuniao": {
      title: "Agendar reuniao",
      paragraphs: [
        "Use este painel para orientar o agendamento com a equipe responsavel.",
        "Sugestao: incluir calendario, pauta e canal de contato oficial."
      ]
    }
  };

  function setMenuActive(panelKey) {
    menuLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.panel === panelKey);
    });
  }

  function openSidebar(panelKey) {
    if (!menuSidebar || !menuBackdrop || !menuSidebarTitle || !menuSidebarBody) return;
    const panel = panelContent[panelKey] || { title: "Menu", paragraphs: ["Conteudo em construcao."] };
    menuSidebarTitle.textContent = panel.title;
    menuSidebarBody.innerHTML = panel.html || panel.paragraphs.map((text) => `<p>${text}</p>`).join("");
    menuSidebar.classList.add("open");
    menuBackdrop.classList.add("open");
    menuSidebar.setAttribute("aria-hidden", "false");
    menuBackdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    setMenuActive(panelKey);
  }

  function closeSidebar() {
    if (!menuSidebar || !menuBackdrop) return;
    menuSidebar.classList.remove("open");
    menuBackdrop.classList.remove("open");
    menuSidebar.setAttribute("aria-hidden", "true");
    menuBackdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    setMenuActive("");
  }

  if (menuLinks.length > 0) {
    menuLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        openSidebar(link.dataset.panel);
      });
    });
  }

  if (menuSidebarClose) {
    menuSidebarClose.addEventListener("click", closeSidebar);
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener("click", closeSidebar);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSidebar();
  });

  // Acoes globais para expandir/recolher toda a arvore
  const allDetails = Array.from(document.querySelectorAll("details"));
  const expandButton = document.getElementById("expand");
  const collapseButton = document.getElementById("collapse");
  if (expandButton) {
    expandButton.addEventListener("click", () => allDetails.forEach((d) => { d.open = true; }));
  }
  if (collapseButton) {
    collapseButton.addEventListener("click", () => allDetails.forEach((d) => { d.open = false; }));
  }

  // Marcacao CGDI e tags (persistidas no localStorage)
  const KEY = "cgdi_marked_ids_v1";
  const TAGS_KEY = "node_free_tags_v1";
  const cgdiSwitch = document.getElementById("cgdi");
  const searchInput = document.getElementById("search");
  const searchMode = document.getElementById("search-mode");
  const allNodes = Array.from(document.querySelectorAll("li.node"));
  let cgdiMode = Boolean(cgdiSwitch?.checked);

  // Carrega e salva os ids marcados como CGDI
  function loadSet() {
    try {
      const raw = localStorage.getItem(KEY);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (e) { return new Set(); }
  }
  function saveSet(set) {
    localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
  }

  // Carrega e salva as tags livres por no
  function loadTags() {
    try {
      const raw = localStorage.getItem(TAGS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) { return {}; }
  }
  function saveTags(map) {
    localStorage.setItem(TAGS_KEY, JSON.stringify(map));
  }

  // Prepara cache de busca para reduzir custo em cada digitacao
  const marked = loadSet();
  const nodeTags = loadTags();
  const searchIndex = allNodes.map((li) => {
    const name = (li.querySelector(".name")?.textContent || "").toLowerCase();
    const link = (li.querySelector("a.go")?.getAttribute("href") || "").toLowerCase();
    return { li, text: `${name} ${link}` };
  });

  // Texto usado na busca de conteudo (nome + link + tags)
  function getNodeSearchText(item) {
    const id = item.li.dataset.id;
    const tags = Array.isArray(nodeTags[id]) ? nodeTags[id].join(" ").toLowerCase() : "";
    return `${item.text} ${tags}`;
  }
  // Texto usado na busca apenas por tags
  function getNodeTagsText(item) {
    const id = item.li.dataset.id;
    return Array.isArray(nodeTags[id]) ? nodeTags[id].join(" ").toLowerCase() : "";
  }

  // Recupera a linha visual principal de um no
  function getRowForNode(li) {
    return li.querySelector(":scope > details > summary > .row") || li.querySelector(":scope > .row");
  }

  // Garante um container para elementos alinhados a direita
  function ensureRowRight(row) {
    let rowRight = row.querySelector(":scope > .row-right");
    if (!rowRight) {
      rowRight = document.createElement("span");
      rowRight.className = "row-right";
      row.appendChild(rowRight);
    }
    return rowRight;
  }

  // Organiza a linha: link ao lado do nome e chips/tags na direita
  function normalizeRowLayout(li) {
    const row = getRowForNode(li);
    if (!row) return;

    const nameEl = row.querySelector(":scope > .name");
    const linkEl = row.querySelector(":scope > .go, :scope > .nolink");
    if (nameEl && linkEl && nameEl.nextElementSibling !== linkEl) {
      nameEl.insertAdjacentElement("afterend", linkEl);
    }

    const rowRight = ensureRowRight(row);
    const meta = row.querySelector(":scope > .meta");
    const tags = row.querySelector(":scope > .node-tags");
    const badge = row.querySelector(":scope > .cgdi-badge");

    if (meta) rowRight.appendChild(meta);
    if (tags) rowRight.appendChild(tags);
    if (badge) rowRight.appendChild(badge);

    if (!rowRight.children.length) {
      rowRight.remove();
    }
  }

  allNodes.forEach((li) => normalizeRowLayout(li));

  // Renderiza as tags exibidas no no
  function renderNodeTags(li) {
    const id = li.dataset.id;
    const holder = li.querySelector(".node-tags");
    const list = holder?.querySelector(".node-tag-list");
    if (!id || !list) return;
    const tags = Array.isArray(nodeTags[id]) ? nodeTags[id] : [];
    list.innerHTML = tags.map((tag, idx) =>
      `<span class="node-tag">${tag}<button class="node-tag-remove" data-tag-remove="${idx}" aria-label="Remover tag">x</button></span>`
    ).join("");
  }

  // Injeta controles de tags em todos os nos com link
  function initNodeTags() {
    allNodes.forEach((li) => {
      const row = getRowForNode(li);
      if (!row || row.querySelector(".node-tags")) return;
      const linkEl = row.querySelector(".go, .nolink");
      if (!linkEl) return;

      const holder = document.createElement("span");
      holder.className = "node-tags";
      holder.innerHTML = '<span class="node-tag-list"></span><input class="node-tag-input" type="text" placeholder="+tag" />';
      ensureRowRight(row).appendChild(holder);
      normalizeRowLayout(li);
      renderNodeTags(li);
    });
  }

  initNodeTags();

  // Adiciona tag com Enter ou virgula
  document.addEventListener("keydown", (e) => {
    const input = e.target.closest(".node-tag-input");
    if (!input) return;
    if (e.key !== "Enter" && e.key !== ",") return;
    e.preventDefault();

    const li = input.closest("li.node");
    const id = li?.dataset.id;
    const tag = (input.value || "").trim().replace(/,$/, "");
    if (!id || !tag) return;

    if (!Array.isArray(nodeTags[id])) nodeTags[id] = [];
    nodeTags[id].push(tag);
    saveTags(nodeTags);
    input.value = "";
    renderNodeTags(li);
  });

  // Remove uma tag ao clicar no botao "x"
  document.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".node-tag-remove");
    if (!removeBtn) return;
    const li = removeBtn.closest("li.node");
    const id = li?.dataset.id;
    const idx = Number(removeBtn.dataset.tagRemove);
    if (!id || Number.isNaN(idx) || !Array.isArray(nodeTags[id])) return;
    nodeTags[id].splice(idx, 1);
    if (nodeTags[id].length === 0) delete nodeTags[id];
    saveTags(nodeTags);
    renderNodeTags(li);
  });

  // Atualiza classe/etiqueta visual de um no marcado como CGDI
  function applyMarkedToNode(li, isMarked) {
    li.classList.toggle("cgdi", isMarked);
    let badge = li.querySelector(".cgdi-badge");
    if (isMarked) {
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "cgdi-badge";
        badge.textContent = "CGDI";
        const meta = li.querySelector(".meta");
        if (meta) meta.insertAdjacentElement("afterend", badge);
        else {
          const row = getRowForNode(li);
          if (row) ensureRowRight(row).appendChild(badge);
        }
      }
    } else if (badge) {
      badge.remove();
    }
    normalizeRowLayout(li);
  }

  // Aplica marcacoes persistidas em todos os nos
  function applyMarked() {
    allNodes.forEach((li) => {
      applyMarkedToNode(li, marked.has(li.dataset.id));
    });
  }
  applyMarked();

  if (cgdiSwitch) {
    cgdiSwitch.addEventListener("change", () => {
      cgdiMode = cgdiSwitch.checked;
    });
  }

  // Em modo CGDI, clicar no nome alterna marcacao do no
  document.addEventListener("click", (e) => {
    const nameEl = e.target.closest(".name");
    if (!nameEl) return;
    const li = nameEl.closest("li.node");
    if (!li) return;

    if (cgdiMode) {
      e.preventDefault();
      e.stopPropagation();
      const id = li.dataset.id;
      if (marked.has(id)) marked.delete(id); else marked.add(id);
      saveSet(marked);
      applyMarkedToNode(li, marked.has(id));
    }
  }, true);

  // Busca otimizada: debounce + indice em cache + minimo de caracteres
  let searchTimer = null;
  let lastKept = [];

  // Limpa destaque e estado visual da busca anterior
  function clearSearchState() {
    lastKept.forEach((li) => li.classList.remove("highlight", "search-keep"));
    lastKept = [];
    document.body.classList.remove("search-active");
  }

  // Executa busca por conteudo ou por tags, mantendo ancestrais visiveis
  function runSearch(rawQuery) {
    if (!searchMode) return;
    const q = (rawQuery || "").trim().toLowerCase();
    clearSearchState();
    if (q.length < 2) return;

    const keep = new Set();
    for (const item of searchIndex) {
      const haystack = searchMode.value === "tags" ? getNodeTagsText(item) : getNodeSearchText(item);
      if (!haystack.includes(q)) continue;

      let cur = item.li;
      while (cur) {
        if (cur.matches && cur.matches("li.node") && !keep.has(cur)) {
          keep.add(cur);
          cur.classList.add("search-keep");
          lastKept.push(cur);
        }
        if (cur.tagName === "DETAILS") cur.open = true;
        cur = cur.parentElement;
      }
      item.li.classList.add("highlight");
    }

    document.body.classList.add("search-active");
  }

  // Recalcula busca em digitacao e troca de modo
  if (searchInput && searchMode) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value || "";
      window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => runSearch(value), 250);
    });
    searchMode.addEventListener("change", () => {
      window.clearTimeout(searchTimer);
      runSearch(searchInput.value || "");
    });
  }
