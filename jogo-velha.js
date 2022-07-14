const X = "X";
const O = "O";
const rodadasPossiveis = 8;
let i = 0;
let gameOver = false;
let respostasX = "";
let respostasY = "";
let matriz = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

function reiniciarJogo() {
    const elementos = document.querySelectorAll(".quadrado-jogo");

    matriz = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    i = 0;

    gameOver = false;

    elementos.forEach(function (elemento) {

        elemento.innerHTML = "";
    });

    exibirResultado();
    marcarJogadorAtivo(X);
}

function jogada(jogador, oponente, posicaoLinha, posicaoColuna) {

    const quadradoJogo = document.querySelector(`[data-linha='${posicaoLinha}'][data-coluna='${posicaoColuna}']`);

    if (quadradoJogo.innerHTML === "") {

        desenharSimbolo(jogador, posicaoLinha, posicaoColuna);
        marcarJogadorAtivo(oponente);
        let resultado;

        if (i <= rodadasPossiveis) {
            matriz[posicaoLinha - 1][posicaoColuna - 1] = jogador;
            resultado = verificaVencedor();
            if (resultado !== false && resultado !== "") {
                let mensagem = "O jogador " + resultado + " venceu!"

                exibirResultado(mensagem);
                gameOver = true;
            }
            i++;
        }

        if (i === 9 && resultado === false) {
            let mensagem = "Deu velha!"
            exibirResultado(mensagem);
            gameOver = true;
        }
    }
}

function selecionarArea(posicaoLinha, posicaoColuna) {
    if (gameOver) {
        return;
    }

    if (i % 2 == 0) {
        jogada(X, O, posicaoLinha, posicaoColuna);
    } else if (i % 2 != 0) {
        jogada(O, X, posicaoLinha, posicaoColuna);
    }
}

function verificaVencedor() {

    for (let i = 0; i < matriz.length; i++) {
        let resultadoLinha = validarLinha(i);
        let resultadoColuna = validarColuna(i);
        if (resultadoLinha !== false) {
            return resultadoLinha;
        }
        if (resultadoColuna !== false) {
            return resultadoColuna;
        }
    }

    let resultadoDiagonal = validarDiagonal();

    if (resultadoDiagonal !== false) {
        return resultadoDiagonal;
    }

    return false;
}

function validarLinha(x) {
    if ((matriz[x][0] === matriz[x][1]) && (matriz[x][1] === matriz[x][2])) {

        return matriz[x][0];
    }

    return false;
}

function validarColuna(y) {
    if ((matriz[0][y] === matriz[1][y]) && (matriz[1][y] === matriz[2][y])) {

        return matriz[0][y];
    }

    return false;
}

function validarDiagonal() {
    if ((matriz[0][0] === matriz[1][1]) && (matriz[1][1] === matriz[2][2])) {
        return matriz[0][0];
    }
    if ((matriz[0][2] === matriz[1][1]) && (matriz[1][1] === matriz[2][0])) {
        return matriz[0][2];
    }

    return false;
}
