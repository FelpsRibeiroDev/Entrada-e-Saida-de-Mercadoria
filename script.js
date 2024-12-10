function obterPecas() {
    const pecas = JSON.parse(localStorage.getItem('pecas')) || [];
    return pecas;
}

function salvarPecas(pecas) {
    localStorage.setItem('pecas', JSON.stringify(pecas));
}

document.getElementById('registro')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        window.location.href = 'home.html'; 
    } else {
        alert('Usuário ou senha incorretos!');
    }
});

document.getElementById('entrada')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const nomedaPeca = document.getElementById('nomedaPeca').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const funcionario = document.getElementById('funcionario').value;
    const dataHora = document.getElementById('dataeHora').value;

    if (!nomedaPeca || !quantidade || !funcionario || !dataHora) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    let pecas = obterPecas();


    const index = pecas.findIndex(p => p.nome === nomedaPeca);
    if (index === -1) {
        pecas.push({ nome: nomedaPeca, quantidade, funcionario, dataHora });
    } else {
        pecas[index].quantidade += quantidade;
    }

    salvarPecas(pecas);
    document.getElementById('entrada').reset();
    alert('Entrada de peça registrada com sucesso!');
    exibirTabela();
});


document.getElementById('saida')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const nomedaPeca = document.getElementById('nomedaPeca').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const funcionario = document.getElementById('funcionario').value;
    const dataHora = document.getElementById('dataeHora').value;

    if (!nomedaPeca || !quantidade || !funcionario || !dataHora) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    let pecas = obterPecas();


    const index = pecas.findIndex(p => p.nome === nomedaPeca);
    if (index === -1 || pecas[index].quantidade < quantidade) {
        alert('Peça não encontrada ou quantidade insuficiente!');
        return;
    }

    pecas[index].quantidade -= quantidade;


    if (pecas[index].quantidade === 0) {
        pecas.splice(index, 1);
    }

    salvarPecas(pecas);
    document.getElementById('saida').reset();
    alert('Saída de peça registrada com sucesso!');
    exibirTabela();
});


function exibirTabela() {
    const pecas = obterPecas();
    const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    pecas.forEach((peca, index) => {
        const row = tabela.insertRow();
        row.insertCell(0).textContent = peca.nome;
        row.insertCell(1).textContent = peca.quantidade;
        row.insertCell(2).textContent = peca.funcionario;
        row.insertCell(3).textContent = peca.dataHora;


        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = function() {
            excluirPeca(index);
        };

        const cell = row.insertCell(4);
        cell.appendChild(deleteButton);
    });
}


function excluirPeca(index) {
    let pecas = obterPecas();
    pecas.splice(index, 1);
    salvarPecas(pecas);
    exibirTabela();
}


function filtrarTabela() {
    const filtro = document.getElementById("filtroNome").value.toLowerCase();
    const tabela = document.getElementById('tabela');
    const linhas = tabela.getElementsByTagName('tr');

    Array.from(linhas).forEach((linha, index) => {
        if (index === 0) return; 

        const nome = linha.cells[0].textContent.toLowerCase();
        if (nome.includes(filtro)) {
            linha.style.display = "";
        } else {
            linha.style.display = "none";
        }
    });
}


if (document.getElementById('tabela')) {
    exibirTabela();
}


document.getElementById('filtroNome')?.addEventListener('input', filtrarTabela);
