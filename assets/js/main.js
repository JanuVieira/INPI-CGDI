  // Prioritize pt-br as first child under inpi
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

  // Left menu sidebar (Analises / Planilhas)
  const menuLinks = Array.from(document.querySelectorAll(".menu-link[data-panel]"));
  const menuSidebar = document.getElementById("menu-sidebar");
  const menuBackdrop = document.getElementById("menu-backdrop");
  const menuSidebarTitle = document.getElementById("menu-sidebar-title");
  const menuSidebarClose = document.getElementById("menu-sidebar-close");

  function openMenu(panelKey) {
    const panelTitles = {
      sobre: "Sobre",
      analises: "Análises",
      planilhas: "Planilhas",
      "relatorios-mensais": "Relatórios mensais"
    };
    menuSidebarTitle.textContent = panelTitles[panelKey] || "Menu";
    menuSidebar.classList.add("open");
    menuBackdrop.classList.add("open");
    menuSidebar.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    menuSidebar.classList.remove("open");
    menuBackdrop.classList.remove("open");
    menuSidebar.setAttribute("aria-hidden", "true");
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openMenu(link.dataset.panel);
    });
  });
  menuSidebarClose.addEventListener("click", closeMenu);
  menuBackdrop.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Expand / collapse
  const allDetails = Array.from(document.querySelectorAll("details"));
  document.getElementById("expand").addEventListener("click", () => allDetails.forEach((d) => { d.open = true; }));
  document.getElementById("collapse").addEventListener("click", () => allDetails.forEach((d) => { d.open = false; }));

  // CGDI marking (persist in localStorage)
  const KEY = "cgdi_marked_ids_v1";
  const TAGS_KEY = "node_free_tags_v1";
  const cgdiSwitch = document.getElementById("cgdi");
  const searchInput = document.getElementById("search");
  const searchMode = document.getElementById("search-mode");
  const allNodes = Array.from(document.querySelectorAll("li.node"));
  let cgdiMode = cgdiSwitch.checked;

  function loadSet() {
    try {
      const raw = localStorage.getItem(KEY);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (e) { return new Set(); }
  }
  function saveSet(set) {
    localStorage.setItem(KEY, JSON.stringify(Array.from(set)));
  }
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

  const marked = loadSet();
  const nodeTags = loadTags();
  const searchIndex = allNodes.map((li) => {
    const name = (li.querySelector(".name")?.textContent || "").toLowerCase();
    const link = (li.querySelector("a.go")?.getAttribute("href") || "").toLowerCase();
    return { li, text: `${name} ${link}` };
  });

  function getNodeSearchText(item) {
    const id = item.li.dataset.id;
    const tags = Array.isArray(nodeTags[id]) ? nodeTags[id].join(" ").toLowerCase() : "";
    return `${item.text} ${tags}`;
  }
  function getNodeTagsText(item) {
    const id = item.li.dataset.id;
    return Array.isArray(nodeTags[id]) ? nodeTags[id].join(" ").toLowerCase() : "";
  }

  function getRowForNode(li) {
    return li.querySelector(":scope > details > summary > .row") || li.querySelector(":scope > .row");
  }

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

  function initNodeTags() {
    allNodes.forEach((li) => {
      const row = getRowForNode(li);
      if (!row || row.querySelector(".node-tags")) return;
      const linkEl = row.querySelector(".go, .nolink");
      if (!linkEl) return;

      const holder = document.createElement("span");
      holder.className = "node-tags";
      holder.innerHTML = '<span class="node-tag-list"></span><input class="node-tag-input" type="text" placeholder="+tag" />';
      linkEl.insertAdjacentElement("afterend", holder);
      renderNodeTags(li);
    });
  }

  initNodeTags();

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
        else li.querySelector(".row")?.appendChild(badge);
      }
    } else if (badge) {
      badge.remove();
    }
  }

  function applyMarked() {
    allNodes.forEach((li) => {
      applyMarkedToNode(li, marked.has(li.dataset.id));
    });
  }
  applyMarked();

  cgdiSwitch.addEventListener("change", () => {
    cgdiMode = cgdiSwitch.checked;
  });

  // Click on name toggles CGDI when in mode
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

  // Search (optimized): debounce + cached index + minimum chars
  let searchTimer = null;
  let lastKept = [];

  function clearSearchState() {
    lastKept.forEach((li) => li.classList.remove("highlight", "search-keep"));
    lastKept = [];
    document.body.classList.remove("search-active");
  }

  function runSearch(rawQuery) {
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

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value || "";
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => runSearch(value), 250);
  });
  searchMode.addEventListener("change", () => {
    window.clearTimeout(searchTimer);
    runSearch(searchInput.value || "");
  });