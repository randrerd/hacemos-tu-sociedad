'use strict';

const DOM = (() => {
  //DOM Cache
  const hamburgerBars = document.querySelector('.navbar__hamburger');
  const navbarLinks = document.querySelectorAll('.navbar__item__link');
  const dropdownMenu = document.querySelector('.navbar__links');
  const sectionFourListItems = document.querySelectorAll(
    '.section--four__list__item'
  );
  const headerContainer = document.querySelector('.header');
  const navbarContainer = document.querySelector('.navbar');
  let prevScrollPos = window.pageYOffset;
  let isScrollFromNav = false;

  //Event listeners
  hamburgerBars.addEventListener('click', () => handleHamburgerBars());
  sectionFourListItems.forEach((elem, index) => {
    elem.addEventListener('click', () => handleDropdownItem(index));
  });
  window.addEventListener('scroll', () => handleNavbarScroll());

  navbarLinks.forEach((elem) =>
    elem.addEventListener('click', (e) => handleDropdownMenu(e.target))
  );
  // dropdownMenu.addEventListener('click', (e) => handleDropdownMenu(e.target));

  const handleHamburgerBars = () => {
    dropdownMenu.classList.toggle('visible');
  };

  const handleDropdownItem = (index) => {
    const listItemContainer = document.querySelector(
      `.section--four__list__item[data-index='${index}']`
    );
    const arrowIcon = listItemContainer.children[0].children[1];
    const contentContainer = listItemContainer.children[1];

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
    //Avoids navbar to become visible again when
    //scrolling up from clicking on navbar link
    const currentScrollPos = window.pageYOffset;
    const pastHeroSection = 180;
    console.log({ currentScrollPos, prevScrollPos });
    if (!isScrollFromNav) {
      console.log({ currentScrollPos, prevScrollPos });
      if (prevScrollPos > currentScrollPos) {
        headerContainer.style.top = '0';
        navbarContainer.style.top = '0';
      } else if (currentScrollPos > pastHeroSection) {
        headerContainer.style.top = '-195px';
        navbarContainer.style.top = '-60px';
        dropdownMenu.classList.remove('visible');
      }
      prevScrollPos = currentScrollPos;
    }
    isScrollFromNav = false;
  };

  const handleDropdownMenu = (target) => {
    const isHomeLink = target.attributes[0].value === '#';

    if (!isHomeLink) {
      headerContainer.style.top = '-195px';
      navbarContainer.style.top = '-60px';
    }
    dropdownMenu.classList.remove('visible');

    isScrollFromNav = true;
  };
})();
