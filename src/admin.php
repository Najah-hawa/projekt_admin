<?php include("includes/config.php"); ?>
<?php
$page_title = "admin";
?>
<?php
//kontroll om användare är inloggad
if(!isset($_SESSION["username"])){
    header("Location: login.php?message=Inloggning krävs för denna sida!");
}
?>

<!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <title>Projekt</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
<header>
  <div class="topnav">
        <h1> Chikno</h1>

        <div id="myLinks">
        <a href="#">Webbsidan</a>
        <a href="#orderlist">Hantera order</a>
        <a href= "logout.php" >Logga out </a> 
        </div>
  </div>   

</header>

  

<div class="container"> 


<div class="meny"> 
    <h1 class="h1">Vår meny </h1>

   <!-- lista kurser med Ajax-->

<ul id="meallist" class="meallist"> </ul>

</div>
<h2> Lägg till en måltid: </h2>

<form id="mealform" > 
<div class="mealform"> 
<div class="form"> 
  <p id="error"> </p>
    <label for="meal_name">Måltiden:</label><br>
    <input type="text" id="meal_name" name="meal_name" class="input"><br>
    <label for="meal_ingredient">Ingredient:</label><br>
    <input type="text" id="meal_ingredient" name="meal_ingredient" class="input"><br>
    <label for="price">Pris :</label><br>
    <input type="number" id="price" name="price" class="input"><br>
  </div>
    
</div>
<input type="submit" value="Lägg till en måltid" id="submit" class="loginbutton">

</form>






<h2 class="h1" id=" orderlist"> Inbokningar lista</h2>
<ul id="orderlist" class="orderlist"> </ul>


    <script src="./js/main.js"></script>

    <footer>
      <p> </p>
      <p> ©Copyright Najah Hawa, 2024</p>
    </footer>
</div>


</body>
</html>

