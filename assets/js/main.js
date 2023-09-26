//capturamos el contenedor de las fragancias
const productsContainer = document.querySelector(".perfumes");
//capturamos el boton load para ver mas fragancias
const showMoreBtn = document.querySelector(".btn__load");
//contenedor de las categorias
const categoriesContainer = document.querySelector(".categories");
//capturamos todas las categorias
const categoriesList = document.querySelectorAll(".category");

//capturamos el menu Hamburguesa
const menuBtn = document.querySelector(".menu__label");
//capturamos la lista de navegación
const barsMenu = document.querySelector(".navbar__list");

//Capturamos el icono del carrito
const cartBtn = document.querySelector(".cart__label");
//Capturamos el contenedor cart
const cartMenu = document.querySelector(".cart");
//capturamos el contenedor de los botones login y register
const headerLog = document.querySelector(".header__log");
//capturamos el overlay
const overlay = document.querySelector(".overlay");

//capturamos el contenedor donde va renderizado el carrito de compras
const productsCart = document.querySelector(".cart__container");

//capturamos el total del carrito de compras
const total = document.querySelector(".total");
//capturamos el msj para el usuario
const successModal = document.querySelector(".add__modal");
//capturamos el boton de compra
const btnBuy = document.querySelector(".cart__buy");
//capturamos el boton para vaciar el carrito
const btnDelete = document.querySelector(".cart__delete");
// capturamos la burbuja contadora
const cartBubble = document.querySelector(".cart__bubble");
//----------------------------------------------------------------

//  creamos el template de las cards
const createProductsTemplate = (fragancias) => {
  const { id, imagen, marca, precio, nombre, notas } = fragancias;
  return `
  
  <div class="product">
    <img class="card__img" src="${imagen}" alt="${nombre}" />
    <h1 class="card__title">${nombre}</h1>
    <div class="card__box">
    <h3 class="card__brand">${marca}</h3>
    <span class="card__price">Precio 💲:${precio} </span></div>
    <p class="card__notas">${notas}</p>
    <button 
    class="btn__add"
    data-id="${id}"
    data-nombre="${nombre}"
    data-marca="${marca}"
    data-precio="${precio}"
    data-imagen="${imagen}">Añadir
    <i class="fa-solid fa-cart-shopping"></i>
    </button>
  </div>
 

`;
};

//función para para averiguar si el indice actual renderizado de la lista de productos es igual a limite de productos
const isLastIndexOf = () => {
  return appState.currentProductIndex === appState.productLimit - 1;
};

//función para mostrar mas productos ante el click del usuario en el boton "Ver Mas"

const showMoreProduct = () => {
  appState.currentProductIndex += 1;
  let { products, currentProductIndex } = appState;
  renderProducts(products[currentProductIndex]);
  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

// Paso : 3 función que me permite el renderizado de mi aplicación
//sin nesecidad de escuchar un evento
const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map(createProductsTemplate)
    .join("");
};

//Función para aplicar el filtro cuando se cliquea el botón de categoría

const applyFilter = ({ target }) => {
  if (!isInactiveFilterBtn(target)) return;
  changeFilterState(target);
  //si vamos a mostrar cosas filtradas tengo que limpiar el div
  productsContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  renderProducts(appState.products[0]);
};

//renderizar los productos filtrados
const renderFilteredProducts = () => {
  const filteredProducts = fragancias.filter(
    (product) => product.category === appState.activeFilter
  );
  renderProducts(filteredProducts);
};

// chequep si el botón que se apretó no es un botón de categoría o ya está activo, no hace nada
const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

//cambio el estado del filtro
const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility();
};

//función para cambiar el estado de los botones de categorías
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

//función para mostrar u ocultar el botón de "ver más" según corresponsa
const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
    return;
  }
  showMoreBtn.classList.add("hidden");
};

//---------------------------------------------------------------
//EN ESTA SECCIÓN NOS DEDICAMOS A LA FUNCIONALIDAD DEL MENU HAMBURGUESA Y EL CARRITO DE COMPRAS
// funcion para desplegar el cart menu
const toggleCart = () => {
  // cuando el usuario haga click en el icono del carrito , se activa o desactiva el carrito de compras
  cartMenu.classList.toggle("open__cart");
  // en este paso verificamos  si el menu Hamburguesa esta desplegado
  if (barsMenu.classList.contains("open__menu")) {
    //si el menu Hamburguesa esta desplegado, lo cerramos eliminando la clase (open__menu)
    barsMenu.classList.remove("open__menu");

    return; //salimos de la función
  }
  // podemos activar o desactivar la superposición(overlay )
  overlay.classList.toggle("show__overlay");
};

const toggleMenu = () => {
  //cuando el usuario hace click en el icono de menú(Hamburguesa) , se activa o desactiva el menu de la navegación

  barsMenu.classList.toggle("open__menu");

  //verificamos si el carrito de compras esta desplegado
  if (cartMenu.classList.contains("open__cart")) {
    //si el carrito de compras esta desplegado , lo cerramos eliminando la clase(open__cart)
    cartMenu.classList.remove("open__cart");

    return; //salimos de la función
  }
  // podemos activar o desactivar la superposición(overlay)
  overlay.classList.toggle("show__overlay");
};

//función para cuando el usuario haga click en un link del menu de navegación se cierre el menu hamburguesa y el overlay
const closeOnClickLink = (e) => {
  if (e.target.classList.contains("navbar__link")) {
    return;
  }
  //si estoy haciendo click efectivamente en el link los cierro
  barsMenu.classList.remove("open__menu");
  overlay.classList.remove("show__");
};

