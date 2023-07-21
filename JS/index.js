function reset(){
    var email = window.document.getElementById('email')
    var password = window.document.getElementById('password')
    email.value = ``
    password.value = ``
}

// Função para realizar o login
function fazerLogin() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    console.log(email)
    if(email.value == `` || password.value == ``){
    alert('Preencha os campos obrigatorios!')    
    }
    else{
      if(email.value == 'adm@gmail.com' && password.value == '34713471'){
        location.href = "telaAdm.html";
      }else{
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then(function() {
        // Login bem-sucedido, redirecionar para a página principal
        location.href = "telaCliente.html";
      })
      .catch(function(error) {
        // Ocorreu um erro no login, exibir mensagem de erro
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        alert("Erro no login: " + errorMessage);
        email.value = ``
        password.value = ``
      });
  }}}