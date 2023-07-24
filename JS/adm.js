// Variáveis globais
let editIndex = -1; // Índice do registro sendo editado (-1 quando nenhum registro está sendo editado)
const form = document.getElementById('form');
const tabelaCorpo = document.getElementById('tabela-corpo');
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
  
    if(condicao == "Cabeleireiro"){
      const numeroCell = document.createElement('td');
      numeroCell.textContent = registro.numero;
      row.appendChild(numeroCell);   

      const descCell = document.createElement('td');
      descCell.textContent = registro.desc;
      row.appendChild(descCell); 
    }
    else{
      const senhaCell = document.createElement('td');
      senhaCell.textContent = registro.senha;
      senhaCell.classList.add("senha-cell");
      senhaCell.textContent = registro.senha;
      row.appendChild(senhaCell)
      
      const dataCell = document.createElement('td');
      dataCell.textContent = registro.data;
      row.appendChild(dataCell);
    
      const numeroCell = document.createElement('td');
    numeroCell.textContent = registro.numero;
    row.appendChild(numeroCell);   
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
  const condicao = document.getElementById("title").innerHTML
  if(condicao == 'Cabeleireiro'){
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('celular').value = '';
  document.getElementById('datetime').value = '';
}else{
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('celular').value = '';
  document.getElementById('password').value = '';
  document.getElementById('datetime').value = ''
}
}

// Função para adicionar ou atualizar um registro
function salvarRegistro(event) {
  event.preventDefault();
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

// Função para editar um registro
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
  renderizarTabela();
}

// Event listeners
form.addEventListener('submit', salvarRegistro);
document.getElementById('cancelar').addEventListener('click', limparFormulario);

// Dados (simulados aqui como um array)
// Dados do banco de dados em forma de dicionario
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


function OptionsCabeleireiro(){
const texto =  document.getElementById("title")
const placeholder = `Descrição`
nome = document.getElementById("table1")
email = document.getElementById("table2")
password = document.getElementById("table3")
numero = document.getElementById("table4")
horaMarcada = document.getElementById("table5")
btn_texto = document.getElementById("salvar")
passwordContainer = document.getElementById("password")
nome.innerHTML = `Nome`
email.innerHTML = `Email`
numero.innerHTML = `Numero`
password.innerHTML = ``
horaMarcada.innerHTML = `Descrição`
desc = document.getElementById("datetime")
desc.placeholder= placeholder;
desc.type = `text`
texto.innerHTML = `Cabeleireiro`
btn_texto.innerHTML = `Adicionar`
password.remove()
if(passwordContainer){
form.removeChild(passwordContainer)
}
initialize()
}

function OptionsCliente(){
if(document.getElementById("table3")){

}else{
  const linha = document.getElementById("linha")
  const email = document.getElementById("table2")
  password = document.createElement('th');
  password.innerHTML = `Senha`
  password.class ='table3'
  password.id = 'table3'
  password.textContent = 'Senha';
  linha.appendChild(password)
  linha.insertBefore(password, email.nextSibling)
}
nome = document.getElementById("table1")
email = document.getElementById("table2")
numero = document.getElementById("table4")
horaMarcada = document.getElementById("table5")
btn_texto = document.getElementById("salvar")
emailContainer = document.getElementById("email")
nome.innerHTML = `Nome`
email.innerHTML = `Email`
numero.innerHTML = `Numero`
horaMarcada.innerHTML = `Hora marcada`
const texto =  document.getElementById("title")
date = document.getElementById  ("datetime")
date.type = `datetime-local`
texto.innerHTML = `Cliente`
btn_texto.innerHTML = `Adicionar`
if(document.getElementById('password')){}
else{
passwordContainer = document.createElement('input');
passwordContainer.id = 'password' 
passwordContainer.type = 'password'
passwordContainer.placeholder = 'Senha'
form.appendChild(passwordContainer)
form.insertBefore(passwordContainer, emailContainer.nextSibling)
}
initialize()
}

// Get a list of cabeleireiros ou clientes from your database
async function search() {
  const text = document.getElementById('title').innerText
  if(text == 'Cliente'){
    const wordSearch = document.getElementById("text").value
    const clientes = db.collection('users');
    const clienteSnapshot = await clientes.get();
    const clienteList = clienteSnapshot.docs.map(doc => doc.data());
  return clienteList;
  }
  else{
    const cabeleireiros = db.collection('cabeleleiros');
    const cabeleireiroSnapshot = await cabeleireiros.get();
    const cabeleireiroList = cabeleireiroSnapshot.docs.map(doc => doc.data());
  return cabeleireiroList;
  }
}

//Adicionando clientes e cabeleiros no banco de dados
function addObject(){
  const texto =  document.getElementById("title").innerText
  const condicao = document.getElementById("salvar").innerText
  if(condicao == 'Adicionar'){
    if(texto == `Cabeleireiro`){
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const numero = document.getElementById('celular').value;
      const desc = document.getElementById('datetime').value;
      db.collection('cabeleireiros').add({
        nome: nome,
        email: email,
        numero: numero,
        desc: desc
  })
  console.log(desc)
  alert('Cabeleireiro criado com sucesso!')
}
    else{
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const numero = document.getElementById('celular').value;
      const data = document.getElementById('datetime').value;
      const senha = document.getElementById('password').value
      db.collection('users').add({
        nome: nome,
        email: email,
        senha: senha,
        numero: numero,
        data: data
    })
  alert('Cliente criado com sucesso!')
  }
}
else{
  alert('Conta atualizada com sucesso!')
}
initialize()
}
// Inicializar a tabela
async function initialize() {
  registros = await lista(); // Aguarda a resolução da promessa e atribui a lista diretamente
  renderizarTabela();
}
// Inicializar a tabela
initialize();