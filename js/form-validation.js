function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    let valid = true;

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    // Name validation
    if (name.trim() === '') {
        document.getElementById('name-error').textContent = 'Name is required.';
        valid = false;
    }

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        valid = false;
    }

    // Message validation
    if (message.trim() === '') {
        document.getElementById('message-error').textContent = 'Message cannot be empty.';
        valid = false;
    }

    return valid;
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
    if (!validateForm()) {
        event.preventDefault();
    }
});