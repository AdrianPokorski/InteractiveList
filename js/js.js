var inputProduct = document.getElementById("data1");
var inputPrice = document.getElementById("data2");
var addDataButton = document.querySelector(".add-data");
var dataBox = document.querySelector(".data-box");
var data = [];
var preloader = document.getElementById('preloader-box');
var leftBg = document.querySelector('.leftBackground');
var rightBg = document.querySelector('.rightBackground');
var circle = document.querySelector('.preloader-wrapper');

window.onload = function(){
    
    setTimeout(function(){
        circle.classList.remove('active');
        leftBg.classList.add("activeLeft");
        rightBg.classList.add("activeRight");
    },1500);
    
    setTimeout(function(){ 
        
        preloader.classList.add("hidden"); 
    
    }, 2500);   
}

$(document).ready (function getData(){
   
    $.get( "http://jadesign.pl/dev/api/?get", function( getData ) {
        if (getData !== 'null' ){
        data = JSON.parse(getData);
        }
        displayItemFromData();
        
   }); 
});

function saveData(){
    $.ajax({
      url: 'http://jadesign.pl/dev/api/',
      method: 'POST',
      data: {'hash':'adriano', 'data': data},
      success: function(){
          console.log(data);
      }
    });
}

function cleanItemFromDisplay() {
  dataBox.innerHTML = "";
}

function displayItemFromData() {
  cleanItemFromDisplay();
  for (i = 0; i < data.length; i++) {
    dataBox.innerHTML += 
    `<li class="ui-state-default"><p>Nazwa produktu:<input class="prod-name ${i}" disabled value=" ${data[i].product} "></p>  
    <p>Cena: <input class="pric-name ${i}" disabled value=" ${data[i].price} zł "></p>       
    <button class="deletebtn ${i} btn-floating btn-large waves-effect waves-light red"><i class="material-icons">delete</i></button>
   <input type="submit" value="Edit" class="modifybtn ${i} btn-floating btn-large waves-effect waves-light red"></li> `
  }
  
  var buttonDelete = document.querySelectorAll('.deletebtn');

  
  [].forEach.call(buttonDelete,function(value){
    value.addEventListener("click",function(e){
      removeItemFromData(e);
      saveData();
      displayItemFromData()
    })
  });
  
  var buttonModify = document.querySelectorAll('.modifybtn');
  
  [].forEach.call(buttonModify, function(value){
      value.addEventListener("click",function(e){
        modifyData(e, buttonModify);
    })
  })
  
}

function addItemToData() {
  var obj = {
    product: inputProduct.value,
    price: inputPrice.value,
  };
    data.push(obj);
    saveData();
    displayItemFromData();
}

addDataButton.addEventListener("click", function() {
  if(inputProduct.value == "" || inputPrice.value == "" )
  {
   if(addDataButton.preventDefault) addDataButton.preventDefault();
    alert('Podaj produkt oraz cenę, aby dodać')
  }
  else 
  {
    addItemToData();
    inputProduct.value="";
    inputPrice.value="";
  }
});

function removeItemFromData(e){
  data.splice(e.target.classList[1], 1 );
  console.log(data)
  displayItemFromData();
}

function modifyData(e, buttonModify){
  
  var inpProdEdit = document.querySelectorAll('.prod-name');
  var inpPriceEdit = document.querySelectorAll('.pric-name');
 
  var thisProduct = inpProdEdit[e.target.classList[1]];
  var thisPrice =  inpPriceEdit[e.target.classList[1]];
  var thisModify = buttonModify[e.target.classList[1]];

  
  if( thisProduct.hasAttribute("disabled") )
  {
    thisProduct.removeAttribute("disabled");
    thisPrice.removeAttribute("disabled");
    thisProduct.setAttribute("style", "background:#f2f2f2;");
    thisPrice.setAttribute("style", "background:#f2f2f2;");
    thisModify.setAttribute("value", "Done");
  }
  else
  {
    thisProduct.setAttribute("disabled", "true");
    thisPrice.setAttribute("disabled", "true");
    thisProduct.removeAttribute("style", "background:#f2f2f2;");
    thisPrice.removeAttribute("style", "background:#f2f2f2;");
    thisModify.setAttribute("value", "Edit");
  }
    data[e.target.classList[1]]['product'] = thisProduct.value;
    data[e.target.classList[1]]['price'] = thisPrice.value;
    saveData();
    console.log(data)
    
}

function validate(evt) {
  var errorMsg = document.querySelector('.error')
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  inputPrice.classList = '';
  errorMsg.classList = "error";
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    errorMsg.classList.add('visible');
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

