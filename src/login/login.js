const form =document.querySelector('form');
const email = document.querySelector("#email");
const password = document.querySelector("#password");

//1 REVISAR SI EL CORREO ESTA REGISTRADO

async function checkEmail(email){
    const response = await fetch(`http://localhost:3000/user?email=${email.value}`);
    const data = await response.json();
    
    if (data.length >0){
        return data[0]
    }else{
        return false
    }
}

//2 UNA VEZ QUE HEMOS VERIFICADO SI EXISTE EL EMAIL VERIFICAMOS CONTRASEÑA Y CONTINUAMOS

form.addEventListener('submit', async function(event){
    event.preventDefault();
const user = await checkEmail(email)
if (user === false){
    alert("the email is not registred")
}else if (user.password == password.value){
        localStorage.setItem("userOnline",JSON.stringify(user))
        window.location.href = "http://localhost:5500/src/dashboard/dashboard.html"
    }else{
        alert("Wrong password")

    }
}
)