(function( win, doc ) {
  'use strict';

  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */
  var $justNumbers = doc.querySelectorAll('[data-js="just-number"]');
  var $justOperators = doc.querySelectorAll('[data-js="just-operators"]');
  var $input = doc.querySelector('[data-js="visor"]');
  var $CEButton = doc.querySelector('[data-js="ce-button"]');
  var $equalButton = doc.querySelector('[data-js="equal-button"]')
  var operators = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/'
  };
  Array.prototype.forEach.call($justNumbers, function(button) {
    button.addEventListener('click', handleClickNumber, false);
  });

  Array.prototype.forEach.call($justOperators, function(button) {
    button.addEventListener('click', handleClickOperation, false);
  });
  
  $CEButton.addEventListener('click', handleClickCE, false);
  $equalButton.addEventListener('click', handleClickEqual, false);

  function handleClickNumber() {
    $input.value += this.value;
  }

  function handleClickOperation() {
    if( islastOperationAnItem() ) {
      $input.value = $input.value.slice(0, -1) + this.value;
      return;
    }
    $input.value += this.value;
  }
  function handleClickCE() {
    $input.value = '0';
  }

  function islastOperationAnItem() {
    var lastItem = $input.value[$input.value.length - 1];
    return !!operators[lastItem];
  }


  function handleClickEqual() {
    if (islastOperationAnItem()) {
        $input.value = $input.value.slice(0, -1);
    }
    var numbers = $input.value.match(/\d+/g);
    var operator = $input.value.match(/(\D)/g);
    var i = 0;

    $input.value = numbers.reduce(function(acc, atual) {
      switch (operator[i]) {
        case '+':
          i++;
          return +acc + +atual;
        case '-':
          i++;
          return +acc - +atual;
        case '/':
          i++;
          return +acc / +atual;
        case '*':
          i++;
          return +acc * +atual;
      }
    });
  }
})( window, document );
