const swiper1 = new Swiper('.swiper1', {
    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 0,
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        550: {
            slidesPerView: 1.5,
            spaceBetween: 10,
            centeredSlides: false,
        },
        700: {
            slidesPerView: 2,
            spaceBetween: 10,
            centeredSlides: false,
        },
        1001: {
            slidesPerView: 3.2,
            spaceBetween: 10,
            centeredSlides: true,
        },
    },
    on: {
        slideChange: function () {
            if (window.innerWidth < 550) {
                this.slides.forEach(slide => {
                    slide.style.opacity = '0.3';
                    slide.style.transform = 'scale(0.9)';
                    slide.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                });

                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    activeSlide.style.opacity = '1';
                    activeSlide.style.transform = 'scale(1)';
                }
            } else {
                this.slides.forEach(slide => {
                    slide.style.opacity = '1';
                    slide.style.transform = 'scale(1)';
                    slide.style.transition = 'none';
                });
            }
        },
    },
});




const swiper2 = new Swiper('.swiper2', {

    loop: true,
    slidesPerView: 1.2,
    spaceBetween: 0,
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        550: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        700: {
            slidesPerView: 2,
            spaceBetween: 10,
            centeredSlides: false,

        },
        1001: {
            slidesPerView: 3.2,
            spaceBetween: 10,
            centeredSlides: true,
        },
    },
    on: {
        slideChange: function () {
            if (window.innerWidth < 700) {
                this.slides.forEach(slide => {
                    slide.style.opacity = '0.3';
                    slide.style.transform = 'scale(0.9)';
                    slide.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                });

                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    activeSlide.style.opacity = '1';
                    activeSlide.style.transform = 'scale(1)';
                }
            } else {
                this.slides.forEach(slide => {
                    slide.style.opacity = '1';
                    slide.style.transform = 'scale(1)';
                    slide.style.transition = 'none';
                });
            }
        },
    },
});


const swiper3 = new Swiper('.swiper3', {
    loop: false,  // Set to false to disable looping
    slidesPerView: 1.1,
    spaceBetween: 0,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        // Triggered when the Swiper instance is initialized
        init: function () {
            // Manually apply styles to the initial slide
            this.slides.forEach((slide, index) => {
                // Set opacity and scale for all slides on initialization
                if (index === this.activeIndex) {
                    slide.style.opacity = '1'; 
                    slide.style.transform = 'scale(0.95)';
                } else {
                    slide.style.opacity = '0.2'; 
                    slide.style.transform = 'scale(1)';
                }
                slide.style.transition = 'transform 0.3s ease, opacity 0.3s ease'; 
            });
        },
        slideChange: function () {
            // Reset all slides
            this.slides.forEach(slide => {
                slide.style.opacity = '0.2'; 
                slide.style.transform = 'scale(1)'; 
                slide.style.transition = 'transform 0.3s ease, opacity 0.3s ease'; 
            });

            // Highlight the active slide
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
                activeSlide.style.opacity = '1'; 
                activeSlide.style.transform = 'scale(0.95)'; 
            }
        },
    },
});


// Room PHOTO pop up
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const thumbnailItems = document.querySelectorAll('.thumbnail-item img');

let currentIndex = 0;

// Function to update the active thumbnail
function updateActiveThumbnail() {
    thumbnailItems.forEach((thumbnail, index) => {
        const thumbnailItem = thumbnail.closest('.thumbnail-item');
        thumbnailItem.classList.toggle('active', index === currentIndex);
    });
}

// Function to toggle body scroll
function toggleBodyScroll(isDisabled) {
    document.body.style.overflow = isDisabled ? 'hidden' : 'auto';
}

// Open lightbox on click of main gallery item
galleryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        currentIndex = index;
        lightbox.style.display = 'flex';
        lightboxImg.src = this.src;
        updateActiveThumbnail();
        toggleBodyScroll(true);  // Disable scrolling
    });
});

// Close lightbox
closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
    toggleBodyScroll(false); // Enable scrolling
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function(e) {
    if (e.target !== lightboxImg && !e.target.closest('.thumbnail-item') && e.target !== prevBtn && e.target !== nextBtn) {
        lightbox.style.display = 'none';
        toggleBodyScroll(false); // Enable scrolling
    }
});

// Thumbnail click to change lightbox main image
thumbnailItems.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
        currentIndex = index;
        lightboxImg.src = this.src;
        updateActiveThumbnail();
    });
});

// Show previous image
prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
    updateActiveThumbnail();
});

// Show next image
nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].src;
    updateActiveThumbnail();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            closeBtn.click();
        }
    }
});

// scroll active navigation
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll("#navbar a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});