const links = document.querySelectorAll('.catalog-list__item');
const contents = document.querySelectorAll('.content');
const catalogTopBtn = document.querySelector('.breadcrumb');
const catalogSection = document.querySelector('.catalog-section');
const mainNav = document.querySelector('.main-menu');
const catalogModal = document.querySelector('.catalog__modal')


const productList = document.getElementById('product-list');
const loadMoreBtn = document.getElementById('load-more-btn');
const offerProductList = document.getElementById('carousel-offer-list')

catalogTopBtn.onclick = () => {
    catalogTopBtn.classList.toggle('active');
    if (catalogTopBtn.classList.contains('active')) {
      catalogModal.classList.add('show');
      catalogModal.classList.remove('hide');
        // document.querySelector('.sidebar').classList.remove('hide');
    }else{
        mainNav.style.display = 'block';
        catalogModal.classList.add('hide');
        catalogModal.classList.remove('show');

    }
}
links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const category = this.dataset.category;
    console.log(category);
    

    // Barcha content'larni yashirish
    contents.forEach(content => {
      content.classList.add('hide');
    });

    // Faollashtirilganini ko‘rsatish
    const activeContent = document.querySelector(`.content[data-category="${category}"]`);
    if (activeContent) {
      activeContent.classList.remove('hide');
    }

    // Active class uchun (ixtiyoriy)
    links.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
// ///////////////////////////////////////////////////////////////////////
const swiper = new Swiper(".swiper", {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 15,
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });

  // ////////////////////////////////////////////////////////////////////////////////////
  let products = [];
  let currentIndex = 0;
  const ITEMS_PER_PAGE = 10;
  
  // Ma'lumotlarni olish
  async function fetchProducts() {
    try {
      const res = await fetch('https://dummyjson.com/products?delay=1000');
      const data = await res.json();
      products = data.products; // 🔥 to'g'rilandi
      renderProducts();
    } catch (error) {
      console.error('Xatolik:', error);
    }
  }
  
  // Mahsulotlarni chiqarish
  function renderProducts() {
    const nextItems = products.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
  
    nextItems.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      const oldPrice = (product.price * 1.2).toLocaleString('ru-RU') + " so'm";
      const newPrice = product.price.toLocaleString('ru-RU') + " so'm";
      
      const monthlyPrice = Math.round((product.price / 12 * 1000) ).toLocaleString('ru-RU') + " so'm/oyiga";
  
      productCard.innerHTML = `
          <div class="image-wrapper">
            <img src="${product.images[0]}" alt="${product.title}">
            <button class="favorite-btn">♡</button>
          </div>
          
          <span class="badge">Katta savdo</span>
          <h3 class="product-title">${product.title}</h3>
          
          <div class="rating">
            <span>⭐ 4.7</span>
            <span class="reviews">(1471 sharhlar)</span>
          </div>
  
          <div class="monthly-price">${monthlyPrice}</div>
  
          <div class="price-info">
            <span class="old-price" style="text-decoration: line-through; color: gray;">${oldPrice}</span>
            <span class="new-price" style="font-weight: bold; color: black;">${newPrice}</span>
            <button class="cart-btn">🛒</button>
            </div>
      `;
  
      productList.appendChild(productCard);
         // Faqat birinchi 5 tasini offer ro‘yxatga qo‘shish
    if (offerProductList.children.length < 5) {
      offerProductList.appendChild(productCard.cloneNode(true));
    }
  });
  
    currentIndex += ITEMS_PER_PAGE;
  
    if (currentIndex >= products.length) {
      loadMoreBtn.style.display = 'none';
    }
  }
  
  // Tugma bosilganda qolganlarini yuklash
  loadMoreBtn.addEventListener('click', renderProducts);
  
  // Boshlanishida yuklash
  fetchProducts();

// /////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////////

  const carousel = document.querySelector('.carousel');
  const likeButtons = document.querySelectorAll('.like-btn');
  let index = 0;

  document.getElementById('nextBtn').addEventListener('click', () => {
      index = (index + 1) % 5;
      updateCarousel();
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
      index = (index - 1 + 5) % 5;
      updateCarousel();
  });

  function updateCarousel() {
      carousel.style.transform = `translateX(-${index * 270}px)`;
  }

  likeButtons.forEach(button => {
      button.addEventListener('click', () => {
          button.classList.toggle('active');
      });
  });
// let products = [];
// let currentIndex = 0;
// const ITEMS_PER_PAGE = 10;
// const productList = document.querySelector('#productList'); // 🔥 ID orqali container
// const loadMoreBtn = document.querySelector('#loadMoreBtn'); // 🔥 Yuklash tugmasi

// // ✅ 1. Ma'lumotlarni API'dan olish
// async function fetchProducts() {
//   try {
//     const res = await fetch('https://dummyjson.com/products?delay=1000');
//     const data = await res.json();
//     products = data.products;
//     renderProducts();
//   } catch (error) {
//     console.error('Xatolik:', error);
//   }
// }

// // ✅ 2. Mahsulotlarni sahifaga chiqarish
// function renderProducts() {
//   const nextItems = products.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);

//   nextItems.forEach(product => {
//     const productCard = document.createElement('div');
//     productCard.classList.add('product-card');

//     productCard.innerHTML = `
//       <div class="image-wrapper">
//         <img src="${product.images[0]}" alt="${product.title}">
//         <button class="favorite-btn">♡</button>
//       </div>
      
//       <span class="badge">Katta savdo</span>
//       <h3 class="product-title">${product.title}</h3>
      
//       <div class="rating">
//         <span>⭐ ${product.rating}</span>
//         <span class="reviews">(${product.stock} dona qoldi)</span>
//       </div>

//       <div class="monthly-price">~ ${(product.price / 14).toFixed(0).toLocaleString()} so’m/oyiga</div>

//       <div class="price-info">
//         <span class="old-price">${(product.price * 1.2).toLocaleString()} so'm</span>
//         <span class="new-price">${} so'm</span>
//       </div>

//       <button class="cart-btn">🛒</button>
//     `;

//     productList.appendChild(productCard);
//   });

//   currentIndex += ITEMS_PER_PAGE;

//   // ❌ Hammasi chiqib bo‘lsa, tugmani yashiramiz
//   if (currentIndex >= products.length) {
//     loadMoreBtn.style.display = 'none';
//   }
// }

// // ✅ 3. Tugma bosilganda qolganlarini yuklash
// loadMoreBtn.addEventListener('click', renderProducts);

// // ✅ 4. Boshlanishida yuklash
// fetchProducts();


