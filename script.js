let products = [];
let currentlyShowing = 9;
let currentCategory = 'all';
let searchQuery = '';
const showPerClick = 9;

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
  
  // Filter by category
  let filtered = currentCategory === 'all' ? products : products.filter(p => p.category === currentCategory);
  
  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  const visible = filtered.slice(0, currentlyShowing);
  
  // If no products found, show a message
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="text-align: center; color: #999; grid-column: 1/-1; padding: 40px 0;">Tiada produk dijumpai.</p>';
    document.querySelector('.show-more-btn').style.display = 'none';
    return;
  }
  
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

// Search functionality
function handleSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  
  searchQuery = input.value.trim();
  currentlyShowing = 9; // Reset to initial display count
  
  // Show/hide clear button
  clearBtn.style.display = searchQuery ? 'flex' : 'none';
  
  renderProducts();
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearch');
  
  input.value = '';
  searchQuery = '';
  clearBtn.style.display = 'none';
  currentlyShowing = 9;
  
  renderProducts();
}