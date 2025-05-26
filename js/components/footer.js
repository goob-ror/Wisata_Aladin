class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const socialLinks = this.querySelectorAll('.footer-social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.openSocialMedia(link.dataset.platform);
            });
        });

        const scrollToTop = this.querySelector('.scroll-to-top');
        scrollToTop.addEventListener('click', (e) => {
            e.preventDefault();
            const heroElement = document.querySelector('#home');
            if (heroElement) {
                heroElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });

        const navLinks = this.querySelectorAll('.footer-nav-link');
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

    openSocialMedia(platform) {
        const socialUrls = {
            whatsapp: 'https://wa.me/1234567890',
            instagram: 'https://instagram.com/wisataaladin',
            youtube: 'https://youtube.com/@wisataaladin',
            tiktok: 'https://tiktok.com/@wisataaladin'
        };

        if (socialUrls[platform]) {
            window.open(socialUrls[platform], '_blank');
        }
    }

    render() {
        this.innerHTML = `
        <style>
            @import '/css/root.css';
            @import '/css/components/footer.css';
        </style>
        <footer>
            <div class="container-footer">
                <div class="footer-main">
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <img src="assets/wisata-aladin-logo.webp" alt="Wisata Aladin Logo"/>
                        </div>
                        <h3>Wisata Aladin</h3>
                        <p>Where magical moments meet unforgettable experiences. Discover the enchantment of Samarinda's most beloved destination.</p>
                        <div class="footer-magic-line">
                            <img src="assets/icons/sparkling.webp" alt="sparkle"/>
                            <div class="magic-divider"></div>
                            <img src="assets/icons/magic-lamp.webp" alt="magic lamp"/>
                            <div class="magic-divider"></div>
                            <img src="assets/icons/sparkling.webp" alt="sparkle"/>
                        </div>
                    </div>

                    <div class="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home" class="footer-nav-link">Home</a></li>
                            <li><a href="#about" class="footer-nav-link">About Us</a></li>
                            <li><a href="#gallery" class="footer-nav-link">Gallery</a></li>
                            <li><a href="#destination" class="footer-nav-link">Destinations</a></li>
                            <li><a href="#contact" class="footer-nav-link">Contact</a></li>
                        </ul>
                    </div>

                    <div class="footer-contact">
                        <h4>Visit Us</h4>
                        <div class="contact-item">
                            <img src="assets/icons/target.webp" alt="location"/>
                            <span>Wisata Aladin, Samarinda</span>
                        </div>
                        <div class="contact-item">
                            <img src="assets/icons/schedule.webp" alt="schedule"/>
                            <span>Mon-Sat: 12:00-22:00<br>Sunday: 11:00-22:00</span>
                        </div>
                    </div>

                    <div class="footer-social">
                        <h4>Follow Our Magic</h4>
                        <div class="social-links">
                            <a href="#" class="footer-social-link" data-platform="whatsapp">
                                <img src="assets/icons/whatsapp.webp" alt="WhatsApp"/>
                                <span>WhatsApp</span>
                            </a>
                            <a href="#" class="footer-social-link" data-platform="instagram">
                                <img src="assets/icons/instagram.webp" alt="Instagram"/>
                                <span>Instagram</span>
                            </a>
                            <a href="#" class="footer-social-link" data-platform="youtube">
                                <img src="assets/icons/youtube.webp" alt="YouTube"/>
                                <span>YouTube</span>
                            </a>
                            <a href="#" class="footer-social-link" data-platform="tiktok">
                                <img src="assets/icons/tiktok.webp" alt="TikTok"/>
                                <span>TikTok</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="footer-bottom-content">
                        <div class="copyright">
                            <img src="assets/icons/magic-lamp.webp" alt="magic lamp"/>
                            <span>&copy; 2024 Wisata Aladin. All magical rights reserved.</span>
                        </div>
                        <div class="scroll-to-top">
                            <img src="assets/icons/sparkling.webp" alt="sparkle"/>
                            <span>Back to Magic</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('footer-component', Footer);
