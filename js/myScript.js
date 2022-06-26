s// TODO
// Имя
// Фамилия
// ДР
// Имеил
// Пароль

// A - сохранять в масив
// B - при сохранении
// C - провалидировать:
// 1 длину полей не больше 50
// 2 формат даты
// 3 правильность имейла
// 4 все поля обязательны
// 5 если поле не валидно сделать красный бордер и вывксти текст что не так.
// 6 Проверить на уникальность имейла

// находим форму
const form = document.querySelector(".js-form");
// находим коллекцию инпутов в форме
const formInputs = form.querySelectorAll(".js-input");
// находим поле с именем
const inputName = form.querySelector(".js-input-name");
// находим поле с фамилией
const inputLastName = form.querySelector(".js-input-lastname");
// находим инпут с днем рождения
const inputBirthday = form.querySelector(".js-input-birthday");
// находим инпут с емэйлом
const inputEmail = form.querySelector(".js-input-email");
// находим инпут с телефоном
const inputPhone = form.querySelector(".js-input-phone");
//

// создаем блок описания ошибки
function generateError(text) {
  let error = document.createElement("div");
  error.className = "error";
  error.style.color = "red";
  // error.style.border = "1px solid red";
  error.innerHTML = text;
  return error;
}

// валидируем емэйл
function validateEmail(email) {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// проверяем емэйл на страну
// * возможно вместо этой функции вставить функцию проверки на уникальность
function validateCountry(country) {
  let re = new RegExp(".co$");
  return re.test(String(country).toLowerCase());
}

// проверяем правильность номера телефона
function validatePhone(phone) {
  let re = /^[0-9\s]*$/;
  return re.test(String(phone));
}

// вешием событие на форму!
form.onsubmit = function () {
  // получаем значение поля с емэйлом
  const emailValue = inputEmail.value;
  // получаем значение поля с телефоном
  const phoneValue = inputPhone.value;
  // создаем новый массив и добавляем пустые поля из коллекции инпутов
  const emptyInputs = Array.from(formInputs).filter(
    (input) => input.value === ""
  );

  // проверяем все инпуты в коллекции на заполненность и вешаем или снимаем класс error
  for (let i = 0; i < formInputs.length; i++) {
    if (formInputs[i].value === "") {
      formInputs[i].classList.add("error");
      let error = generateError("Input not filled");
      formInputs[i].before(error);
    } else {
      formInputs[i].classList.remove("error");
      // formInputs[i].error.remove();
    }
  }

  // если не все поля заполнены, то пишем ошибку
  if (emptyInputs.length !== 0) {
    console.log("inputs not filled");
    return false;
  }

  // валидируем емэйл
  if (!validateEmail(emailValue)) {
    console.log("email not valid");
    inputEmail.classList.add("error");
    return false;
  } else {
    inputEmail.classList.remove("error");
  }

  // валидируем емэйл на страну
  if (validateCountry(emailValue)) {
    console.log("email from Columbia");
    inputEmail.classList.add("error");
    return false;
  } else {
    inputEmail.classList.remove("error");
  }

  // валидируем номер телефона
  if (!validatePhone(phoneValue)) {
    console.log("phone not validate");
    inputPhone.classList.add("error");
    return false;
  } else {
    inputPhone.classList.remove("error");
  }

  // валидируем чекбокс
  if (!inputCheckbox.checked) {
    console.log("checkbox not checked");
    checkboxLabel.style.color = "red";
    return false;
  } else {
    checkboxLabel.style.color = "";
  }
};

// --- тут не нужен
// находим чекбокс
// const inputCheckbox = form.querySelector(".js-input-checkbox");
// находим лейбл чекбокса
// const checkboxLabel = form.querySelector(".checkbox__label");

//короткая запись проверки инпутов
// formInputs.forEach((input) => {
//   if (input.value === "") {
//     input.classList.add("error");
//   }
// });

//длинная запись метода filter
// const emptyInputs = Array.from(formInputs).filter(function (input) {
//   if (input.value === "") {
//     return input;
//   }
// });
