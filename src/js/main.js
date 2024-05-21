"use strict";

window.onload = init;
let url = "https://studenter.miun.se/~naha2204/dt173g/projekt_dt173g/php_api/meals/read.php";
let urlorder = "https://studenter.miun.se/~naha2204/dt173g/projekt_dt173g/php_api/meals/readorder.php";
const meal_nameinput =document.getElementById("meal_name");
const meal_ingredientinput =document.getElementById("meal_ingredient");
const priceinput =document.getElementById("price");
const submitbtn =document.getElementById("submit");
const error =document.getElementById("error");   
submitbtn.addEventListener("click", createmeal);





function init(){
getMeals();
getOrders();
}

//funktion för att läsa meals lista på DOM
function getMeals(){
fetch(url)
.then(response => {
    if(response.status != 200){ //inte lyckat anrop bara return
        return
    }
    return response.json()
.then(data => addmeal(data)) //köra metoden addmeal
.catch(err => console.log(err))
})
}

//funktion för att läsa order lista på DOM
function getOrders(){
  fetch(urlorder)
  .then(response => {
      if(response.status != 200){ //inte lyckat anrop bara return
          return
      }
      return response.json()
  .then(data => addorder(data)) //köra metoden addmeal
  .catch(err => console.log(err))
  })
  }


//skriva meals som li element
function addmeal(meals){

  const ulEl = document.getElementById("meallist");
  //tömma felmeddelande 
  ulEl.innerHTML ="";
//anrop för att skriva ut meals i databasen som li element
  meals.forEach(meal => {
     ulEl.innerHTML += `<li>Måltiden: ${meal.meal_name}: Ingredient:  ${meal.meal_ingredient},
     <br> Pris: ${meal.price} kr.
     <button name="button" class="meal"  id="${meal.id}" >DELETE</button>  
     <button name="button" class="mealupdate"  class="btn" id="${meal.id}" >UPPDATE</button>
     </li>`  /*lägger två knappar i li för att radera och uppdatera meals och skicka med dem meals id */
  });

/* add evenlisstner för knappen delete för  att radera en meal och köra metoden delete*/
let liEL= document.getElementsByClassName("meal");

for(let i=0; i<liEL.length; i++){
  liEL[i].addEventListener("click",deletemeal);
}

/*addeventlistner för knappen update för att uppdatera värden och köra metoden uppdate*/
let UPPDATEEL= document.getElementsByClassName("mealupdate");

for(let i=0; i<UPPDATEEL.length; i++){
  UPPDATEEL[i].addEventListener("click",updatemeal);
}
}

//skriva meals som li element
function addorder(orders){

  const ulEl = document.getElementById("orderlist");
  //tömma felmeddelande 
  ulEl.innerHTML ="";
//anrop för att skriva ut meals i databasen som li element
  orders.forEach(order => {
     ulEl.innerHTML += `<li>namn: ${order.namn}: persons:  ${order.persons},
     <br> ankomst: ${order.ankomst}, klocka: ${order.klocka}
     <br> bokningens gjordes: ${order.tid}. 
     <button name="button" class="meal"  id="${order.id}" >DELETE</button>  
     </li>`  /*lägger en knapp i li för att radera oorder och skicka med dem order id */
  });

/* add evenlisstner för knappen delete för  att radera en meal och köra metoden delete*/
let liEL= document.getElementsByClassName("meal");

for(let i=0; i<liEL.length; i++){
  liEL[i].addEventListener("click",deleteorder);
}

}

//radera en meal med id 
function deletemeal(event){
  //spara id i variabel
  let id = event.target.id;
  //tomma error meddelande om man radera en måltid
  error.innerHTML = "";
// fetch och skicka method delete
  fetch(url + "?id=" + id, {
    "method" : "DELETE"
  })
  .then(response => response.json()) 
  .then(data => getMeals() )   //läsa meallista på nytt efter att radera en meal
  .catch(err => console.log(err))
  }


  //radera en order med id 
function deleteorder(event){
  //spara id i variabel
  let id = event.target.id;
  //tomma error meddelande om man radera en måltid
  error.innerHTML = "";
// fetch och skicka method delete
  fetch(urlorder + "?id=" + id, {
    "method" : "DELETE"
  })
  .then(response => response.json()) 
  .then(data => getOrders() )   //läsa orderlista på nytt efter att radera en order
  .catch(err => console.log(err))
  }


function updatemeal(event) {
    event.preventDefault();
    //tomma error meddelande 
    error.innerHTML = "";
    //läsa in värden 
    let id = event.target.id;
    let meal_namein = meal_nameinput.value;
    let meal_ingredientin = meal_ingredientinput.value;
    let pricein = priceinput.value;
    
    let jsonStr = JSON.stringify({
      meal_name : meal_namein,
      meal_ingredient :meal_ingredientin,
      price : pricein
    })
    //fetch ur och skciak med id och method put
  fetch(url + "?id=" + id, {
    method : "PUT",
  headers: {
    "content-type" : "application/json"   //skcika med json
  }, 
  body: jsonStr 
    })
.then(response => {
      if(response.status != 201){ //inte lyckat anrop bara return
        error.innerHTML =`<p class="error">Du måste fylla i värden och sedan klicka på uppdatera !</p>`;  //felmeddelande
      } else 
      return response.json()
  .then(data => clearform() )
  .catch(err => console.log(err))
  })
  }
  
  





//lägg till meal i databasen
function createmeal(event){
event.preventDefault();
//tömma felmeddelande 
error.innerHTML = "";
//läsa in värden från input
let meal_namein = meal_nameinput.value;
let meal_ingredientin = meal_ingredientinput.value;
let pricein = priceinput.value;

let jsonStr = JSON.stringify({
  meal_name : meal_namein,
  meal_ingredient :meal_ingredientin,
  price : pricein
}) 
// fetch url och skicka method post
fetch(url , {
  method : "POST",
  headers: {
    "content-type" : "application/json"
  }, 
  body: jsonStr

})
.then(response => {
  if(response.status != 201){ //inte lyckat anrop bara return
    error.innerHTML =`<p class="error"> Du måste fylla i måltid namn, ingrediens och pris för att lägga till det. </p> `;  //felmeddelande
  } else 
  return response.json()
.then(data => clearform() )
.catch(err => console.log(err))
})
}


//rensa form
function clearform(){
  meal_nameinput.value="";
  meal_ingredientinput.value="";
  priceinput.value="";
  getMeals();
}
  

//meny i mobilläge

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}