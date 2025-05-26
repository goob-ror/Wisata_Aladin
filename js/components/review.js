class Review extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.selectedRating = 0;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.setupAnimations();
    }

    reviewData = [
        {
            name: 'Santi Kurniawati',
            ratings: 5,
            image: 'assets/users/santikurniawati.webp',
            review: "New Places to Eat and Tourist in Samarinda Across. The food prices here are also friendly and delicious. It's fun, I enjoy eating here. Children can eat while playing. Because there are several rides there.",
        },
        {
            name: 'WA2N',
            ratings: 5,
            image: 'assets/users/wa2n.webp',
            review: "Friendly staff, quite good service. In terms of views, it's okay, and there are also rides for children. Parking is very spacious.",
        },
        {
            name: 'Ratna Nurkh',
            ratings: 5,
            image: 'assets/users/ratnanurkh.webp',
            review: "The cafe atmosphere is suitable for families with children. The location at the top of the peak is beautiful, but the places to eat were scattered so it was a bit confusing at first",
        },
        {
            name: 'Green Tea',
            ratings: 4,
            image: 'assets/users/greentea.webp',
            review: "The place is comfortable for relaxing, with a direct view of the Mahakam River. The food is also quite delicious, there is live music too.",
        },
        {
            name: 'Nkoo 99',
            ratings: 4,
            image: 'assets/users/nkoo99.webp',
            review: "The place is nice with a view of the city lights, it can be used as a destination for hanging out, for families there are rides that children can use, food is standard cafe prices in SMD",
        },
        {
            name: 'Siti Mualifah',
            ratings: 4,
            image: 'assets/users/sitimualifah.webp',
            review: "Again and again, Samarinda has to be smart about taking advantage of its natural conditions, for example, this place has a really good view, it's an aesthetically comfortable place for taking photos, lots of delicious food choices and there are small toys so everyone can enjoy this place, friendly service, there are employees who show you where to go so it's not hah hoh even though it's your first time there 😄",
        },
    ];

    generateStars(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += `<img src="assets/icons/star.webp" class="star filled" alt="star">`;
            } else {
                starsHtml += `<img src="assets/icons/star.webp" class="star empty" alt="star">`;
            }
        }
        return starsHtml;
    }

    generateCarouselItems() {
        const duplicatedReviews = [...this.reviewData, ...this.reviewData];
        return duplicatedReviews.map(review => `
            <div class="carousel-item">
                <div class="review-card-carousel">
                    <div class="reviewer-info">
                        <img src="${review.image}" alt="${review.name}" class="reviewer-image" />
                        <div class="reviewer-details">
                            <h4>${review.name}</h4>
                            <div class="rating-stars">
                                ${this.generateStars(review.ratings)}
                            </div>
                        </div>
                    </div>
                    <div class="review-text">
                        <p>"${review.review}"</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    render() {
        this.shadow.innerHTML = `\
        <link rel="stylesheet" href="css/root.css">
        <link rel="stylesheet" href="css/components/review.css">
        <review id="review">
            <div class="container-review">
                <!-- Header with magical decorative divider -->
                <div class="review-header">
                    <h2>What People Say</h2>
                    <div class="magic-line">
                        <div class="magic-sparkle">
                            <img src="assets/icons/sparkling.webp"/>
                        </div>
                        <div class="magic-lamp">
                            <img src="assets/icons/genie.webp"/>
                        </div>
                        <div class="magic-sparkle">
                            <img src="assets/icons/sparkling.webp"/>
                        </div>
                    </div>
                </div>

                <div class="reviews-carousel-container">
                    <div class="reviews-carousel">
                        ${this.generateCarouselItems()}
                    </div>
                </div>

                <div class="statistics-section">
                    <div class="stats-container">
                        <div class="stat-item">
                            <div class="stat-icon">
                                <img src="assets/icons/star.webp" alt="Reviews">
                            </div>
                            <div class="stat-number" data-target="159">0</div>
                            <div class="stat-label">Total Reviews</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">
                                <img src="assets/icons/five-stars.webp" alt="Rating">
                            </div>
                            <div class="stat-number" data-target="4.8">0</div>
                            <div class="stat-label">Average Rating</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">
                                <img src="assets/icons/happy.webp" alt="Satisfied">
                            </div>
                            <div class="stat-number" data-target="98">0</div>
                            <div class="stat-label">% Satisfied</div>
                        </div>
                    </div>
                </div>

                <div class="review-input-section">
                    <h3>Share Your Experience</h3>
                    <div class="rating-input">
                        <span>Rate your experience:</span>
                        <div class="star-rating">
                            <img src="assets/icons/star.webp" class="star-input" data-rating="1" alt="1 star">
                            <img src="assets/icons/star.webp" class="star-input" data-rating="2" alt="2 stars">
                            <img src="assets/icons/star.webp" class="star-input" data-rating="3" alt="3 stars">
                            <img src="assets/icons/star.webp" class="star-input" data-rating="4" alt="4 stars">
                            <img src="assets/icons/star.webp" class="star-input" data-rating="5" alt="5 stars">
                        </div>
                    </div>
                </div>

                <div class="review-modal" id="reviewModal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Write Your Review</h3>
                            <button class="close-modal">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="selected-rating">
                                <span>Your Rating:</span>
                                <div class="selected-stars"></div>
                            </div>
                            <div class="input-group">
                                <label for="reviewerName">Your Name:</label>
                                <input type="text" id="reviewerName" placeholder="Enter your name">
                            </div>
                            <div class="input-group">
                                <label for="reviewText">Your Review:</label>
                                <textarea id="reviewText" placeholder="Share your experience with us..." rows="4"></textarea>
                            </div>
                            <button class="submit-review">Submit Review</button>
                        </div>
                    </div>
                </div>

                <div class="review-footer">
                    <div class="magic-line bottom-line">
                        <div class="magic-sparkle">
                            <img src="assets/icons/sparkling.webp"/>
                        </div>
                        <div class="magic-sparkle">
                            <img src="assets/icons/shooting-star.webp"/>
                        </div>
                        <div class="magic-sparkle">
                            <img src="assets/icons/sparkling.webp"/>
                        </div>
                    </div>
                </div>
            </div>
        </review>
        `;
    }

    setupEventListeners() {
        const starInputs = this.shadow.querySelectorAll('.star-input');
        starInputs.forEach(star => {
            star.addEventListener('click', (e) => {
                this.selectedRating = parseInt(e.target.dataset.rating);
                this.updateStarRating();
                this.openModal();
            });

            star.addEventListener('mouseenter', (e) => {
                this.highlightStars(parseInt(e.target.dataset.rating));
            });
        });

        const starRating = this.shadow.querySelector('.star-rating');
        starRating.addEventListener('mouseleave', () => {
            this.resetStarHighlight();
        });

        const modal = this.shadow.querySelector('.review-modal');
        const closeModal = this.shadow.querySelector('.close-modal');
        const submitReview = this.shadow.querySelector('.submit-review');

        closeModal.addEventListener('click', () => {
            this.closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        submitReview.addEventListener('click', () => {
            this.submitReview();
        });
    }

    setupAnimations() {
        const statNumbers = this.shadow.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 1000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (target === 4.8) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    highlightStars(rating) {
        const stars = this.shadow.querySelectorAll('.star-input');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('highlighted');
            } else {
                star.classList.remove('highlighted');
            }
        });
    }

    resetStarHighlight() {
        const stars = this.shadow.querySelectorAll('.star-input');
        stars.forEach(star => {
            star.classList.remove('highlighted');
        });
    }

    updateStarRating() {
        const stars = this.shadow.querySelectorAll('.star-input');
        stars.forEach((star, index) => {
            if (index < this.selectedRating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }

    openModal() {
        const modal = this.shadow.querySelector('.review-modal');
        const selectedStars = this.shadow.querySelector('.selected-stars');

        selectedStars.innerHTML = this.generateStars(this.selectedRating);

        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    closeModal() {
        const modal = this.shadow.querySelector('.review-modal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    submitReview() {
        const reviewerName = this.shadow.querySelector('#reviewerName').value;
        const reviewText = this.shadow.querySelector('#reviewText').value;

        if (!reviewerName || !reviewText) {
            alert('Please fill in all fields');
            return;
        }

        console.log('Review submitted:', {
            name: reviewerName,
            rating: this.selectedRating,
            review: reviewText
        });

        alert('Thank you for your review!');
        this.closeModal();

        this.shadow.querySelector('#reviewerName').value = '';
        this.shadow.querySelector('#reviewText').value = '';
        this.selectedRating = 0;
        this.resetStarHighlight();
    }
}

customElements.define('review-component', Review);