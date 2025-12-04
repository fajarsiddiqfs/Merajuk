let currentlyShowing = 9;
let currentCategory = 'all';
const showPerClick = 9;

// Load products from Netlify CMS data (if available)
async function loadProducts() {
  const grid = document.getElementById('products-grid');
  const response = await fetch('data/products/products.json').catch(()=>null);
  let products = [];
  if (response) products = await response.json().catch(()=>[]);

  grid.innerHTML = '';
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card' + (index >= 9 ? ' hidden' : '');
    card.dataset.category = product.category;
    if(index >= 9) card.dataset.hidden = 'true';

    card.innerHTML = `
      <div class="product-image">${product.image ? `<img src="${product.image}" alt="${product.title}">` : 'Product Image'}</div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <span class="product-price">${product.price}</span>
      </div>
    `;
    grid.appendChild(card);
  });

  // Show/hide "Show More" button
  document.querySelector('.show-more-btn').style.display = products.length > 9 ? 'inline-block' : 'none';
}

function handleSubmit(event) {
  event.preventDefault();
  const email = event.target.querySelector('input[type="email"]').value;
  alert('Thanks for subscribing! (This is a demo - no actual subscription created)');
  event.target.reset();
}

function filterCategory(category) {
  currentCategory = category;
  
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const allCards = document.querySelectorAll('.product-card');
  allCards.forEach(card => { card.setAttribute('data-hidden','true'); card.classList.add('hidden'); });

  const matchingCards = category === 'all' ? Array.from(allCards) : Array.from(allCards).filter(c => c.dataset.category === category);

  let visibleCount = 0;
  matchingCards.forEach((card, index) => {
    if(index < 9) { card.classList.remove('hidden'); card.removeAttribute('data-hidden'); visibleCount++; }
  });

  currentlyShowing = visibleCount;
  document.querySelector('.show-more-btn').style.display = matchingCards.length > 9 ? 'inline-block' : 'none';
}

function showMore() {
  const hiddenCards = currentCategory === 'all'
    ? document.querySelectorAll('.product-card[data-hidden="true"]')
    : document.querySelectorAll(`.product-card[data-hidden="true"][data-category="${currentCategory}"]`);
  
  let shown = 0;
  hiddenCards.forEach(card => { if(shown < showPerClick){ card.classList.remove('hidden'); card.removeAttribute('data-hidden'); shown++; currentlyShowing++; } });

  const stillHidden = currentCategory === 'all'
    ? document.querySelectorAll('.product-card[data-hidden="true"]')
    : document.querySelectorAll(`.product-card[data-hidden="true"][data-category="${currentCategory}"]`);

  if(stillHidden.length === 0) document.querySelector('.show-more-btn').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', loadProducts);
