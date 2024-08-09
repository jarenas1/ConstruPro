const form = document.querySelector("form")
const nameU = document.querySelector("#name")
const type = document.querySelector("#type")
const units = document.querySelector("#units")
const price = document.querySelector("#price")
const image = document.querySelector("#image")
const description = document.querySelector("#description")
const container = document.querySelector("#container-products")
const logout = document.querySelector("#logout")
let idToUpdate = undefined

// ########################################################################################## SE ESCRIBE EL CODIGO QUE ESTABA EN EL IMPORT DEBIDO AL ERROR QUE SE ESTABA PRESENTANDO

//ESTA FUNCION MUESTRA LOS PRODUCTOS EN UN SITIO QUE LE DIGAMOS
async function printProducts(site){
    const response = await fetch ("http://localhost:3000/products")
    const data = await response.json() 
    site.innerHTML = ""
    data.forEach(product => {
            site.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td><img src="${product.image}" width = "100px" alt=""></td>
                <td>${product.enabled}</td>
                <td>${product.price}</td>
                <td>${product.units}</td>
                <td>${product.type}</td>
                <td>${product.price*product.units}</td>
                <td><button type="button" data-id=${product.id} class="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></td>
                <td><button type="button" data-id=${product.id} class="btn btn-danger ms-2">Delete</button></td>
                <td><button type="button" data-id=${product.id} class="btn btn-primary ms-2">Visible</button></td>
            </tr>
            `
    });
}

//CREAR PRODUCTO EN EL JSON SERVER PARA DESPUES PODERLO MOSTRAR
printProducts(container)
async function createProduct(nameU, image, price, units, type, description,container){
    await fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify({
            name: nameU,
            image: image,
            price: price,
            units: units,
            description:description,
            type: type,
            enabled: true,
        }),
        headers: {
            "Content-Type": "application/json"
        },
    })
    printProducts(container)
}

//TRAER PRODUCTO DEL JSON POR MEDIO DEL ID

async function getProduct(id){
    const response = await fetch(`http://localhost:3000/products/${id}`)
    const data = await response.json()
    return data
}

//EDITAR PRODUCTO EN EL JSON SERVER

async function editProduct(id,name, image, price, units, type,description,container){ //RECIBE LOS CAMPOS ACTUALIZADOS
    const productUpdated ={
        "name": name,
            "image": image,
            "price": price,
            "units": units,
            "description": description,
            "type": type,
            enabled: true,
    }
    await fetch(`http://localhost:3000/products/${id}`, {

        method: "PUT", //POR MEDIO DE PUT LOS MODIFICA
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productUpdated)})
        await printProducts(container)
    }

// ######################################################################ACA SE ACABA EL CODIGO DE LOS IMPORTS######################################


printProducts(container)

//EVENTO DE SUBMIT, Y POR MEDIO DEL IDTOUPDATE DEFINIMOS LA FUNCION QUE VAMOS A LLAMAR
form.addEventListener("submit", async (event) => {
event.preventDefault()
if (idToUpdate === undefined) {
    await createProduct(nameU.value, image.value,price.value,  units.value, type.value,   description.value)
}
//COMO SE PRESIONO EL BOTON DE EDITAR EL ID TIENE UN VALOR, POR LO QUE SE ENTRARIA EN ESTA FUNCION
else {
    await editProduct(idToUpdate, nameU.value, image.value,price.value,  units.value, type.value,   description.value)

    await printProducts(container)
    idToUpdate = undefined //reseteamos la variable
form.reset
}})

//EVENTO DE ELIMINAR/MODIFICAR/COULTAR


//Usamos un evento en la tabla para ver si se presiona editar, eliminar o ocultar
container.addEventListener("click", async (event) => {
    event.preventDefault()

    //DELETE
    if (event.target.classList.contains("btn-danger")) {
        const idToDelete = event.target.getAttribute("data-id")
        await fetch (`http://localhost:3000/products/${idToDelete}`,{
            method: "DELETE"
        })
        await printProducts(container)
    }

    //MODIFICAR
    else if (event.target.classList.contains("btn-warning")){
        idToUpdate = event.target.getAttribute("data-id")
        let data = await getProduct(idToUpdate) //LLAMAMOD EL PRODUCTO POR MEDIO DEL ID

        //LLENAMOS LOS CAMPOS DEL FORMULRIO CON LOS DATOS YA CREADOS
        nameU.value = data.name
        image.value = data.image
        type.value = data.type
        units.value = data.units
        price.value = data.price
        description.value = data.description
    
        //OCULTAR O MOSTRAR PRODUCTOS
}else if(event.target.classList.contains("btn-primary")){
    const idToHidde= event.target.getAttribute("data-id")
    console.log(idToHidde);
    const response = await fetch(`http://localhost:3000/products/${idToHidde}`)
    const data = await response.json()

    //SI ES VERDADERO LO VUELVE FALSO CUANDO PRESIONEMOS EL BOTON

    if(data.enabled){await fetch(`http://localhost:3000/products/${idToHidde}`, { //TOMAMOS EL ID DEL BOTON Y LO PONEMOS EN EL ENDPOINT
    method: "PATCH", //POR MEDIO DE PATCH MODIFICAMOS UNICAMENTE EL DATO DE ENABLED
    body: JSON.stringify({ enabled: false }), //USANDO PARCH TOMAMOS UNICAMENTE EL VALOR DE ENABLE Y LO PONEMOS COMO FALSE
    headers: {
        "Content-Type": "application/json",
            }
}
 )
 //SI ES FALSO LO VA A VOLVER VERDADERO CUANDO PRESIONEMOS EL BOTON
  }else{
    await fetch(`http://localhost:3000/products/${idToHidde}`, { //TOMAMOS EL ID DEL BOTON Y LO PONEMOS EN EL ENDPOINT
    method: "PATCH", //POR MEDIO DE PATCH MODIFICAMOS UNICAMENTE EL DATO DE ENABLED
    body: JSON.stringify({ enabled: true }), //USANDO PARCH TOMAMOS UNICAMENTE EL VALOR DE ENABLE Y LO PONEMOS COMO FALSE
    headers: {
        "Content-Type": "application/json",
            }
}
 )
  }
}})


//BOTON DE LOGOUT DEL DAHSBOARD
logout.addEventListener("click", ()=>{
    localStorage.removeItem("userOnline")
    window.location.href="../../index.html"
})