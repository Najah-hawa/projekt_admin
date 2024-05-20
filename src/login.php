<?php
include("includes/config.php");
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
    </div>   

</header>

<div class = "container"> 
<h2> Inloggning </h2>

<?php
if(isset($_GET['message'])){
    echo "<p class='error'>" . $_GET['message'] .  "</p>";
}
//ange felmeddelande om man försöker gå till admin sida och inte är inlogggad
?>
<?php  
if(isset($_POST["username"])) {
//kontrollera inloggningg om det rätt skicakas till admin sida
    $username = $_POST["username"];
    $password= $_POST["password"];
    $newuser= new User();
    if ($newuser -> loginUser($username, $password)) {
        $_SESSION["username"] = $username;
        header("location:admin.php");
    }else {
        $felmeddelande = "<p class= 'error'> Felaktig användarnamn/lösenord </p>";
        echo  $felmeddelande;
    }
}
?> 
<form  method="post" action="login.php" class="form">  
    <div class = "form"> 
     <label class="text" for="username" > Användarnamn: </label>
     <br> 
     <input class="text" type="text" name="username" id="username"> 
     <br> 
     <label class="text" for="password"> Lösenord: </label>
     <br> 
     <input type="password" name="password" id="password"> 
     <br> 
     <button type="submit" class="loginbutton">Login</button>
     </div>
</form> 

</div>
<footer>
      <p>Projekt_ DT173G </p>
      <p> ©Copyright Najah Hawa, 2024</p>
    </footer>