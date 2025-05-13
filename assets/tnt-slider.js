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

document.addEventListener("DOMContentLoaded", function () {
  let feedbackswiper = new Swiper(".swiper.feedback-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4.1 },
    },
  });
});
