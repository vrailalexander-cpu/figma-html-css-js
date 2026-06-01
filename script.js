"use strict";

const body = document.body;

const header =
  document.querySelector(".header");

const burger =
  document.querySelector(".burger");

const modal =
  document.querySelector("#modal-contact");

const modalClose =
  document.querySelector(".modal__close");

const modalButtons =
  document.querySelectorAll(
    'a[href="#modal-contact"]'
  );

const form =
  document.querySelector(".form");

const emailInput =
  document.querySelector("#email");

const messageInput =
  document.querySelector("#message");

const testimonialSlider =
  document.querySelector(
    ".testimonials__grid"
  );

const animatedElements =
  document.querySelectorAll(
    ".card, .step, .testimonial, .hero__content, .hero__image"
  );

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COOKIE_STORAGE_KEY =
  "codelearn_cookie";

let lastScrollY = 0;

header.style.transition =
  "transform 0.3s ease, box-shadow 0.3s ease";

const handleHeaderScroll = () => {
  const currentScroll =
    window.scrollY;

  if (currentScroll <= 0) {
    header.style.transform =
      "translateY(0)";
    header.style.boxShadow =
      "none";
    return;
  }

  if (
    currentScroll > lastScrollY &&
    currentScroll > 120
  ) {
    header.style.transform =
      "translateY(-100%)";
  }

  else {
    header.style.transform =
      "translateY(0)";

    header.style.boxShadow =
      "0 8px 24px rgba(0,0,0,0.08)";
  }
  lastScrollY = currentScroll;
};

window.addEventListener(
  "scroll",
  handleHeaderScroll
);

const mobileMenu =
  document.createElement("aside");

mobileMenu.classList.add(
  "mobile-menu"
);

mobileMenu.innerHTML = `
  <div class="mobile-menu__overlay"></div>
  <div class="mobile-menu__content">
    <button
      class="mobile-menu__close"
      aria-label="Закрити меню"
    >
      ×
    </button>
    <nav
      class="mobile-menu__navigation"
      aria-label="Мобільна навігація"
    >
      <ul class="mobile-menu__list">
        <li>
          <a href="#about" class="mobile-menu__link">
            Про нас
          </a>
        </li>
        <li>
          <a href="#learning" class="mobile-menu__link">
            Навчання
          </a>
        </li>
        <li>
          <a href="#reviews" class="mobile-menu__link">
            Відгуки
          </a>
        </li>
        <li>
          <a href="#contact" class="mobile-menu__link">
            Контакти
          </a>
        </li>
      </ul>
    </nav>
  </div>
`;

body.appendChild(mobileMenu);

const mobileMenuOverlay =
  mobileMenu.querySelector(
    ".mobile-menu__overlay"
  );

const mobileMenuContent =
  mobileMenu.querySelector(
    ".mobile-menu__content"
  );

const mobileMenuClose =
  mobileMenu.querySelector(
    ".mobile-menu__close"
  );

const mobileMenuLinks =
  mobileMenu.querySelectorAll(
    ".mobile-menu__link"
  );

const openMenu = () => {
  mobileMenu.classList.add(
    "mobile-menu--active"
  );
  body.style.overflow = "hidden";
};

const closeMenu = () => {
  mobileMenu.classList.remove(
    "mobile-menu--active"
  );
  body.style.overflow = "";
};

burger.addEventListener(
  "click",
  openMenu
);

mobileMenuClose.addEventListener(
  "click",
  closeMenu
);

mobileMenuOverlay.addEventListener(
  "click",
  closeMenu
);

mobileMenuLinks.forEach((link) => {
  link.addEventListener(
    "click",
    closeMenu
  );
});

const goTopButton =
  document.createElement("button");

goTopButton.classList.add(
  "go-top"
);

goTopButton.innerHTML = "↑";

goTopButton.setAttribute(
  "aria-label",
  "Go Top"
);

body.appendChild(goTopButton);

const toggleGoTop = () => {
  const dynamicScreenHeight =
    window.innerHeight;
  if (
    window.scrollY >
    dynamicScreenHeight * 0.8
  ) {
    goTopButton.classList.add(
      "go-top--visible"
    );

  } else {
    goTopButton.classList.remove(
      "go-top--visible"
    );
  }
};

