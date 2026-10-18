/**
 * GUIA VIRTUAL & MEMÓRIA OPERACIONAL DOS SISTEMAS
 * Escola Municipal Castro Alves — Planaltina - GO
 *
 * Objetivo: Preservar o conhecimento operacional e de rotina da secretaria,
 * transporte escolar, saída antecipada (AEE) e gestão de voluntários para
 * garantir continuidade sem custo e sem depender de servidores externos.
 */

(function () {
  'use strict';

  // Evita duplicar se já estiver injetado
  if (document.getElementById('guiaSistemasContainer')) return;

  // Detecta qual módulo o usuário está navegando
  const path = window.location.pathname.toLowerCase();
  let moduloAtual = 'hub';
  if (path.includes('/transporte')) moduloAtual = 'transporte';
  else if (path.includes('/aee')) moduloAtual = 'aee';
  else if (path.includes('/voluntarios')) moduloAtual = 'voluntarios';

  // Base de Conhecimento Imutável
  const CONHECIMENTO = [
    {
      id: 'transporte_drive',
      modulo: 'transporte',
      titulo: '🚌 Onde fica a Planilha do Transporte no Drive?',
      palavrasChave: ['transporte', 'planilha', 'drive', 'onde fica', 'pasta', 'banco', 'dados', 'google'],
      resumo: 'Google Drive da Secretaria > Pasta "Transporte Escolar" > Planilha Oficial',
      conteudo: `
        <p>A base oficial das carteirinhas de transporte é alimentada via <strong>Google Drive da Secretaria</strong>:</p>
        <ol style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.5;">
          <li>Acesse o Google Drive com o e-mail oficial da Secretaria da Escola.</li>
          <li>Procure pela pasta principal chamada <strong>"Transporte Escolar"</strong>.</li>
          <li>Dentro dela está a <strong>Planilha Oficial de Alunos do Transporte</strong>.</li>
          <li>Ao preencher ou editar as linhas com nome, rota, turno e responsável, as informações sincronizam automaticamente com este sistema.</li>
        </ol>
      `
    },
    {
      id: 'transporte_fotos',
      modulo: 'transporte',
      titulo: '📸 Onde ficam as Fotos dos Alunos do Transporte?',
      palavrasChave: ['fotos', 'foto', 'foto 3x4', 'imagem', 'transporte', 'aluno', 'pasta fotos'],
      resumo: 'Pasta separada chamada "Fotos" dentro de "Transporte Escolar"',
      conteudo: `
        <p><strong>Atenção importante:</strong> As fotos dos alunos <em>nunca</em> são coladas dentro das células da planilha!</p>
        <div style="background: rgba(249, 195, 31, 0.08); border-left: 3px solid #f9c31f; padding: 8px 12px; margin: 8px 0; border-radius: 4px;">
          As fotos 3x4 dos estudantes devem ser salvas na pasta dedicada chamada <strong>"Fotos"</strong>, que fica dentro da pasta <strong>"Transporte Escolar"</strong> no Drive da Secretaria.
        </div>
        <p>Dica: Nomeie a foto com o nome completo ou matrícula do aluno para facilitar a localização rápida ao emitir a carteirinha.</p>
      `
    },
    {
      id: 'transporte_manual',
      modulo: 'transporte',
      titulo: '✍️ Posso cadastrar Aluno do Transporte manualmente?',
      palavrasChave: ['manual', 'manualmente', 'sem planilha', 'urgente', 'sem internet', 'transporte'],
      resumo: 'Sim! Se não quiser abrir o Drive, preencha os campos direto na tela',
      conteudo: `
        <p>Sim! Embora a planilha no Drive seja o método padrão para grandes lotes, você pode emitir uma carteirinha individual de forma 100% manual:</p>
        <ul style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.5;">
          <li>Basta digitar o nome do aluno, rota, turno e telefone nos campos do formulário na tela.</li>
          <li>Clique em <strong>"Gerar Carteirinha"</strong>.</li>
          <li>Ela já sai com o QR Code oficial de contato no verso para impressão imediata.</li>
        </ul>
      `
    },
    {
      id: 'aee_drive',
      modulo: 'aee',
      titulo: '♿ Onde fica a Planilha da Saída Antecipada (AEE)?',
      palavrasChave: ['aee', 'saida antecipada', 'planilha', 'drive', 'especial', 'recursos', 'onde fica'],
      resumo: 'Google Drive da Secretaria > Pasta "Saída Antecipada AEE" > Planilha AEE',
      conteudo: `
        <p>Para os estudantes do Atendimento Educacional Especializado (AEE) que possuem autorização de saída antecipada:</p>
        <ol style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.5;">
          <li>Acesse o Google Drive da Secretaria da Escola.</li>
          <li>Abra a pasta específica chamada <strong>"Saída Antecipada AEE"</strong>.</li>
          <li>Lá está a <strong>Planilha Oficial de Alunos do AEE</strong>, com horário de liberação, responsáveis e professor da sala de recursos.</li>
          <li>Os dados salvos lá refletem no sistema para busca automática por nome ou matrícula.</li>
        </ol>
      `
    },
    {
      id: 'aee_fotos',
      modulo: 'aee',
      titulo: '🖼️ Onde ficam as Fotos do AEE?',
      palavrasChave: ['aee', 'fotos aee', 'foto aee', 'onde colocar foto', 'pasta fotos aee'],
      resumo: 'Pasta "Fotos" dentro da pasta "Saída Antecipada AEE" no Drive',
      conteudo: `
        <p>Assim como no transporte, as fotos dos alunos do AEE ficam organizadas em uma pasta separada:</p>
        <p style="margin-top: 6px;">Dentro da pasta <strong>"Saída Antecipada AEE"</strong> no Google Drive da Secretaria, existe a pasta <strong>"Fotos"</strong>.</p>
        <p style="margin-top: 6px; font-size: 0.88rem; color: #a3b899;">Basta colocar a imagem lá identificada com o nome do estudante. O sistema carrega para a carteirinha institucional com o laço da acessibilidade e QR Code de validação.</p>
      `
    },
    {
      id: 'aee_termo',
      modulo: 'aee',
      titulo: '📜 Como gerar o Termo de Compromisso dos Pais (AEE)?',
      palavrasChave: ['termo', 'compromisso', 'termo aee', 'pais', 'responsavel', 'imprimir termo'],
      resumo: 'Clique no botão "Emitir Termo" após localizar o aluno na tela',
      conteudo: `
        <p>Ao selecionar um aluno na tela do AEE, você tem a opção de gerar o <strong>Termo de Compromisso e Responsabilidade</strong> oficial:</p>
        <p style="margin-top: 6px;">O termo já sai preenchido com os dados do estudante, turma, horário de saída antecipada e as linhas para assinatura do responsável e da Direção da Escola.</p>
      `
    },
    {
      id: 'voluntarios_faltas',
      modulo: 'voluntarios',
      titulo: '📋 Como Lançar Falta de um Voluntário?',
      palavrasChave: ['falta', 'lancar falta', 'registrar falta', 'voluntario', 'ausencia', 'motivo'],
      resumo: 'Módulo Voluntários > Botão "Registrar Falta" > Selecionar e Gravar',
      conteudo: `
        <p>Para registrar uma ausência de voluntário social:</p>
        <ol style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.5;">
          <li>No menu de Voluntários, clique no botão <strong>"+ Registrar Falta"</strong>.</li>
          <li>Selecione o nome do voluntário na lista.</li>
          <li>Informe a <strong>Data da Falta</strong> e o <strong>Motivo</strong> (ex: Atestado Médico, Motivo Pessoal).</li>
          <li>Defina se haverá reposição e se deve constar na folha de frequência mensal.</li>
          <li>Clique em <strong>"Gravar Registro"</strong>. Fica salvo no histórico institucional.</li>
        </ol>
      `
    },
    {
      id: 'voluntarios_reposicao',
      modulo: 'voluntarios',
      titulo: '🔄 Como Funciona a Reposição de Dias dos Voluntários?',
      palavrasChave: ['reposicao', 'repor', 'cumprir', 'confirmar reposicao', 'voluntarios'],
      resumo: 'Agendar a data da reposição e depois clicar em "Confirmar Reposição"',
      conteudo: `
        <p>Quando um voluntário combina de repor a carga horária em outro dia:</p>
        <ul style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.5;">
          <li>Ao lançar a falta, marque <strong>"Irá repor? Sim"</strong> e coloque a data agendada.</li>
          <li>O card ficará com status <em>"Pendente"</em>.</li>
          <li>No dia que ele comparecer e cumprir a reposição, clique em <strong>"Confirmar Reposição"</strong> no card. O status muda para <em>"Cumprido"</em> automaticamente.</li>
        </ul>
      `
    },
    {
      id: 'voluntarios_relatorio',
      modulo: 'voluntarios',
      titulo: '📊 Como Gerar o Relatório Mensal para a Secretaria de Educação?',
      palavrasChave: ['relatorio', 'prestacao de contas', 'excel', 'mensal', 'folha', 'frequencia'],
      resumo: 'Botão "Exportar Relatório" gera arquivo Excel completo',
      conteudo: `
        <p>Para prestação de contas mensal das atividades dos voluntários:</p>
        <p style="margin-top: 6px;">No topo do painel de Voluntários, clique em <strong>"Exportar Relatório (.xls)"</strong>.</p>
        <p style="margin-top: 6px;">O sistema baixa uma planilha completa contendo voluntários, datas de faltas, motivos, status de reposição e indicação para fechamento da ajuda de custo.</p>
      `
    },
    {
      id: 'geral_recuperacao',
      modulo: 'geral',
      titulo: '🔑 E se Esquecerem a Senha ou Trocar a Equipe da Escola?',
      palavrasChave: ['senha', 'troca de equipe', 'esqueci', 'acesso', 'recuperar', 'admin', 'google drive'],
      resumo: 'O acesso é unificado pelo Firebase e Google institucional da escola',
      conteudo: `
        <p>A Escola Municipal Castro Alves utiliza autenticação institucional segura:</p>
        <ul style="margin-left: 1.25rem; margin-top: 0.5rem; line-height: 1.5;">
          <li>O e-mail principal cadastrado é o da Secretaria Geral da escola.</li>
          <li>Se houver troca de equipe em nova gestão, basta solicitar à Direção o acesso ao e-mail institucional oficial para redefinir as credenciais na tela de login.</li>
          <li>As planilhas no Google Drive nunca se perdem porque estão na conta Google Workspace da própria unidade escolar.</li>
        </ul>
      `
    }
  ];

  // Injeção de Estilos CSS com Design Impeccable (Sem anti-patterns)
  const css = `
    #guiaSistemasBtn {
      position: fixed;
      bottom: 22px;
      right: 22px;
      z-index: 99990;
      display: flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #10261b 0%, #0d1e15 100%);
      color: #f9c31f;
      border: 1.5px solid rgba(249, 195, 31, 0.4);
      border-radius: 50px;
      padding: 10px 18px 10px 12px;
      cursor: pointer;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 4px 10px rgba(0, 0, 0, 0.4);
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.25s ease;
      outline: none;
    }
    #guiaSistemasBtn:hover {
      transform: translateY(-2px) scale(1.02);
      border-color: #f9c31f;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.75);
    }
    #guiaSistemasBtn:active {
      transform: scale(0.98);
    }
    .guia-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #f9c31f;
      color: #091710;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 900;
      flex-shrink: 0;
    }

    /* Balão Proativo Inteligente */
    #guiaProativoBalcao {
      position: fixed;
      bottom: 78px;
      right: 22px;
      z-index: 99989;
      max-width: 320px;
      background: #0f241a;
      border: 1px solid rgba(249, 195, 31, 0.4);
      border-radius: 16px;
      padding: 14px 16px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75);
      color: #f0f6f2;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 0.86rem;
      line-height: 1.45;
      animation: guiaFadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      display: none;
    }
    @keyframes guiaFadeUp {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .guia-proativo-close {
      position: absolute;
      top: 8px;
      right: 8px;
      background: transparent;
      border: none;
      color: #9bb7a7;
      font-size: 16px;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
    }
    .guia-proativo-close:hover { color: #f0f6f2; }

    /* Modal / Painel Lateral do Guia */
    #guiaModalOverlay {
      position: fixed;
      inset: 0;
      background: rgba(4, 10, 7, 0.75);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      z-index: 99995;
      display: none;
      align-items: center;
      justify-content: flex-end;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    #guiaModalOverlay.active {
      display: flex;
      opacity: 1;
    }
    #guiaPainel {
      width: 100%;
      max-width: 460px;
      height: 100vh;
      background: #091710;
      border-left: 1px solid rgba(181, 201, 154, 0.2);
      display: flex;
      flex-direction: column;
      box-shadow: -12px 0 40px rgba(0, 0, 0, 0.8);
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #f0f6f2;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #guiaModalOverlay.active #guiaPainel {
      transform: translateX(0);
    }

    /* Cabeçalho do Painel */
    .guia-header {
      padding: 1.25rem 1.5rem;
      background: #0f241a;
      border-bottom: 1px solid rgba(181, 201, 154, 0.16);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .guia-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .guia-header-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
    }
    .guia-header-subtitle {
      font-size: 0.78rem;
      color: #9bb7a7;
      margin-top: 2px;
    }
    .guia-btn-close {
      background: transparent;
      border: 1px solid rgba(181, 201, 154, 0.3);
      color: #9bb7a7;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .guia-btn-close:hover {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.4);
      color: #fca5a5;
    }

    /* Busca */
    .guia-search-box {
      padding: 1rem 1.5rem;
      background: #0a1b13;
      border-bottom: 1px solid rgba(181, 201, 154, 0.12);
    }
    .guia-search-input {
      width: 100%;
      background: #142e22;
      border: 1px solid rgba(181, 201, 154, 0.25);
      border-radius: 10px;
      padding: 10px 14px;
      color: #ffffff;
      font-family: inherit;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s ease;
    }
    .guia-search-input:focus {
      border-color: #f9c31f;
    }
    .guia-search-input::placeholder {
      color: #7d9688;
    }

    /* Pílulas de Atalho Rápido */
    .guia-pills-bar {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 0.75rem 1.5rem;
      background: #091710;
      border-bottom: 1px solid rgba(181, 201, 154, 0.1);
      scrollbar-width: none;
    }
    .guia-pills-bar::-webkit-scrollbar { display: none; }
    .guia-pill {
      white-space: nowrap;
      background: #10261b;
      border: 1px solid rgba(181, 201, 154, 0.2);
      border-radius: 20px;
      padding: 5px 12px;
      font-size: 0.76rem;
      font-weight: 600;
      color: #9bb7a7;
      cursor: pointer;
      transition: all 0.18s ease;
    }
    .guia-pill:hover, .guia-pill.active {
      background: #1a382a;
      border-color: #f9c31f;
      color: #f9c31f;
    }

    /* Conteúdo Rolável */
    .guia-content-scroll {
      flex: 1;
      overflow-y: auto;
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .guia-faq-item {
      background: #0f241a;
      border: 1px solid rgba(181, 201, 154, 0.15);
      border-radius: 12px;
      overflow: hidden;
      transition: border-color 0.2s ease, background 0.2s ease;
    }
    .guia-faq-item:hover {
      border-color: rgba(249, 195, 31, 0.3);
      background: #122b1f;
    }
    .guia-faq-trigger {
      width: 100%;
      padding: 12px 14px;
      background: transparent;
      border: none;
      color: #ffffff;
      text-align: left;
      font-family: inherit;
      font-size: 0.9rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      cursor: pointer;
    }
    .guia-faq-arrow {
      font-size: 0.75rem;
      color: #9bb7a7;
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }
    .guia-faq-item.open .guia-faq-arrow {
      transform: rotate(180deg);
      color: #f9c31f;
    }
    .guia-faq-body {
      display: none;
      padding: 0 14px 14px;
      font-size: 0.85rem;
      color: #d1ded7;
      line-height: 1.5;
      border-top: 1px solid rgba(181, 201, 154, 0.08);
      padding-top: 10px;
    }
    .guia-faq-item.open .guia-faq-body {
      display: block;
    }

    /* Rodapé do Guia */
    .guia-footer {
      padding: 1rem 1.5rem;
      background: #0c1e15;
      border-top: 1px solid rgba(181, 201, 154, 0.15);
      font-size: 0.78rem;
      color: #7d9688;
      text-align: center;
    }
    .guia-footer strong {
      color: #f9c31f;
    }

    @media (max-width: 600px) {
      #guiaPainel { max-width: 100%; }
      #guiaSistemasBtn { bottom: 14px; right: 14px; padding: 8px 14px; }
      #guiaProativoBalcao { right: 14px; left: 14px; max-width: none; bottom: 70px; }
    }
  `;

  // Cria e anexa as tags necessárias
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const container = document.createElement('div');
  container.id = 'guiaSistemasContainer';

  container.innerHTML = `
    <!-- Balão de Ajuda Proativo -->
    <div id="guiaProativoBalcao" role="alert">
      <button class="guia-proativo-close" id="guiaProativoClose" aria-label="Fechar aviso">✕</button>
      <div style="font-weight: 700; color: #f9c31f; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
        <span>💡</span><span>Guia Operacional</span>
      </div>
      <p id="guiaProativoTexto">
        Novo na equipe ou com dúvidas sobre onde ficam as <strong>planilhas do Drive</strong> e as <strong>pastas de fotos</strong>? Clique aqui para consultar o manual!
      </p>
      <button id="guiaProativoBtnAbrir" style="background: rgba(249, 195, 31, 0.15); border: 1px solid #f9c31f; color: #f9c31f; border-radius: 6px; padding: 5px 10px; font-size: 0.78rem; font-weight: 700; margin-top: 8px; cursor: pointer;">
        Abrir Guia do Sistema →
      </button>
    </div>

    <!-- Botão Flutuante Permanente -->
    <button id="guiaSistemasBtn" aria-label="Abrir Guia e Ajuda do Sistema">
      <div class="guia-avatar">?</div>
      <span>Guia & Dúvidas</span>
    </button>

    <!-- Modal Lateral -->
    <div id="guiaModalOverlay">
      <aside id="guiaPainel" aria-label="Painel de Instruções e Dúvidas">
        <header class="guia-header">
          <div class="guia-header-info">
            <div class="guia-avatar">📖</div>
            <div>
              <h2 class="guia-header-title">Manual de Bordo dos Sistemas</h2>
              <p class="guia-header-subtitle">Escola Municipal Castro Alves</p>
            </div>
          </div>
          <button class="guia-btn-close" id="guiaModalClose" aria-label="Fechar painel">✕</button>
        </header>

        <div class="guia-search-box">
          <input type="text" id="guiaSearchInput" class="guia-search-input" placeholder="Digite sua dúvida (ex: fotos, drive, reposição)..." />
        </div>

        <nav class="guia-pills-bar" id="guiaPills">
          <button class="guia-pill active" data-filtro="todos">Todos</button>
          <button class="guia-pill" data-filtro="transporte">🚌 Transporte</button>
          <button class="guia-pill" data-filtro="aee">♿ Saída AEE</button>
          <button class="guia-pill" data-filtro="voluntarios">📋 Voluntários</button>
          <button class="guia-pill" data-filtro="geral">🔑 Drive & Acesso</button>
        </nav>

        <div class="guia-content-scroll" id="guiaFaqList">
          <!-- Itens do FAQ gerados dinamicamente -->
        </div>

        <footer class="guia-footer">
          Base permanente offline · Não expira · <strong>Castro Alves</strong>
        </footer>
      </aside>
    </div>
  `;

  document.body.appendChild(container);

  // Referências DOM
  const btnFlutuante = document.getElementById('guiaSistemasBtn');
  const modalOverlay = document.getElementById('guiaModalOverlay');
  const btnClose = document.getElementById('guiaModalClose');
  const searchInput = document.getElementById('guiaSearchInput');
  const faqList = document.getElementById('guiaFaqList');
  const pillsContainer = document.getElementById('guiaPills');
  const proativoBalcao = document.getElementById('guiaProativoBalcao');
  const proativoClose = document.getElementById('guiaProativoClose');
  const proativoAbrir = document.getElementById('guiaProativoBtnAbrir');
  const proativoTexto = document.getElementById('guiaProativoTexto');

  // Ajusta mensagem proativa conforme a tela
  if (moduloAtual === 'transporte') {
    proativoTexto.innerHTML = 'Dúvidas sobre a <strong>pasta "Transporte Escolar"</strong> no Drive ou como colocar as <strong>fotos</strong> dos estudantes? Abra o guia rápido!';
  } else if (moduloAtual === 'aee') {
    proativoTexto.innerHTML = 'Precisa localizar a pasta <strong>"Saída Antecipada AEE"</strong> no Drive ou gerar o <strong>termo de compromisso</strong>? Veja o passo a passo aqui!';
  } else if (moduloAtual === 'voluntarios') {
    proativoTexto.innerHTML = 'Dúvidas sobre como <strong>lançar faltas</strong>, <strong>confirmar reposição</strong> ou exportar a prestação de contas? O guia te orienta!';
  }

  // Renderiza tópicos na lista
  function renderizarTopicos(filtro = 'todos', termoBusca = '') {
    faqList.innerHTML = '';
    const buscaNorm = termoBusca.trim().toLowerCase();

    const filtrados = CONHECIMENTO.filter(item => {
      // Filtro por categoria
      if (filtro !== 'todos' && item.modulo !== filtro && item.modulo !== 'geral') return false;

      // Filtro por texto de busca
      if (!buscaNorm) return true;
      const matchTitulo = item.titulo.toLowerCase().includes(buscaNorm);
      const matchResumo = item.resumo.toLowerCase().includes(buscaNorm);
      const matchPalavras = item.palavrasChave.some(p => p.includes(buscaNorm));
      return matchTitulo || matchResumo || matchPalavras;
    });

    if (filtrados.length === 0) {
      faqList.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: #9bb7a7;">
          <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔍</div>
          <p style="font-weight: 600; color: #fff;">Nenhum tópico encontrado</p>
          <p style="font-size: 0.82rem; margin-top: 4px;">Tente pesquisar por palavras como "Drive", "Fotos", "Faltas", ou "AEE".</p>
        </div>
      `;
      return;
    }

    filtrados.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'guia-faq-item';
      if (index === 0 && termoBusca.length > 0) card.classList.add('open'); // Abre o primeiro se houver busca

      card.innerHTML = `
        <button class="guia-faq-trigger" aria-expanded="false">
          <span>${item.titulo}</span>
          <span class="guia-faq-arrow">▼</span>
        </button>
        <div class="guia-faq-body">
          ${item.conteudo}
        </div>
      `;

      card.querySelector('.guia-faq-trigger').addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        // Fecha outros
        document.querySelectorAll('.guia-faq-item.open').forEach(el => {
          if (el !== card) el.classList.remove('open');
        });
        card.classList.toggle('open', !isOpen);
      });

      faqList.appendChild(card);
    });
  }

  // Define categoria padrão de acordo com o módulo em que o usuário está
  let categoriaAtiva = 'todos';
  if (moduloAtual !== 'hub') {
    categoriaAtiva = moduloAtual;
    pillsContainer.querySelectorAll('.guia-pill').forEach(btn => {
      if (btn.dataset.filtro === moduloAtual) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }
  renderizarTopicos(categoriaAtiva);

  // Abertura e Fechamento do Painel
  function abrirModal() {
    modalOverlay.classList.add('active');
    proativoBalcao.style.display = 'none';
    sessionStorage.setItem('guia_interagiu', 'true');
    searchInput.focus();
  }

  function fecharModal() {
    modalOverlay.classList.remove('active');
  }

  btnFlutuante.addEventListener('click', abrirModal);
  btnClose.addEventListener('click', fecharModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) fecharModal();
  });

  // Busca em tempo real
  searchInput.addEventListener('input', (e) => {
    renderizarTopicos(categoriaAtiva, e.target.value);
  });

  // Pílulas de Categoria
  pillsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.guia-pill');
    if (!btn) return;
    pillsContainer.querySelectorAll('.guia-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    categoriaAtiva = btn.dataset.filtro;
    renderizarTopicos(categoriaAtiva, searchInput.value);
  });

  // Comportamento Proativo Suave (Surge após 7 segundos caso não tenha interagido ainda)
  const jaInteragiu = sessionStorage.getItem('guia_interagiu');
  if (!jaInteragiu) {
    setTimeout(() => {
      if (!modalOverlay.classList.contains('active')) {
        proativoBalcao.style.display = 'block';
      }
    }, 7000);
  }

  proativoClose.addEventListener('click', () => {
    proativoBalcao.style.display = 'none';
    sessionStorage.setItem('guia_interagiu', 'true');
  });

  proativoAbrir.addEventListener('click', abrirModal);

  // Atalho de Teclado (Tecla ESC para fechar)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      fecharModal();
    }
  });

})();
