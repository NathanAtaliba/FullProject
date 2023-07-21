function sendEmail() {
    email = window.document.getElementById('email')
    if(email.value == ``){
      alert('Preencha o campo do email que sera enviado o código!')
    }else{
    Email.send({
      Host: "smtp.gmail.com",
      Username: "nathanethamara@gmail.com",
      Password: "oufreds2s2-",
      To: email,
      From: "nathanethamara@gmail.com",
      Subject: "Email de verificação",
      Body: "Well that was easy!!",
    })
      .then(function (message) {
        alert("mail sent successfully")
      })
      .catch( function(error){
        alert('erro: '+ error )
      });
  }}