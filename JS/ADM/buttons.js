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
    initialize()
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
          db.collection('users').add({
            nome: nome,
            email: email,
            numero: numero,
            data: data
        })
      alert('Cliente criado com sucesso!')
      }
    }
    else{
      alert('Conta atualizada com sucesso!')
    }
    initialize();
    }