// Add to Cart
const cartAdd = async (id) => {
  try {
    loader(true);

    const formData = {
      items: [
        {
          id: +id,
          quantity: 1,
        },
      ],
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${window.Shopify.routes.root}cart/add.js`, options);
    if (!response.ok) throw new Error('Failed to add item to the cart.');

    const cart = await getCart();
    const itemCount = cart?.item_count || 0;

    const drawerUpdated = await getCartDrawerData();
    if (drawerUpdated) {
      openCart(itemCount);
      updateCartBubble(itemCount);
    }
    console.log('Cart updated successfully');
  } catch (error) {
    console.error('Error in cartAdd:', error);
  } finally {
    loader(false);
  }
};

// Get Drawer Data
const getCartDrawerData = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${window.Shopify.routes.root}`, options);
    if (!response.ok) throw new Error('Failed to fetch drawer data.');

    const data = await response.text();
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(data, 'text/html');

    document.querySelector('#CartDrawer cart-drawer-items')?.classList?.remove('is-empty')
    document.querySelector('cart-drawer.drawer')?.classList?.remove('is-empty')
    document.querySelector('.drawer__inner-empty')?.remove()
    document.querySelector('#CartDrawer-Checkout')?.removeAttribute('disabled')

    // Update cart items and footer
    updateInnerHTML('#CartDrawer #CartDrawer-Form', parsedDocument);
    updateInnerHTML('.cart-drawer__footer', parsedDocument);

    return true;
  } catch (error) {
    console.error('Error in getCartDrawerData:', error);
    return false;
  }
};

// Update InnerHTML Helper
const updateInnerHTML = (selector, newDocument) => {
  const currentElement = document.querySelector(selector);
  const updatedElement = newDocument.querySelector(selector);
  if (currentElement && updatedElement) {
    currentElement.innerHTML = updatedElement.innerHTML;
  }
};

// Get Cart Data
const getCart = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${window.Shopify.routes.root}cart.js`, options);
    if (!response.ok) throw new Error('Failed to fetch cart data.');
    return await response.json();
  } catch (error) {
    console.error('Error in getCart:', error);
    return null;
  }
};

// Open Cart Drawer and Update Item Count
const openCart = (itemCount) => {
  document.body.classList.add('overflow-hidden');
  const cartDrawer = document.querySelector('cart-drawer.drawer');
  if (cartDrawer) cartDrawer.classList.add('active');
};

// Update Cart Bubble Helper
const updateCartBubble = (itemCount) => {
  const cartBubble = document.querySelector('.cart-count-bubble');
  if (cartBubble) {
    cartBubble.querySelector('span[aria-hidden="true"]').textContent = itemCount;
    cartBubble.querySelector('span.visually-hidden').textContent = `${itemCount} item${itemCount > 1 ? 's' : ''}`;
  } else {
    const cartIcon = document.querySelector('.header__icon--cart');
    if (cartIcon) {
      const bubbleHTML = `
        <div class="cart-count-bubble">
          <span aria-hidden="true">${itemCount}</span>
          <span class="visually-hidden">${itemCount} item${itemCount > 1 ? 's' : ''}</span>
        </div>`;
      cartIcon.insertAdjacentHTML('beforeend', bubbleHTML);
    }
  }
};

// Loader
const loader = (state) => {
  const existingLoader = document.querySelector('.loader-wrap');
  if (existingLoader && !state) {
    existingLoader.remove();
  } else if (state) {
    const loaderHTML = `
      <div class="loader-wrap">
        <div class="loader"></div>
      </div>`;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
  }
};

// Product Card
const productCards = document.querySelectorAll('.tnt-product-card');

productCards?.forEach(productCard => {
  const colorInputs = productCard.querySelectorAll('input[name="color"]');
  const sizeInputs = productCard.querySelectorAll('input[name="size"]');
  const select = productCard.querySelector('#tnt-product-select');
  const addToCartBtn = productCard.querySelector('.tnt-product-card-button-add');

  async function updateVariantSelection(e) {
    e.stopPropagation(); // Stop event from bubbling to anchor
    e.preventDefault(); // Prevent default anchor behavior

    const selectedColor = productCard.querySelector('input[name="color"]:checked')?.value;
    const selectedSize = productCard.querySelector('input[name="size"]:checked')?.value;

    if (!selectedColor || !selectedSize) return;

    const variantLabel = `${selectedColor} / ${selectedSize}`;

    const matchingOption = Array.from(select.options).find(
      option => option.value.trim() === variantLabel
    );

    if (matchingOption) {
      select.value = matchingOption.value;
      select.dispatchEvent(new Event('change'));
      addToCartBtn.dataset.variantId = matchingOption.dataset.id;

      // More console info
      console.log('Product Card:', productCard);
      console.log('Selected Color:', selectedColor);
      console.log('Selected Size:', selectedSize);
      console.log('Variant Label:', variantLabel);
      console.log('Variant ID:', matchingOption.dataset.id);

      await cartAdd(matchingOption.dataset.id);
    } else {
      console.warn('No matching variant found for:', variantLabel);
    }
  }

  // Add listeners
  colorInputs.forEach(input => input.addEventListener('change', updateVariantSelection));
  sizeInputs.forEach(input => input.addEventListener('change', updateVariantSelection));

  // Handle button click for Add to Cart
  addToCartBtn?.addEventListener('click', (e) => {
    e.stopPropagation();  // Stop event from bubbling to anchor
    e.preventDefault();    // Prevent default anchor behavior
    const variantId = addToCartBtn.dataset.variantId;
    if (variantId) {
      cartAdd(variantId);  // Call the cart add function with the selected variant
    }
  });
});


// Quick View Handler
const quickViewButtons = document.querySelectorAll('.tnt-product-card-button-quick-view');
const quickViewModal = document.getElementById('quickview-modal');
const quickViewDetails = document.getElementById('quickview-details');
const quickViewClose = document.querySelector('.quickview-close');

// Open Quick View Modal
quickViewButtons?.forEach(button => {
  button.addEventListener('click', async (e) => {
    e.stopPropagation();  // Stop event from bubbling to anchor
    e.preventDefault();    // Prevent default anchor behavior
    const handle = button.dataset.url;
    if (!handle) return;

    quickViewModal.classList.remove('hidden');
    quickViewDetails.innerHTML = 'Loading...';

    try {
      const response = await fetch(`products/${handle}?view=quickview`);
      if (!response.ok) throw new Error('Failed to fetch product details');

      const html = await response.text();
      quickViewDetails.innerHTML = html;

      // Optional: Re-bind add to cart inside modal
      const addToCartBtn = quickViewDetails.querySelector('.quickview-add-to-cart');
      const variantSelect = quickViewDetails.querySelector('select[name="id"]');
      if (addToCartBtn && variantSelect) {
        addToCartBtn.addEventListener('click', async () => {
          const variantId = variantSelect.value;
          if (variantId) {
            await cartAdd(variantId);
            quickViewModal.classList.add('hidden');
          }
        });
      }
    } catch (err) {
      quickViewDetails.innerHTML = `<p>Error loading product.</p>`;
      console.error(err);
    }
  });
});

// Close Modal
quickViewClose.addEventListener('click', () => quickViewModal.classList.add('hidden'));
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') quickViewModal.classList.add('hidden');
});