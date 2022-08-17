// A primeira variável — numeroAleatorio — recebe um número aleatório entre 1 e 100, calculado usando um algoritmo matemático.
let numeroAleatorio = Math.floor(Math.random() * 100) + 1;

// As três primeiras constantes são feitas para armazenar uma referência aos parágrafos de resultados em nosso HTML e são usadas para inserir valores nos parágrafos posteriormente no código (observe como eles estão dentro de um <div>elemento, que é usado para selecionar todos os três mais tarde para resetar, quando reiniciarmos o jogo):
const palpites = document.querySelector('.palpites');
const ultimoResultado = document.querySelector('.ultimoResultado');
const baixoOuAlto = document.querySelector('.baixoOuAlto');

// As próximas duas constantes armazenam referências à entrada de texto do formulário e ao botão de envio e são usadas para controlar o envio do palpite posteriormente.
const envioPalpite = document.querySelector('.envioPalpite');
const campoPalpite = document.querySelector('.campoPalpite');

// Nossas duas variáveis ​​finais armazenam uma contagem de palpites de 1 (usada para registrar quantos palpites o jogador teve) e uma referência a um botão de reset que ainda não existe (mas existirá mais tarde).
let contagemPalpites = 1;
let botaoReinicio;

function conferirPalpite() {
    // A primeira linha declara uma variável chamada userGuesse define seu valor para o valor atual inserido no campo de texto. Também executamos esse valor por meio do Number()construtor interno, apenas para garantir que o valor seja definitivamente um número. Como não estamos alterando essa variável, vamos declará-la usando const.
    const palpiteUsuario = Number(campoPalpite.value);
    // Em seguida, encontramos nosso primeiro bloco de código condicional. Um bloco de código condicional permite que você execute o código seletivamente, dependendo se uma determinada condição é verdadeira ou não. Parece um pouco como uma função, mas não é. A forma mais simples de bloco condicional começa com a palavra-chave if, depois alguns parênteses e algumas chaves. Dentro dos parênteses incluímos um teste. Se o teste retornar true, executamos o código dentro das chaves. Se não, nós não, e passamos para o próximo pedaço de código. Neste caso, o teste está testando se a guessCountvariável é igual a 1(ou seja, se esta é a primeira vez do jogador ou não):
    if (contagemPalpites === 1) {
      palpites.textContent = 'Palpites anteriores: ';
    }
    palpites.textContent += palpiteUsuario + ' ';
  
    if (palpiteUsuario === numeroAleatorio) {
      ultimoResultado.textContent = 'Parabéns! Você acertou!';
      ultimoResultado.style.backgroundColor = 'green';
      baixoOuAlto.textContent = '';
      configFimDeJogo();
    } else if (contagemPalpites === 10) {
      ultimoResultado.textContent = '!!!FIM DE JOGO!!!';
      baixoOuAlto.textContent = '';
      configFimDeJogo();
    } else {
      ultimoResultado.textContent = 'Errado!';
      ultimoResultado.style.backgroundColor = 'red';
      if(palpiteUsuario < numeroAleatorio) {
        baixoOuAlto.textContent = 'Seu palpite está muito baixo!';
      } else if(palpiteUsuario > numeroAleatorio) {
        baixoOuAlto.textContent = 'Seu palpite está muito alto!';
      }
    }
  
    contagemPalpites++;
    campoPalpite.value = '';
    campoPalpite.focus();
  }

  envioPalpite.addEventListener('click', conferirPalpite);

  function configFimDeJogo() {
    campoPalpite.disabled = true;
    envioPalpite.disabled = true;
    botaoReinicio = document.createElement('button');
    botaoReinicio.textContent = 'Iniciar novo jogo';
    document.body.appendChild(botaoReinicio);
    botaoReinicio.addEventListener('click', reiniciarJogo);
  }

  function reiniciarJogo() {
    contagemPalpites = 1;
  
    var reiniciarParas = document.querySelectorAll('.resultadoParas p');
    for (var i = 0 ; i < reiniciarParas.length ; i++) {
      reiniciarParas[i].textContent = '';
    }
  
    botaoReinicio.parentNode.removeChild(botaoReinicio);
  
    campoPalpite.disabled = false;
    envioPalpite.disabled = false;
    campoPalpite.value = '';
    campoPalpite.focus();
  
    ultimoResultado.style.backgroundColor = 'white';
  
    numeroAleatorio = Math.floor(Math.random() * 100) + 1;
  }

  