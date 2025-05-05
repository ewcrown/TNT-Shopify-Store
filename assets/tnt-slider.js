let swiper = new Swiper(".tnt-homeSlider", {
  loop: true,
  // speed: 1000,
  // autoplay: {
  //     delay: 3000,
  // },
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 20,
    stretch: 80,
    modifier: 1,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".tnt-announcement-bar .tnt-swiper-container", {
    slidesPerView: "auto",
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
  });
});
