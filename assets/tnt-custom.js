const discount_codes_wrap = document.querySelectorAll('.tnt-home-block__discount-banner');
if (discount_codes_wrap.length > 1) {
  discount_codes_wrap.forEach((single) => {
    single.addEventListener('click', () => {
      const code = single.dataset.code;
      if (code) {
        navigator.clipboard.writeText(code)
          .then(() => {
            alert(`Copied: ${code}`);
          })
          .catch((err) => {
            console.error('Failed to copy: ', err);
          });
      }
    });
  });
}

// Collection/Search Load More
document.addEventListener('DOMContentLoaded', function () {
  const loadMoreBtn = document.getElementById('LoadMoreButton');
  const productGrid = document.getElementById('product-grid');
  const spinner = document.getElementById('LoadMoreSpinner');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      const nextUrl = loadMoreBtn.getAttribute('data-next-url');
      if (!nextUrl) return;

      loadMoreBtn.disabled = true;
      spinner.classList.remove('hidden');

      fetch(nextUrl)
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newItems = doc.querySelectorAll('#product-grid > *');
          const nextBtn = doc.querySelector('#LoadMoreButton');

          newItems.forEach(item => {
            productGrid.appendChild(item);
          });

          bindQuickViewHandlers();
          bindProductCardHandlers();

          if (nextBtn) {
            loadMoreBtn.setAttribute('data-next-url', nextBtn.getAttribute('data-next-url'));
            loadMoreBtn.disabled = false;
          } else {
            loadMoreBtn.remove();
          }

          spinner.classList.add('hidden');
        })
        .catch(error => {
          console.error('Error loading more products:', error);
          loadMoreBtn.disabled = false;
          spinner.classList.add('hidden');
        });
    });
  }
});