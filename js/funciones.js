
const agregarAlCarrito = (id) => {
    
    const servicioElegido = servicios.find(s => s.id === id);
    
    
    carrito.push(servicioElegido);
    
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    
    Toastify({
        text: `${servicioElegido.nombre} añadido al turno`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

    
    renderizarCarrito();
};


const renderizarCarrito = () => {
    const contenedorCarrito = document.getElementById("items-carrito");
    const totalElemento = document.getElementById("total-presupuesto");
    const btnFinalizar = document.getElementById("btn-finalizar");
    const contador = document.getElementById("contador-carrito");

    
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>No hay servicios seleccionados.</p>";
        btnFinalizar.disabled = true;
        totalElemento.innerText = "$0";
        contador.innerText = "0";
    } else {
        btnFinalizar.disabled = false;
        
        
        carrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "d-flex justify-content-between align-items-center mb-2 p-2 border-bottom text-dark bg-white rounded";
            div.innerHTML = `
                <small>${item.nombre}</small>
                <span class="fw-bold">$${item.precio} 
                    <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito(${index})">×</button>
                </span>
            `;
            contenedorCarrito.appendChild(div);
        });

        
        let total = carrito.reduce((acc, item) => acc + item.precio, 0);
        
        if (total > 20000) {
            const descuento = total * 0.10;
            total = total - descuento;
            const avisoDesc = document.createElement("div");
            avisoDesc.className = "alert alert-success py-1 mt-2";
            avisoDesc.innerHTML = "<small>¡10% OFF por Combo Premium!</small>";
            contenedorCarrito.appendChild(avisoDesc);
        }

        totalElemento.innerText = `$${total}`;
        contador.innerText = carrito.length;
    }
};


const eliminarDelCarrito = (indice) => {
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
};


document.getElementById("btn-finalizar").addEventListener("click", () => {
    Swal.fire({
        title: '¿Confirmar Reserva?',
        text: "Te enviaremos un recordatorio por WhatsApp.",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, agendar!',
        cancelButtonText: 'Seguir eligiendo'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Excelente!',
                'Tu turno en La Brillaneta ha sido reservado.',
                'success'
            );
            
            carrito = [];
            localStorage.clear();
            renderizarCarrito();
        }
    });
});