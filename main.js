function adicionar(e) {
  e.preventDefault()

  const data = new FormData(e.target);
  document.getElementById("CaixaFormulário").onclick = () => {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let sexo = document.getElementById("sexo").value;
    let usuario = document.getElementById("usuario").value;


    const dados = {
      nome: nome,
      email: email,
      sexo: sexo,
      usuario: usuario
    };

    fetch(`http://localhost:3000/users?usuario=${usuario}`)
      .then(response => response.json())
      .then(data => {
        if (data.length <= 0) {
          fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
          });
          console.log("enviando dados ...")
          alert("Cadastro enviado!");
          location.reload();
        } else {
          alert(`O usuário ${usuario} já existe!`);
        }
      })
  }
}

document.getElementById("CaixaFormulário").addEventListener("submit", adicionar);

fetch("http://localhost:3000/users/")
  .then(Response => Response.json())
  .then(dados => {
    
    var user = dados.map(pessoa => "<div></p>" + pessoa.nome + "</br>Email :" + pessoa.email + "</br>Gênero :" + pessoa.genero + "</br> </p> <a onClick=apagar('" + pessoa.id + "')>apagar</a></div>").join('')

  });

function apagar(id) {
  console.log("apagando id :" + id)
  fetch("http://localhost:3000/user/" + id, {
    method: "DELETE"
  }).then(Response => Response.json()).
    then(dados => console.log(dados))
}
