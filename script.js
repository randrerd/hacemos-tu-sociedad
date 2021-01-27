'use strict';

const DOM = (() => {
  //DOM Cache
  const hamburgerBars = document.querySelector('.navbar__hamburger');
  const dropdownMenu = document.querySelector('.navbar__links');
  const sectionFourDropdownItems = document.querySelectorAll(
    '.section-four__list__item'
  );

  //Event listeners
  hamburgerBars.addEventListener('click', () => handleHamburgerBars());
  sectionFourDropdownItems.forEach((elem, i) => {
    elem.addEventListener('click', (event) => handleDropdownItem(event, i));
  });

  const handleHamburgerBars = () => {
    dropdownMenu.classList.toggle('visible');
  };

  const handleDropdownItem = (event, i) => {
    const listItemContainer = document.querySelector(
      `.section-four__list__item[data-index='${i}']`
    );
    const arrowIcon = listItemContainer.children[0].children[1];
    const isArrowDown = arrowIcon.classList.contains('rotate');

    if (!isArrowDown) {
      arrowIcon.style.transform = 'rotate(450deg)';
    } else {
      arrowIcon.style.transform = 'rotate(360deg)';
    }

    arrowIcon.classList.toggle('rotate');
  };
})();
