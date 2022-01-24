"use strict";

/* Exercice 0 : Tutoriel */
function iterate_array(arr){
  /* TODO */
}

function test(){
  iterate_array([1,2,3,6,5,4]);
  iterate_array([{a:0, b:1}, {a:1, b:42}]);
  console.log(fibonacci(10));
  if (typeof my_object.do !== "undefined")
    my_object.do();
}

let my_object = {/* TODO */};

function fibonacci(n){
  /* TODO */
  if(Number.isInteger(n)){
    let t=[0,1];
      for(let i=2; i<n; i++){
      t.push(t[i-2]+t[i-1]);
    }
      return t;
  }
}

function fibonacci_rec(n){
  /* TODO */
}

/* Exercice 1 : 99 Bottles of Beer */
function bottles(beers){
  console.log('[js] bottles (' + beers +')');
  let res = "";

  /* TODO */
  for(let i=beers; i>1; i--){
    res+=(i +' bottles of beer on the wall, '+i+' bottles of beer.<br>Take one down and pass it around, '+(i-1)+' bottles of beer on the wall.<br><br>');
  }

  res+=('1 bottle of beer on the wall, 1 bottle of beer.<br>Take one down and pass it around, no more bottles of beer on the wall.<br><br>No more bottles of beer on the wall, no more bottles of beer.<br>Go to the store and buy some more, 99 bottles of beer on the wall.<br>');

  console.log(res);
  return res;
}

/* Exercice 2 : fonction range */
function range(stop, start, step) {
  console.log('[js] range(' + stop  + ',' + start  +',' + step + ')');
  var res = [];

  /* TODO */
  if(!start){
    start=0;
  }
  if(!step){
    step=1;
  }

  for(let i=start; i<stop; i+=step){
    res.push(i);
  };

  console.log('[js] range(' + stop + ',' + start +',' + step + ')=' + res);
  return res;
}

function rangerec(stop, start, step) {
  if(!start){
    start=0;
  }
  if(!step){
    step=1;
  }

  let i=start;
  if(i<stop){
    let res=[i];
    res.concat(rangerec(stop, i+step, step));
  }

  return res;
}


/* Exercice 3 : Calculatrice polonaise inverse */
let evaluate = function(expr) {
  console.log('[js] evaluate (' + expr +')');
  let results = [];

  /* TODO */
  

  return results.pop() || 0;
}

document.addEventListener('DOMContentLoaded', function(){

   /* Exercice 1 : 99 Bottles of Beer */
   let output1  = document.getElementById("output1");
   let input1   = document.getElementById("input1");

   document.getElementById("eval1").onclick = function() {
    output1.innerHTML = bottles(input1.value);
  };

   /* Exercice 2 : fonction range */
  let output2     = document.getElementById("output2");
  let input2stop  = document.getElementById("input2stop");
  let input2start = document.getElementById("input2start");
  let input2step  = document.getElementById("input2step");

  document.getElementById("reset2").onclick = function(){
    input2stop.value  = 10;
    input2start.value = "";
    input2step.value  = "";
    output2.innerHTML = "";
  };

  document.getElementById("eval2").onclick = function() {
    let stop  = Number(input2stop.value);
    let start = (input2start.value!=="")?Number(input2start.value):undefined;
    let step  = (input2step.value!=="")?Number(input2step.value):undefined;

    output2.innerHTML += '[' + String(range(stop, start, step))+']<br>';
  };

   /* Exercice 3 : Calculatrice polonaise inverse */
  let output3 = document.getElementById("output3");
  let input3  = document.getElementById("input3");

  document.getElementById("reset3").onclick = function(){
    output3.innerHTML = "";
  };

  document.getElementById("eval3").onclick = function() {
    let res = evaluate(input3.value);
    output3.innerHTML += (String(res) + '<br>');
  };

}, false);
