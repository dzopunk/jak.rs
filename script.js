///////////////////////
/////modal window//////
//////////////////////

const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".modal__btn-close");
const btnOpenModal = document.querySelectorAll(".open-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
};

btnOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////
////smooth animation reaveal////
/////////////////////////////////

const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.5,
};
const appearOnSroll = new IntersectionObserver(function (
  entries,
  appearOnSroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnSroll.unobserve(entry.target);
    }
  });
},
appearOptions);
faders.forEach((fader) => {
  appearOnSroll.observe(fader);
});

//////////////////////////////////
///////////menu-nav bar//////////
////////////////////////////////

const menuIcons = document.querySelectorAll('.header__nav_menu-icon')
const menuButton = document.querySelector(".header__nav_menu");
const menu = document.querySelector ('.header__nav_list');

const toggleMenu = function(){
  if(menu.classList.contains('hide-menu')){
    menu.classList.add('show-menu')
    menu.classList.remove('hide-menu')
  }else{
    menu.classList.add('hide-menu')
  }
  menuIcons.forEach(function(icon){
    icon.classList.toggle('close-menu')
  });
}

menuButton.addEventListener('click', toggleMenu);
menu.addEventListener('click', toggleMenu);

///////////////////
///lazy loading////
///////////////////
document.addEventListener("DOMContentLoaded", function () {
  const lazyloadImages = document.querySelectorAll(".lazy");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
});