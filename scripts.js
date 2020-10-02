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

var app = new Vue({
  el: '#app',
  data: {
    message: ''
  },
  beforeCreate() {
    var vm = this
    loadJSON((response) => { vm.message = JSON.parse(response)[0].frase });
  }
})
