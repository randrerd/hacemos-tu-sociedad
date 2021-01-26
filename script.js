'use strict';

const DOM = (() => {
  //DOM Cache
  const hamburgerBars = document.querySelector('.navbar__hamburger');
  const dropdownMenu = document.querySelector('.navbar__links');

  //Event listeners

  hamburgerBars.addEventListener('click', () => handleHamburgerBars());

  const handleHamburgerBars = () => {
    dropdownMenu.classList.toggle('visible');
  };
})();
