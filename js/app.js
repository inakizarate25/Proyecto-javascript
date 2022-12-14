

// array con los productos
const productos = [
    {nombre: "xiaomi",  precio:320},
    {nombre: "samsung",  precio:900},
    {nombre: "motorola",  precio:280},
    {nombre: "iphone", precio:980},
    {nombre: "alcatel",  precio:210},
    {nombre: "hwawei",  precio:360},
    {nombre: "honor",  precio:260},
    {nombre: "zte", precio:190},
]

// carrito de compras
let carrito = []



let seleccion = prompt("Hola, desea comprar algun producto?")


while (seleccion != "si" && seleccion != "no") {
        seleccion = prompt("si desea continuar ingrese si o no")
    }



    if (seleccion == "si"){
        alert("a continuacion nuestra lista de productos")

        let todosLosProductos = productos.map((productos) => productos.nombre + " " + "$" + productos.precio )
        alert(todosLosProductos.join("\n"))
    }else if (seleccion == "no") {
        alert("Gracias por visitar nuestra tienda")
    }



    while (seleccion != "no") {
        let producto = prompt("agrega un producto a tu carrito")
        let precio = 0
        

        if (producto == "xiaomi" || producto == "samsung" || producto == "motorola" ||  producto == "iphone" || producto == "alcatel" || producto == "hwawei" || producto == "honor" || producto == "zte" ){
            switch (producto){
                case "xiaomi":
                    precio = 320
                    break

                case "samsung":
                    precio = 900
                    break

                case "motorola":
                    precio = 280
                    break    

    
                case "iphone":
                    precio = 980
                    break
                        
                case "alcatel":
                    precio = 210
                    break   
                    
                case "hwawei":
                    precio = 360
                    break
    
                case "honor":
                    precio = 260
                    break
                        
                case "zte":
                    precio = 190
                    break     

                default:
                    break    
            }




        let unidades = parseInt(prompt("cuantas unidades quiere comprar?"))  
        carrito.push({producto, unidades, precio})
        

        }else {
            alert("no tenemos ese producto")
            }

        seleccion = prompt("desea seguir comprando?")
        while (seleccion === "no"){
            

            carrito.forEach((carritoFinal) => {
                alert(`Producto: ${carritoFinal.producto} - unidades ${carritoFinal.unidades} - total a pagar por producto $${carritoFinal.unidades*carritoFinal.precio}`)
            })
            break
        }
        const total = carrito.reduce((acc, el) => acc + el.precio*el.unidades, 0)
        alert(`total a pagar: $${total}`)
        
        
    }
    alert("gracias por la compra")

   



