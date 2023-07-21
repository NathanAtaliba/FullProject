// Variáveis globais
let editIndex = -1; // Índice do registro sendo editado (-1 quando nenhum registro está sendo editado)
const form = document.getElementById('form');
const tabelaCorpo = document.getElementById('tabela-corpo');
const db = firebase.firestore();
let registros = []
// Função para exibir os dados na tabela
function renderizarTabela() {
  tabelaCorpo.innerHTML = '';
  // Iterar sobre a lista de registros (simulada aqui como um array)
  for (let i = 0; i < registros.length; i++) {
    const registro = registros[i];
    console.log(registro)
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
    
    const dataCell = document.createElement('td');
    dataCell.textContent = registro.horaMarcada;
    row.appendChild(dataCell);
    
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
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const numero = document.getElementById('celular').value;
  const data = document.getElementById('datetime').value;
  if (nome.trim() === '' || email.trim() === ''|| numero.trim() === ''|| data.trim() === '') {
    alert('Preencha todos os campos!');
    return;
  }

  // Se estiver editando um registro, atualizar os dados
  if (editIndex !== -1) {
    registros[editIndex].nome = nome;
    registros[editIndex].email = email;
    registros[editIndex].numero = numero;
    registros[editIndex].data = data;
    editIndex = -1;
  } else {
    // Caso contrário, adicionar um novo registro
    registros.push({ nome, email, numero, data });
  }
  limparFormulario();
  renderizarTabela();
}

// Função para editar um registro
function editarRegistro(index) {
  const registro = registros[index];
  document.getElementById('nome').value = registro.nome;
  document.getElementById('email').value = registro.email;
  document.getElementById('celular').value = registro.numero;
  document.getElementById('datetime').value = registro.horaMarcada;
  btn_texto = document.getElementById("salvar")
  btn_texto.innerText = `Salvar`;
  editIndex = index;
}

// Função para excluir um registro
function excluirRegistro(index) {
  registros.splice(index, 1);
  renderizarTabela();
}

// Event listeners
form.addEventListener('submit', salvarRegistro);
document.getElementById('cancelar').addEventListener('click', limparFormulario);
// Dados (simulados aqui como um array)
// Dados do banco de dados em forma de dicionario

async function lista(){
const condicao = document.getElementById("title")
if(condicao == 'Cliente'){
  const clientes = db.collection('users')
  const citySnapshot = await clientes.get();
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}else{
  const cabeleireiros = db.collection('cabeleireiros')
  const citySnapshot = await cabeleireiros.get();
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

}


function OptionsCabeleireiro(){
const texto =  document.getElementById("title")
const placeholder = `Descrição`
nome = document.getElementById("table1")
email = document.getElementById("table2")
numero = document.getElementById("table3")
horaMarcada = document.getElementById("table4")
btn_texto = document.getElementById("salvar")
nome.innerHTML = `Nome`
email.innerHTML = `Email`
numero.innerHTML = `Numero`
horaMarcada.innerHTML = `Descrição`
desc = document.getElementById("datetime")
desc.placeholder= placeholder;
desc.type = `text`
texto.innerHTML = `Cabeleireiro`
btn_texto.innerHTML = `Adicionar`
}

function OptionsCliente(){
nome = document.getElementById("table1")
email = document.getElementById("table2")
numero = document.getElementById("table3")
horaMarcada = document.getElementById("table4")
btn_texto = document.getElementById("salvar")
nome.innerHTML = `Nome`
email.innerHTML = `Email`
numero.innerHTML = `Numero`
horaMarcada.innerHTML = `Hora marcada`
const texto =  document.getElementById("title")
date = document.getElementById("datetime")
date.type = `datetime-local`
texto.innerHTML = `Cliente`
btn_texto.innerHTML = `Adicionar`
console.log(btn_texto.value)
}

// Get a list of cabeleireiros ou clientes from your database
async function search() {
  const text = document.getElementById('title').innerText
  if(text == 'Cliente'){
    const wordSearch = document.getElementById("text").value
    const clientes = db.collection('users');
    const citySnapshot = await clientes.get();
    const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
  }
  else{
    const cabeleireiros = db.collection('cabeleleiros');
    const citySnapshot = await cabeleireiros.get();
    const cityList = citySnapshot.docs.map(doc => doc.data());
    console.log(cityList);
  return cityList;
  }
}

//Adicionando clientes e cabeleiros no banco de dados
function addObject(){
  const texto =  document.getElementById("title").innerText
  const condicao = document.getElementById("salvar").innerText
  if(condicao == 'Adicionar'){
    console.log(texto)
  if(texto == `Cabeleireiro`){
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const numero = document.getElementById('celular').value;
    const data = document.getElementById('datetime').value;
  db.collection('cabeleireiros').add({
    nome: nome,
    email: email,
    numero: numero,
    data: data
  })
  console.log('Cabeleireiro criado com sucesso!')
  alert('Cabeleireiro criado com sucesso!')
}
  else{
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const numero = document.getElementById('celular').value;
    const desc = document.getElementById('datetime').value;
    db.collection('users').add({
      nome: nome,
      email: email,
      numero: numero,
      desc: desc
    })
    console.log('Cliente criado com sucesso!')
    alert('Cliente criado com sucesso!')
  }
}
else{
  alert('Conta atualizada com sucesso!')
}
}
// Inicializar a tabela
async function initialize() {
  registros = await lista(); // Aguarda a resolução da promessa e atribui a lista diretamente
  renderizarTabela();
}
// Inicializar a tabela

initialize();