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