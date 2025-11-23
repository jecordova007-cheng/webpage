// NAVIGATION & MOBILE MENU
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ACTIVE SECTION HIGHLIGHTING
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with data-animate attribute
const animatedElements = document.querySelectorAll('[data-animate]');
animatedElements.forEach(element => observer.observe(element));

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// IMPACT STATISTICS COUNTER ANIMATION
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            // Format number with commas for thousands
            if (target >= 1000) {
                element.textContent = Math.floor(current).toLocaleString();
            } else {
                element.textContent = current.toFixed(1);
            }
            requestAnimationFrame(updateCounter);
        } else {
            // Final value
            if (target >= 1000) {
                element.textContent = target.toLocaleString();
            } else {
                element.textContent = target.toFixed(1);
            }
        }
    };
    
    updateCounter();
}

// Observe impact section for counter animation
const impactSection = document.querySelector('.impact');
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.impact__number');
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (impactSection) {
    impactObserver.observe(impactSection);
}

// GALLERY FILTER FUNCTIONALITY
const filterButtons = document.querySelectorAll('.filter__btn');
const galleryItems = document.querySelectorAll('.gallery__item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                // Re-trigger animation
                item.classList.remove('visible');
                setTimeout(() => {
                    item.classList.add('visible');
                }, 10);
            } else {
                const itemYear = item.getAttribute('data-year');
                if (itemYear === filterValue) {
                    item.style.display = 'block';
                    item.classList.remove('visible');
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});

// GALLERY LIGHTBOX MODAL
const modal = document.getElementById('gallery-modal');
const modalClose = document.querySelector('.modal__close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// CONTACT FORM VALIDATION & SUBMISSION
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual API call)
        showFormMessage('Sending message...', 'success');
        
        setTimeout(() => {
            showFormMessage('Thank you for contacting us! We will get back to you soon.', 'success');
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form__message ${type}`;
    formMessage.style.display = 'block';
}

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for # only links
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// LAZY LOADING FOR IMAGES
// If real images are added, this will handle lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// KEYBOARD ACCESSIBILITY ENHANCEMENTS
// Allow keyboard navigation for interactive elements
const interactiveElements = document.querySelectorAll('.program__card, .startup__card, .news__card, .gallery__item');

interactiveElements.forEach(element => {
    element.setAttribute('tabindex', '0');
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

// PARALLAX EFFECT FOR HERO SECTION
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero__content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            const parallaxSpeed = 0.5;
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight);
        }
    });
}

// FLOATING ANIMATION FOR HERO CARDS
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    // Add mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        card.style.transform = `translate(${moveX * (index + 1)}px, ${moveY * (index + 1)}px)`;
    });
});

// PREVENT HORIZONTAL SCROLL
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflowX = 'hidden';
});

// LOADING STATE
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// PERFORMANCE OPTIMIZATION
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply optimizations to scroll-heavy functions
const optimizedScrollActive = debounce(scrollActive, 100);
window.addEventListener('scroll', optimizedScrollActive);

// RESPONSIVE HELPER
let windowWidth = window.innerWidth;

window.addEventListener('resize', throttle(() => {
    const newWidth = window.innerWidth;
    
    // Only execute if width actually changed (not just scroll on mobile)
    if (newWidth !== windowWidth) {
        windowWidth = newWidth;
        
        // Close mobile menu on resize to desktop
        if (windowWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
}, 250));

// ACCESSIBILITY: Focus Management
// Add visible focus indicator for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// CONSOLE BRANDING
console.log('%c Navigatú TBI ', 'background: #0047AB; color: white; font-size: 20px; padding: 10px;');
console.log('%c Caraga\'s Innovation Hub - Empowering Startups, Building Ecosystems ', 'color: #4A90E2; font-size: 14px;');
console.log('%c Powered by CSU Innovation Ecosystem ', 'color: #7F8C9A; font-size: 12px;');

// ERROR HANDLING
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// SERVICE WORKER REGISTRATION (for PWA capabilities - optional)
// Uncomment if you want to add PWA functionality
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
*/

// ANALYTICS TRACKING (Placeholder)
// Replace with actual analytics code (Google Analytics, etc.)
function trackEvent(category, action, label) {
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track important interactions
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Navigation', 'Click', link.textContent);
    });
});

const ctaButtons = document.querySelectorAll('.btn');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('CTA', 'Click', button.textContent);
    });
});

// INITIALIZE
console.log('Navigatú TBI website initialized successfully!');

// Initial call to set active section on page load
scrollActive();