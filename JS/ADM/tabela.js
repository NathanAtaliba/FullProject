// Variáveis globais
let editIndex = -1; // Índice do registro sendo editado (-1 quando nenhum registro está sendo editado)
const form = document.getElementById('form');
const db = firebase.firestore();
let registros = []

// Função para exibir os dados na tabela
function renderizarTabela() {
  tabelaCorpo.innerHTML = '';
  const condicao = document.getElementById("title").innerText
  // Iterar sobre a lista de registros (simulada aqui como um array)
  for (let i = 0; i < registros.length; i++) {
    const registro = registros[i];
    // Criar uma nova linha na tabela
    const row = document.createElement('tr');
    
    // Adicionar as células (colunas) na linha
    const nomeCell = document.createElement('td');
    nomeCell.textContent = registro.nome;
    row.appendChild(nomeCell);
    
    const emailCell = document.createElement('td');
    emailCell.textContent = registro.email;
    row.appendChild(emailCell);

    const numeroCell = document.createElement('td');
    numeroCell.textContent = registro.numero;
    row.appendChild(numeroCell);
    if(condicao == "Cabeleireiro"){
      const descCell = document.createElement('td');
      descCell.textContent = registro.desc;
      row.appendChild(descCell);
    }
    else{
      const dataCell = document.createElement('td');
      dataCell.textContent = registro.data;
      row.appendChild(dataCell);
  }    
    const acoesCell = document.createElement('td');
    
    // Botão "Editar"
    const editarButton = document.createElement('button');
    editarButton.textContent = 'Editar';
    editarButton.addEventListener('click', () => editarRegistro(i));
    acoesCell.appendChild(editarButton);
    
    // Botão "Excluir"
    const excluirButton = document.createElement('button');
    excluirButton.textContent = 'Excluir';
    excluirButton.addEventListener('click', () => excluirRegistro(i));
    acoesCell.appendChild(excluirButton);

    row.appendChild(acoesCell);
    tabelaCorpo.appendChild(row);
  }
}
// Função para limpar o formulário
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('celular').value = '';
    document.getElementById('datetime').value = '';
  }

// Função para adicionar ou atualizar um registro
function salvarRegistro(event) {
    event.preventDefault();
    initialize();
    const condicao = document.getElementById('title').innerText
    if (editIndex !== -1) {
      if(condicao == 'Cabeleireiro'){
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const numero = document.getElementById('celular').value;
        const desc = document.getElementById('datetime').value;
        if (nome.trim() === '' || email.trim() === ''|| numero.trim() === ''|| desc.trim() === '') {
          alert('Preencha todos os campos!');
          return;
        }
        else{
          var index = editIndex
          console.log(index)
          db.collection('cabeleireiros').get()
          .then((querySnapshot) => {
          let ids = [];
          querySnapshot.forEach((doc) => {
          // Acessar o ID do documento através da propriedade 'id'
          const docID = doc.id;
          ids.push(docID);
          });
          // ID do documento a ser modificado
          console.log('ID do documento que vai ser modificado:', ids[index]);
          db.collection('cabeleireiros').doc(ids[index]).update({
            nome: nome,
            email: email,
            numero: numero,
            desc: desc
          })
          })
        .catch((error) => {
          console.error('Erro ao obter o documento:', error);
        });  
        }   
    }
    else{
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const numero = document.getElementById('celular').value;
      const data = document.getElementById('datetime').value;
      if (nome.trim() === '' || email.trim() === ''|| numero.trim() === ''|| data.trim() === '') {
        alert('Preencha todos os campos!');
        return;
      }
      else{
        var index = editIndex
        db.collection('users').get()
        .then((querySnapshot) => {
          let ids = [];
          querySnapshot.forEach((doc) => {
          // Acessar o ID do documento através da propriedade 'id'
          const docID = doc.id;
          ids.push(docID);
        });
        // ID do documento a ser modificado
        console.log('ID do documento que vai ser modificado:', ids[index]);
        db.collection('users').doc(ids[index]).update({
          nome: nome,
          email: email,
          numero: numero,
          data: data
        })
        })
        .catch((error) => {
          console.error('Erro ao obter o documento:', error); 
        })
        }}
      }
      // Caso contrário
      else{
  
      }  
    limparFormulario();
    renderizarTabela();
  }

  function editarRegistro(index) {
    const registro = registros[index];
    const condicao = document.getElementById("title").innerText
    btn_texto = document.getElementById("salvar")
    btn_texto.innerText = `Salvar`;
    if(condicao == 'Cabeleireiro'){
      document.getElementById('nome').value = registro.nome;
      document.getElementById('email').value = registro.email;
      document.getElementById('celular').value = registro.numero;
      document.getElementById('datetime').value = registro.desc;
    }
    else{
      document.getElementById('nome').value = registro.nome;
      document.getElementById('email').value = registro.email;
      document.getElementById('celular').value = registro.numero;
      document.getElementById('datetime').value = registro.data;
    }
  editIndex = index;
  }
  // Função para excluir um registro
  function excluirRegistro(index) {
    const texto = document.getElementById("title").innerText
    if(texto == 'Cabeleireiro'){
    registros.splice(index, 1);
    db.collection('cabeleireiros').get()
    .then((querySnapshot) => {
      let ids = [];
      querySnapshot.forEach((doc) => {
        // Acessar o ID do documento através da propriedade 'id'
        const docID = doc.id;
        ids.push(docID);
      });
      // ID do documento a ser excluido
      console.log('ID do documento que vai ser deletado:', ids[index]);
      db.collection('cabeleireiros').doc(ids[index]).delete({
       //nome: nome,
       //email: email,
       //numero: numero,
       //desc: desc
      })
      })
    .catch((error) => {
      console.error('Erro ao deletar o documento:', error);
    });
  }
  else{
    registros.splice(index, 1);
    db.collection('users').get()
    .then((querySnapshot) => {
      let ids = [];
      querySnapshot.forEach((doc) => {
        // Acessar o ID do documento através da propriedade 'id'
        const docID = doc.id;
        ids.push(docID);
      });
      // ID do documento a ser excluido
      console.log('ID dos documento que vai ser deletado:', ids[index]);
      db.collection('users').doc(ids[index]).delete({
        //nome: nome,
        //email: email,
        //numero: numero,
        //data: data
      })
      })
    .catch((error) => {
      console.error('Erro ao deletar o documento:', error);
    });
  }
  initialize();
  }
  
  // Event listeners
  form.addEventListener('submit', salvarRegistro);
  document.getElementById('cancelar').addEventListener('click', limparFormulario);
  
  async function lista(){
  const condicao = document.getElementById("title").innerText
  if(condicao == 'Cliente'){
    const clientes = db.collection('users')
    const clienteSnapshot = await clientes.get();
    const clienteList = clienteSnapshot.docs.map(doc => doc.data());
    return clienteList;
  }else{
    const cabeleireiros = db.collection('cabeleireiros')
    const cabeleireiroSnapshot = await cabeleireiros.get();
    const cabeleireiroList = cabeleireiroSnapshot.docs.map(doc => doc.data());
    return cabeleireiroList;
  }
  }