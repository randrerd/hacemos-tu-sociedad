'use strict';

const DOM = (() => {
  //DOM Cache
  const hamburgerBars = document.querySelector('.navbar__hamburger');
  const navbarLinks = document.querySelectorAll('.navbar__item__link');
  const dropdownMenu = document.querySelector('.navbar__links');
  const sectionFourListItems = document.querySelectorAll(
    '.section--four__list__dropdown'
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

    if (!isContentContainerDown) {
      //Iterates over all of the list item containers
      //to check if there's any item that's already down
      sectionFourListItems.forEach((listItem) => {
        const dropdownContent = listItem.nextElementSibling;
        const otherArrow = listItem.children[1];

        //Boolean flags that checks if dropdown content is showing on
        //current element
        const isOtherDropdownDown = dropdownContent.classList.contains('show');

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
  };

  const handleNavbarScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const pastHeroSection = 180;

    if (!isScrollFromNav) {
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
  };

  const handleDropdownMenu = (target) => {
    const isHomeLink = target.attributes[0].value === '#';

    if (!isHomeLink) {
      headerContainer.style.top = '-195px';
      navbarContainer.style.top = '-60px';
    }
    dropdownMenu.classList.remove('visible');
  };
})();

const formHandler = (() => {
  const formElement = document.querySelector('#form');
  const emailInput = document.querySelector('#form__email');
  const phoneInput = document.querySelector('#form__phone');
  const inputElementsWrapper = document.querySelector(
    '.section--contact__form__upper'
  );
  const statusElement = document.createElement('span');
  statusElement.className = 'section--contact__form__status-msg';

  formElement.addEventListener('submit', (e) => handleSubmit(e));
  emailInput.addEventListener('change', (e) => handleInputChange(e.target));
  phoneInput.addEventListener('change', (e) => handleInputChange(e.target));
  inputElementsWrapper.appendChild(statusElement);

  const emailIsValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
  };

  const phoneIsValid = () => {
    return /^(?:(?:00)?549?)?0?(?:11|15|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(
      phoneInput.value
    );
  };

  const validationArray = [
    {
      validation: emailIsValid,
      elem: emailInput,
      name: 'e-mail',
    },
    { validation: phoneIsValid, elem: phoneInput, name: 'número de teléfono' },
  ];

  const handleInputChange = (target) => {
    validationArray.forEach((input) => {
      if (input.elem === target) {
        const inputIsValid = input.validation();
        if (!inputIsValid) {
          showErrMsg(input.name);
          input.elem.style.borderBottomColor = '#ce0b0b';
        } else {
          statusElement.innerText = '';
          statusElement.classList.remove('show');
          input.elem.style.borderBottomColor = '';
        }
      }
    });
  };

  const inputsAreValid = () => {
    for (let i = 0; i < validationArray.length; i++) {
      const object = validationArray[i];
      const currentIsValid = object.validation();
      if (!currentIsValid) {
        return false;
      }
    }
    return true;
  };

  const showErrMsg = (invalidInput = null) => {
    const errorMsg = `Por favor verifique ${
      !invalidInput
        ? 'la información ingresada'
        : `el ${invalidInput} ingresado`
    }`;
    statusElement.classList.add('show');
    statusElement.innerText = errorMsg;
  };

  const showSuccessMsg = () => {
    const message =
      'Su mensaje ha sido enviado, estaremos comunicandonos pronto con usted.';

    statusElement.classList.add('show');
    statusElement.style.backgroundColor = '#025c20cc';
    statusElement.innerText = message;
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputsAreValid()) {
      showErrMsg();
    } else {
      //SUBMIT VALID FORM HERE
      //Descomentar esto una vez se haya enviado el formulario con exito
      //showSuccessMsg();
    }
  };
})();
