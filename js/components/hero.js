class Hero extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.currentFeature = 1;
        this.features = [
            {
                title: "Discover the Magic",
                description: "Explore a world of wonder and unforgettable flavors — where every moment feels enchanted."
            },
            {
                title: "A Choice You'll Always Remember",
                description: "It's more than just a place — it's where memories are made and stories begin."
            },
            {
                title: "Where Taste Meets Adventure",
                description: "Delight in local flavors, relax in nature, and create magical memories — only at Wisata Aladin."
            }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupInteractivity();
    }

    render() {
        this.shadow.innerHTML = `\
        <link rel="stylesheet" href="/css/root.css">
        <link rel="stylesheet" href="/css/components/hero.css">
        <hero>
            <div class="container-hero">
                <div class="floating-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
                <div class="hero-content">
                    <h1></h1>
                    <p></p>
                    <button class="cta-button">Start Your Journey</button>
                </div>
                <div class="features-overlay">
                    <div class="feature-item active" data-feature="1">
                        <div class="feature-number">1</div>
                    </div>

                    <div class="feature-item" data-feature="2">
                        <div class="feature-number">2</div>
                    </div>

                    <div class="feature-item" data-feature="3">
                        <div class="feature-number">3</div>
                    </div>
                </div>

                <div class="svg-text-content">
                    <div class="content-photos">
                        <img src="assets/images/esthetic.webp" alt="Samarinda View" class="mini-logo1" />
                        <img src="assets/images/esthetic2.webp" alt="Samarinda View" class="mini-logo2" />
                        <img src="assets/images/esthetic3.webp" alt="Samarinda View" class="mini-logo3" />
                    </div>
                    <h3>Learn More</h3>
                    <div class="svg-buttons">
                        <button class="cta-button svg-explore-btn">Discover Awesome Places</button>
                    </div>
                </div>

                <div class="hero-graphics">
                    <svg class="svg-background" width="1000" height="700" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="backgroundImage" patternUnits="userSpaceOnUse" width="100%" height="100%">
                                <image href="assets/images/samarinda-view.webp" width="100%" height="100%"/>
                            </pattern>
                        </defs>
                        <rect width="1000" height="700" fill="none"/>
                        <path class="polygon-1" d="M 20.0 130.0 Q 20.0 80.0 70.0 80.0 L 930.0 80.0 Q 980.0 80.0 980.0 130.0 L 980.0 330.0 Q 980.0 380.0 930.0 380.0 L 780.0 380.0 Q 740.0 380.0 740.0 420.0 L 740.0 420.0 Q 740.0 460.0 700.0 460.0 L 621.2 460.0 Q 580.0 460.0 570.0 500.0 L 570.0 500.0 Q 560.0 540.0 518.8 540.0 L 70.0 540.0 Q 20.0 540.0 20.0 490.0 Z"/>
                    </svg>
                    <svg class="svg-foreground" width="1000" height="700" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
                        <rect width="1000" height="700" fill="none"/>
                        <path class="polygon-2" d="M 940.0 340.0 Q 940.0 290.0 890.0 290.0 L 760.0 290.0 Q 720.0 290.0 720.0 330.0 L 720.0 330.0 Q 720.0 370.0 680.0 370.0 L 590.0 370.0 Q 540.0 370.0 540.0 420.0 L 540.0 420.0 Q 540.0 470.0 590.0 470.0 L 890.0 470.0 Q 940.0 470.0 940.0 420.0 Z"/>
                    </svg>
                </div>
            </div>
        </hero>
        `;
    }

    setupInteractivity() {
        const featureItems = this.shadow.querySelectorAll('.feature-item');

        featureItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.activateFeature(index + 1);
            });

            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('active')) {
                    item.style.opacity = '0.9';
                }
            });

            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('active')) {
                    item.style.opacity = '0.7';
                }
            });
        });

        this.startAutoCycle();

        this.updateHeroContent();
    }

    activateFeature(featureNumber) {
        const featureItems = this.shadow.querySelectorAll('.feature-item');

        featureItems.forEach(item => {
            item.classList.remove('active');
            item.style.opacity = '0.7';
        });

        const activeItem = this.shadow.querySelector(`[data-feature="${featureNumber}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            activeItem.style.opacity = '1';
        }

        this.currentFeature = featureNumber;
        this.updateHeroContent();

        this.resetAutoCycle();
    }

    updateHeroContent() {
        const heroContent = this.shadow.querySelector('.hero-content');
        const feature = this.features[this.currentFeature - 1];

        if (feature && heroContent) {
            const h1 = heroContent.querySelector('h1');
            const p = heroContent.querySelector('p');

            heroContent.style.opacity = '0.7';

            setTimeout(() => {
                h1.textContent = feature.title;
                p.textContent = feature.description;
                heroContent.style.opacity = '1';
            }, 200);
        }
    }

    startAutoCycle() {
        this.autoCycleInterval = setInterval(() => {
            const nextFeature = this.currentFeature >= 3 ? 1 : this.currentFeature + 1;
            this.activateFeature(nextFeature);
        }, 5000);
    }

    resetAutoCycle() {
        if (this.autoCycleInterval) {
            clearInterval(this.autoCycleInterval);
        }
        this.startAutoCycle();
    }

    disconnectedCallback() {
        if (this.autoCycleInterval) {
            clearInterval(this.autoCycleInterval);
        }
    }
}

customElements.define('hero-component', Hero);
