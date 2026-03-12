// This file contains the main JavaScript functionality for the website, including event listeners and interactive features.

document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page in the nav so users always know where they are.
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a[href]');

    navLinks.forEach((link) => {
        const linkFile = link.getAttribute('href').split('/').pop();
        if (linkFile === currentFile) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Example of an event listener for a button click
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // Add form submission logic here
            alert('Form submitted!');
        });
    }

    // Example of a function to toggle a mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Additional interactive features can be added here
});