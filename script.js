'use strict';

const DOM = (() => {
  //DOM Cache
  const hamburgerBars = document.querySelector('.navbar__hamburger');
  const dropdownMenu = document.querySelector('.navbar__links');
  const sectionFourListItems = document.querySelectorAll(
    '.section--four__list__item'
  );

  //Event listeners
  hamburgerBars.addEventListener('click', () => handleHamburgerBars());
  sectionFourListItems.forEach((elem, index) => {
    elem.addEventListener('click', () => handleDropdownItem(index));
  });

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
})();
