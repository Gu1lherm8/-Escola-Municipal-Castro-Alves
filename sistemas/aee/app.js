/* ==========================================================================
   SIGEA - LOGICAS DO SISTEMA E INTEGRAÇÃO (app.js)
   Escola Municipal Castro Alves - Sistema de Acesso e Autorização
   ========================================================================== */

// Banco de Dados Simulado em Abas Relacionais (Mock de Fallback)
// Este objeto representa as tabelas relacionais caso o Sheets offline esteja ativo.
const SIGEA_MOCK_DATABASE = {
    // ABA 1: Alunos
    alunos: [
        { id: "1", matricula: "20260901", nome: "Maria Eduarda Souza", turma: "2º Ano", serie: "B", turno: "Vespertino", professor: "Ana Cláudia (AEE)", situacao: "Ativa", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='170' viewBox='0 0 140 170'><rect width='140' height='170' fill='%236db87a'/><text x='50%' y='50%' fill='white' font-family='Outfit' font-weight='bold' font-size='16' dominant-baseline='middle' text-anchor='middle'>Maria E.</text></svg>" },
        { id: "2", matricula: "20260902", nome: "João Pedro Silva", turma: "1º Ano", serie: "A", turno: "Vespertino", professor: "Mariana Costa", situacao: "Inativa", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='170' viewBox='0 0 140 170'><rect width='140' height='170' fill='%23666'/><text x='50%' y='50%' fill='white' font-family='Outfit' font-weight='bold' font-size='16' dominant-baseline='middle' text-anchor='middle'>João P.</text></svg>" },
        { id: "3", matricula: "20260903", nome: "Ana Beatriz Rocha", turma: "3º Ano", serie: "C", turno: "Vespertino", professor: "Soraya Lima", situacao: "Ativa", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='170' viewBox='0 0 140 170'><rect width='140' height='170' fill='%23ffd43b'/><text x='50%' y='50%' fill='black' font-family='Outfit' font-weight='bold' font-size='16' dominant-baseline='middle' text-anchor='middle'>Ana B.</text></svg>" }
    ],
    // ABA 2: Responsável Principal
    responsavel_principal: [
        { id_aluno: "1", nome: "Fernanda Oliveira", parentesco: "Mãe", telefone: "(61) 99999-1111", endereco: "Quadra 10, Lote 15 - Setor Sul" },
        { id_aluno: "2", nome: "Marcos Silva", parentesco: "Pai", telefone: "(61) 99999-5555", endereco: "Rua das Flores, Casa 12" },
        { id_aluno: "3", nome: "Clara Rocha", parentesco: "Mãe", telefone: "(61) 99999-6666", endereco: "Av. Central, Apt 104" }
    ],
    // ABA 3: Pessoas Autorizadas
    pessoas_autorizadas: [
        { id_aluno: "1", nome: "Fernanda Oliveira", parentesco: "Mãe", telefone: "(61) 99999-1111", autorizado: "SIM", observacao: "Buscar todos os dias." },
        { id_aluno: "1", nome: "José Carlos Souza", parentesco: "Pai", telefone: "(61) 99999-2222", autorizado: "SIM", observacao: "Pode buscar." },
        { id_aluno: "1", nome: "Pedro Henrique", parentesco: "Tio", telefone: "(61) 99999-3333", autorizado: "SIM", observacao: "Autorizado às sextas." },
        { id_aluno: "1", nome: "Maria Helena", parentesco: "Avó", telefone: "(61) 99999-4444", autorizado: "NÃO", observacao: "Não autorizada temporariamente." },
        { id_aluno: "2", nome: "Marcos Silva", parentesco: "Pai", telefone: "(61) 99999-5555", autorizado: "SIM", observacao: "Buscar todos os dias." },
        { id_aluno: "3", nome: "Clara Rocha", parentesco: "Mãe", telefone: "(61) 99999-6666", autorizado: "SIM", observacao: "Buscar todos os dias." }
    ],
    // ABA 4: Carteirinhas
    carteirinhas: [
        { codigo: "CA-2026-000487", id_aluno: "1", status: "Ativa", validade: "31/12/2026", uuid: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6" },
        { codigo: "CA-2026-000102", id_aluno: "2", status: "Cancelada", validade: "31/12/2026", uuid: "a28d5fae-8dec-22d0-b765-00b0c91e7cf8" },
        { codigo: "CA-2026-000099", id_aluno: "3", status: "Ativa", validade: "01/07/2026", uuid: "c98f6fae-9dec-33d0-c765-00c0c91e8df9" } // Expirada
    ]
};

// URL padrão do Google Sheets (a ser preenchida pelo usuário posteriormente)
const GOOGLE_SHEETS_CSV_URL = ""; 

let alunosCarregados = [];

// Função Inicial ao Carregar
async function iniciarPainel() {
    // 1. Tentar buscar dados do Sheets
    alunosCarregados = await obterDadosRelacionais();

    // 2. Renderizar na Tabela
    renderizarTabelaAlunos(alunosCarregados);

    // 3. Atualizar Contador de Alunos
    document.getElementById("total-alunos-count").innerText = alunosCarregados.length;
}

// Junta as tabelas relacionais por meio do ID Aluno
async function obterDadosRelacionais() {
    let db = SIGEA_MOCK_DATABASE;

    // Caso o usuário insira a URL do Google Sheets futuramente
    if (GOOGLE_SHEETS_CSV_URL) {
        try {
            // Exemplo de mesclagem real de abas via Fetch CSV:
            // const resp = await fetch(GOOGLE_SHEETS_CSV_URL);
            // const text = await resp.text();
            // ... parse das abas ...
        } catch (e) {
            console.warn("Falha ao buscar dados do Google Sheets. Usando Banco Local/Offline de Fallback.");
        }
    }

    // Mescla relacional dos dados em memória
    return db.alunos.map(aluno => {
        const carteirinha = db.carteirinhas.find(c => c.id_aluno === aluno.id) || {};
        const responsavel = db.responsavel_principal.find(r => r.id_aluno === aluno.id) || {};
        
        return {
            id: aluno.id,
            matricula: aluno.matricula,
            nome: aluno.nome,
            turma: aluno.turma,
            serie: aluno.serie,
            turno: aluno.turno,
            professor: aluno.professor,
            situacao: aluno.situacao,
            foto: aluno.foto,
            carteirinha_codigo: carteirinha.codigo || "S/C",
            carteirinha_status: carteirinha.status || "Inativa",
            carteirinha_validade: carteirinha.validade || "--/--/----",
            carteirinha_uuid: carteirinha.uuid || "",
            responsavel_nome: responsavel.nome || "Não Cadastrado",
            responsavel_parentesco: responsavel.parentesco || ""
        };
    });
}

// Renderiza a Tabela Administrativa
function renderizarTabelaAlunos(lista) {
    const tbody = document.getElementById("alunos-table-body");
    tbody.innerHTML = "";

    lista.forEach(aluno => {
        const tr = document.createElement("tr");

        let statusClass = "db-status loaded";
        let statusText = aluno.carteirinha_status;

        // Formatação visual do Status do crachá
        if (aluno.carteirinha_status === "Ativa") {
            // Validar data
            const parts = aluno.carteirinha_validade.split('/');
            const validDate = new Date(parts[2], parts[1] - 1, parts[0]);
            const hoje = new Date();
            hoje.setHours(0,0,0,0);
            if (validDate < hoje) {
                statusClass = "db-status error";
                statusText = "Expirada";
            } else {
                statusClass = "db-status loaded";
                statusText = "Ativa";
            }
        } else if (aluno.carteirinha_status === "Cancelada") {
            statusClass = "db-status error";
            statusText = "Cancelada";
        }

        tr.innerHTML = `
            <td style="text-align:center;"><input type="checkbox" class="aluno-check" value="${aluno.carteirinha_codigo}" onclick="atualizarSelecao()"></td>
            <td><img src="${aluno.foto}" class="student-row-img" alt="Foto"></td>
            <td style="font-weight:700; color:#fff;">${aluno.nome}</td>
            <td>${aluno.turma} ${aluno.serie}</td>
            <td style="font-family:monospace; font-weight:700; color:var(--primary);">${aluno.carteirinha_codigo}</td>
            <td>${aluno.responsavel_nome} (${aluno.responsavel_parentesco})</td>
            <td>
                <span class="${statusClass}">
                    <span class="dot" style="background-color: ${statusText === 'Ativa' ? '#6db87a' : statusText === 'Expirada' ? '#ffd43b' : '#ff6b6b'};"></span>
                    <span style="font-size:0.75rem; font-weight:600; color: ${statusText === 'Ativa' ? '#6db87a' : statusText === 'Expirada' ? '#ffd43b' : '#ff6b6b'};">${statusText}</span>
                </span>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Filtro em Tempo Real por Nome e Turma
function filtrarAlunos() {
    const nomeFiltro = document.getElementById("search-name").value.toLowerCase();
    const turmaFiltro = document.getElementById("search-class").value.toLowerCase();

    const filtrados = alunosCarregados.filter(aluno => {
        const bateNome = aluno.nome.toLowerCase().includes(nomeFiltro);
        const bateTurma = `${aluno.turma} ${aluno.serie}`.toLowerCase().includes(turmaFiltro);
        return bateNome && bateTurma;
    });

    renderizarTabelaAlunos(filtrados);
}

// Seleção em Lote - Checkbox Cabeçalho
function toggleSelectAll(master) {
    const checks = document.querySelectorAll(".aluno-check");
    checks.forEach(c => c.checked = master.checked);
    atualizarSelecao();
}

// Atualiza a Fila e as Prévia de Impressão A4
function atualizarSelecao() {
    const checks = document.querySelectorAll(".aluno-check:checked");
    document.getElementById("selected-alunos-count").innerText = checks.length;

    const gradeFrentes = document.getElementById("grade-frentes");
    const gradeVersos = document.getElementById("grade-versos");

    gradeFrentes.innerHTML = "";
    gradeVersos.innerHTML = "";

    // Array para guardar os códigos de barras/QRs que serão desenhados depois de renderizar os elementos do DOM
    const qrsParaGerar = [];

    checks.forEach(check => {
        const codigo = check.value;
        const aluno = alunosCarregados.find(a => a.carteirinha_codigo === codigo);

        if (aluno) {
            // 1. Injetar a FRENTE do Crachá
            const cardFrente = document.createElement("div");
            cardFrente.className = "carteirinha-fisica";
            cardFrente.innerHTML = `
                <div class="barra-lateral-verde"></div>
                <div class="card-frente-body">
                    <div class="card-header-top">
                        <img src="logo_escola.svg" class="logo-escola-crachas" alt="Logo Escola">
                        <div class="header-text-school">
                            <span class="header-line1">Escola Municipal</span>
                            <span class="header-line2">Castro Alves</span>
                        </div>
                    </div>
                    <div class="card-frente-content">
                        <div class="frente-foto-moldura">
                            <img src="${aluno.foto}" alt="Foto">
                        </div>
                        <div class="frente-dados-texto">
                            <div class="dado-item-fisico">
                                <span class="dado-label-fisico">Aluno(a)</span>
                                <span class="dado-value-fisico nome-aluno-destaque">${aluno.nome}</span>
                            </div>
                            <div class="dado-item-fisico" style="margin-top: 1mm;">
                                <span class="dado-label-fisico">Série / Turma / Turno</span>
                                <span class="dado-value-fisico">${aluno.turma} ${aluno.serie} - ${aluno.turno}</span>
                            </div>
                            <div class="dado-item-fisico" style="margin-top: 1mm;">
                                <span class="dado-label-fisico">Matrícula</span>
                                <span class="dado-value-fisico" style="font-family:monospace;">${aluno.matricula}</span>
                            </div>
                        </div>
                    </div>
                    <div class="caixa-validade-fisica">
                        <span class="lbl">Validade</span>
                        <span class="val">${aluno.carteirinha_validade.split('/')[1]}/${aluno.carteirinha_validade.split('/')[2]}</span>
                    </div>
                    <div class="card-frente-footer">
                        <span class="tipo-documento">IDENTIDADE ESTUDANTIL</span>
                        <span class="codigo-id">${aluno.carteirinha_codigo}</span>
                    </div>
                </div>
            `;
            gradeFrentes.appendChild(cardFrente);

            // 2. Injetar o VERSO do Crachá
            const cardVerso = document.createElement("div");
            cardVerso.className = "carteirinha-fisica verso-card";
            
            // Geramos uma div para o QRCode dinâmica
            const qrId = `qr-${aluno.carteirinha_codigo}`;

            cardVerso.innerHTML = `
                <div class="card-verso-body">
                    <span class="card-verso-title">AUTORIZAÇÃO DE RETIRADA</span>
                    <div class="verso-dados-lista">
                        <div class="item">
                            <span class="label">Responsável Principal</span>
                            <span class="value">${aluno.responsavel_nome} (${aluno.responsavel_parentesco})</span>
                        </div>
                        <div class="item">
                            <span class="label">Autorização Escolar Especial</span>
                            <span class="value">Saída antecipada do AEE às 17h.</span>
                        </div>
                    </div>
                    
                    <p class="instrucao-uso">Acesso permitido para portadores autorizados mediante consulta do QR Code.</p>
                    
                    <div class="area-assinatura-carimbo">
                        <div class="bloco-assinatura">
                            <div class="linha-ass"></div>
                            <span class="cargo-ass">Direção Escolar</span>
                        </div>
                        <div class="bloco-carimbo-inep">
                            <span class="title">Carimbo Físico</span>
                            <span>Código INEP<br>Escola Castro Alves</span>
                        </div>
                    </div>
                    <div class="codigo-barras-decorativo"></div>
                    <p class="verso-footer-note">Documento de uso pessoal do responsável e intransferível.</p>
                </div>
                <div class="barra-lateral-verde">
                    <img src="logo_prefeitura.svg" class="logo-mini-verso" alt="Prefeitura">
                    <div class="qr-code-fisico" id="${qrId}"></div>
                </div>
            `;
            gradeVersos.appendChild(cardVerso);

            // Armazenamos para gerar o QR code físico
            qrsParaGerar.push({
                elementId: qrId,
                url: `${window.location.origin}/validador.html?id=${aluno.carteirinha_codigo}`
            });
        }
    });

    // Renderiza os QR Codes físicos nos crachás gerados
    // O QRCodeJs precisa do elemento montado no DOM para funcionar
    setTimeout(() => {
        qrsParaGerar.forEach(item => {
            const el = document.getElementById(item.elementId);
            if (el) {
                el.innerHTML = ""; // Limpa placeholder
                new QRCode(el, {
                    text: item.url,
                    width: 70, // Tamanho ideal em pixels para renderização nítida no verso do crachá
                    height: 70,
                    colorDark: "#111111",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.M // Nível médio de correção para leitura rápida do celular
                });
            }
        });
    }, 100);
}

window.onload = iniciarPainel;
