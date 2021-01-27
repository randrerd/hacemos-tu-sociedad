'use strict';

const DOM = (() => {
  //DOM Cache
  const hamburgerBars = document.querySelector('.navbar__hamburger');
  const dropdownMenu = document.querySelector('.navbar__links');
  const sectionFourDropdownItems = document.querySelectorAll(
    '.section-four__list__item'
  );

  let isArrowDown = false;

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

    if (!isArrowDown) {
      arrowIcon.style.transform = 'rotate(450deg)';
      isArrowDown = true;
    } else {
      arrowIcon.style.transform = 'rotate(360deg)';
      isArrowDown = false;
    }
  };
})();
