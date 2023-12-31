
import throttle from 'lodash.throttle';

const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const feedbackForm = document.querySelector('.feedback-form');
let saveData = {};

emailInput.addEventListener('input', dataEntry);
messageInput.addEventListener('input', dataEntry);
feedbackForm.addEventListener('submit', clickSubmit);

function dataEntry() {
  const emailValue = emailInput.value;
  const messageValue = messageInput.value;

  saveData = {
    email: emailValue,
    message: messageValue,
  };


  saveFormDataThrottled(saveData);
}

function clickSubmit(event) {
  event.preventDefault();

  const emailValue = emailInput.value;
  const messageValue = messageInput.value;

  if (!emailValue || !messageValue) {
    alert('Потрібно заповнити обидва поля.');
    return;
  }

  emailInput.value = '';
  messageInput.value = '';

  console.log({
    email: saveData.email,
    message: saveData.message,
  });
}

const saveFormDataThrottled = throttle((data) => {
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}, 500);

function formData() {
  const formDataJSON = localStorage.getItem('feedback-form-state');
  if (formDataJSON) {
    const loadFormData = JSON.parse(formDataJSON);
    emailInput.value = loadFormData.email;
    messageInput.value = loadFormData.message;
    saveData = loadFormData;
  }
}

formData(); 