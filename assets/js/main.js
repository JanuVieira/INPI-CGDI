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

  // Deixa o primeiro no da arvore aberto por padrao
  (function expandFirstNodeByDefault() {
    const firstNodeDetails = document.querySelector("ul.root > li.node > details");
    if (!firstNodeDetails) return;
    firstNodeDetails.setAttribute("open", "");
    firstNodeDetails.open = true;
  })();

  // Menu do cabecalho com barra lateral deslizante
  const menuLinks = Array.from(document.querySelectorAll(".header-nav-link[data-panel]"));
  const menuSidebar = document.getElementById("menu-sidebar");
  const menuBackdrop = document.getElementById("menu-backdrop");
  const menuSidebarTitle = document.getElementById("menu-sidebar-title");
  const menuSidebarBody = document.getElementById("menu-sidebar-body");
  const menuSidebarClose = document.getElementById("menu-sidebar-close");
  const menuSidebarFooterClose = document.getElementById("menu-sidebar-footer-close");

  function renderAnalysisDashboard() {
    return `
      <section class="analysis-dashboard analysis-dashboard-master" aria-label="Dashboard de analise">
        <section class="analysis-theme analysis-theme-volume" aria-label="Sessao volume e composicao">
          <div class="analysis-theme-head">
            <h3 class="analysis-theme-title">1. Volume e composicao</h3>
          </div>
          <div class="links-panel links-panel-structured analysis-highlights-panel">
            <div class="analysis-highlights-grid">
              <article class="links-card sheet-link-card analysis-highlight-card analysis-highlight-card-prominent">
                <span class="sheet-file-icon analysis-highlight-icon" aria-hidden="true"><span>URL</span></span>
                <span class="sheet-content">
                  <span class="sheet-title-group"><span class="links-card-title">Total de URLs</span></span>
                  <span class="analysis-highlight-value">15.608</span>
                  <span class="links-card-description">(todas unicas)</span>
                </span>
              </article>
            </div>
          </div>
          <article class="analysis-card analysis-panel-card">
            <div class="analysis-panel-head">
              <p class="analysis-panel-title">Distribuicao principal</p>
            </div>
            <div class="analysis-hbars">
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>Paginas</span><span>9.850 (63,1%)</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 63.1;"></span></span>
              </div>
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>Arquivos</span><span>5.758 (36,9%)</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 36.9;"></span></span>
              </div>
            </div>
          </article>
        </section>

        <section class="analysis-theme" aria-label="Sessao formatos de arquivo">
          <div class="analysis-theme-head">
            <h3 class="analysis-theme-title">2. Formatos de arquivo</h3>
          </div>
          <article class="analysis-card analysis-panel-card">
            <div class="analysis-panel-head">
              <p class="analysis-panel-title">PDF, XLS, DOCX, XLSX e CSV</p>
            </div>
            <div class="analysis-hbars">
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>PDF</span><span>5.516</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 95.8;"></span></span>
              </div>
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>XLS</span><span>137</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 2.4;"></span></span>
              </div>
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>DOCX</span><span>52</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 0.9;"></span></span>
              </div>
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>XLSX</span><span>45</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 0.78;"></span></span>
              </div>
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>CSV</span><span>6</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 0.1;"></span></span>
              </div>
            </div>
          </article>
        </section>

        <section class="analysis-theme" aria-label="Sessao idiomas">
          <div class="analysis-theme-head">
            <h3 class="analysis-theme-title">3. Idiomas</h3>
          </div>
          <article class="analysis-card analysis-panel-card">
            <div class="analysis-hbars">
                <div class="analysis-hbar-row">
                  <p class="analysis-hbar-label analysis-hbar-label-split"><span>PT</span><span>14.123 (90,5%)</span></p>
                  <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 90.5;"></span></span>
                </div>
                <div class="analysis-hbar-row">
                  <p class="analysis-hbar-label analysis-hbar-label-split"><span>ES</span><span>744 (4,8%)</span></p>
                  <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 4.8;"></span></span>
                </div>
                <div class="analysis-hbar-row">
                  <p class="analysis-hbar-label analysis-hbar-label-split"><span>EN</span><span>741 (4,7%)</span></p>
                  <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 4.7;"></span></span>
                </div>
            </div>
          </article>
        </section>

        <section class="analysis-theme" aria-label="Sessao arquitetura e profundidade">
          <div class="analysis-theme-head">
            <h3 class="analysis-theme-title">4. Arquitetura e profundidade</h3>
          </div>
          <div class="analysis-panel-grid">
            <article class="analysis-card analysis-panel-card">
              <div class="analysis-panel-head">
                <p class="analysis-panel-title">Indicadores de profundidade</p>
              </div>
              <div class="analysis-kpi-table">
                <article class="analysis-kpi-row">
                  <p class="analysis-kpi-row-top"><span class="analysis-kpi-row-label">Profundidade maxima</span></p>
                  <p class="analysis-kpi-row-value">11 niveis</p>
                </article>
                <article class="analysis-kpi-row">
                  <p class="analysis-kpi-row-top"><span class="analysis-kpi-row-label">Profundidade media</span></p>
                  <p class="analysis-kpi-row-value">6,69 niveis</p>
                </article>
              </div>
            </article>

            <article class="analysis-card analysis-panel-card">
              <div class="analysis-panel-head">
                <p class="analysis-panel-title">Camadas de acesso</p>
              </div>
              <section class="analysis-panel-chart" aria-label="Acessibilidade por profundidade">
                <div class="analysis-hbars">
                  <div class="analysis-hbar-row">
                    <p class="analysis-hbar-label analysis-hbar-label-split"><span>URLs em nivel &lt;= 4</span><span>344 (2,2%)</span></p>
                    <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 2.2;"></span></span>
                  </div>
                  <div class="analysis-hbar-row">
                    <p class="analysis-hbar-label analysis-hbar-label-split"><span>URLs em nivel &gt;= 7</span><span>8.880 (56,89%)</span></p>
                    <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 56.89;"></span></span>
                  </div>
                </div>
              </section>
              <p class="analysis-note-text">Apenas 344 URLs em nivel &lt;= 4 (paginas rasas). Apenas 2,2% do site e acessivel em poucos cliques.</p>
            </article>
          </div>
        </section>

        <section class="analysis-theme" aria-label="Sessao tipo estrutural">
          <div class="analysis-theme-head">
            <h3 class="analysis-theme-title">5. Tipo estrutural</h3>
          </div>
          <div class="analysis-type-grid">
            <article class="analysis-card analysis-panel-card analysis-type-card">
              <div class="analysis-panel-head">
                <p class="analysis-panel-title">Folha</p>
              </div>
              <p class="analysis-type-value-line">
                <span class="analysis-highlight-value">6.588</span>
                <span class="analysis-type-share">(42,2%)</span>
              </p>
              <span class="analysis-type-track" aria-hidden="true"><span class="analysis-type-fill" style="--value: 42.2;"></span></span>
            </article>

            <article class="analysis-card analysis-panel-card analysis-type-card">
              <div class="analysis-panel-head">
                <p class="analysis-panel-title">Intermediaria</p>
              </div>
              <p class="analysis-type-value-line">
                <span class="analysis-highlight-value">3.147</span>
                <span class="analysis-type-share">(20,2%)</span>
              </p>
              <span class="analysis-type-track" aria-hidden="true"><span class="analysis-type-fill" style="--value: 20.2;"></span></span>
            </article>

            <article class="analysis-card analysis-panel-card analysis-type-card">
              <div class="analysis-panel-head">
                <p class="analysis-panel-title">Hub</p>
              </div>
              <p class="analysis-type-value-line">
                <span class="analysis-highlight-value">115</span>
                <span class="analysis-type-share">(0,7%)</span>
              </p>
              <span class="analysis-type-track" aria-hidden="true"><span class="analysis-type-fill" style="--value: 0.7;"></span></span>
            </article>

          </div>
          <article class="analysis-card analysis-panel-card analysis-type-insights">
            <div class="analysis-type-insight-item">
              <p class="analysis-note-title">Folha</p>
              <p class="analysis-note-text">Maior grupo estrutural do site. Representa paginas finais (destino do usuario). Indica forte foco em conteudo conclusivo.</p>
            </div>
            <div class="analysis-type-insight-item">
              <p class="analysis-note-title">Intermediaria</p>
              <p class="analysis-note-text">Camada de organizacao e navegacao. Atua como ponte entre hubs e folhas. Representa cerca de 1/5 da estrutura.</p>
            </div>
            <div class="analysis-type-insight-item">
              <p class="analysis-note-title">Hub</p>
              <p class="analysis-note-text">Volume muito baixo. Pouca centralizacao tematica. Indica baixa concentracao estrategica de autoridade.</p>
            </div>
          </article>
        </section>

        <section class="analysis-theme" aria-label="Sessao ranking secoes">
          <div class="analysis-theme-head">
            <h3 class="analysis-theme-title">6. Ranking das maiores secoes</h3>
          </div>
          <article class="analysis-card analysis-panel-card">
            <div class="analysis-hbars">
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>central-de-conteudo</span><span>4.892 URLs</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 100;"></span></span>
              </div>
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>servicos</span><span>4.775 URLs</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 97.6;"></span></span>
              </div>
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>projetos-estrategicos</span><span>910 URLs</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 18.6;"></span></span>
              </div>
              <div class="analysis-hbar-row">
                <p class="analysis-hbar-label analysis-hbar-label-split"><span>governanca</span><span>887 URLs</span></p>
                <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 18.1;"></span></span>
              </div>
            </div>
          </article>
        </section>

        <section class="analysis-theme" aria-label="Sessao SEO e imagens">
          <div class="analysis-theme-head">
            <h3 class="analysis-theme-title">7. SEO e qualidade de conteudo</h3>
          </div>
          <div class="analysis-panel-grid">
            <article class="analysis-card analysis-panel-card">
              <div class="analysis-panel-head">
                <p class="analysis-panel-title">SEO tecnico</p>
              </div>
              <div class="analysis-hbars">
                <div class="analysis-hbar-row">
                  <p class="analysis-hbar-label analysis-hbar-label-split"><span>Paginas com &lt;title&gt; preenchido</span><span>34,87%</span></p>
                  <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 34.87;"></span></span>
                </div>
                <div class="analysis-hbar-row">
                  <p class="analysis-hbar-label analysis-hbar-label-split"><span>Paginas com H1 preenchido</span><span>30,96%</span></p>
                  <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 30.96;"></span></span>
                </div>
                <div class="analysis-hbar-row">
                  <p class="analysis-hbar-label analysis-hbar-label-split"><span>Paginas com Meta Description</span><span>0,73%</span></p>
                  <span class="analysis-hbar-track"><span class="analysis-hbar-fill" style="--value: 0.73;"></span></span>
                </div>
              </div>
            </article>

            <article class="analysis-card analysis-panel-card">
              <div class="analysis-panel-head">
                <p class="analysis-panel-title">Midias: imagens</p>
              </div>
              <div class="analysis-kpi-table">
                <article class="analysis-kpi-row">
                  <p class="analysis-kpi-row-top"><span class="analysis-kpi-row-label">Volume de imagens</span></p>
                  <p class="analysis-kpi-row-value">5.405</p>
                </article>
                <article class="analysis-kpi-row">
                  <p class="analysis-kpi-row-top"><span class="analysis-kpi-row-label">Imagens sem legenda/caption</span></p>
                  <p class="analysis-kpi-row-value">2.897 (~55%)</p>
                </article>
              </div>
            </article>
          </div>
          <p class="analysis-session-note">Forte quebra de acessibilidade (WCAG) e perda de SEO visual. Acao: politica de alt text.</p>
        </section>
      </section>
    `;
  }

  const panelContent = {
    sobre: {
      title: "Sobre",
      html: `
        <article class="about-content">
          <p class="about-label">Projeto</p>
          <h3 class="about-project-title">Design de servicos aplicado ao conteudo digital de disseminacao de propriedade intelectual</h3>
          <p>No contexto do <a class="about-inline-link about-arrow-link" href="https://drive.google.com/drive/folders/1-ucaLg4ZPTk5hQ7C_tfTJ4PEUGyUbcDr?hl=pt-br" target="_blank" rel="noopener noreferrer">Edital no 04/2025</a>, o projeto tem como objetivo investigar e desenvolver estrategias de comunicacao para aprimorar a divulgacao das acoes da CGDI para os publicos interno e externo do INPI. A iniciativa responde a necessidade de modernizar os canais digitais, reduzindo gargalos de usabilidade e de arquitetura da informacao.</p>
          <p>Os resultados esperados incluem maior reconhecimento do valor institucional, melhor desempenho na experiencia do usuario e ampliacao do alcance das acoes de disseminacao. Como entregaveis obrigatorios, o projeto preve um Relatorio de Diagnostico da Comunicacao Institucional, um Plano Estrategico de Comunicacao Digital e o Prototipo da nova Pagina Eletronica da CGDI.</p>
          <section class="about-meta" aria-label="Responsaveis">
            <p class="about-meta-item">
              <span class="about-meta-label">Bolsista</span>
              <span class="about-meta-value">
                <a class="about-meta-person-link about-arrow-link" href="https://www.linkedin.com/in/januvieira/" target="_blank" rel="noopener noreferrer" aria-label="Abrir LinkedIn de Rogerio J. Vieira Jr." title="Abrir LinkedIn">Rogerio J. Vieira Jr.</a>
              </span>
            </p>
            <p class="about-meta-item"><span class="about-meta-label">Responsavel Tecnico</span><span class="about-meta-value">Maria Eugenia Fortes Ramos da Silva Goncalves Gallotti</span></p>
            <p class="about-meta-item"><span class="about-meta-label">Responsavel Academico</span><span class="about-meta-value">Celso Luiz Salgueiro Lage</span></p>
          </section>
          <section class="about-reports" aria-label="Relatorio do projeto">
            <p class="links-label">Relatorio</p>
            <ul class="about-reports-list">
              <li class="about-reports-item">
                <a class="about-inline-link about-arrow-link" href="https://drive.google.com/drive/folders/1fCH731ThL_G1rBG8LovzQSz_XlC1GPRI?hl=pt-br" target="_blank" rel="noopener noreferrer" aria-label="Abrir relatorio de dezembro de 2025">dezembro/2025</a>
              </li>
              <li class="about-reports-item">
                <a class="about-inline-link about-arrow-link" href="https://drive.google.com/file/d/14hVVJuZPoMkbzIjGXVceEmp4XTvwjw6r/view?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="Abrir relatorio de janeiro de 2026">janeiro/2026</a>
              </li>
            </ul>
          </section>
          <section class="about-reports" aria-label="Drive do projeto">
            <p class="links-label">Drive do projeto</p>
            <ul class="about-reports-list">
              <li class="about-reports-item">
                <a class="about-inline-link about-arrow-link" href="https://drive.google.com/drive/folders/18N06J4q_c_YXv4tDcaAc_ZxudTjxmsIb?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="Abrir Google Drive do projeto">Google Drive</a>
              </li>
            </ul>
          </section>
          <section class="about-reports" aria-label="Discovery do projeto">
            <p class="links-label">Discovery</p>
            <ul class="about-reports-list">
              <li class="about-reports-item">
                <a class="about-inline-link about-arrow-link" href="https://www.figma.com/board/98PqZ126Y9RxZTZp0CH44X/INPI_Discovery?node-id=0-1&t=J8Q503lPuDXMFS1F-1" target="_blank" rel="noopener noreferrer" aria-label="Abrir Discovery do projeto">Board de discovery</a>
              </li>
            </ul>
          </section>
        </article>
      `
    },
    planilhas: {
      title: "Planilhas",
      html: `
        <section class="links-panel links-panel-structured" aria-label="Planilhas do projeto">
          <p class="links-label">Bases do inventario</p>
          <p class="sheets-intro">Planilhas extraidas por meio de web scraping (raspagem automatizada de dados) do site, utilizando uma tecnica que simula a navegacao de um usuario para coletar informacoes.</p>
          <div class="links-grid">
            <a class="links-card sheet-link-card" href="https://docs.google.com/spreadsheets/d/1lXtZapgmcWnq29qwg9VkXnHnDKHQi6uxn5gJ1Ee3P9I/edit?gid=3996677#gid=3996677" target="_blank" rel="noopener noreferrer">
              <span class="sheet-file-icon" aria-hidden="true">
                <svg class="sheet-file-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <rect x="4" y="3" width="16" height="18" rx="2"></rect>
                  <path d="M4 9h16M10 9v12M15 9v12"></path>
                </svg>
              </span>
              <span class="sheet-content">
                <span class="sheet-title-group">
                  <span class="links-card-title">site_mapa_estrutura</span>
                  <span class="links-card-icon" aria-hidden="true">↗</span>
                </span>
                <span class="links-card-description">Inventario das URLs para analise estrutural e links quebrados.</span>
              </span>
            </a>
            <a class="links-card sheet-link-card" href="https://docs.google.com/spreadsheets/d/1D4_fU9q79Fzq8W0Y2uPh1kEiaA-WclveixFvjVrJQg0/edit?usp=drive_web&ouid=109096435734312019515" target="_blank" rel="noopener noreferrer">
                <span class="sheet-file-icon" aria-hidden="true">
                  <svg class="sheet-file-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <rect x="4" y="3" width="16" height="18" rx="2"></rect>
                    <path d="M4 9h16M10 9v12M15 9v12"></path>
                  </svg>
                </span>
                <span class="sheet-content">
                  <span class="sheet-title-group">
                    <span class="links-card-title">midias_imagens</span>
                    <span class="links-card-icon" aria-hidden="true">↗</span>
                  </span>
                  <span class="links-card-description">Inventario de imagens com formato, paginas e caption.</span>
                </span>
            </a>
            <a class="links-card sheet-link-card" href="https://docs.google.com/spreadsheets/d/1g6RiO8eHH9l6qsjuQ_L2JoT-LIeGBXilRSgMtaE75_4/edit?gid=924103367#gid=924103367" target="_blank" rel="noopener noreferrer">
                <span class="sheet-file-icon" aria-hidden="true">
                  <svg class="sheet-file-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <rect x="4" y="3" width="16" height="18" rx="2"></rect>
                    <path d="M4 9h16M10 9v12M15 9v12"></path>
                  </svg>
                </span>
                <span class="sheet-content">
                  <span class="sheet-title-group">
                    <span class="links-card-title">midias_videos</span>
                    <span class="links-card-icon" aria-hidden="true">↗</span>
                  </span>
                  <span class="links-card-description">Inventario de videos com duracao, ano de publicacao e pagina de origem.</span>
                </span>
            </a>
            <a class="links-card sheet-link-card" href="https://docs.google.com/spreadsheets/d/1pGjjCf6qlASiy_LLOE-vNnXQ3ikYgs8-UajwUfDeE2c/edit?gid=478120041#gid=478120041" target="_blank" rel="noopener noreferrer">
                <span class="sheet-file-icon" aria-hidden="true">
                  <svg class="sheet-file-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                    <rect x="4" y="3" width="16" height="18" rx="2"></rect>
                    <path d="M4 9h16M10 9v12M15 9v12"></path>
                  </svg>
                </span>
                <span class="sheet-content">
                  <span class="sheet-title-group">
                    <span class="links-card-title">site_links_externos</span>
                    <span class="links-card-icon" aria-hidden="true">↗</span>
                  </span>
                  <span class="links-card-description">Inventario de links externos com dominio de destino e volume por pagina.</span>
                </span>
            </a>
          </div>
        </section>
      `
    },
    pesquisas: {
      title: "Pesquisas",
      html: `
        <section class="links-panel links-panel-structured" aria-label="Pesquisas do projeto">
          <div class="links-grid">
            <a class="links-card sheet-link-card" href="https://app.maze.co/maze-preview/mazes/499948847" target="_blank" rel="noopener noreferrer">
              <span class="sheet-file-icon" aria-hidden="true">
                <svg class="sheet-file-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <circle cx="11" cy="11" r="5.5"></circle>
                  <path d="M15.3 15.3L20 20"></path>
                </svg>
              </span>
              <span class="sheet-content">
                <span class="sheet-title-group">
                  <span class="links-card-title">Arq. infor. e NPS</span>
                  <span class="links-card-icon" aria-hidden="true">↗</span>
                </span>
                <span class="links-card-description">Preview: prototipo em construcao para validar arquitetura da informacao.<br>Fluxo de navegacao do NP em avaliacao.</span>
              </span>
            </a>
          </div>
        </section>
      `
    },
    analise: {
      title: "Analise",
      render: renderAnalysisDashboard
    },
    links: {
      title: "Prototipo",
      html: `
        <section class="links-panel links-panel-structured" aria-label="Prototipos do projeto">
          <p class="links-label">Ambiente de prototipacao</p>
          <div class="links-grid">
            <a class="links-card sheet-link-card" href="https://www.figma.com/make/uAZaeDQlVKf8fhLIoWbmYe/Install-Core-Package?t=2Ht9DvQ0ZjI9dFSO-1" target="_blank" rel="noopener noreferrer" data-link-key="figma-make">
              <span class="sheet-file-icon" aria-hidden="true">
                <svg class="sheet-file-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <rect x="4" y="3" width="16" height="18" rx="2"></rect>
                  <path d="M4 9h16M10 9v12M15 9v12"></path>
                </svg>
              </span>
              <span class="sheet-content">
                <span class="sheet-title-group">
                  <span class="links-card-title">Figma Make</span>
                  <span class="links-card-icon" aria-hidden="true">↗</span>
                </span>
                <span class="links-card-description">Exploracoes rapidas para testar ideias e interacoes do projeto.</span>
              </span>
            </a>
            <a class="links-card sheet-link-card" href="https://www.figma.com/design/bWJMKgvEEN320iruvchBhY/INPI_Prototipo?node-id=0-1&t=ViaViGYrPFxferhX-1" target="_blank" rel="noopener noreferrer" data-link-key="prototipos">
              <span class="sheet-file-icon" aria-hidden="true">
                <svg class="sheet-file-icon-svg" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                  <rect x="4" y="3" width="16" height="18" rx="2"></rect>
                  <path d="M4 9h16M10 9v12M15 9v12"></path>
                </svg>
              </span>
              <span class="sheet-content">
                <span class="sheet-title-group">
                  <span class="links-card-title">Prototipos</span>
                  <span class="links-card-icon" aria-hidden="true">↗</span>
                </span>
                <span class="links-card-description">Prototipo navegavel para validar fluxos e experiencia final.</span>
              </span>
            </a>
          </div>
        </section>
      `
    },
    "agendar-reuniao": {
      title: "Agendar reuniao",
      paragraphs: []
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
    const html = typeof panel.render === "function"
      ? panel.render()
      : (panel.html || panel.paragraphs.map((text) => `<p>${text}</p>`).join(""));
    menuSidebarBody.innerHTML = html;
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

  if (menuSidebarFooterClose) {
    menuSidebarFooterClose.addEventListener("click", closeSidebar);
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
  const DETAILS_BATCH_SIZE = 320;
  const scheduleFrame = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : (cb) => window.setTimeout(cb, 16);
  let detailsBatchJob = 0;

  function setDetailsListOpen(detailsList, nextOpen) {
    detailsBatchJob += 1;
    const jobId = detailsBatchJob;
    const pending = [];
    for (const details of detailsList) {
      if (details.open === nextOpen) continue;
      pending.push(details);
    }
    if (!pending.length) return;

    function applyBatch(startIndex) {
      if (jobId !== detailsBatchJob) return;
      const endIndex = Math.min(startIndex + DETAILS_BATCH_SIZE, pending.length);
      for (let i = startIndex; i < endIndex; i += 1) {
        pending[i].open = nextOpen;
      }
      if (endIndex < pending.length) {
        scheduleFrame(() => applyBatch(endIndex));
      }
    }

    applyBatch(0);
  }

  function setAllDetailsOpen(nextOpen) {
    setDetailsListOpen(allDetails, nextOpen);
  }

  if (expandButton) {
    expandButton.addEventListener("click", () => setAllDetailsOpen(true));
  }
  if (collapseButton) {
    collapseButton.addEventListener("click", () => setAllDetailsOpen(false));
  }

  // Marcacao CGDI e tags (persistidas no localStorage)
  const KEY = "cgdi_marked_ids_v1";
  const TAGS_KEY = "node_free_tags_v1";
  const cgdiSwitch = document.getElementById("cgdi");
  const cgdiCountChip = document.getElementById("cgdi-count-chip");
  const searchInput = document.getElementById("search");
  const searchMode = document.getElementById("search-mode");
  const allNodes = Array.from(document.querySelectorAll("li.node"));
  const nodeById = new Map();

  allNodes.forEach((li) => {
    const id = li.dataset.id;
    if (id) nodeById.set(id, li);
  });
  const AUTO_CGDI_IDS = new Set([
    "08b15d3dea76",
    "0ee6b4385c80",
    "13ff8527df19",
    "17b1e7c2b5dc",
    "893263484fe7",
    "8b8e1e0c8871",
    "96ec5f64ccf5",
    "b77ddd770929",
    "d80251b8f3ed",
    "e92315579aea",
    "eff547fc6095",
  ]);
  const AUTO_CGDI_ROOT_HREF = "https://www.gov.br/inpi/pt-br/uso-estrategico-da-pi/inpi-para-empreender-e-inovar";
  const autoCgdiRootNode = allNodes.find((li) => {
    const href = li.querySelector(":scope > details > summary > .row > a.go, :scope > .row > a.go")?.getAttribute("href") || "";
    return href.trim() === AUTO_CGDI_ROOT_HREF;
  });
  if (autoCgdiRootNode) {
    const rootId = autoCgdiRootNode.dataset.id;
    if (rootId) AUTO_CGDI_IDS.add(rootId);
    autoCgdiRootNode.querySelectorAll("li.node[data-id]").forEach((li) => {
      const id = li.dataset.id;
      if (id) AUTO_CGDI_IDS.add(id);
    });
  }
  const autoCgdiNodes = [];
  const autoCgdiDetails = [];
  const autoCgdiDetailsSet = new Set();
  AUTO_CGDI_IDS.forEach((id) => {
    const li = nodeById.get(id);
    if (!li) return;
    autoCgdiNodes.push(li);
    let cur = li.parentElement;
    while (cur) {
      if (cur.tagName === "DETAILS") autoCgdiDetailsSet.add(cur);
      cur = cur.parentElement;
    }
  });
  autoCgdiDetails.push(...autoCgdiDetailsSet);
  let autoCgdiEnabled = Boolean(cgdiSwitch?.checked);
  let cgdiMode = autoCgdiEnabled;

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
  function getNodeTagsTextById(id) {
    return Array.isArray(nodeTags[id]) ? nodeTags[id].join(" ").toLowerCase() : "";
  }
  function getTextBigrams(text) {
    if (!text || text.length < 2) return [];
    const grams = new Set();
    for (let i = 0; i < text.length - 1; i += 1) {
      grams.add(text.slice(i, i + 2));
    }
    return Array.from(grams);
  }
  function addItemToBigramIndex(indexMap, grams, item) {
    grams.forEach((gram) => {
      let bucket = indexMap.get(gram);
      if (!bucket) {
        bucket = new Set();
        indexMap.set(gram, bucket);
      }
      bucket.add(item);
    });
  }
  function removeItemFromBigramIndex(indexMap, grams, item) {
    grams.forEach((gram) => {
      const bucket = indexMap.get(gram);
      if (!bucket) return;
      bucket.delete(item);
      if (!bucket.size) indexMap.delete(gram);
    });
  }
  const contentBigramIndex = new Map();
  const tagsBigramIndex = new Map();
  const searchIndex = allNodes.map((li) => {
    const id = li.dataset.id || "";
    const name = (li.querySelector(".name")?.textContent || "").toLowerCase();
    const link = (li.querySelector("a.go")?.getAttribute("href") || "").toLowerCase();
    const baseText = `${name} ${link}`.trim();
    const tagsText = getNodeTagsTextById(id);

    const ancestorNodes = [];
    const ancestorDetails = [];
    let cur = li;
    while (cur) {
      if (cur.matches && cur.matches("li.node")) ancestorNodes.push(cur);
      if (cur.tagName === "DETAILS") ancestorDetails.push(cur);
      cur = cur.parentElement;
    }

    const item = {
      li,
      id,
      baseText,
      tagsText,
      searchText: tagsText ? `${baseText} ${tagsText}` : baseText,
      contentBigrams: [],
      tagsBigrams: [],
      ancestorNodes,
      ancestorDetails
    };
    item.contentBigrams = getTextBigrams(item.searchText);
    item.tagsBigrams = getTextBigrams(item.tagsText);
    addItemToBigramIndex(contentBigramIndex, item.contentBigrams, item);
    addItemToBigramIndex(tagsBigramIndex, item.tagsBigrams, item);
    return item;
  });
  const searchItemByNode = new WeakMap();
  searchIndex.forEach((item) => searchItemByNode.set(item.li, item));

  function refreshSearchItemForNode(li) {
    const item = searchItemByNode.get(li);
    if (!item) return;
    removeItemFromBigramIndex(contentBigramIndex, item.contentBigrams, item);
    removeItemFromBigramIndex(tagsBigramIndex, item.tagsBigrams, item);
    item.tagsText = getNodeTagsTextById(item.id);
    item.searchText = item.tagsText ? `${item.baseText} ${item.tagsText}` : item.baseText;
    item.contentBigrams = getTextBigrams(item.searchText);
    item.tagsBigrams = getTextBigrams(item.tagsText);
    addItemToBigramIndex(contentBigramIndex, item.contentBigrams, item);
    addItemToBigramIndex(tagsBigramIndex, item.tagsBigrams, item);
  }

  function resetSearchCache() {
    lastSearchQuery = "";
    lastSearchMode = "";
    lastSearchMatches = searchIndex;
    searchResultCache.clear();
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
      const rowRight = ensureRowRight(row);
      const badge = rowRight.querySelector(":scope > .cgdi-badge");
      if (badge) rowRight.insertBefore(holder, badge);
      else rowRight.appendChild(holder);
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
    refreshSearchItemForNode(li);
    resetSearchCache();
    if (searchInput && (searchInput.value || "").trim().length >= 2) {
      runSearch(searchInput.value || "");
    }
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
    refreshSearchItemForNode(li);
    resetSearchCache();
    if (searchInput && (searchInput.value || "").trim().length >= 2) {
      runSearch(searchInput.value || "");
    }
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
        const row = getRowForNode(li);
        if (row) ensureRowRight(row).appendChild(badge);
      }
    } else if (badge) {
      badge.remove();
    }
  }

  function isNodeMarkedByCgdi(id) {
    if (!id) return false;
    if (marked.has(id)) return true;
    return autoCgdiEnabled && AUTO_CGDI_IDS.has(id);
  }

  function updateCgdiCountChip() {
    if (!cgdiCountChip) return;
    const total = document.querySelectorAll("li.node.cgdi").length;
    const label = total === 1 ? "pagina" : "paginas";
    cgdiCountChip.textContent = `${total.toLocaleString("pt-BR")} ${label}`;
  }

  function syncAutoCgdiToggle(expandPaths) {
    autoCgdiNodes.forEach((li) => {
      const id = li.dataset.id;
      applyMarkedToNode(li, isNodeMarkedByCgdi(id));
    });
    if (expandPaths && autoCgdiEnabled) {
      setDetailsListOpen(autoCgdiDetails, true);
    }
    updateCgdiCountChip();
  }

  // Aplica marcacoes persistidas em todos os nos
  function applyMarked() {
    if (!marked.size) return;
    let hasInvalidIds = false;
    for (const id of Array.from(marked)) {
      const li = nodeById.get(id);
      if (!li) {
        marked.delete(id);
        hasInvalidIds = true;
        continue;
      }
      applyMarkedToNode(li, isNodeMarkedByCgdi(id));
    }
    if (hasInvalidIds) saveSet(marked);
  }
  applyMarked();
  syncAutoCgdiToggle(autoCgdiEnabled);

  if (cgdiSwitch) {
    cgdiSwitch.addEventListener("change", () => {
      autoCgdiEnabled = cgdiSwitch.checked;
      cgdiMode = autoCgdiEnabled;
      // Ativa destaque automatico dos nos mapeados da CGDI e abre seus caminhos.
      syncAutoCgdiToggle(true);
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
      applyMarkedToNode(li, isNodeMarkedByCgdi(id));
      updateCgdiCountChip();
    }
  }, true);

  // Busca otimizada: debounce + indice em cache + minimo de caracteres
  let searchTimer = null;
  let lastKept = [];
  let lastKeptSet = new Set();
  let lastHighlighted = [];
  let lastHighlightedSet = new Set();
  let lastSearchQuery = "";
  let lastSearchMode = "";
  let lastSearchMatches = searchIndex;
  const SEARCH_CACHE_LIMIT = 12;
  const searchResultCache = new Map();

  function getSearchCacheEntry(key) {
    const cached = searchResultCache.get(key);
    if (!cached) return null;
    // Atualiza ordem para manter LRU simples com Map.
    searchResultCache.delete(key);
    searchResultCache.set(key, cached);
    return cached;
  }

  function setSearchCacheEntry(key, value) {
    if (searchResultCache.has(key)) searchResultCache.delete(key);
    searchResultCache.set(key, value);
    if (searchResultCache.size <= SEARCH_CACHE_LIMIT) return;
    const oldestKey = searchResultCache.keys().next().value;
    searchResultCache.delete(oldestKey);
  }

  // Limpa destaque e estado visual da busca anterior
  function clearSearchState() {
    lastHighlighted.forEach((li) => li.classList.remove("highlight"));
    lastKept.forEach((li) => li.classList.remove("search-keep"));
    lastHighlighted = [];
    lastHighlightedSet.clear();
    lastKept = [];
    lastKeptSet.clear();
    document.body.classList.remove("search-active");
  }

  function applySearchVisualState(result) {
    const nextKeep = result.keepNodes;
    const nextHighlights = result.highlightNodes;
    const nextKeepSet = new Set(nextKeep);
    const nextHighlightSet = new Set(nextHighlights);

    lastKept.forEach((node) => {
      if (!nextKeepSet.has(node)) node.classList.remove("search-keep");
    });
    lastHighlighted.forEach((node) => {
      if (!nextHighlightSet.has(node)) node.classList.remove("highlight");
    });

    nextKeep.forEach((node) => {
      if (!lastKeptSet.has(node)) node.classList.add("search-keep");
    });
    nextHighlights.forEach((node) => {
      if (!lastHighlightedSet.has(node)) node.classList.add("highlight");
    });

    result.detailsToOpen.forEach((details) => {
      if (!details.open) details.open = true;
    });

    lastKept = nextKeep;
    lastKeptSet = nextKeepSet;
    lastHighlighted = nextHighlights;
    lastHighlightedSet = nextHighlightSet;
    document.body.classList.add("search-active");
  }

  // Executa busca por conteudo ou por tags, mantendo ancestrais visiveis
  function runSearch(rawQuery) {
    if (!searchMode) return;
    const q = (rawQuery || "").trim().toLowerCase();
    const mode = searchMode.value === "tags" ? "tags" : "content";
    if (q.length < 2) {
      clearSearchState();
      resetSearchCache();
      return;
    }

    const cacheKey = `${mode}|${q}`;
    let result = getSearchCacheEntry(cacheKey);

    if (!result) {
      // Em digitacao incremental (ex.: "pa" -> "pat"), restringe varredura aos matches anteriores.
      // Em consultas novas, aplica pre-filtro por bigrama (2 chars) para evitar varrer a arvore inteira.
      const canReusePrefix = mode === lastSearchMode && q.startsWith(lastSearchQuery);
      const bigramIndex = mode === "tags" ? tagsBigramIndex : contentBigramIndex;
      const source = canReusePrefix
        ? lastSearchMatches
        : (bigramIndex.get(q.slice(0, 2)) || []);

      const matches = [];
      for (const item of source) {
        const haystack = mode === "tags" ? item.tagsText : item.searchText;
        if (!haystack.includes(q)) continue;
        matches.push(item);
      }

      const keep = new Set();
      const openedDetails = new Set();
      const keepNodes = [];
      const detailsToOpen = [];

      for (const item of matches) {
        for (const node of item.ancestorNodes) {
          if (keep.has(node)) continue;
          keep.add(node);
          keepNodes.push(node);
        }
        for (const details of item.ancestorDetails) {
          if (openedDetails.has(details)) continue;
          openedDetails.add(details);
          detailsToOpen.push(details);
        }
      }

      const highlightNodes = matches.map((item) => item.li);
      result = { matches, keepNodes, detailsToOpen, highlightNodes };
      setSearchCacheEntry(cacheKey, result);
    }

    lastSearchQuery = q;
    lastSearchMode = mode;
    lastSearchMatches = result.matches;

    applySearchVisualState(result);
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
