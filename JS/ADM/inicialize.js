// Inicializar a tabela
async function initialize() {
    registros = await lista(); // Aguarda a resolução da promessa e atribui a lista diretamente
    renderizarTabela();
  }
  // Inicializar a tabela
  initialize();