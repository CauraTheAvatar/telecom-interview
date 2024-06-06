const hamburger = document.querySelector('.hamburger');

const nav = document.querySelector('nav ul');

hamburger.addEventListener('click', () => 
{
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// script.js
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('hidden');
}
