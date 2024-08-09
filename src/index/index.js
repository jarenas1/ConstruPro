let login = document.querySelector('#login')
const container = document.querySelector("main")
//BOTONES DEL HEADER QUE CAMBIAN DEPENDIENDO DEL LOCALSTORAGE
if (localStorage.getItem("userOnline") != null) {
    login.innerHTML = `
    <button type="button" class="btn btn-danger" id="logout">Logout</button>
    <button type="button" class="btn btn-success"><a href="./src/dashboard/dashboard.html" class ="text-white">DASHBOARD</a></button>
    `
    let logout = document.querySelector("#logout")
    logout.addEventListener("click", () => {
        localStorage.removeItem("userOnline");
        location.reload();
    });
}else{
    login.innerHTML = `
    <button type="button" class="btn btn-warning"><a href="./src/login/login.html" class ="text-white">LOGIN</a></button>
                    <button type="button" class="btn btn-secondary"><a href="./src/register/register.html" class ="text-white">REGISTER</a></button>
    `
}

//CARDS DEL MAIN

async function printProducts(){
    const response = await fetch ("http://localhost:3000/products")
    const data = await response.json() 
    console.log(data);
    container.innerHTML = ""
    data.forEach(product => {
            if (product.enabled){ //REVISA EN EL JSON SI EL ESTADO ES VISIBLE Y LOS MUESTRA, SI NO NO LOS MESTRA
                container.innerHTML += `
                <div class="card text-light col-2 card-custom">
                <img src="${product.image}"
                    class="card-img h-100 object-fit-cover" alt="example">
                <div class="card-body bg-light text-dark">
                    <h4 class="card-title">${product.name}</h4>
                    <h6 class="mt-3">PRICE: $${product.price}</h6>
                    <h6 class="mt-3">STOCK:${product.units}</h6>
                    <p class="mt-3">${product.description}</p>
    
                </div>
            </div>`
            }  
    });
}

await printProducts()