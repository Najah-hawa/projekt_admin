<?php 
class User{
private $username;
private $password;

function loginUser($username, $password) {
    if($username == "admin" && $password == "password") {
        $_SESSION['username'] = $username;
        return true;
    } else {
        return false;
    }
}

}
