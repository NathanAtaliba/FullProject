function reset(){
    var email = window.document.getElementById('email')
    var password1 = window.document.getElementById('password1')
    var password2 = window.document.getElementById('password2')
    var number = window.document.getElementById('number')
    email.value = ``
    password1.value = ``
    password2.value = ``
    number.value = ``
}
function createUser(){
    const nome = document.getElementById('name')
    const email = document.getElementById('email')
    const password1 = document.getElementById('password1')
    const password2 = document.getElementById('password2')
    const number = document.getElementById('number')
    if(password1.value == password2.value){
        if(number.value != '0' ){
            firebase.auth().createUserWithEmailAndPassword(email.value, password1.value)
            .then(data =>{
            const uid = data.user.uid;
            const users = firebase.firestore().collection('users');
            users.doc(uid).set({
                nome: nome.value, email: email.value, password: password1.value, numero: number.value, data: ""
            });
            alert('Conta criada com sucesso!')
            email.value = ``
            password1.value = ``
            number.value = ``
            password2.value = ``
        })       
        .catch(error =>{
            if(error.code == 'auth/email-already-in-use'){
                alert('Esse email ja está em uso por outro usuário!')
            }else{
                alert(error.message)
            }
        });
        }else{
            alert('numero não corresponde!')
    }
    }else{
        alert("As senhas não batem!")
        password1.value = ``
        password2.value = ``
    }
    




}