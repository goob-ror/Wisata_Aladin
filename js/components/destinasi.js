class Destinasi extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.currentModal = null;
        this.activeDestination = 0;
        this.autoPlayInterval = null;
        this.isMobile = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.checkMobile();
        this.startAutoPlay();
    }

    disconnectedCallback() {
        this.stopAutoPlay();
    }

    checkMobile() {
        this.isMobile = window.innerWidth <= 768;
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            if (wasMobile !== this.isMobile) {
                this.updateActiveDestination();
            }
        });
    }

    startAutoPlay() {
        if (this.isMobile) {
            this.autoPlayInterval = setInterval(() => {
                this.activeDestination = (this.activeDestination + 1) % 5;
                this.updateActiveDestination();
            }, 3000);
        }
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    updateActiveDestination() {
        if (this.isMobile) {
            const mobileImages = this.shadow.querySelectorAll('.mobile-destination-item');
            mobileImages.forEach((item, index) => {
                if (index === this.activeDestination) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    }

    setupEventListeners() {
        const bubbles = this.shadow.querySelectorAll('.destination-bubble');
        bubbles.forEach((bubble, index) => {
            bubble.addEventListener('click', () => this.openModal(index + 1));
        });

        const mobileItems = this.shadow.querySelectorAll('.mobile-destination-item');
        mobileItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.stopAutoPlay();
                this.activeDestination = index;
                this.updateActiveDestination();
                this.openModal(index + 1);
                setTimeout(() => this.startAutoPlay(), 10000);
            });
        });

        this.shadow.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });

        setTimeout(() => {
            this.updateActiveDestination();
        }, 100);
    }

    openModal(imageNumber) {
        this.closeModal();
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="assets/images/destination/destination-${imageNumber}.webp" alt="Destination ${imageNumber}" class="modal-image">
            </div>
        `;
        this.shadow.appendChild(modal);
        this.currentModal = modal;

        modal.addEventListener('click', () => this.closeModal());
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (this.currentModal) {
            this.currentModal.remove();
            this.currentModal = null;
            document.body.style.overflow = '';
        }
    }

    render() {
        this.shadow.innerHTML = `\
        <link rel="stylesheet" href="./css/root.css">
        <link rel="stylesheet" href="./css/components/destinasi.css">
        <destinasi id="destination">
            <div class="container-destinasi">
                <div class="destinasi-header">
                    <h2><span><img src="assets/icons/shooting-star.webp"/></span>
                        Your Magical Destinations
                    <span><img src="assets/icons/shooting-star.webp"/></span></h2>
                </div>
                <div class="destinasi-content">
                    <div class="destinasi-center">
                        <img src="assets/rumah-makan-aladin.webp" class="rumah-makan-aladin"/>
                        <span><img src="assets/icons/X.webp"/></span>
                        <img src="assets/ok-jhon-coffee.webp" class="ok-jhon-coffee"/>
                    </div>

                    <div class="mobile-destinations-container">
                        <div class="mobile-destination-item active" data-destination="1">
                            <img src="assets/images/destination/destination-1.webp" alt="Rumah Makan Aladin">
                            <span>Aladin's Restaurant</span>
                        </div>
                        <div class="mobile-destination-item" data-destination="2">
                            <img src="assets/images/destination/destination-2.webp" alt="OK Jhon Coffee">
                            <span>OK Jhon Coffee</span>
                        </div>
                        <div class="mobile-destination-item" data-destination="3">
                            <img src="assets/images/destination/destination-3.webp" alt="Permainan">
                            <span>Games</span>
                        </div>
                        <div class="mobile-destination-item" data-destination="4">
                            <img src="assets/images/destination/destination-4.webp" alt="Live Music">
                            <span>Live Music</span>
                        </div>
                        <div class="mobile-destination-item" data-destination="5">
                            <img src="assets/images/destination/destination-5.webp" alt="Tempat Foto">
                            <span>Photo Spots</span>
                        </div>
                    </div>

                    <div class="desktop-bubbles-container">
                        <div class="destination-bubble bubble-1" data-destination="1">
                            <div class="bubble-arrow">
                                <img src="assets/doodles/rumah-makan-arrow.webp" alt="Arrow to Rumah Makan">
                            </div>
                            <div class="bubble-image">
                                <img src="assets/images/destination/destination-1.webp" alt="Rumah Makan Aladin">
                            </div>
                            <div class="bubble-text">
                                <span>Aladin's Restaurant</span>
                            </div>
                        </div>
                        <div class="destination-bubble bubble-2" data-destination="2">
                            <div class="bubble-arrow">
                                <img src="assets/doodles/ok-jhon-coffee-arrow.webp" alt="Arrow to Coffee">
                            </div>
                            <div class="bubble-image">
                                <img src="assets/images/destination/destination-2.webp" alt="OK Jhon Coffee">
                            </div>
                            <div class="bubble-text">
                                <span>OK Jhon Coffee</span>
                            </div>
                        </div>
                        <div class="destination-bubble bubble-3" data-destination="3">
                            <div class="bubble-arrow">
                                <img src="assets/doodles/permainan-arrow.webp" alt="Arrow to Games">
                            </div>
                            <div class="bubble-image">
                                <img src="assets/images/destination/destination-3.webp" alt="Permainan">
                            </div>
                            <div class="bubble-text">
                                <span>Games</span>
                            </div>
                        </div>
                        <div class="destination-bubble bubble-4" data-destination="4">
                            <div class="bubble-arrow">
                                <img src="assets/doodles/live-music-arrow.webp" alt="Arrow to Music">
                            </div>
                            <div class="bubble-image">
                                <img src="assets/images/destination/destination-4.webp" alt="Live Music">
                            </div>
                            <div class="bubble-text">
                                <span>Live Music</span>
                            </div>
                        </div>
                        <div class="destination-bubble bubble-5" data-destination="5">
                            <div class="bubble-arrow">
                                <img src="assets/doodles/tempat-foto-arrow.webp" alt="Arrow to Photo Spot">
                            </div>
                            <div class="bubble-image">
                                <img src="assets/images/destination/destination-5.webp" alt="Tempat Foto">
                            </div>
                            <div class="bubble-text">
                                <span>Photo Spots</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </destinasi>
        `;
    }
}
customElements.define('destinasi-component', Destinasi);