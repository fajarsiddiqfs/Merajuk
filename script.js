let products = [];
let currentlyShowing = 9;
let currentCategory = 'all';
const showPerClick = 9;

function handleSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  alert('Thanks for subscribing! (This is a demo - no actual subscription created)');
  event.target.reset();
}

// Load products from JSON
fetch('content/products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
  });

function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = '';

  const filtered = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);
  const visible = filtered.slice(0, currentlyShowing);

  visible.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image"><img src="${p.image}" alt="${p.title}"></div>
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <span class="product-price">${p.price}</span>
      </div>
    `;
    grid.appendChild(card);
  });

  // Show or hide "Show More" button
  document.querySelector('.show-more-btn').style.display = filtered.length > currentlyShowing ? 'inline-block' : 'none';
}

function filterCategory(category) {
  currentCategory = category;
  currentlyShowing = 9;

  document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  renderProducts();
}

function showMore() {
  currentlyShowing += showPerClick;
  renderProducts();
}
