'use strict';

const DOM = (() => {
  //DOM Cache
  const hamburgerBars = document.querySelector('.navbar__hamburger');
  const dropdownMenu = document.querySelector('.navbar__links');
  const sectionFourListItems = document.querySelectorAll(
    '.section--four__list__item'
  );
  const headerContainer = document.querySelector('.header');
  const navbarContainer = document.querySelector('.navbar');
  let prevScrollpos = window.pageYOffset;

  //Event listeners
  hamburgerBars.addEventListener('click', () => handleHamburgerBars());
  sectionFourListItems.forEach((elem, index) => {
    elem.addEventListener('click', () => handleDropdownItem(index));
  });
  window.addEventListener('scroll', () => handleNavbarScroll());
  dropdownMenu.addEventListener('click', (e) => handleDropdownMenu(e.target));

  const handleHamburgerBars = () => {
    dropdownMenu.classList.toggle('visible');
  };

  const handleDropdownItem = (index) => {
    const listItemContainer = document.querySelector(
      `.section--four__list__item[data-index='${index}']`
    );
    const arrowIcon = listItemContainer.children[0].children[1];
    const contentContainer = listItemContainer.children[1];
    const prevScrollpos = window.pageYOffset;

    const isContentContainerDown = contentContainer.classList.contains('show');

    try {
      if (!isContentContainerDown) {
        //Iterates over all of the list item containers
        //to check if there's any item that's already down
        sectionFourListItems.forEach((listItem) => {
          const dropdownContent = listItem.children[1];
          const otherArrow = listItem.children[0].children[1];

          const isOtherDropdownDown = dropdownContent.classList.contains(
            'show'
          );

          if (isOtherDropdownDown) {
            //Hides the container that's showing and rotates arrow
            otherArrow.style.transform = 'rotate(360deg)';
            dropdownContent.classList.remove('show');
          }
        });

        //Doesn't do anything for the last item since there's no content
        //for it
        if (index !== sectionFourListItems.length - 1) {
          arrowIcon.style.transform = 'rotate(450deg)';
          contentContainer.classList.add('show');
        }
      } else {
        //Hides the container when clicked a second time
        arrowIcon.style.transform = 'rotate(360deg)';
        contentContainer.classList.remove('show');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavbarScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      headerContainer.style.top = '0';
      navbarContainer.style.top = '0';
    } else {
      headerContainer.style.top = '-50px';
      navbarContainer.style.top = '-150px';
      dropdownMenu.classList.remove('visible');
    }
    prevScrollpos = currentScrollPos;
  };

  const handleDropdownMenu = (target) => {
    const isHomeLink = target.attributes[0].value === '#';

    if (isHomeLink) {
      dropdownMenu.classList.remove('visible');
    } else {
      headerContainer.style.top = '-50px';
      navbarContainer.style.top = '-150px';
    }
  };
})();
