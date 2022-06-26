// находим форму
const form = document.querySelector(".form-with-validation");
// console.log(form.children);

// в форме находим кнопку
const validateBtn = form.querySelector(".validate-btn");
// находим 1й инпут
const from = form.querySelector(".from");
// находим 2й инпут
const password = form.querySelector(".password");
// находим 3й инпут
const passwordConfirmation = form.querySelector(".password-confirmation");
// находим 4й инпут
const where = form.querySelector(".where");
// находим 5й инпут
const message = form.querySelector(".message");
// находим все инпуты
const fields = form.querySelectorAll(".field");

// создаем блок описания ошибки
function generateError(text) {
  let error = document.createElement("div");
  error.className = "error";
  error.style.color = "red";
  error.style.border = "1px solid red";
  error.innerHTML = text;
  return error;
}

// удаляем все блоки при новой отправке формы
function removeErrors() {
  // удаляем все эрроры, чтобы не было повторений
  let errors = form.querySelectorAll(".error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].remove();
  }
}

// !!! вот этот кусок вставить (под каждую ошибку)
// проверяем поля на заполненность
function checkFieldsPresence() {
  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      console.log("field is blank", fields[i]);
      let error = generateError("Cannot be blank");
      // более новый способ вставки элемента
      fields[i].before(error);
      // form[i].parentElement.insertBefore(error, fields[i]); // старый способ
    } else {
      dataArr.push(fields[i].value);
    }
  }
}

// сравниваем пароли
function checkPasswordsMatch() {
  if (password.value != passwordConfirmation.value) {
    let error = generateError("Passwords do not match");
    // более новый вариант втавки элемента
    password.before(error);
    // password.parentElement.insertBefore(error, password); // старый вариант
  }
}

// вешаем слушателя на отправку ФОРМЫ!!
form.addEventListener("submit", function (event) {
  // отменяем стандартное поведение
  event.preventDefault();

  // удаляем все блоки с эррорами перед каждой отправкой
  removeErrors();

  // проходим циклом по всем элементам коллекции fields
  checkFieldsPresence();

  // сравниваем пароли
  checkPasswordsMatch();

  console.log(dataArr);
});
let dataArr = [];
