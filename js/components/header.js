class Header extends HTMLElement {
    constructor() {
        super();
        this.mobileMenuOpen = false;
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

        const mobileNavLinks = this.querySelectorAll('.mobile-nav-menu a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
                this.closeMobileMenu();
            });
        });

        const hamburgerMenu = this.querySelector('.hamburger-menu');
        hamburgerMenu.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        const mobileNavOverlay = this.querySelector('.mobile-nav-overlay');
        mobileNavOverlay.addEventListener('click', (e) => {
            if (e.target === mobileNavOverlay) {
                this.closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const hamburgerMenu = this.querySelector('.hamburger-menu');
        const mobileNavOverlay = this.querySelector('.mobile-nav-overlay');

        hamburgerMenu.classList.add('active');
        mobileNavOverlay.classList.add('active');
        this.mobileMenuOpen = true;

        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const hamburgerMenu = this.querySelector('.hamburger-menu');
        const mobileNavOverlay = this.querySelector('.mobile-nav-overlay');

        hamburgerMenu.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        this.mobileMenuOpen = false;

        document.body.style.overflow = '';
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

                <!-- Desktop Navigation -->
                <nav class="navigation">
                    <ul>
                        <li><a href="#home">HOME</a></li>
                        <li><a href="#about">ABOUT</a></li>
                        <li><a href="#destination">DESTINATION</a></li>
                        <li><a href="#gallery">GALLERY</a></li>
                        <li><a href="#contact">CONTACT US</a></li>
                    </ul>
                </nav>

                <div class="hamburger-menu">
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                    <div class="hamburger-line"></div>
                </div>
            </div>

            <div class="mobile-nav-overlay">
                <ul class="mobile-nav-menu">
                    <li><a href="#home">HOME</a></li>
                    <li><a href="#about">ABOUT</a></li>
                    <li><a href="#destination">DESTINATION</a></li>
                    <li><a href="#gallery">GALLERY</a></li>
                    <li><a href="#contact">CONTACT US</a></li>
                </ul>

                <div class="mobile-nav-decoration">
                    <img src="assets/icons/sparkling.webp" alt="sparkle"/>
                    <div class="magic-divider-mobile"></div>
                    <img src="assets/icons/magic-lamp.webp" alt="magic lamp"/>
                    <div class="magic-divider-mobile"></div>
                    <img src="assets/icons/sparkling.webp" alt="sparkle"/>
                </div>
            </div>
        </header>
        `;
    }
}
customElements.define('header-component', Header);
