const form = document.querySelector('form');
const nameU =document.querySelector("#name")
const username =document.querySelector("#username")
const spanUsername = document.querySelector(".span-username")
const email =document.querySelector("#email")
const password =document.querySelector("#password")
const spanPassword =document.querySelector(".span-password")
const confirmPassword =document.querySelector("#confirm")
const  key =document.querySelector("#key")
const url = "http://localhost:3000/user"
const keyAccess = "123456789"

//1. VERIFICAR SI EL CORREO EXISTE

async function checkEmail(email){
    const response = await fetch(`http://localhost:3000/user?email=${email.value}`)
    const data = await response.json()
    console.log(data);
    if (data.length === 0) {
        return true
    }
    else{
        alert ("The email is already registred")
        return false
    }
    
}

//2. VERIFICAR SI EL USUARIO EXISTE

async function checkUsername(username){
    const response = await fetch(`http://localhost:3000/user?username=${username.value}`)
    const data = await response.json()
    console.log(data);
    if (data.length === 0) {
        return true
    }
    else{
        alert ("The username is already registred")
        return false
    }
    
}

//3. VERIFICAR SI LAS CONTRASEÑAS SON IGUALES

function checkPassword(password, confirmPassword){
    if (password.value == confirmPassword.value) {
        return true
    }
    else{
        alert ("The passwords are not the same")
        return false
    }
}

//4. VERIFICAR SI LA CONTRASEÑA ES MAYOR A 8 CARACTERES

password.addEventListener("input",(event) => {
     if (password.value.length < 9) {             
    spanPassword.textContent="TAMAÑO MINIMO DE 9 CARACTERES"
    }else{
    spanPassword.textContent=""
     }
    })

function passwordLength(password){
    if (password.value.length < 9) {
        alert("The password cant be less than 9 characters")
        return false
        
    }
    else{
        return true
    }
}
    
//5. VERIFICAR SI EL USERNAME CONTIENE ESPACIOS

username.addEventListener("input",(event) => {
    if (username.value.includes(" ")) {
        spanUsername.textContent="NO PUEDE CONTENER ESPACIOS"
    }else{
        spanUsername.textContent=""
    }
})

function usernameContains(username){
    if (username.value.includes(" ")) {
        alert ("The username cant contains white sapaces")
        return false
        
    }
    else{
        return true
    }
}

//6. VERIFICAR SI LAS KEY COINCIDEN

function checkKey(key){
    if (key.value == keyAccess) {
        return true
    }
    else{
        alert ("The key is incorrect")
        return false
    }
}

//8. CREAR UN USUARIO

async function createUser(nameU, username, email, password){
    await fetch("http://localhost:3000/user", {
        method: "POST",
        body: JSON.stringify({
            name: nameU.value.toUpperCase(),
            username: username.value,
            email: email.value,
            password:  password.value,
            role: "admin"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}


//9. AÑADIR DE UN USUARIO EN EL JSON

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    if (await checkEmail(email) && await checkUsername(username) && checkPassword(password, confirmPassword) && passwordLength(password) && usernameContains(username) && checkKey(key)) {
        createUser(nameU,username, email,password)
        form.reset()
        alert("The user has been created")
        window.location.href = "http://localhost:5500/src/login/login.html"
        
    }else{
        alert("The user has not been created")
    }
})
