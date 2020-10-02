//var frases;
//loadJSON((response) => { console.log(JSON.parse(response)[0].frase) });

function loadJSON(callback) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'frases.json', true);
  xobj.onreadystatechange = () => {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);  
}

function sorteiaUmaFrase(frases) {
  let magicNumber = sorteiaUmNumero(0, frases.length)
  return frases[magicNumber].frase;
}

function sorteiaUmNumero(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var app = new Vue({
  el: '#app',
  data: {
    frases: {},
    message: ''
  },
  beforeCreate() {
    var vm = this;
    loadJSON((response) => { 
      vm.frases = JSON.parse(response);
      vm.message = sorteiaUmaFrase(vm.frases);
    });
  },
  create() {
    
  },
  methods: {
  }
})
