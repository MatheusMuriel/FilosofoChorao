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

function sorteiaUmaFrase(frasesRestantes) {
  let magicNumber = sorteiaUmNumero(0, frasesRestantes.length)
  let resposta = {
    frase: frasesRestantes[magicNumber],
    id: magicNumber
  }
  return resposta;
}

function sorteiaUmNumero(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var app = new Vue({
  el: '#app',
  data: {
    frases: {},
    frasesRestantes: {},
    fraseAtual: {}
  },
  beforeCreate() {
    var vm = this;
    loadJSON((response) => { 
      vm.frases = response;
      vm.frasesRestantes= JSON.parse(response);
      let resposta = sorteiaUmaFrase(this.frasesRestantes);
      vm.fraseAtual = resposta.frase;
      vm.frasesRestantes.splice(response.id, 1)
    });
  },
  methods: {
    novaFrase(event) {
      let response = sorteiaUmaFrase(this.frasesRestantes);
      this.fraseAtual = response.frase;
      this.frasesRestantes.splice(response.id, 1)
      if(this.frasesRestantes.length == 1) {
        this.frasesRestantes = JSON.parse(this.frases);
      }
    },
    getVideo(event) {
      let url = `${this.fraseAtual.video}&t=${this.fraseAtual.tempo}`;
      window.open(url, '_blank');
    }
  }
})
