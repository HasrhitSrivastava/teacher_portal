// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require controllers/student_management

function showMessage(message, type = 'success') {
    const alertMessage = document.getElementById('alert-message');
    alertMessage.textContent = message;
    alertMessage.className = `alert alert-${type}`;
    alertMessage.style.display = 'block';
  
    // Automatically hide the message after 3 seconds
    setTimeout(() => {
      alertMessage.style.display = 'none';
    }, 3000);
}
