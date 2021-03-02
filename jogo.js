function calcularTamanhoTela() {
    altura = window.innerHeight
    largura = window.innerWidth
}

function tamanhoRandomico() {
    id = Math.floor(Math.random() * 3)
    classe = ['mosquito1','mosquito2','mosquito3']
    return classe[id]
}

function ladoRandomico(){
    lado = Math.floor(Math.random()*2)
    if (lado == 1){return 'ladoB'}
    else{return 'ladoA'}
}

function gerarPosicaoRandomica() {

    if (document.querySelector('#mosquito')) {
        document.querySelector('#mosquito').remove()

        if (vidas >= 2) {
            window.location.href = 'game_over.html'
        } else{
            document.querySelectorAll('img')[vidas].src = 'imagens/coracao_vazio.png'
            vidas++
        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 100
    var posicaoY = Math.floor(Math.random() * altura) - 100

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoRandomico() + ' ' + ladoRandomico()
    mosquito.style.position = 'absolute'
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)
}

// Programa Principal

var altura,largura,criaMosquitoTempo
var vidas = 0
var tempo = 20

var nivel = window.location.search.replace('?', '')

if (nivel == 'facil') {criaMosquitoTempo = 2000}
else if (nivel == 'normal') {criaMosquitoTempo = 1500}
else if (nivel == 'dificil') {criaMosquitoTempo = 1000}
else if (nivel == 'saitama') {criaMosquitoTempo = 750}

document.querySelector('#cronometro span').innerHTML = tempo
calcularTamanhoTela()

var cronometro = setInterval(() => {
    tempo--
    document.querySelector('#cronometro span').innerHTML = tempo
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(geraMosquito)
        window.location.href = 'vitoria.html'
    }
}, 1000)

var geraMosquito =  setInterval(() => {
    gerarPosicaoRandomica()
}, criaMosquitoTempo);
