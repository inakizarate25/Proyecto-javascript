


const pintarCarrito = () => {
    let modalCarrito = document.getElementById("modal-carrito")
    modalCarrito.innerHTML = ""
    const cart = document.getElementById("carrito-container")
    cart.style.display = "block"
  
    
  
    // header modal
    const modalHeader = document.createElement("div")
    modalHeader.className = "header-modal"
    modalHeader.innerHTML = `
    <h2 class= "modal-header-title">CARRITO</h2>
    `
    modalCarrito.append(modalHeader)
  
  
    const modalButton = document.createElement("p")
    modalButton.innerText = "X"
    modalButton.className = "cerrar-modal"
    modalHeader.append(modalButton)
  
   
  
    modalButton.addEventListener("click", () => {
       
        cart.style.display = "none"
 
      contenido.style.justifyContent = "center"
      contenido.style.marginLeft = ""
    })
  
  // productos carrito
    carrito.forEach((product) => {
   const contenidoCarrito = document.createElement("div")
    contenidoCarrito.className = "producto-carrito"
    contenidoCarrito.innerHTML = `
            <img class="img-carrito" src="${product.img}">
            <div class="info-carrito">
            <div class= "info1">
              <div class="nombre">${product.nombre}</div>
              <div class="cantidad">Cantidad:<span> ${product.cantidad}</span></div>
              <div class="total">Total: $${product.cantidad * product.precio}</div>
            </div>
             
                <div>
                <span class="restar"> - </span>
                <span class="sumar"> + </span>
                </div>
             
              
            </div>
            <h2 class= "eliminar"><iconify-icon icon="material-symbols:delete-forever-rounded" style="color: #9c0000;"></iconify-icon></h2>
            
    `
    modalCarrito.append(contenidoCarrito)

    let restar = contenidoCarrito.querySelector(".restar")
    restar.addEventListener("click", () => {
        if (product.cantidad !== 1){
            product.cantidad --
        }
        saveLocal()
        pintarCarrito()
    })

    let sumar = contenidoCarrito.querySelector(".sumar")
    sumar.addEventListener("click", () => {
        
        product.cantidad ++
        saveLocal()
        
        pintarCarrito()
    })

    let eliminar = contenidoCarrito.querySelector(".eliminar")

    eliminar.addEventListener("click", () =>{
        eliminarProductoCarrito(product.id)
    })
eliminar.addEventListener("click", () => {
  Toastify({
    text: "PRODUCTO ELIMINADO",
    className: "info",
    style: {
      background: "linear-gradient(to right, #fd0000, #f33d00)",
      top: "200px",
      left: "12px",
      width: "220px",
    }
  }).showToast();
})

})
    let footerCarrito = document.createElement("div")
    footerCarrito.className = "footer-carrito"
    modalCarrito.append(footerCarrito)
  footerCarrito.innerHTML = `
  <a class="comprar" id="pagar"><p>PAGAR</p></a>
  `
  
  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)
  let totalCarrito = document.createElement("p")
  totalCarrito.className = "total-carrito"
  totalCarrito.innerHTML = `Total: $${total}`
  footerCarrito.append(totalCarrito)


  let pagar = document.getElementById("pagar")
  pagar.addEventListener("click", () => {
    cart.style.display = "none"
    if (total == 0) {
      Swal.fire(
        'Carrito vacio',
        'Agregue productos al carrito',
        'warning'
      )
    }else {
      let timerInterval
      let orderNumber = Math.round(Math.random() * 99999);
    Swal.fire({
    icon: 'success',
    title: `¡Muchas gracias por tu compra`,
    html: `<p>¡Tu orden está hecha!</p>
            <p>El total es <strong>$${total}</strong></p>
            <p>Codigo de pedido: ${orderNumber}</p>`,
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      location.href='./index.html';
    localStorage.removeItem('carrito');
    }
  });
    }
  })

}





verCarrito.addEventListener("click", pintarCarrito)
  
const eliminarProductoCarrito = (id) => {
    const foundId = carrito.find((element) => element.id === id)
    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId
    })
    carritoCounter()
    saveLocal()
    pintarCarrito()
}


const carritoCounter = () => {
    cantidadCarrito.style.display = "block"


    const carritoLength = carrito.length
if (carrito.length === 0) {
    cantidadCarrito.style.display = "none"
}else{
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}
    
    
}
carritoCounter()









