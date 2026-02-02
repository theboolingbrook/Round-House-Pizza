// ============================================================================
// MENU DATA
// ============================================================================
const MENU_ITEMS = [


  // ================= COMBO DEALS =================
  { id: 'fantastic-four', name: 'Fantastic Four Deal', price: 3400, category: 'Deals', image: 'public/bbq-chicken-wrap.jpg' },
  { id: 'cheesy-affair', name: 'Cheesy Affair Deal', price: 2900, category: 'Deals', image: 'public/buffalo-chicken-burger.jpg' },
  { id: 'merry-go-round', name: 'Merry Go Round Deal', price: 2600, category: 'Deals', image: 'public/crispy-chicken-burger.png' },

  // ================= PIZZA (ROUND HOUSE) =================
  { id: 'pepperoni-pizza', name: 'Pepperoni Pizza', price: 1700, category: 'Pizza', image: 'public/cheetos-chicken-slider.jpg' },
  { id: 'bbq-chicken-pizza', name: 'BBQ Chicken Pizza', price: 1750, category: 'Pizza', image: 'public/cheetos-chicken-slider.jpg' },
  { id: 'fajita-pizza', name: 'Chicken Fajita Pizza', price: 1700, category: 'Pizza', image: 'public/classic-beef-burger.png' },
  { id: 'cheese-lover', name: 'Cheese Lover Pizza', price: 1650, category: 'Pizza', image: 'public/classic-beef-sliders.jpg' },
  { id: 'vegetarian-pizza', name: 'Vegetarian Pizza', price: 1600, category: 'Pizza', image: 'public/crispy-chicken-burger.png' },

  // ================= SPECIAL PIZZAS =================
  { id: 'monster-pizza', name: 'Monster Pizza', price: 5400, category: 'Special Pizza', image: 'public/crispy-chicken-nuggets.png' },
  { id: 'round-house-special', name: 'Round House Special Pizza', price: 5000, category: 'Special Pizza', image: 'public/crispy-chicken-strips.png' },

  // ================= PASTA =================
  { id: 'alfredo-pasta', name: 'Chicken Alfredo Pasta', price: 950, category: 'Pasta', image: 'public/cheetos-chicken-slider.jpg' },
  { id: 'arrabiata-pasta', name: 'Arrabiata Pasta', price: 900, category: 'Pasta', image: 'public/buffalo-chicken-burger.jpg' },
  { id: 'bbq-pasta', name: 'BBQ Chicken Pasta', price: 980, category: 'Pasta', image: 'public/crispy-chicken-strips.png' },

  // ================= SANDWICHES =================
  { id: 'club-sandwich', name: 'Club Sandwich', price: 650, category: 'Sandwiches', image: 'public/crispy-chicken-nuggets.png' },
  { id: 'grilled-sandwich', name: 'Grilled Chicken Sandwich', price: 620, category: 'Sandwiches', image: 'public/crispy-chicken-burger.png' },

  // ================= SIDES =================
  { id: 'garlic-bread', name: 'Garlic Bread', price: 450, category: 'Sides', image: 'public/classic-beef-sliders.jpg' },
  { id: 'cheese-sticks', name: 'Cheese Sticks', price: 520, category: 'Sides', image: 'public/classic-beef-burger.png' },
  { id: 'chicken-wings', name: 'Chicken Wings', price: 780, category: 'Sides', image: 'public/cheetos-chicken-slider.jpg' },

  // ================= ADD ONS =================
  { id: 'extra-cheese', name: 'Extra Cheese', price: 200, category: 'Addons', image: 'public/buffalo-chicken-burger.jpg' },
  { id: 'extra-sauce', name: 'Extra Sauce', price: 120, category: 'Addons', image: 'public/bbq-chicken-wrap.jpg' },
];

