document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // находим форму
  const form = document.querySelector(".main-form");
  // находим кнопку
  const submitButton = form.querySelector(".btn");
  // находим поля с паролями
  const password = form.querySelector(".input-password");
  const passwordRepeat = form.querySelector(".input-password-repeat");
  // находим коллекцию полей с паролями
  const formGroupsPasswords = document.querySelectorAll(".form__group-password");

  // создаем проверочную переменную для отправки формы
  let isValidate = false;

  // забиваем регулярки
  const regExpName = /^[a-zA-Zа-яА-Я0-9_-]{3,50}$/;
  const regExpMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  const regExpPass = /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/; // (?=.*[!@#$&*])
  const regExpPhone = /^((\+?3|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/;
  const regExpDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  // вешаем обработчик на каждый глаз и меняем тип пароля
  function openOrHidePassword() {
    for (let i = 0; i < formGroupsPasswords.length; i++) {
      let eyeButton = formGroupsPasswords[i].querySelector(".eye");
      let inputWithPassword = formGroupsPasswords[i].querySelector(".password-group");

      eyeButton.addEventListener("click", () => {
        if (eyeButton.classList.contains("eye--close")) {
          eyeButton.classList.remove("eye--close");
          eyeButton.classList.add("eye--open");
          inputWithPassword.type = "text";
        } else {
          eyeButton.classList.remove("eye--open");
          eyeButton.classList.add("eye--close");
          inputWithPassword.type = "password";
        }
      });
    }
  }

  // фокус/блюр
  function focusAndBlur() {
    for (const elem of form) {
      if (!elem.classList.contains("form-checkbox") && elem.tagName !== "BUTTON") {
        const elemPlaceholder = elem.placeholder;
        elem.addEventListener("focus", () => {
          elem.placeholder = "";
        });
        elem.addEventListener("blur", () => {
          elem.placeholder = elemPlaceholder;
        });
      }
    }
  }

  // проверка на длину поля ввода
  function validateInputLenght() {
    for (const elem of form) {
      if (!elem.classList.contains("form-checkbox") && elem.tagName !== "BUTTON") {
        elem.addEventListener("input", () => {
          if (elem.value.length > 50) {
            elem.nextElementSibling.innerHTML = "Длина поля должна быть от 3 до 50 символов";
            isValidate = false;
            submitButton.setAttribute("disabled", true);
            elem.style.borderColor = "red";
          } else {
            elem.nextElementSibling.innerHTML = "";
            isValidate = true;
            submitButton.removeAttribute("disabled");
            elem.style.border = "";
          }
        });
      }
    }
  }

  // проверяем все инпуты на заполненность
  function checkInputsFilled() {
    for (const elem of form) {
      if (!elem.classList.contains("form-checkbox") && elem.tagName !== "BUTTON") {
        if (elem.value == "") {
          elem.nextElementSibling.textContent = "Введите от 3-х до 50-ти символов";
          submitButton.setAttribute("disabled", true);
          isValidate = false;
          elem.style.borderColor = "red";
        } else {
          elem.nextElementSibling.textContent = "";
          isValidate = true;
          submitButton.removeAttribute("disabled");
          elem.style.borderColor = "";
        }
      }
    }
  }

  // валидируем только инпуты
  function checkInputs() {
    for (const elem of form) {
      if (!elem.classList.contains("form-checkbox") && elem.tagName !== "BUTTON") {
        elem.addEventListener("blur", () => {
          validateElem(elem);
        });
      }
    }
  }

  // валидируем каждое поле ввода
  // ? надо как-то сократить, но работает, не хочется трогать
  function validateElem(elem) {
    if (elem.name === "name") {
      if (!regExpName.test(elem.value) && elem.value !== "") {
        elem.nextElementSibling.innerHTML = "Введите корректное имя пользователя!";
        isValidate = false;
        submitButton.setAttribute("disabled", true);
        elem.style.borderColor = "red";
      } else if (elem.value === "") {
        elem.nextElementSibling.innerHTML = "Длина поля должна быть от 3 до 50 символов";
        elem.style.borderColor = "red";
      } else {
        elem.nextElementSibling.innerHTML = "";
        isValidate = true;
        submitButton.removeAttribute("disabled");
        elem.style.borderColor = "";
      }
    }
    if (elem.name === "lastName") {
      if (!regExpName.test(elem.value) && elem.value !== "") {
        elem.nextElementSibling.innerHTML = "Введите корректную фамилию пользователя!";
        isValidate = false;
        submitButton.setAttribute("disabled", true);
        elem.style.borderColor = "red";
      } else if (elem.value === "") {
        elem.nextElementSibling.innerHTML = "Длина поля должна быть от 3 до 50 символов";
        elem.style.borderColor = "red";
      } else {
        elem.nextElementSibling.innerHTML = "";
        isValidate = true;
        submitButton.removeAttribute("disabled");
        elem.style.borderColor = "";
      }
    }
    if (elem.name === "birthday") {
      if (!regExpDate.test(elem.value) && elem.value !== "") {
        elem.nextElementSibling.innerHTML = "Введите корректную дату рождения";
        isValidate = false;
        submitButton.setAttribute("disabled", true);
        elem.style.borderColor = "red";
      } else if (elem.value === "") {
        elem.nextElementSibling.innerHTML = "Длина поля должна быть от 3 до 50 символов";
        elem.style.borderColor = "red";
      } else {
        elem.nextElementSibling.innerHTML = "";
        isValidate = true;
        submitButton.removeAttribute("disabled");
        elem.style.borderColor = "";
      }
    }
    if (elem.name === "email") {
      if (!regExpMail.test(elem.value) && elem.value !== "") {
        elem.nextElementSibling.innerHTML = "Введите корректный email!";
        isValidate = false;
        submitButton.setAttribute("disabled", true);
        elem.style.borderColor = "red";
      } else if (elem.value === "") {
        elem.nextElementSibling.innerHTML = "Длина поля должна быть от 3 до 50 символов";
        elem.style.borderColor = "red";
      } else {
        elem.nextElementSibling.innerHTML = "";
        isValidate = true;
        submitButton.removeAttribute("disabled");
        elem.style.borderColor = "";
      }
    }
    if (elem.name === "phone") {
      if (!regExpPhone.test(elem.value) && elem.value !== "") {
        elem.nextElementSibling.innerHTML = "Введите корректный номер телефона!";
        isValidate = false;
        submitButton.setAttribute("disabled", true);
        elem.style.borderColor = "red";
      } else if (elem.value === "") {
        elem.nextElementSibling.innerHTML = "Длина поля должна быть от 3 до 50 символов";
        elem.style.borderColor = "red";
      } else {
        elem.nextElementSibling.innerHTML = "";
        isValidate = true;
        submitButton.removeAttribute("disabled");
        elem.style.borderColor = "";
      }
    }
    if (elem.name === "password") {
      if (!regExpPass.test(elem.value) && elem.value !== "") {
        elem.nextElementSibling.innerHTML = "Придумайте более сложный пароль";
        isValidate = false;
        submitButton.setAttribute("disabled", true);
        elem.style.borderColor = "red";
      } else if (elem.value === "") {
        elem.nextElementSibling.innerHTML = "Длина поля должна быть от 3 до 50 символов";
        elem.style.borderColor = "red";
      } else {
        elem.nextElementSibling.innerHTML = "";
        isValidate = true;
        submitButton.removeAttribute("disabled");
        elem.style.borderColor = "";
      }
    }
    if (elem.name === "passwordRepeat") {
      if (password.value != passwordRepeat.value) {
        elem.nextElementSibling.innerHTML = "Пароли не совпадают";
        isValidate = false;
        submitButton.setAttribute("disabled", true);
        elem.style.borderColor = "red";
      } else if (elem.value === "") {
        elem.nextElementSibling.innerHTML = "Длина поля должна быть от 3 до 50 символов";
        elem.style.borderColor = "red";
      } else {
        elem.nextElementSibling.innerHTML = "";
        isValidate = true;
        submitButton.removeAttribute("disabled");
        elem.style.borderColor = "";
      }
    }
  }
  // ! есть бажина: если пароли совпадают, то форма отправляется, ни смотря на то, что все остальные поля пустые или если пароли совпадают но не провалидированы

  // вешаем обработчик на каждый глаз и меняем тип пароля
  openOrHidePassword();

  // если все валидно, отправляем форму
  function validateAndSubmit() {
    if (isValidate) {
      submit();
      form.reset();
    } else {
      console.log("Форма заполнена некорректно");
    }
  }

  // функция отправки формы
  const submit = () => {
    alert("Данные отправлены");
  };

  // ============================================================ //

  // фокус/блюр
  focusAndBlur();

  // проверка на длину поля ввода
  validateInputLenght();

  // валидируем только инпуты
  checkInputs();

  // вешаем обработчик на форму
  form.addEventListener("submit", (event) => {
    // отменяем стандартное поведение
    event.preventDefault();

    // проверяем все инпуты на заполненность
    checkInputsFilled();

    // если все валидно, отправляем форму
    validateAndSubmit();
  });
});

// TODO как сохранять в массив?! (FormDATA?!)
// ! Проверка на уникальность ХЗ (С помощью AJAX?!)

