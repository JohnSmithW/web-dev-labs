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

  let isPopUpOpen = false;
  let isSelectOpen = false;

  const values = {
    name: "",
    email: "",
    occupancy: ""
  };


  const appearanceAnimation = (element) => {
    let unit = 0.5;

    const interval = setInterval(() => {
      if (unit <= 1) {
        element.style.opacity = unit;
        element.style.transform = `scale(${unit})`;
        unit += 0.1;
      } else {
        clearInterval(interval)
      }
    }, 1)
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    values[name] = value;
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
    values.occupancy = value;

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
    });
  }

  for (let index = 0; index < selectListItem.length; index += 1) {
    selectListItem[index].addEventListener('click', (event) => {
      handleSelect(event);
    });
  }


  const handleSubmit = async (data) => {
    await fetch('http://localhost:8080/lab11/server/signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    });
  }

  formButton.addEventListener('click', async () => {
    await handleSubmit({ ...values });
  })

}


window.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});