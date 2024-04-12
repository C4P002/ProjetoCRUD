fetch('http://localhost:3000/users' ).then(function (response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}).then(function (data) {
    data.map((pessoa) => {
        var exibirUser = document.getElementById("exibirUser");

        var newUserSquare = document.createElement("div");
        newUserSquare.classList.add("userSquare");

        var credContainer = document.createElement("div");
        credContainer.classList.add("credContainer");

        credContainer.innerText =  "Nome: " + pessoa.nome + "\nEmail: " + pessoa.email + "\nSexo: " + pessoa.sexo + "\nUsuário: " + pessoa.usuario;
        newUserSquare.appendChild(credContainer)

        var buttonContainer = document.createElement("div");
        buttonContainer.classList.add("buttonContainer")

        // BUT DE ATUALIZAR USUÁRIO
        var butUpdate = document.createElement("button");
        butUpdate.innerText = "?";
        butUpdate.classList.add("boxBut");
        butUpdate.onclick = function() {
            document.getElementById("usuario").value = pessoa.usuario;
            document.getElementById("nome").value = pessoa.nome;
            document.getElementById("sexo").value = pessoa.sexo;
            window.scrollTo(0, 0);
        };

        // DELETANDO USUÁRIO
        var butDelete = document.createElement("button");
        butDelete.innerText = "X";
        butDelete.classList.add("boxBut");
        butDelete.onclick = function() {
            usuario  = pessoa.usuario;
            fetch(`http://localhost:3000/users?usuario=${usuario}`)
            .then(response => response.json())
            .then(data => {
                const idUsuario = data[0].id;
                return fetch(`http://localhost:3000/users/${idUsuario}`, {
                  method: 'DELETE',
                });
            })
            alert(`Usuário ${usuario} deletado!`);
            location.reload();
        };

        buttonContainer.appendChild(butUpdate);
        buttonContainer.appendChild(butDelete);

        newUserSquare.appendChild(buttonContainer);
        exibirUser.appendChild(newUserSquare);
    })
}).catch(function (err) {   
    console.warn('Something went wrong.' , err);
});

// CADASTRANDO USUÁRIO
document.getElementById("CaixaFormulário").onsubmit = () => {
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
                alert("Cadastro enviado!");
                location.reload();
            } else {
                alert(`O usuário ${usuario} já existe!`);
            }
        })
}

document.getElementById("AtualizarInput").onsubmit = () => {
    let usuario = document.getElementById("usuario").value;
    let novoNome = document.getElementById("nome").value;
    let novoEmail = document.getElementById("email").value;

    const novosDados = {
        nome: novoNome,
        email: novoEmail
      };

    fetch(`http://localhost:3000/users?usuario=${usuario}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            alert("Dados atualizados!");
            location.reload();
            const idUsuario = data[0].id;
            // Atualiza os dados do usuário
            return fetch(`http://localhost:3000/users/${idUsuario}`, {
                method: 'PATCH', // Ou 'PUT' se deseja substituir todos os dados
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novosDados)
            });
        } else {
            alert("Não altere o usuário!");
          }  
    })
}