//funcion para cerrar el carrito o el menu hamburguesa y ocultar el overlay si el usuario hace scroll
const closeOnScroll = () => {
  if (
    barsMenu.classList.contains("open__menu") &&
    cartMenu.classList.contains("open__cart")
  ) {
    return;
  }
  barsMenu.classList.remove("open__menu");
  cartMenu.classList.remove("open__cart");
  overlay.classList.remove("show__overlay");
};

//funcion para cerrar el carrito o el menu hamburguesa si el usuario hace click en el overlay
const closeOnOverlayClick = () => {
  barsMenu.classList.remove("open__menu");
  cartMenu.classList.remove("open__cart");
  overlay.classList.remove("show__overlay");
};

//SECCIÓN DE RENDERIZADO DEL CARRITO
//traemos la información almacenada en el localstore con la clave cart y la parseamos
// si no hay informacion almacenada en el localstore ,
// inicializamos "cart" con un arreglo vacío

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//n una variable constante guardamos la información en el localStorage con la clave "cart"
// con el metodo stringify convertimos el objeto js en una cadena Json
const cartSave = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//con el carrito guardado empiezo la lógica para el renderizado

const renderCart = () => {
  // si la longitud del carrito es igual a cero se ejecuta el siguiente código

  if (!cart.length) {
    //el contenedor productscart en su inerhtml agrega un parrafo con una clase  y un mensaje luego retorna
    productsCart.innerHTML = `
     <p class="empty__msg">no hay articulos seleccionados</p>
    `;
    return;
  }
  //en caso de que la primera condición sea falsa
  //se jecuta el contendor productscart que se actualiza con el metodo inerHTML y le asigna el resultado del mapeo de los elementos del carrito con el template generado por función
  productsCart.innerHTML = cart.map(createCartTemplate);
};

//creamos el molde de nuestro carrito de compras

const createCartTemplate = (cartProducts) => {
  console.log("queonda", cartProducts);
  const { id, imagen, nombre, precio, quantity } = cartProducts;
  return `<div class="cart__item">
  <img src="${imagen}" alt="${nombre}" />
  <div class="item__info">
    <h3 class="item__title">${nombre}</h3>
    <span class="item__price">💲${precio}</span>
  </div>
  <div class="item__handler">
    <button class="quantity__handler up" data-id="${id}">+</button>
    <span class="item__quantity">${quantity}</span>
    <button class="quantity__handler down" data-id="${id}">-</button>
  </div>
</div>
`;
};
//creamos una función para que nos muestre el total de la compra
const showCartTotal = () => {
  //aqui va una funcion auxiliar que traiga el total del carrito
  total.innerHTML = ` 💲${getCartTotal().toFixed(2)}`;
};

const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0);
};

//función para crear un objeto con la info que quiero agregar al carrito
//o agregar una unidad del producto ya incorporado a mi carrito de compras

const addProduct = (e) => {
  //si el lugar desde donde proviene el evento click no contiene la clase btn__add
  if (!e.target.classList.contains("btn__add")) {
    //lo retorno
    return;
  }

  //aca voy a guardar el dataset del producto que estoy agregando, para saber si existe o no el producto en el carrito

  //llamo a la función desestructuradora para saber lo que voy a utilizar
  const product = createProductData(e.target.dataset);

  //comprobamos si el producto ya esta en el carrito
  if (isExistingCartProduct(product)) {
    //si exite el producto le agregamos una unidad
    addUnitToProduct(product);
    //ahora mostramos un feedback al usuario para que separa que se agrego el producto
    showSuccessModal("Se agrego una unidad del producto a tu carrito");
  } else {
    //creamos el producto en el  carrito y le damos el msg al usuario

    createCartProduct(product);
    showSuccessModal("El perfume se agrego al carrito");
  }
  updateCartState();
};

//función desestructuradora
const createProductData = (product) => {
  const { id, imagen, nombre, precio } = product;
  return { id, imagen, nombre, precio };
};

//función para comprobar si el producto ya fue agregado al carrito de compras
const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

//creamos una función para agregar una unidad al producto que ya esta en el carrito
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};
//creamos la función para darle la devolución al usuario
const showSuccessModal = (msg) => {
  //activo el modal
  successModal.classList.add("active__modal");
  //su textcontent va a ser un msg dinamico que lo agregamos arriba
  successModal.textContent = msg;
  // despues de un segundo y medio lo remuevo
  setTimeout(() => {
    successModal.classList.remove("active__modal");
  }, 1000);
};

//creamos un objeto con la información del producto que queremos agregar

const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

const disableButtons = (btn) => {
  //si el carrito se encuentra vacio
  //añado la clase disabled
  if (!cart.length) {
    btn.classList.add("disabled");
  } // de lo contrario si hay productos en mi carrito elimino el disabled
  else {
    console.log("este es el error", disableButtons);
    btn.classList.remove("disabled");
  }
};

const renderCartBubble = () => {
  cartBubble.textContent = cart.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
};
const updateCartState = () => {
  cartSave();
  renderCart();
  showCartTotal();
  renderCartBubble();

  //aplicamos la clase disabled cuando no hay productos
  disableButtons("cart__buy");
  disableButtons("cart__delete");
};

//-----------------------------------------------------------------

// Paso :2 creamos la funcion inicializadora
const init = () => {
  renderProducts(appState.products[0]);
  showMoreBtn.addEventListener("click", showMoreProduct);
  categoriesContainer.addEventListener("click", applyFilter);
  cartBtn.addEventListener("click", toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeOnOverlayClick);
  window.addEventListener("scroll", closeOnScroll);
  barsMenu.addEventListener("click", closeOnClickLink);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showCartTotal);
  productsContainer.addEventListener("click", addProduct);
  renderCartBubble(cart);
  document.addEventListener("DOMContentLoaded", () => {
    disableButtons(btnBuy);
    disableButtons(btnDelete);
  });
};

init();