const BRANCHES = [
  { name: 'Round House Pizza Islamabad', phone: '+92 340 4000054', address: 'Besides Safa Gold Mall, Shop 5, Trade Centre Plaza, F-7 Markaz, Islamabad, Islamabad, Pakistan, 44000' },
];

// ============================================================================
// STATE MANAGEMENT
// ============================================================================
let cart = [];
let activeCategory = 'Burgers';

// ============================================================================
// DOM ELEMENTS
// ============================================================================
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const menuCategories = document.getElementById('menuCategories');
const menuItemsGrid = document.getElementById('menuItemsGrid');
const branchesGrid = document.getElementById('branchesGrid');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNavMenu = document.getElementById('mobileNavMenu');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// ============================================================================
// INITIALIZATION
// ============================================================================
function init() {
  renderCategories();
  renderMenuItems();
  renderBranches();
  setupEventListeners();
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================
function setupEventListeners() {
  cartBtn.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  checkoutBtn.addEventListener('click', checkout);
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
  document.addEventListener('scroll', () => {
    if (mobileNavMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

// ============================================================================
// MOBILE MENU
// ============================================================================
function toggleMobileMenu() {
  if (mobileNavMenu.classList.contains('active')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  mobileNavMenu.classList.add('active');
  menuIcon.style.display = 'none';
  closeIcon.style.display = 'block';
}

function closeMobileMenu() {
  mobileNavMenu.classList.remove('active');
  menuIcon.style.display = 'block';
  closeIcon.style.display = 'none';
}

// ============================================================================
// CATEGORY RENDERING
// ============================================================================
function renderCategories() {
 const categories = [
  'Deals',
  'Pizza',
  'Special Pizza',
  'Pasta',
  'Sandwiches',
  'Sides',
  'Addons'
];

  
  menuCategories.innerHTML = categories.map(category => `
    <button class="category-btn ${category === activeCategory ? 'active' : ''}" data-category="${category}">
      ${category}
    </button>
  `).join('');

  menuCategories.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeCategory = e.target.dataset.category;
      menuCategories.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderMenuItems();
    });
  });
}

// ============================================================================
// MENU RENDERING
// ============================================================================
function renderMenuItems() {
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);
  
  menuItemsGrid.innerHTML = filteredItems.map(item => {
    const quantity = getItemQuantity(item.id);
    return `
      <div class="menu-item">
        <div class="menu-item-image">
          <img src="${item.image}" alt="${item.name}">
          <div class="menu-item-price-badge">Rs. ${item.price}</div>
        </div>
        <h4 class="menu-item-name">${item.name}</h4>

        <div class="menu-item-footer">
          <div class="menu-item-price">Rs. ${item.price}</div>
          <button class="add-btn" data-id="${item.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  menuItemsGrid.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = e.currentTarget.dataset.id;
      addToCart(itemId);
    });
  });
}

// ============================================================================
// BRANCHES RENDERING
// ============================================================================
function renderBranches() {
  branchesGrid.innerHTML = BRANCHES.map(branch => `
    <div class="branch-card">
      <div>
        <h3 class="branch-name">${branch.name}</h3>
        <div class="branch-address">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${branch.address}</span>
        </div>
        <div class="branch-phone">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>${branch.phone}</span>
        </div>
      </div>
      <a href="tel:${branch.phone.replace(/-/g, '')}" class="call-btn">Call Now</a>
    </div>
  `).join('');
}

// ============================================================================
// CART MANAGEMENT
// ============================================================================
function addToCart(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  const existingItem = cart.find(i => i.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  updateCart();
  openCart();
}

function updateQuantity(itemId, delta) {
  const item = cart.find(i => i.id === itemId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeItem(itemId);
    } else {
      updateCart();
    }
  }
}

function removeItem(itemId) {
  cart = cart.filter(i => i.id !== itemId);
  updateCart();
}

function updateCart() {
  updateCartCount();
  renderCartItems();
  updateTotal();
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPrice.textContent = `Rs. ${total}`;
  checkoutBtn.disabled = cart.length === 0;
}

function renderCartItems() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-header">
          <h3 class="cart-item-name">${item.name}</h3>
          <span class="cart-item-price">Rs. ${item.price * item.quantity}</span>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-control">
            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" data-id="${item.id}" data-action="increase">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          <button class="remove-btn" data-id="${item.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Attach event listeners
  cartItems.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = e.currentTarget.dataset.id;
      const action = e.currentTarget.dataset.action;
      updateQuantity(itemId, action === 'increase' ? 1 : -1);
    });
  });

  cartItems.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const itemId = e.currentTarget.dataset.id;
      removeItem(itemId);
    });
  });
}

// ============================================================================
// CART DRAWER
// ============================================================================
function openCart() {
  cartDrawer.classList.add('active');
}

function closeCart() {
  cartDrawer.classList.remove('active');
}

// ============================================================================
// CHECKOUT
// ============================================================================
function checkout() {
  if (cart.length === 0) return;

  const message = 
    `*New Order from Round House Pizza Website*\n` +
    `----------------------------------\n` +
    cart.map(item => `• ${item.name}\n  Qty: ${item.quantity} | Rs. ${item.price * item.quantity}`).join('\n\n') +
    `\n----------------------------------\n` +
    `*TOTAL: Rs. ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}*\n\n` +
    `Please confirm my order. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/923392003612?text=${encodedMessage}`, '_blank');
}

// ============================================================================
// GET ITEM QUANTITY
// ============================================================================
function getItemQuantity(itemId) {
  return cart.find(i => i.id === itemId)?.quantity || 0;
}

// ============================================================================
// RESERVATION FORM
// ============================================================================
const WHATSAPP_NUMBER = '923404000054'; // Format: country code + number without + or -

function openReservationModal() {
  const modal = document.getElementById('reservationModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
  const modal = document.getElementById('reservationModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  document.getElementById('reservationForm').reset();
}

function handleReservationSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('resName').value.trim();
  const phone = document.getElementById('resPhone').value.trim();
  const persons = document.getElementById('resPersons').value.trim();
  const date = document.getElementById('resDate').value.trim();
  const time = document.getElementById('resTime').value.trim();
  const message = document.getElementById('resMessage').value.trim();

  if (!name || !phone || !persons || !date || !time) {
    alert('Please fill in all required fields');
    return;
  }

  const whatsappMessage = `Hi Round House Pizza,%0AI want to book a table.%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0APersons: ${encodeURIComponent(persons)}%0ADate: ${encodeURIComponent(date)}%0ATime: ${encodeURIComponent(time)}${message ? '%0AMessage: ' + encodeURIComponent(message) : ''}`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  closeReservationModal();
  window.open(whatsappUrl, '_blank');
}

// ============================================================================
// START APP
// ============================================================================
function setupReservationListeners() {
  const bookTableBtn = document.getElementById('bookTableBtn');
  const mobileBookTableBtn = document.getElementById('mobileBookTableBtn');
  const reservationModal = document.getElementById('reservationModal');
  const reservationOverlay = document.getElementById('reservationOverlay');
  const reservationCloseBtn = document.getElementById('reservationCloseBtn');
  const reservationForm = document.getElementById('reservationForm');

  if (bookTableBtn) {
    bookTableBtn.addEventListener('click', openReservationModal);
  }

  if (mobileBookTableBtn) {
    mobileBookTableBtn.addEventListener('click', openReservationModal);
  }

  if (reservationOverlay) {
    reservationOverlay.addEventListener('click', closeReservationModal);
  }

  if (reservationCloseBtn) {
    reservationCloseBtn.addEventListener('click', closeReservationModal);
  }

  if (reservationForm) {
    reservationForm.addEventListener('submit', handleReservationSubmit);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reservationModal.classList.contains('active')) {
      closeReservationModal();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupReservationListeners();
  init();
});
