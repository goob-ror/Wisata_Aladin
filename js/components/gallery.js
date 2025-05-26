class Gallery extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadow.innerHTML = `\
        <link rel="stylesheet" href="./css/root.css">
        <link rel="stylesheet" href="./css/components/gallery.css">
        <gallery id="gallery">
            <div class="container-gallery">
                <div class="gallery-header">
                    <h2>Our Gallery</h2>
                    <div class="magic-line">
                        <div class="magic-sparkle">
                            <img src="assets/icons/magic-lamp.webp"/>
                        </div>
                        <div class="magic-lamp">
                            <img src="assets/icons/genie.webp"/>
                        </div>
                        <div class="magic-sparkle">
                            <img src="assets/icons/magic-lamp.webp"/>
                        </div>
                    </div>
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
                </div>
                <div class="gallery-content">
                    <div class="gallery-item image-item" data-position="1-1">
                        <img src="assets/images/image-1.webp" alt="Gallery Image 1" class="gallery-image" />
                    </div>
                    <div class="gallery-item image-item" data-position="1-2">
                        <img src="assets/images/image-2.webp" alt="Gallery Image 2" class="gallery-image" />
                    </div>
                    <div class="gallery-item image-item" data-position="3-3">
                        <img src="assets/images/image-5.webp" alt="Gallery Image 5" class="gallery-image" />
                    </div>
                    <div class="gallery-item video-item video-tall" data-position="1-3">
                        <video class="gallery-video" poster="assets/images/image-3.webp">
                            <source src="assets/videos/videos-1.webm" type="video/webm">
                            Your browser does not support the video tag.
                        </video>
                        <div class="video-overlay">
                            <div class="play-button">
                                <img src="assets/icons/play.webp"/>
                            </div>
                        </div>
                    </div>
                    <div class="gallery-item image-item" data-position="2-2">
                        <img src="assets/images/image-3.webp" alt="Gallery Image 3" class="gallery-image" />
                    </div>
                    <div class="gallery-item video-item video-tall" data-position="2-1">
                        <video class="gallery-video" poster="assets/images/image-4.webp">
                            <source src="assets/videos/videos-2.webm" type="video/webm">
                            Your browser does not support the video tag.
                        </video>
                        <div class="video-overlay">
                            <div class="play-button">
                                <img src="assets/icons/play.webp"/>
                            </div>
                        </div>
                    </div>
                    <div class="gallery-item image-item" data-position="3-2">
                        <img src="assets/images/image-4.webp" alt="Gallery Image 4" class="gallery-image" />
                    </div>
                </div>
                <div class="gallery-modal" id="galleryModal">
                    <div class="modal-content">
                        <span class="modal-close">&times;</span>
                        <img class="modal-image" id="modalImage" />
                        <video class="modal-video" id="modalVideo" controls>
                            <source id="modalVideoSource" type="video/webm">
                        </video>
                    </div>
                </div>
            </div>
        </gallery>
        `;
    }

    setupEventListeners() {
        const modal = this.shadow.getElementById('galleryModal');
        const modalImage = this.shadow.getElementById('modalImage');
        const modalVideo = this.shadow.getElementById('modalVideo');
        const modalVideoSource = this.shadow.getElementById('modalVideoSource');
        const closeBtn = this.shadow.querySelector('.modal-close');

        const galleryItems = this.shadow.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(item, modal, modalImage, modalVideo, modalVideoSource);
            });
        });

        closeBtn.addEventListener('click', () => {
            this.closeModal(modal, modalVideo);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal, modalVideo);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.closeModal(modal, modalVideo);
            }
        });

        const videoOverlays = this.shadow.querySelectorAll('.video-overlay');
        videoOverlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                e.stopPropagation();
                const video = overlay.previousElementSibling;
                if (video.paused) {
                    video.play();
                    overlay.style.opacity = '0';
                } else {
                    video.pause();
                    overlay.style.opacity = '1';
                }
            });
        });
    }

    openModal(item, modal, modalImage, modalVideo, modalVideoSource) {
        const isVideo = item.classList.contains('video-item');

        if (isVideo) {
            const video = item.querySelector('video');
            const source = video.querySelector('source');
            modalVideoSource.src = source.src;
            modalVideo.load();
            modalVideo.style.display = 'block';
            modalImage.style.display = 'none';
        } else {
            const img = item.querySelector('img');
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modalImage.style.display = 'block';
            modalVideo.style.display = 'none';
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeModal(modal, modalVideo) {
        modal.style.display = 'none';
        modalVideo.pause();
        document.body.style.overflow = 'auto';
    }
}
customElements.define('gallery-component', Gallery);