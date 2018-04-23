function MixedWordsLetters() {
  this.renderForm();
  this.listen();
}

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

MixedWordsLetters.prototype.renderForm = function(el) {
  const body = document.getElementsByTagName("BODY")[0];
  this.el = el || body;
  const form = document.createElement('form');
  const headerText = document.createTextNode('Scramble word letters');
  const instructionsText = document.createTextNode('Escreva qualquer texto abaixo e veja como funciona');
  const formHeader = document.createElement('h4');
  const formIntroductionText = document.createTextNode('De adcroo com uma psuiqesa de uma ueasviddinre ianslge, não iortpma em qual oderm as lrtaes de uma palavra eotsã, a úncia cisoa itatrpomne é que a prmiiera e úmltia lraets ejstaem no lgaur ctroe. O rseto pode ser uma bnugaça tolat, que você aidna pdoe ler sem pamoebrl. Itso é proque nós não lmoes cdaa lreta ioaalsd, mas a plavara como um tdoo. Sohw de baol.');
  const formIntroduction = document.createElement('p');
  const formInstructions = document.createElement('p');
  const formTextArea = document.createElement('textarea');
  const submitButtonText = document.createTextNode('Submit');
  const submitButton = document.createElement('button');
  submitButton.setAttribute('id', 'submitButton');
  const outputBoxPlaceholder = document.createTextNode(``);
  const outputBox = document.createElement('div');
  outputBox.setAttribute('id', 'outputText');
  const outputBoxEl = document.createElement('p');
  form.appendChild(formTextArea);
  form.appendChild(submitButton).appendChild(submitButtonText);

  this.el.appendChild(formHeader).appendChild(headerText);
  this.el.appendChild(formIntroduction).appendChild(formIntroductionText);
  this.el.appendChild(formInstructions).appendChild(instructionsText);
  this.el.appendChild(form);
  this.el.appendChild(outputBox).appendChild(outputBoxEl).appendChild(outputBoxPlaceholder);
}

MixedWordsLetters.prototype.listen = function() {
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', function(e){
    e.preventDefault();
    const input = this.getInput();
    const result = this.mixWordsLetters(input);
    this.output(result);
  }.bind(this));
}

MixedWordsLetters.prototype.getInput = function() {
   const textArea = document.forms[0].elements[0];
   return textArea.value;
}

MixedWordsLetters.prototype.output = function(str) {
  const outputDiv = document.getElementById('outputText');
  outputDiv.children[0].innerHTML = str;
}

MixedWordsLetters.prototype.mixWordsLetters = function(str) {
  const words = str.split(' ');
  const mixedWords = words.map(word => {
    const letters = word.split('');
    const lettersWithoutFirstAndLast = letters.slice(1, -1)
    const mixedLetters = lettersWithoutFirstAndLast.shuffle();
    const result = word.length > 1 ? [letters[0], ...mixedLetters, letters[letters.length-1]] : [word];
    return result.join('');
  });
  return mixedWords.join(' ');
}

const mixedLetters = new MixedWordsLetters();
