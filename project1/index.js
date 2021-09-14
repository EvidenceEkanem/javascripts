const authPage = document.querySelector("#auth");
const mainPage = document.querySelector("#main");
const userEmail = localStorage.getItem('loggedInUser');

const signup = () =>
{
    document.querySelector(".login-form-container").style.cssText = "display: none;";
    document.querySelector(".signup-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(56, 189, 149),  rgb(28, 139, 106));";
    document.querySelector(".button-1").style.cssText = "display: none";
    document.querySelector(".button-2").style.cssText = "display: block";
};

const login = () =>
{
    document.querySelector(".signup-form-container").style.cssText = "display: none;";
    document.querySelector(".login-form-container").style.cssText = "display: block;";
    document.querySelector(".container").style.cssText = "background: linear-gradient(to bottom, rgb(6, 108, 224),  rgb(14, 48, 122));";
    document.querySelector(".button-2").style.cssText = "display: none";
    document.querySelector(".button-1").style.cssText = "display: block";
}


const storeDetails = (userDetails, email) => {
    let users;
    if(localStorage.getItem('allUsers') === null)
    {
        users = [];
    } else{
        users = JSON.parse(localStorage.getItem('allUsers'));
    }

    users.push(userDetails);

    localStorage.setItem('allUsers', JSON.stringify(users));
    
    localStorage.setItem('loggedInUser', email);

    authPage.style.display = "none";
    mainPage.style.display = "block";
}

// console.log(window.localStorage.getItem("ekanemevidence@gmail.com"));

const validateSignUp = (e) => {
    e.preventDefault(); 
    const cfirstName = signUpForm.querySelector("#firstName");
    const clastName = signUpForm.querySelector("#lastName");
    const cemail = signUpForm.querySelector("#email");
    const cpassword = signUpForm.querySelector("#password");

    console.log(cfirstName);
    // getEmailFromDatabase = window.localStorage.getItem(cemail.value);
    
    // console.log(getEmailFromDatabase);
    // if(getEmailFromDatabase){
    //     signUpForm.querySelector("p").innerText = "Email Already Exists, Please Sign In"
    // }else{
        const check = (val) => {
            if(val.value === ""){
                return false;
            }else{
                return true;
            }
        }
        const returnResut = () => {
            if(!check(cfirstName)){
                return false;
            }else if(!check(clastName)){
                return false;
            }else if(!check(cemail)){
                return false;
            }else if(!check(cpassword)){
                return false;
            }else {
                return true;
            }
        }
    
        if(returnResut()){
            let userDetails = {
                firstName: cfirstName.value,
                lastName: clastName.value,
                email: cemail.value,
                password: cpassword.value
            }
            storeDetails(userDetails, cemail.value)
        }else{
            signUpForm.querySelector("p").innerText = "Ensure that no field is empty";
        }
    // }
} 

// signUp
let signUpForm = document.getElementById("sign-up");
signUpForm.addEventListener("submit", validateSignUp);


const validateSignIn = (e) => {
    e.preventDefault();
    let email = signInForm.querySelector("#email").value;
    console.log(email);
    const users = JSON.parse(localStorage.getItem('allUsers'));
    const filteredResult = users.filter(todo => todo.email == email);
    console.log(filteredResult);

    let password = signInForm.querySelector("#password").value;
    // let checkIfExist = window.localStorage.getItem(email);

    if(filteredResult){
        console.log(filteredResult[0][password])
        // console.log(checkIfExist);
        // convertToString = JSON.parse(checkIfExist);
        if(filteredResult[0][password] === password){
            displayUserDetails(filteredResult[0])
        }else{
            signInForm.querySelector("p").innerText = "Invalid Password"
        }
    }else{
        signInForm.querySelector("p").innerText = "invalid login credentials, Please Sign Up"
    }
}
let signInForm = document.getElementById("sign-in");
signInForm.addEventListener("submit", validateSignIn);

const myDiv = document.getElementById("myDIV");

const displayUserDetails = (user) => {
    authPage.style.display = "none";
    mainPage.style.display = "block";
    let displayName = myDiv.querySelector("h1");
    displayName.innerText = "Hello " + user.firstName + " " + user.lastName;

    displayTodoList();
    // console.log(user)
}

const redirectToList = () => {
    mainPage.style.display = "none";
    document.querySelector("#addTodoList").style.display = "block";
}

//create todo page
const redirectToL = document.getElementById("redirectToList");
redirectToL.addEventListener("click", redirectToList);

const createTodo = (e) => {
    e.preventDefault();

    let todoItem = addNewTodo.querySelector("#myInput").value;

    let item = {
        task: todoItem,
        completed: false,
    }

    let todo;
    if(localStorage.getItem(userEmail) === null)
    {
        todo = [];
    } else{
        todo = JSON.parse(localStorage.getItem(userEmail));
    }

    todo.push(item);

    localStorage.setItem(userEmail, JSON.stringify(todo));
    
    document.querySelector("#addTodoList").style.display = "none";
    mainPage.style.display = "block";

    displayTodoList();
    
}

const addNewTodo = document.getElementById("addTodoList");
addNewTodo.addEventListener("submit", createTodo);

const displayTodoList = () => {

    let dis = JSON.parse(localStorage.getItem(userEmail));

    let todoDiv = document.getElementById("myUL");

    const display = (`
        <ul>
            ${dis.map((item) => `<li>${item.task}</li>`).join("")}
        </ul>
    `);

    todoDiv.innerHTML = display;

}