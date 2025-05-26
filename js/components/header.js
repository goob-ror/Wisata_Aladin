class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const navLinks = this.querySelectorAll('.navigation a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    render() {
        this.innerHTML = `
        <style>
            @import './css/root.css';
            @import './css/components/header.css';
        </style>
        <header>
            <div class="container-header">
                <div>
                    <img src="assets/wisata-aladin-logo.webp" alt="Wisata Aladin Logo" class="logo" />
                </div>
                <nav class="navigation">
                    <ul>
                        <li><a href="#home">HOME</a></li>
                        <li><a href="#about">ABOUT</a></li>
                        <li><a href="#gallery">GALLERY</a></li>
                        <li><a href="#destination">DESTINATION</a></li>
                        <li><a href="#contact">CONTACT US</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        `;
    }
}
customElements.define('header-component', Header);
