// Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || []

const contenido = document.getElementById("main")
let verCarrito = document.getElementById("boton-carrito")
const cantidadCarrito = document.getElementById("contador")

// productos
fetch("./JSON/productos.json")
.then((resp) => resp.json())
.then((data) => {
  data.map((producto) => {
    let contenedor = document.createElement("div")
    contenedor.classList.add("card", producto.cat, "hide")
    contenedor.innerHTML = `
    <img src="${producto.img}" class="card-img-top" alt="celular">
    <div class="card-body">
      <h5 class="card-title product-name">${producto.nombre.toUpperCase()}</h5>
      <p class="card-text">${producto.descripcion}</p>
      <div class=" d-flex justify-content-betwee price">
      <p class="card-text">$${producto.precio}</p>
     </div>
    </div>
  
  `;
  contenido.append(contenedor)

const comprar = document.createElement("button")
comprar.innerText = "Add to cart"
comprar.className = "comprar"
contenedor.append(comprar)

 comprar.addEventListener("click", () => {
 

  Toastify({
    text: "PRODUCTO AGREGADO",
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      top: "200px",
      left: "12px",
      width: "220px",
    }
  }).showToast();

 })

  comprar.addEventListener("click", () => {

    const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id)
    if (repeat) {
      carrito.map((prod) => {
        if(prod.id === producto.id) {
          prod.cantidad ++
        }
      })
    }else {
      carrito.push({
        id : producto.id,
        nombre : producto.nombre,
        precio : producto.precio,
        img : producto.img,
        cantidad : producto.cantidad,
      }) 
      carritoCounter()
      saveLocal()
    }
    let cart = document.getElementById("carrito-container")
    cart.style.display = "none"
  })

  
})
})


// LOCALSTORAGE
// set item
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito))
}



// FILTRO

function filtrarProductos(value) {
  //Button class code
  let buttons = document.querySelectorAll(".boton-filtro");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "todos") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});


//Initially display all products
window.onload = () => {
  filtrarProductos("todos");
};


// newsletter
const btn = document.getElementById('button-n');

document.getElementById('form').addEventListener("submit", function(event) {
   event.preventDefault();

   btn.value = 'enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_yh7p8z3';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'SUBSCRIBIRSE';
      Swal.fire(
        'Enviado con exito',
        'Gracias por subscribirte al newsletter',
        'success'
      )
    }, (err) => {
      btn.value = 'SUBSCRIBIRSE';
      alert(JSON.stringify(err));
    });
});