//^═══════════════════▶ Switching from SignUp to Login ◀═════════════════════════
var signUpContent = document.getElementById("signUpContent");
var loginContent = document.getElementById("loginContent");

var btnLogin = document.getElementById("btnLogin");
var btnSign = document.getElementById("btnSign");

var createOne = document.getElementById("createOne");
var imageItem = document.getElementById("imageItem");

var welcomePage = document.getElementById("welcomePage");


function createAccount(){
  signUpContent.classList.remove("d-none");
  loginContent.classList.add("d-none");

  btnSign.classList.remove("d-none");
  btnLogin.classList.add("d-none");

  createOne.classList.add("d-none");
}

function showLogin(){
  signUpContent.classList.add("d-none");
  loginContent.classList.remove("d-none");

  btnSign.classList.add("d-none");

  createOne.classList.remove("d-none");
}

function backToLogin(){
  signUpContent.classList.add("d-none");//hide signup
  loginContent.classList.remove("d-none");//show login

  btnSign.classList.add("d-none");//hide signup btn
  btnLogin.classList.remove("d-none");
  createOne.classList.remove("d-none");
}

function getWelcomePage(){
  welcomePage.classList.remove("d-none");
  loginContent.classList.add("d-none");
  clearLoginForm();
  imageItem.classList.add("d-lg-none");
  btnLogin.classList.add("d-none");
  createOne.classList.add("d-none");
}

function logout(){
  welcomePage.classList.add("d-none");
  loginContent.classList.remove("d-none");

  btnLogin.classList.remove("d-none");
  createOne.classList.remove("d-none");

  imageItem.classList.remove("d-lg-none");
  localStorage.removeItem("username");
}
//^══════════════════════════════════════════════════════════════════════════════


//& ═════════════════════▶ Sign Up Variables ◀══════════════════════════════════
var nameInput = document.getElementById("nameInput");
var emailForInput = document.getElementById("emailForInput");
var passForInput = document.getElementById("passForInput");

var nameAlert = document.getElementById("nameAlert");
var emailAlert = document.getElementById("EmailAlert");
var passAlert = document.getElementById("PassAlert");

var allUsersList =[];

if(localStorage.getItem("users") != null){
  allUsersList = JSON.parse(localStorage.getItem("users"));
}
//&══════════════════════════════════════════════════════════════════════════════

//* ═════════════════════════════▶  Functions ◀═════════════════════════════════
function addUser(){
  if(allInputsValid() && isExist() == false){
    var user = {
      name: nameInput.value,
      email: emailForInput.value,
      password: passForInput.value
    }
  
    allUsersList.push(user);
    localStorage.setItem("users",JSON.stringify(allUsersList));
  
    console.log(allUsersList);

    clearSignupForm();
    nameInput.classList.remove("is-valid");
    emailForInput.classList.remove("is-valid");
    passForInput.classList.remove("is-valid");

    nameAlert.classList.add("d-none");
    passAlert.classList.add("d-none");
    emailAlert.classList.add("d-none");

    //^show LOGIN button
    btnLogin.classList.replace("d-none","d-block");
    showLogin();
  }else{
    clearSignupForm();
    nameInput.classList.remove("is-valid");
    emailForInput.classList.remove("is-valid");
    passForInput.classList.remove("is-valid");
  }
}

function allInputsValid(){
  if(validName() && validEmail() && validPass()){
    console.log('all inputs are valid');
    return true;
  }else{
    console.log('all inputs valid ar not valid');
    return false;
  }
}

function validName(){
  var term = nameInput.value;
  var regexName = /^[a-zA-Z0-9_]{3,}$/

  if(regexName.test(term)){
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    nameAlert.classList.replace("d-block","d-none");
    return true;
  }else{
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    nameAlert.classList.replace("d-none","d-block");
    return false;
  }
}

function validEmail(){
  var text = emailForInput.value;
  var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if(regexEmail.test(text)){
    emailForInput.classList.add("is-valid");
    emailForInput.classList.remove("is-invalid");
    emailAlert.classList.replace("d-block","d-none");
    return true;
  }else{
    emailForInput.classList.add("is-invalid");
    emailForInput.classList.remove("is-valid");
    emailAlert.classList.replace("d-none","d-block");
    return false;
  }
}

function validPass(){
  var num = passForInput.value;
  var regexPass = /^.{4,}$/

  if(regexPass.test(num)){
    passForInput.classList.add("is-valid");
    passForInput.classList.remove("is-invalid");
    passAlert.classList.replace("d-block","d-none");
    return true;
  }else{
    passForInput.classList.add("is-invalid");
    passForInput.classList.remove("is-valid");
    passAlert.classList.replace("d-none","d-block");
    return false
  }
}

function clearSignupForm(){
  nameInput.value="";
  emailForInput.value="";
  passForInput.value="";
}

function isExist(){
  for(var i=0; i<allUsersList.length; i++){
    if(allUsersList[i].email.toLowerCase() == emailForInput.value.toLowerCase())
    {
      console.log('this user already exists');
      Swal.fire({
        icon: "error",
        title: "User already exists!",
        text: "Try another Email",
      });
      return true;
    }
  }
  Swal.fire({
    icon: "success",
    title: "Signed up successfully",
    text: "Login Now!"
  });
  console.log('user is new');
  return false;
}

function clearLoginForm(){
  loginEmailInput.value="";
  loginPassInput.value="";
}
//*? ═════════════════════════▶  Login process ◀══════════════════════════════

var loginEmailInput = document.getElementById("emailInput");
var loginPassInput = document.getElementById("passInput");

var textLogin = document.getElementById("textLogin");

var userNameSession = JSON.parse(localStorage.getItem("username"));

function login(){
  for(var i=0; i<allUsersList.length; i++){
     if(allUsersList[i].email.toLowerCase() == loginEmailInput.value.toLowerCase() &&
     allUsersList[i].password.toLowerCase() == loginPassInput.value.toLowerCase())
     {
      Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Logged in succesfully",
        showConfirmButton: false,
        timer: 1500
      });
      userNameSession = allUsersList[i].name;
      localStorage.setItem("username",JSON.stringify(userNameSession));
      textLogin.innerHTML= `<h1 class=" fw-semibold w-custom">Welcome to our website, ${userNameSession}!</h1>`;
      getWelcomePage();
      return true;

     }
  }
  Swal.fire({
    icon: "error",
    // title: "User doesn't exist!",
    text: "User is invalid or does not exist!"
  });
}
//*? ═════════════════════════════════════════════════════════════════════════
//*? ═════════════════════════▶  End Project ◀═══════════════════════════════








