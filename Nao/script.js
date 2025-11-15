// =============================
// BASE DE DATOS DE SUPLEMENTOS
// =============================
const suplementos = {
  proteinas: [
    { name: "Whey Protein", price: 120000, img: "gs-whey-main.jpg" },
    { name: "Caseína", price: 135000, img: "ca41+mwmGU4cL.jpg" },
    { name: "Proteína Vegana", price: 110000, img: "VeganEco_600px.jpg" }
  ],
  creatinas: [
    { name: "Creatina Monohidratada", price: 90000, img: "Mono0311943c53972fa79c6ad28f16857ce9.jpg" },
    { name: "Creatina Micronizada", price: 95000, img: "Microcreatina-platinum-400-gramos-micronizada-muscletech-D_NQ_NP_846082-MLM31369441734_072019-F.jpg" },
    { name: "Creatina con Beta-Alanina", price: 100000, img: "creatina-beta-alanina-225g-natural-profit-27397-67501-EG.jpg" }
  ],
  energeticos: [
    { name: "Pre-Workout Explosivo", price: 80000, img: "Prediabo_verde_pre_workout_energetico_300g_509_1_7d65c3db48c53d7d7f2d2401b430cc07.webp" },
    { name: "Bebida Energética Zero", price: 60000, img: "bebida-energetica-como-monster-bebida-sabor-negro-mate-ia-generativa_920025-125.avif" },
    { name: "Cafeína Pura", price: 50000, img: "cafe-taza-blanca-platillo-fondo-negro-cafeina-platos-bebidas-cafe-caliente_662214-314396.jpg" }
  ]
};

// =============================
// MOSTRAR VARIEDADES
// =============================
function showSupplements(type) {
  const container = document.getElementById("supplement-varieties");
  container.innerHTML = `
    <h3>Variedades de ${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
    <div class="grid"></div>
  `;

  const grid = container.querySelector(".grid");

  suplementos[type].forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="card-img">
      <h4>${product.name}</h4>
      <p class="precio">$${product.price.toLocaleString("es-CO")}</p>
      <button class="btn" onclick="addToCart('${product.name}', ${product.price})">Agregar al Carrito</button>
    `;

    grid.appendChild(card);
  });

  container.scrollIntoView({ behavior: "smooth" });
}

// =============================
// CARRITO
// =============================
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  const cartContainer = document.querySelector(".cart-container");
  cartContainer.innerHTML = "<h3>🛒 Carrito</h3>";
  
  if (cart.length === 0) {
    cartContainer.innerHTML += "<p>No hay productos en el carrito.</p>";
    return;
  }

  const ul = document.createElement("ul");
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toLocaleString("es-CO")}`;

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => removeFromCart(index);

    li.appendChild(btn);
    ul.appendChild(li);
  });

  cartContainer.appendChild(ul);

  const totalEl = document.createElement("p");
  totalEl.innerHTML = `<strong>Total: $${total.toLocaleString("es-CO")}</strong>`;
  cartContainer.appendChild(totalEl);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// =============================
// FORMULARIO DE INSCRIPCIÓN
// =============================
function openForm(service) {
  document.getElementById("formModal").style.display = "block";
  document.getElementById("selectedService").value = service;
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

document.getElementById("serviceForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const service = document.getElementById("selectedService").value;
  alert(`¡Gracias ${name}! Te inscribiste en: ${service}`);
  closeForm();
  this.reset();
});
