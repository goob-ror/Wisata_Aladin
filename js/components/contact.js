class Contact extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = this.shadow.querySelector('.contact-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        const socialLinks = this.shadow.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.openSocialMedia(link.dataset.platform);
            });
        });
    }

    handleFormSubmit() {
        const formData = new FormData(this.shadow.querySelector('.contact-form'));
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        this.showNotification('Thank you for your message! We will get back to you soon.', 'success');
        this.shadow.querySelector('.contact-form').reset();
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

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#317242' : '#d32f2f'};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    render() {
        this.shadow.innerHTML = `\
        <link rel="stylesheet" href="/css/root.css">
        <link rel="stylesheet" href="/css/components/contact.css">
        <contact id="contact">
            <div class="container-contact">
                <div class="contact-header">
                    <h2>Contact Us</h2>
                </div>

                <div class="contact-columns">
                    <div class="left-column">
                        <div class="contact-form-container">
                            <div class="form-header">
                                <h3>Send us a Message</h3>
                                <div class="form-decoration">
                                    <span class="magic-dot"></span>
                                    <span class="magic-dot"></span>
                                    <span class="magic-dot"></span>
                                </div>
                            </div>

                            <form class="contact-form">
                                <div class="form-group">
                                    <label for="name">Full Name</label>
                                    <input type="text" id="name" name="name" required>
                                    <div class="input-decoration">
                                        <img src="assets/icons/star.webp" alt="star"/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="email">Email Address</label>
                                    <input type="email" id="email" name="email" required>
                                    <div class="input-decoration">
                                        <img src="assets/icons/star.webp" alt="star"/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="phone">Phone Number (Optional)</label>
                                    <input type="tel" id="phone" name="phone">
                                    <div class="input-decoration">
                                        <img src="assets/icons/star.webp" alt="star"/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="message">Your Message</label>
                                    <textarea id="message" name="message" rows="3" required></textarea>
                                    <div class="input-decoration">
                                        <img src="assets/icons/star.webp" alt="star"/>
                                    </div>
                                </div>

                                <button type="submit" class="submit-btn">
                                    <img src="assets/icons/magic-lamp.webp" alt="magic lamp"/>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    <div class="right-column">
                        <div class="social-media-container">
                            <div class="social-header">
                                <div class="social-icon">
                                    <img src="assets/icons/sparkles.webp" alt="sparkles"/>
                                </div>
                                <h3>Follow Our Journey</h3>
                                <div class="social-decoration">
                                    <span class="magic-dot"></span>
                                    <span class="magic-dot"></span>
                                    <span class="magic-dot"></span>
                                </div>
                            </div>

                            <div class="social-links">
                                <a href="#" class="social-link" data-platform="whatsapp">
                                    <div class="social-icon-container whatsapp">
                                        <img src="assets/icons/whatsapp.webp" alt="WhatsApp"/>
                                    </div>
                                    <span>WhatsApp</span>
                                </a>

                                <a href="#" class="social-link" data-platform="instagram">
                                    <div class="social-icon-container instagram">
                                        <img src="assets/icons/instagram.webp" alt="Instagram"/>
                                    </div>
                                    <span>Instagram</span>
                                </a>

                                <a href="#" class="social-link" data-platform="youtube">
                                    <div class="social-icon-container youtube">
                                        <img src="assets/icons/youtube.webp" alt="YouTube"/>
                                    </div>
                                    <span>YouTube</span>
                                </a>

                                <a href="#" class="social-link" data-platform="tiktok">
                                    <div class="social-icon-container tiktok">
                                        <img src="assets/icons/tiktok.webp" alt="TikTok"/>
                                    </div>
                                    <span>TikTok</span>
                                </a>
                            </div>
                        </div>

                        <div class="maps-container">
                            <div class="maps-header">
                                <div class="maps-icon">
                                    <img src="assets/icons/map.webp" alt="map"/>
                                </div>
                                <h3>Find Us Here</h3>
                                <div class="maps-decoration">
                                    <span class="magic-dot"></span>
                                    <span class="magic-dot"></span>
                                    <span class="magic-dot"></span>
                                </div>
                            </div>

                            <div class="maps-embed">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6234567890123!2d117.15008008020982!3d-0.5322522454979108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzEnNTYuMSJTIDExN8KwMDknMDAuMyJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                                    width="100%"
                                    height="400"
                                    style="border:0;"
                                    allowfullscreen=""
                                    loading="lazy"
                                    referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>

                            <div class="location-info">
                                <div class="location-item">
                                    <img src="assets/icons/circus-tent.webp" alt="location"/>
                                    <span>Wisata Aladin, Samarinda</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </contact>
        `;
    }
}

customElements.define('contact-component', Contact);
