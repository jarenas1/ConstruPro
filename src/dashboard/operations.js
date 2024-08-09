// //PINTAR LOS PRODUCTOS DEL JSON SERVER




//ESTE ARCHIVO SE DEJO COMO MUESTRA DE QUE SE UTILIZO IMPORTS PERO POR RAZONES DESCONOCIDAS NO FUNCIONOÓ





// export async function printProducts(site){
//     const response = await ("http://localhost:3000/products")
//     const data = await response.json() 
//     site.innerHtml = " "
//     data.forEach(product => {
//         if (product.enabled == true) {
//             site.innerHtml += `
//             <tr>
//                 <td>${product.name}</td>
//                 <td>${product.image}</td>
//                 <td>${product.price}</td>
//                 <td>${product.units}</td>
//                 <td>${product.type}</td>
//                 <td>${product.price*product.units}</td>
//                 <td> <button type="button" data-id=${product.id} class="btn btn-warning mx-2">Edit</button>
//                 <button type="button" data-id=${product.id} class="btn btn-danger ms-2">Delete</button>
//                 <button type="button" data-id=${product.id} class="btn btn-primary ms-2">Ocultar</button>
//       </td>
//             </tr>
//             `
//         }
//     });
// }

// //CREAR PRODUCTO EN EL JSON SERVER

// export async function createProduct(name, image, price, units, type,container){
//     await fetch("http://localhost:3000/products", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             name: name.value,
//             image: image.value,
//             price: price.value,
//             units: units.value,
//             type: type.value,
//             enabled: true
//         })
//     })
//     printProducts(container)
// }

// //TRAER PRODUCTO DEL JSON POR MEDIO DEL ID

// export async function getProduct(id){
//     const response = await fetch(`http://localhost:3000/products/${id}`)
//     const data = await response.json()
//     return data
// }

// //EDITAR PRODUCTO EN EL JSON SERVER

// export async function editProduct(name, image, price, units, type,container){
//     const carUpdated ={
//         name: name.value,
//             image: image.value,
//             price: price.value,
//             units: units.value,
//             type: type.value,
//             enabled: true
//     }
//     await fetch(`http://localhost:3000/products/${id}`, {

//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(carUpdated)})
//         await printProducts(container)
//     }