window.addEventListener(
  "scroll",
  toggleGoTop
);

goTopButton.addEventListener(
  "click",
  () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
);

const initCookieBar = () => {
  const cookieAccepted =
    localStorage.getItem(
      COOKIE_STORAGE_KEY
    );

  if (cookieAccepted) return;

  const cookieBar =
    document.createElement("div");

  cookieBar.classList.add(
    "cookie-bar"
  );

  cookieBar.innerHTML = `
    <div class="cookie-bar__content">
      <p class="cookie-bar__text">
        Ми використовуємо cookie
        для покращення сайту.
      </p>
      <button
        class="cookie-bar__button"
      >
        Прийняти
      </button>
    </div>
  `;

  body.appendChild(cookieBar);

  const acceptButton =
    cookieBar.querySelector(
      ".cookie-bar__button"
    );

  acceptButton.addEventListener(
    "click",
    () => {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        "accepted"
      );

      cookieBar.classList.add(
        "cookie-bar--hide"
      );

      setTimeout(() => {
        cookieBar.remove();
      }, 300);
    }
  );
};

initCookieBar();

const openModal = () => {
  modal.classList.add(
    "modal--active"
  );
  body.style.overflow = "hidden";
};

const closeModal = () => {
  modal.classList.remove(
    "modal--active"
  );
  body.style.overflow = "";
};

modalButtons.forEach((button) => {
  button.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      openModal();
    }
  );
});

modalClose.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

    closeModal();
  }
);

modal.addEventListener(
  "click",
  (event) => {
    if (event.target === modal) {
      closeModal();
    }
  }
);

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "Escape" &&
      modal.classList.contains(
        "modal--active"
      )
    ) {
      closeModal();
    }
  }
);

const showError = (
  input,
  message
) => {
  input.style.borderColor =
    "var(--color-error)";

  input.setCustomValidity(
    message
  );

  input.reportValidity();
};

const clearError = (
  input
) => {
  input.style.borderColor =
    "transparent";
  input.setCustomValidity("");
};

form.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    const emailValue =
      emailInput.value.trim();

    const messageValue =
      messageInput.value.trim();

    let valid = true;

    if (
      !EMAIL_REGEX.test(emailValue)
    ) {
      showError(
        emailInput,
        "Введіть правильний email"
      );
      valid = false;
    } else {
      clearError(emailInput);
    }

    if (
      messageValue.length < 5
    ) {
      showError(
        messageInput,
        "Повідомлення занадто коротке"
      );
      valid = false;
    } else {
      clearError(messageInput);
    }

    if (valid) {
      const success =
        document.createElement("div");
      success.classList.add(
        "form-success"
      );

      success.textContent =
        "Повідомлення успішно надіслано!";
      form.appendChild(success);
      form.reset();

      setTimeout(() => {
        success.remove();
        closeModal();
      }, 2500);
    }
  }
);

if (testimonialSlider) {

  const sliderWrapper =
    document.createElement("div");

  sliderWrapper.classList.add(
    "single-slider"
  );

  testimonialSlider.parentNode.insertBefore(
    sliderWrapper,
    testimonialSlider
  );

  sliderWrapper.appendChild(
    testimonialSlider
  );

  testimonialSlider.classList.add(
    "single-slider__track"
  );

  const prevButton =
    document.createElement("button");

  prevButton.classList.add(
    "single-slider__button",
    "single-slider__button--prev"
  );

  prevButton.innerHTML = "←";

  const nextButton =
    document.createElement("button");
  nextButton.classList.add(
    "single-slider__button",
    "single-slider__button--next"
  );

  nextButton.innerHTML = "→";
  sliderWrapper.appendChild(
    prevButton
  );
  sliderWrapper.appendChild(
    nextButton
  );

  const slides =
    Array.from(
      testimonialSlider.children
    );

  let currentSlide = 0;

  const updateSlider = () => {
    const slideWidth =
      sliderWrapper.offsetWidth;
    testimonialSlider.style.transform =
      `translateX(-${
        currentSlide * slideWidth
      }px)`;

    prevButton.disabled =
      currentSlide === 0;

    nextButton.disabled =
      currentSlide ===
      slides.length - 1;
  };

  prevButton.addEventListener(
    "click",
    () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    }
  );

  nextButton.addEventListener(
    "click",
    () => {
      if (
        currentSlide <
        slides.length - 1
      ) {
        currentSlide++;
        updateSlider();
      }
    }
  );

  window.addEventListener(
    "resize",
    updateSlider
  );

  slides.forEach((slide) => {
    slide.style.minWidth = "100%";
  });
  updateSlider();
}

