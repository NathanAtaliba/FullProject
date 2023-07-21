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
    var name = window.document.getElementById('name')
    var email = window.document.getElementById('email')
    var password1 = window.document.getElementById('password1')
    var password2 = window.document.getElementById('password2')
    var number = window.document.getElementById('number')
    if(password1.value == password2.value){
        if(number.value == '/^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/' ){
            firebase.auth().createUserWithEmailAndPassword(email.value, password1.value)
            .then(data =>{
            const uid = data.user.uid;
            const users = firebase.firestore().collection('users');
            users.doc(uid).set({
                name: name.value, email: email.value, password: password1.value, number: number.value
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