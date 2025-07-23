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

// function initSwiper() {
//   new Swiper("#tntKidsSwiper", {
//     loop: true,
//     slidesPerView: 4,
//     spaceBetween: 12,
//     speed: 6000,
//     loopedSlides: 20,
//     autoplay: {
//       delay: 0,
//       disableOnInteraction: false,
//       pauseOnMouseEnter: false,
//     },
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
//     breakpoints: {
//       1024: { slidesPerView: 6 },
//       1400: { slidesPerView: 11 },
//     },
//   });
// }

// document.addEventListener("DOMContentLoaded", initSwiper);

let imageTextSwiper;

function initImageTextSwiper() {
  const isInitialized = !!imageTextSwiper;

  if (!isInitialized) {
    imageTextSwiper = new Swiper("#imageTextSwiper", {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: "#imageTextSwiper .swiper-button-next",
        prevEl: "#imageTextSwiper .swiper-button-prev",
      },
      pagination: {
        el: "#imageTextSwiper .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 6,
        },
      },
    });
  }
}

document.addEventListener("DOMContentLoaded", initImageTextSwiper);
