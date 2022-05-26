const initializeApp = () => {
  const popUp = document.querySelector("#pop-up");
  const popUpContent = document.querySelector(".pop-up__content");
  const popUpButton = document.querySelectorAll('.button_pop-up');
  const select = document.querySelector("#select");
  const selected = document.querySelector("#selected");
  const popUpClose = document.querySelector('.pop-up__close');
  const dialog = document.querySelector('#dialog');
  const inputs = document.querySelectorAll('.form__input');
  const selectItem = document.querySelector('.select__item');
  const selectListItem = document.querySelectorAll('.select-list__item');
  const formButton = document.querySelector('#form__button');
  const form = document.querySelector('.form');
  const title = document.querySelector('.pop-up__title');
  const banner = document.querySelector('#banner');

  let isPopUpOpen = false;
  let isSelectOpen = false;

  const VALUES = {
    name: "",
    email: "",
    occupancy: ""
  };

  const validatedValues = {
    name: false,
    email: false
  };

  const appearanceAnimation = (element) => {
    let unit = 0.5;

    const interval = setInterval(() => {
      if (unit <= 1) {
        element.style.opacity = unit;
        element.style.transform = `scale(${unit})`;
        unit += 0.1;
      } else {
        clearInterval(interval);
      }
    }, 1);
  }

  const disappearAnimation = (element) => {
    let unit = 1;

    const interval = setInterval(() => {
      if (unit >= 0.5) {
        element.style.opacity = unit;
        element.style.transform = `scale(${unit})`;
        unit -= 0.1;
      } else {
        clearInterval(interval);
        popUp.classList.remove("pop-up__overlay_active");
      }
    }, 1)
  }

  const closePopUp = () => {
    disappearAnimation(popUpContent);
    isPopUpOpen = false;
  };

  const openPopUp = () => {
    popUp.classList.add("pop-up__overlay_active");
    appearanceAnimation(popUpContent);
    isPopUpOpen = true;
  };

  const handleDisable = () => {
    const { name, email } = validatedValues;
 
    if (!name || !email) {
      formButton.classList.add('button_disabled');
      formButton.disabled = true;
    } else {
      formButton.classList.remove('button_disabled');
      formButton.disabled = false;
    }
  }

  const validateName = (event, value) => {
    if (!/^[a-zA-Z]+$/.test(value) || value === '') {
      event.target.parentElement.classList.add('form__input_warning');
      validatedValues.name = false;
    } else {
      event.target.parentElement.classList.remove('form__input_warning');
      validatedValues.name = true;
    }
  }

  const validateEmail = (event, value) => {
    if (!value.includes('@') && !value.includes('.') || value === '') {
      event.target.parentElement.classList.add('form__input_warning');
      validatedValues.email = false;
    } else {
      event.target.parentElement.classList.remove('form__input_warning');
      validatedValues.email = true;
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    

    if (name === 'name') {
      validateName(event, value);
    }
    if (name === 'email') {
      validateEmail();
    }

    VALUES[name] = value;
  };

  window.addEventListener("keydown", (event) => {
    const { key } = event;

    if (key === "Escape" && isPopUpOpen) {
      closePopUp();
    }
  });

  const handleSelect = (event) => {
    const value = event.target.innerText;

    selected.innerText = value;
    selected.setAttribute("name", value);
    VALUES.occupancy = value;

    if (!isSelectOpen) {
      select.classList.add("select_active");
      isSelectOpen = true;
    } else {
      select.classList.remove("select_active");
      isSelectOpen = false;
    }
  };

  const preventClose = (event) => {
    event.stopPropagation();
  };

  popUp.addEventListener('click', () => {
    closePopUp();
  });

  popUpClose.addEventListener('click', () => {
    closePopUp();
  });

  dialog.addEventListener('click', (event) => {
    preventClose(event);
  });

  selectItem.addEventListener('click', (event) => {
    handleSelect(event);
  })

  for (let index = 0; index < popUpButton.length; index += 1) {
    popUpButton[index].addEventListener('click', () => {
      openPopUp();
    });
  }

  for (let index = 0; index < inputs.length; index += 1) {
    inputs[index].addEventListener('change', (event) => {
      handleChange(event);
      handleDisable();
    });
  }

  for (let index = 0; index < selectListItem.length; index += 1) {
    selectListItem[index].addEventListener('click', (event) => {
      handleSelect(event);
    });
  }

  const handleError = (isError) => {
    if (isError) {
      form.classList.add('form_hidden');
      banner.classList.add('banner_hidden');
      title.innerText = 'Упс.. Произошла ошибка!';
    } else {
      form.classList.remove('form_hidden');
      banner.classList.remove('banner_hidden');
      title.innerText = 'Записаться на курс';
    }
  }

  const handleSubmit = async (data) => {
    const formData = new URLSearchParams(Object.entries(data)).toString();

    await fetch('http://localhost:8080/lab11/src/signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: formData
    }).then((response) => {
      if (response.status === 200) {
        closePopUp();
      } else {
        handleError(true);
      }
    }).catch(() => {

    })
  }

  formButton.addEventListener('click', async () => {
    await handleSubmit({ ...VALUES });
  })

}


window.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});