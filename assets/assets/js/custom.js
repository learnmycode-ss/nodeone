(function() {
	"use strict";

    // Preloader JS
    document.addEventListener('DOMContentLoaded', function() {
        const preloader = document.querySelector('.preloader');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (!preloader) return;
        
        const loadingPhrases = [
            "Scanning Resumes...",
            "Checking Qualifications...",
            "Matching Candidates...",
            "Finalizing Selection...",
            "Almost There..."
        ];
        
        let progress = 0;
        const interval = setInterval(() => {
            // Increment progress (this is simulated - in real use, tie to actual loading events)
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            // Update progress bar
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
            
            // Update text periodically
            if (progressText && progress % 25 < 5) {
                const phraseIndex = Math.min(
                    Math.floor(progress / 25),
                    loadingPhrases.length - 1
                );
                progressText.textContent = loadingPhrases[phraseIndex];
            }
            
            // Complete when reached 100%
            if (progress >= 100) {
                clearInterval(interval);
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }
        }, 300);
        
        // Safety net timeout
        const timeout = setTimeout(() => {
            clearInterval(interval);
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 10000);
        
        // Clean up if load completes first
        window.addEventListener('load', function() {
            clearInterval(interval);
            clearTimeout(timeout);
            if (progressFill) progressFill.style.width = '100%';
            if (progressText) progressText.textContent = "Ready!";
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 500);
        });
    });

    // Check if elements with the class "search-toggler" exist
    const searchTogglers = document.querySelectorAll(".search-toggler");
    if (searchTogglers.length > 0) {
        searchTogglers.forEach((searchToggler) => {
            searchToggler.addEventListener("click", function (e) {
            e.preventDefault();
            
                const searchPopup = document.querySelector(".search-popup");
                if (searchPopup) {
                    searchPopup.classList.toggle("active");
                }

                const mobileNavWrapper = document.querySelector(".mobile-nav-wrapper");
                if (mobileNavWrapper) {
                    mobileNavWrapper.classList.remove("expanded");
                }
            });
        });
    }

    window.onload = function() {

        // Scroll Event go Top JS
        try {
            window.addEventListener('scroll', function() {
                var scrolled = window.scrollY;
                var goTopButton = document.querySelector('.go-top');
    
                if (scrolled > 600) {
                    goTopButton.classList.add('active');
                } else {
                    goTopButton.classList.remove('active');
                }
            });
            var goTopButton = document.querySelector('.go-top');
            goTopButton.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        } catch (err) {}

        // Counter Js
        try {
            if ("IntersectionObserver" in window) {
                let counterObserver = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                        let counter = entry.target;
                        let target = parseInt(counter.innerText, 10);
                        let step = target / 200;
                        let current = 0;
                        let timer = setInterval(function () {
                            current += step;
                            counter.innerText = Math.floor(current);
                            if (parseInt(counter.innerText, 10) >= target) {
                            clearInterval(timer);
                            }
                        }, 10);
                        counterObserver.unobserve(counter);
                        }
                    });
                });

                let counters = document.querySelectorAll(".counter");
                    counters.forEach(function (counter) {
                    counterObserver.observe(counter);
                });
            }
        } catch (err) {}

        // Hover JS
        try {
            var elements = document.querySelectorAll("[id^='my-element']");
                elements.forEach(function(element) {
                element.addEventListener("mouseover", function() {
                    elements.forEach(function(el) {
                    el.classList.remove("active");
                    });
                    element.classList.add("active");
                });
            });

        } catch (err) {}

    };

    // Advice Slider JS
    var swiper = new Swiper(".advice-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 3
            },
            1400: {
                slidesPerView: 2
            }
        }
    });

    // projects Slider JS
    var swiper = new Swiper(".project-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 2
            },
        }
    });

    // Partner Slider JS
    var swiper = new Swiper(".project-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 1
            },
        }
    });

    // How Slider JS
    var swiper = new Swiper(".how-slider", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        speed: 1500,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 3
            },
            1400: {
                slidesPerView: 4
            }
        }
    });

    // partner Slider JS
    var swiper = new Swiper(".partner-slider", {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        speed: 1000,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 1
            },
            768: {
                slidesPerView: 3
            },
            992: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 5
            }
        }
    });

    // Testimonial Slider
    var swiper = new Swiper(".testiminialSlider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: ".testiminial-pagination",
            clickable: true,
        },
    });

    // Image Parallax
    try {
        window.addEventListener("scroll", function () {
            let scrollPosition = window.scrollY;
            let images = document.querySelectorAll(".image-container img");
    
            images.forEach((image) => {
                image.style.transform = `translateY(${scrollPosition * -0.2}px)`;
            });
        });
    } catch (err) {
        console.error("An error occurred:", err);
    }

    // scrollCue
    scrollCue.init();

})();

// For Mobile Navbar JS
const list = document.querySelectorAll('.mobile-menu-list');
function accordion(e) {
    e.stopPropagation(); 
    if(this.classList.contains('active')){
        this.classList.remove('active');
    }
    else if(this.parentElement.parentElement.classList.contains('active')){
        this.classList.add('active');
    }
    else {
        for(i=0; i < list.length; i++){
            list[i].classList.remove('active');
        }
        this.classList.add('active');
    }
}
for(i = 0; i < list.length; i++ ){
    list[i].addEventListener('click', accordion);
}

// Header Sticky
const getHeaderId = document.getElementById("navbar");
if (getHeaderId) {
    window.addEventListener('scroll', event => {
        const height = 150;
        const { scrollTop } = event.target.scrollingElement;
        document.querySelector('#navbar').classList.toggle('sticky', scrollTop >= height);
    });
}