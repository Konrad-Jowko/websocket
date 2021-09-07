const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
let userName;

const login = (event) => {
  event.preventDefault();

  if (userNameInput.value) {
    userName = userNameInput.value;
    loginForm.classList.remove('show')
    messagesSection.classList.add('show')
  } else {
    alert('The login form is empty!')
  }
}

const sendMessage = (event) => {
  event.preventDefault();

  if (messageContentInput.value) {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  } else {
    alert('The message is empty!')
  }
}

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--recieved');

  if (author === userName) {
    message.classList.add('message--self');
  }

  message.innerHTML = `
    <h3 class="message__author">${username === author ? 'Youe' : author}</h3>
    <div class="message__content">${content}</div>
  `;
  messagesList.appendChild(message);
}

loginForm.addEventListener('submit', login)
addMessageForm.addEventListener('submit', sendMessage)
