"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // находим форму
  const mainForm = document.forms.mainForm;
  // находим все элементы в форме
  const mainFormAllElements = mainForm.elements;
  // находим все поля ввода
  const mainFormAllInputs = Array.from(mainFormAllElements).filter((elem) => elem.classList.contains("input"));

  // забиваем регулярки
  const regExpName = /^[a-zA-Zа-яА-Я0-9_-]{3,50}$/;
  const regExpMail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  const regExpPass = /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/; // (?=.*[!@#$&*])
  const regExpPhone = /^((\+?3|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/;
  const regExpDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;

  // добавляем блок с ошибкой и красный бордер
  function addError(elem) {
    elem.style.borderColor = "red";
    elem.nextElementSibling.classList.remove("visually-hidden");
  }

  // убираем блок с ошибкой и красный бордер
  function removeError(elem) {
    elem.style.borderColor = "";
    elem.nextElementSibling.classList.add("visually-hidden");
  }

  // функция валидации регулярок и проверка на пустую строку
  function validationRegExp(regExp, incInput) {
    if (!regExp.test(incInput.value) || (incInput.value = "")) {
      addError(incInput);
      return false;
    } else {
      removeError(incInput);
      return true;
    }
  }

  function submitForm() {
    // проверяем поле ввода имени
    let nameField = mainForm.name;
    let isNameValid = validationRegExp(regExpName, nameField);
    // проверяем поле ввода фамилии
    let lastnameField = mainForm.lastName;
    let isLastnameValid = validationRegExp(regExpName, lastnameField);
  }

  mainForm.addEventListener("submit", (event) => {
    event.preventDefault();

    submitForm();
  });
});

// TODO вставить позже
/*
  // проверяем длину поля ввода на лету
  function checkInputLenght() {
    for (const elem of mainFormAllInputs) {
      elem.addEventListener("input", function () {
        if (elem.value.length > 10) {
          elem.nextElementSibling.classList.remove("visually-hidden");
          elem.nextElementSibling.textContent = "Длина поля должна быть от 3 до 50 символов";
        } else {
          elem.nextElementSibling.classList.add("visually-hidden");
        }
      });
    }
  }

  // фокус/блюр
  function focusAndBlur() {
    for (const elem of mainFormAllInputs) {
      const elemPlaceholder = elem.placeholder;
      elem.addEventListener("focus", () => {
        elem.placeholder = "";
      });
      elem.addEventListener("blur", () => {
        elem.placeholder = elemPlaceholder;
      });
    }
  }

  // проверяем длину поля ввода на лету
  checkInputLenght();

  // фокус/блюр
  focusAndBlur();
*/
