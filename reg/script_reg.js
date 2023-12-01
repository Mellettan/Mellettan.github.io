const togglePassword = document.querySelector('.controller');
const passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function() {
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    togglePassword.classList.remove('fa-eye-slash');
    togglePassword.classList.add('fa-eye');
  } else {
    passwordField.type = 'password';
    togglePassword.classList.remove('fa-eye');
    togglePassword.classList.add('fa-eye-slash');
  }
});

const togglePasswordRet = document.querySelectorAll('.controller')[1];
const passwordFieldRet = document.getElementById('password_ret');

togglePasswordRet.addEventListener('click', function() {
  if (passwordFieldRet.type === 'password') {
    passwordFieldRet.type = 'text';
    togglePasswordRet.classList.remove('fa-eye-slash');
    togglePasswordRet.classList.add('fa-eye');
  } else {
    passwordFieldRet.type = 'password';
    togglePasswordRet.classList.remove('fa-eye');
    togglePasswordRet.classList.add('fa-eye-slash');
  }
});

document.querySelector('.login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем отправку формы

  const password = document.getElementById('password').value;
  const passwordRet = document.getElementById('password_ret').value;

  if (password !== passwordRet) {
    alert('Пароли не совпадают!');
  } else {
    this.submit();
  }
});