const observerOptions = {
  threshold: 0.15,
};

const scrollObserver =
  new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting
        ) {
          entry.target.classList.add(
            "element-show"
          );
          observer.unobserve(
            entry.target
          );
        }
      });
    },
    observerOptions
  );

animatedElements.forEach(
  (element) => {
    element.classList.add(
      "element-hidden"
    );
    scrollObserver.observe(
      element
    );
  }
);

const styles =
  document.createElement("style");

styles.innerHTML = `

  .mobile-menu {
    position: fixed;
    inset: 0;
    z-index: 3000;
    pointer-events: none;
  }

  .mobile-menu__overlay {
    position: absolute;
    inset: 0;
    background:
      rgba(0,0,0,0.5);
    opacity: 0;
    transition: 0.3s ease;
  }

  .mobile-menu__content {
    position: absolute;
    top: 0;
    right: -100%;
    width: 320px;
    max-width: 90%;
    height: 100vh;
    background: white;
    padding: 40px 30px;
    transition: 0.4s ease;
    display: flex;
    flex-direction: column;
  }

  .mobile-menu--active {
    pointer-events: all;
  }

  .mobile-menu--active
  .mobile-menu__overlay {
    opacity: 1;
  }

  .mobile-menu--active
  .mobile-menu__content {
    right: 0;
  }

  .mobile-menu__close {
    border: none;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    align-self: flex-end;
  }

  .mobile-menu__list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-top: 50px;
  }

  .mobile-menu__link {
    font-size: 1.2rem;
    font-weight: 700;
  }

  .go-top {
    position: fixed;
    right: 30px;
    bottom: 30px;
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background:
      var(--color-primary);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: 0.3s ease;
    z-index: 2500;
  }

  .go-top:hover {
    background:
      var(--color-primary-hover);
    transform: translateY(-5px);
  }

  .go-top--visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .cookie-bar {
    position: fixed;
    left: 20px;
    right: 20px;
    bottom: 20px;
    background: #111111;
    color: white;
    border-radius: 20px;
    padding: 20px 24px;
    z-index: 4000;
    animation:
      cookieShow 0.3s ease;
  }

  @keyframes cookieShow {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .cookie-bar--hide {
    opacity: 0;
    transform: translateY(20px);
    transition: 0.3s ease;
  }

  .cookie-bar__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
  }

  .cookie-bar__button {
    border: none;
    padding: 14px 22px;
    border-radius: 12px;
    background:
      var(--color-primary);
    color: white;
    font-weight: 700;
    cursor: pointer;
  }

  .modal {
    display: none;
    position: fixed;
    inset: 0;
    background:
      rgba(0,0,0,0.6);
    z-index: 5000;
    padding: 20px;
    align-items: center;
    justify-content: center;
  }

  .modal--active {
    display: flex;
  }

  .form-success {
    margin-top: 16px;
    padding: 16px;
    border-radius: 12px;
    background:
      rgba(20,184,92,0.15);
    color:
      var(--color-success);
    font-weight: 700;
  }

  .single-slider {
    position: relative;
    overflow: hidden;
    width: 100%;
  }

  .single-slider__track {
    display: flex;
    transition:
      transform 0.5s ease;
  }

  .single-slider__button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 58px;
    height: 58px;
    border: none;
    border-radius: 50%;
    background:
      rgba(37,99,255,0.85);
    color: white;
    font-size: 1.4rem;
    cursor: pointer;
    z-index: 20;
    transition: 0.3s ease;
  }

  .single-slider__button:hover {
    background:
      var(--color-primary);
    transform:
      translateY(-50%) scale(1.08);
  }

  .single-slider__button:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .single-slider__button--prev {
    left: 10px;
  }

  .single-slider__button--next {
    right: 10px;
  }

  .element-hidden {
    opacity: 0;
    transform:
      translateY(40px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .element-show {
    opacity: 1;
    transform:
      translateY(0);
  }
`;

document.head.appendChild(
  styles
);