class About extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = `\
        <link rel="stylesheet" href="./css/root.css">
        <link rel="stylesheet" href="./css/components/about.css">
        <about id="about">
            <div class="container-about">
                <div class="about-header">
                    <h2>About Wisata Aladin</h2>
                    <div class="magic-line top-line">
                        <div class="magic-sparkle">
                            <img src="assets/icons/sparkling.webp"/>
                        </div>
                        <div class="magic-lamp">
                            <img src="assets/icons/magic-lamp.webp"/>
                        </div>
                        <div class="magic-sparkle">
                            <img src="assets/icons/sparkling.webp"/>
                        </div>
                    </div>
                </div>

                <div class="about-columns">

                    <!-- Left Column -->
                    <div class="left-column">
                        <div class="about-image">
                            <img src="assets/wisata-aladn.webp"/>
                        </div>
                        <div class="operational-hours-card">
                            <div class="hours-header">
                                <div class="hours-icon">
                                    <img src="assets/icons/schedule.webp"/>
                                </div>
                                <h3>Operational Hours</h3>
                                <div class="hours-decoration">
                                    <span class="magic-dot"></span>
                                    <span class="magic-dot"></span>
                                    <span class="magic-dot"></span>
                                </div>
                            </div>
                            <div class="hours-content">
                                <div class="hours-item">
                                    <div class="day-range">Monday - Saturday</div>
                                    <div class="time-range">12:00 - 22:00</div>
                                </div>
                                <div class="hours-divider"></div>
                                <div class="hours-item">
                                    <div class="day-range">Sunday</div>
                                    <div class="time-range">11:00 - 22:00</div>
                                </div>
                            </div>
                            <div class="hours-footer">
                                <span>Open Every Day</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="right-column">
                        <div class="about-description">
                            <p class="intro-text">
                                Located on a scenic hilltop in Samarinda, East Kalimantan, Wisata Aladin is the perfect destination for relaxation and recreation. This expansive tourism spot features a charming village-like atmosphere, an entertainment area, and a cozy restaurant with live music to enhance your dining experience.
                            </p>
                            <p class="intro-text">
                                With breathtaking views of the city from above, Wisata Aladin offers a peaceful retreat for visitors to unwind, enjoy delicious food, and immerse themselves in the beauty of nature. Whether you're here for leisure or a fun day out with family and friends, this hilltop haven provides an unforgettable escape.
                            </p>
                        </div>
                        <div class="mission-section">
                            <div class="mission-header">
                                <div class="mission-icon">
                                    <img src="assets/icons/target.webp"/>
                                </div>
                                <h3>Our Mission & Purpose</h3>
                            </div>
                            <div class="mission-content">
                                <div class="mission-item">
                                    <div class="mission-point">
                                        <span class="point-icon">
                                            <img src="assets/icons/magic-wand.webp"/>
                                        </span>
                                        <div class="point-text">
                                            <strong>Magical Experiences:</strong> To make travel accessible, enjoyable, and magical for everyone. We believe that exploring new places should be as enchanting as the stories of Aladin himself.
                                        </div>
                                    </div>
                                </div>
                                <div class="mission-item">
                                    <div class="mission-point">
                                        <span class="point-icon">
                                            <img src="assets/icons/happy.webp"/>
                                        </span>
                                        <div class="point-text">
                                            <strong>Unforgettable Moments:</strong> Creating lasting memories through breathtaking views, delicious cuisine, and immersive cultural experiences. All in Wisata Aladin.
                                        </div>
                                    </div>
                                </div>
                                <div class="mission-item">
                                    <div class="mission-point">
                                        <span class="point-icon">
                                            <img src="assets/icons/city-building.webp"/>
                                        </span>
                                        <div class="point-text">
                                            <strong>Stunning Views:</strong> Preserving and showcasing the stunning hilltop landscape while providing a peaceful sanctuary for relaxation and recreation.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="magic-line bottom-line">
                    <div class="magic-sparkle">
                        <img src="assets/icons/sparkling.webp"/>
                    </div>
                    <div class="magic-sparkle">
                        <img src="assets/icons/star.webp"/>
                    </div>
                    <div class="magic-sparkle">
                        <img src="assets/icons/sparkling.webp"/>
                    </div>
                </div>
            </div>
        </about>
        `;
    }
}

customElements.define('about-component', About);
