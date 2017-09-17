$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

var timerId = null;

function iniciarJogo(){

	var nivel = document.getElementById('nivel_jogo').value;
	window.location.href = "jogo.html?"+nivel;
}


function startJogo(){
	var url = window.location.search;
	var nivel_jogo = url.replace("?","");

	var tempo_segundos = 0;

	if (nivel_jogo == 1) {
		tempo_segundos = 120;
	}else if (nivel_jogo == 2) {
		tempo_segundos = 60;
	}else {
		tempo_segundos = 30;
	}

	document.getElementById('cronometro').innerHTML = tempo_segundos;

	var qtde_baloes = 80;
	
	cria_baloes(qtde_baloes);

	//imprimir qtde baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos);
}



function contagem_tempo (segundos){

	var segundos = segundos -1;	

	if (segundos < 0) {
		clearTimeout (timerId);
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;
	
	timerId = setTimeout('contagem_tempo ('+segundos+')', 1000);
}

function game_over(){
	remove_eventos_baloes();
	alert("Acabou o tempo");
}


function cria_baloes(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){

		var balao = document.createElement("img");
		balao.src = 'imgs/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.onclick = function(){
			estourar_baloes(this);
		}
		balao.id = 'b'+i;

		document.getElementById('cenario_id').appendChild(balao);
	}
}

function estourar_baloes(e){
	var id_balao = e.id;
	document.getElementById(id_balao).setAttribute("onclick","");
	document.getElementById(id_balao).src = "imgs/balao_azul_pequeno_estourado.png";

	pontuacao(-1);
}


function pontuacao(acao){

	var baloes_inteiros = document.getElementById("baloes_inteiros").innerHTML;
	var baloes_estourados = document.getElementById("baloes_estourados").innerHTML;


	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros--;
	baloes_estourados++;

	document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros;
	document.getElementById("baloes_estourados").innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
	if (baloes_inteiros == 0) {
		alert("Parabens vc conseguio estourar todos os baloes");
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout (timerId);
}


function remove_eventos_baloes() {
    var i = 1; 
     
    while(document.getElementById('b'+i)) {

        document.getElementById('b'+i).onclick = '';
        i++; 
    }
}