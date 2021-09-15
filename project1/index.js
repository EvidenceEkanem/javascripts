const authPage = document.querySelector("#auth");
const mainPage = document.querySelector("#main");
const userEmail = localStorage.getItem('loggedInUser');
let todoDiv = document.getElementById("myUL");
let dis = JSON.parse(localStorage.getItem(userEmail));

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

    displayUserDetails(userDetails)
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
    const users = JSON.parse(localStorage.getItem('allUsers'));
    const filteredResult = users.filter(todo => todo.email == email);

    let password = signInForm.querySelector("#password").value;
    // let checkIfExist = window.localStorage.getItem(email);

    if(filteredResult){
        // console.log(checkIfExist);
        // convertToString = JSON.parse(checkIfExist);
        if(filteredResult[0][password] === password){
            localStorage.setItem('loggedInUser', email);
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
    const {firstName, lastName} = user
    authPage.style.display = "none";
    mainPage.style.display = "block";
    let displayName = myDiv.querySelector("h1");
    displayName.innerText = "Hello " + firstName + " " + lastName;

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

    let todoId = Date.now().toString();

    let item = {
        todoId,
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
    document.getElementById("myInput").value = " ";
    mainPage.style.display = "block";

    displayTodoList();
    
}

const addNewTodo = document.getElementById("addTodoList");
addNewTodo.addEventListener("submit", createTodo);

const displayTodoList = () => {

    const display = (`
        <ul>
            ${dis.map((item) => `<li id="${item.todoId}" class="${item.completed ? 'completed' : " "}">${item.task} <span class="float-right" ><input type="checkbox" ${item.completed ? 'checked' : " "} onClick="markCompleted()" data-id="${item.todoId}"></span> </li>`).join("")}
        </ul>
    `);

    todoDiv.insertAdjacentHTML("beforeend", display);

    // todoDiv.innerHTML = display;

}

// console.log(markAsCompleted)
const markCompleted = () => {
    console.log(event.target)
    let todoId = (event.target.getAttribute('data-id'));
    todoItem = document.getElementById(todoId);

    // console.log(todoItem.innerText);

    let item = dis.filter(item => item.todoId != todoId);
    let comple = true;
    let new_item = {
        todoId,
        task: todoItem.innerText,
        completed: !comple,
    }

    item.push(new_item);

    localStorage.setItem(userEmail, JSON.stringify(item));
    // console.log(item)

    todoItem.classList.toggle("completed")

    displayTodoList()

}