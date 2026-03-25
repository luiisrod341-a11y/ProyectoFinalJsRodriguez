
let servicios = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const contenedor = document.getElementById("contenedor-servicios");


const obtenerServicios = async () => {
    try {
        const response = await fetch("./data/servicios.json");
        servicios = await response.json();
        renderizarServicios(servicios);
        renderizarCarrito();
    } catch (error) {
        console.error("Error cargando servicios:", error);
    }
};


const renderizarServicios = (lista) => {
    contenedor.innerHTML = ""; 
    lista.forEach(servicio => {
        const card = document.createElement("div");
        card.className = "col-md-6 col-lg-4";
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${servicio.img}" class="card-img-top" alt="${servicio.nombre}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${servicio.nombre}</h5>
                    <p class="card-text text-muted">${servicio.descripcion}</p>
                    <p class="fw-bold mt-auto">$${servicio.precio.toLocaleString('es-AR')}</p>
                    <button class="btn btn-primary btn-agregar" id="btn-${servicio.id}">
                        Agregar al turno
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
        
        
        const boton = document.getElementById(`btn-${servicio.id}`);
        boton.addEventListener("click", () => agregarAlCarrito(servicio.id));
    });
};


obtenerServicios();

document.getElementById("btn-premium").addEventListener("click", () => {

    const serviciosPremium = servicios.filter(s => s.precio > 6000);

    renderizarServicios(serviciosPremium);

});

document.getElementById("btn-todos").addEventListener("click", () => {

    renderizarServicios(servicios);

});