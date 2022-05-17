let qtdCartas;
let tipos =  ['bobrossparrot', 'explodyparrot', 'fiestaparrot', 'metalparrot', 'revertitparrot', 'tripletsparrot', 'unicornparrot'];
let baralho = [];

let primeiraCarta;
let segundaCarta;
let jogadas = 0;
let cartasCertas = 0;
let timer = 0;
let idTimer;

function jogoInValido() {
    if (isNaN(qtdCartas) || qtdCartas < 4 || qtdCartas > 14 || (qtdCartas % 2) === 1) {
        return true;
    }
    return false;
}


function perguntarQuantidade () {
    
    qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar?"));
    //qtdCartas = 4;
    while(jogoInValido()) {
        qtdCartas = parseInt(prompt("Com quantas cartas você quer jogar?"));
    }
}

function gerarBaralho () {

    for (let i = 0 ; i < (qtdCartas / 2) ; i ++) {
        const rand = Math.floor(Math.random() * (tipos.length  - 0));
        const carta = tipos[rand];
        baralho.push(carta);
        baralho.push(carta);
    }
   baralho.sort(comparador);
   renderizarCartas();
   console.log(baralho)
}

function renderizarCartas () {
    const tabuleiro = document.querySelector(".tabuleiro");

    for (let i = 0 ; i < baralho.length ; i ++) {
        let templateCarta = `
            <li class="carta" onClick="virarCarta(this)">
                <div class='front-face face'>
                    <img src='imagens/front.png'>
                </div>
                <div class='back-face face'>
                    <img src='imagens/${baralho[i]}.gif'>
                </div>
            </li>
        `
        tabuleiro.innerHTML += templateCarta;
    }
}

function virarCarta (cartaClicada) {
    
    if (primeiraCarta === undefined && jogadas === 0) {
        inicarTimer();
    }
    if (cartaClicada.classList.contains("virada") || segundaCarta !== undefined) {
        return;
    }

    jogadas++;
    cartaClicada.classList.add("virada");

    if (primeiraCarta === undefined) {
        primeiraCarta = cartaClicada;
    } else {
        segundaCarta = cartaClicada;
        //SE TIVER CLICADO EM DUAS
        if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
            cartasCertas += 2;
            //VERIFICAR SE O JOGO TERMINOU
            verificarFimJogo();
            resetarCartas();
        } else {
            //CLICOU EM DUAS E NÃO ACERTOU
            setTimeout(desvirarCartas, 1000);
        }
    }


}
//SO SABE DESVIRAR CARTAS
function desvirarCartas () {
    primeiraCarta.classList.remove("virada");
    segundaCarta.classList.remove("virada");
    resetarCartas();
}
//SO SABE ZERAR VARIAVEIS
function resetarCartas () {
    primeiraCarta = undefined;
    segundaCarta = undefined;
}

function verificarFimJogo () {
    if (cartasCertas === qtdCartas) {
        clearInterval(idTimer);
        setTimeout(alert, 1000, `Você venceu em ${jogadas} jogadas e em ${timer} segundos`);

        const resposta = prompt("Você quer jogar novamente?");
        if (resposta === "sim") {
            window.location.reload();
        }
    }
}

function comparador () {
    return Math.random () - 0.5;
}

perguntarQuantidade();
gerarBaralho();

function inicarTimer() {
    idTimer = setInterval(function () {
        timer ++;
        document.querySelector(".relogio").innerHTML = timer;
    }, 1000);
}
