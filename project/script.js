// Premium 3D Resume JavaScript
class PremiumResume {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupAnimations();
        this.setupTypingEffect();
        this.setupParticles();
        this.setupScrollEffects();
        this.setupInteractiveElements();
    }

    // Theme Toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'dark';

        document.body.setAttribute('data-theme', currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Add ripple effect
            this.createRipple(themeToggle, event);
        });
    }

    // Navigation
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.section');

        // Smooth scrolling
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === current) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Animations
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Add stagger effect for grid items
                    if (entry.target.classList.contains('skill-category') ||
                        entry.target.classList.contains('project-card') ||
                        entry.target.classList.contains('achievement-card')) {
                        const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                        entry.target.style.transitionDelay = `${delay}ms`;
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.premium-card, .category-card, .project-card, .achievement-card, .contact-card, .experience-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    // Typing Effect
    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        const titles = [
            'Elite Software Engineer',
            'Full-Stack Developer',
            'AI/ML Enthusiast',
            'Problem Solver',
            'Innovation Driver'
        ];

        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseTime = 2000;

        const type = () => {
            const currentTitle = titles[titleIndex];

            if (isDeleting) {
                typingElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentTitle.length) {
                speed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }

            setTimeout(type, speed);
        };

        type();
    }

    // Particles
    setupParticles() {
        const createFloatingShape = () => {
            const shape = document.createElement('div');
            shape.className = 'floating-particle';

            // Random properties
            const size = Math.random() * 6 + 2;
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;

            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, #64ffda, #667eea);
                border-radius: 50%;
                left: ${left}%;
                top: 100%;
                opacity: 0.6;
                animation: floatUp ${animationDuration}s linear infinite;
                animation-delay: ${delay}s;
                pointer-events: none;
            `;

            document.querySelector('.floating-shapes').appendChild(shape);

            // Remove after animation
            setTimeout(() => {
                if (shape.parentNode) {
                    shape.parentNode.removeChild(shape);
                }
            }, (animationDuration + delay) * 1000);
        };

        // Add CSS for float animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.6;
                }
                90% {
                    opacity: 0.6;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Create particles periodically
        setInterval(createFloatingShape, 2000);
    }

    // Scroll Effects
    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            // Parallax effect for hero background
            const hero = document.querySelector('.hero-section');
            if (hero) {
                hero.style.transform = `translateY(${rate * 0.3}px)`;
            }

            // Update scroll indicator
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                scrollIndicator.style.opacity = scrolled > 100 ? '0' : '1';
            }

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate);
    }

    // Interactive Elements
    setupInteractiveElements() {
        // Skill tags interaction
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', (e) => {
                this.createRipple(tag, e);
            });
        });

        // Button interactions
        const buttons = document.querySelectorAll('.cta-button, .project-link');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRipple(button, e);
            });
        });

        // Card hover effects
        const cards = document.querySelectorAll('.premium-card, .category-card, .project-card, .achievement-card, .contact-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-5px) scale(1.1)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
        });

        // View projects button
        const projectsBtn = document.querySelector('.cta-button.secondary');
        if (projectsBtn) {
            projectsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('projects').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    // Utility Functions
    createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: var(--shadow-primary);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize the resume
document.addEventListener('DOMContentLoaded', () => {
    new PremiumResume();
});

// Performance optimization
window.addEventListener('load', () => {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-src]');
    criticalImages.forEach(img => {
        img.src = img.dataset.src;
    });

    // Add loaded class for additional animations
    document.body.classList.add('loaded');
});

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate positions and sizes
        window.dispatchEvent(new Event('scroll'));
    }, 250);
});

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation
const addLoadingAnimation = () => {
    const style = document.createElement('style');
    style.textContent = `
        .loaded .hero-name .name-part:nth-child(1) {
            animation: slideInUp 1s ease-out 0.5s forwards;
        }
        .loaded .hero-name .name-part:nth-child(2) {
            animation: slideInUp 1s ease-out 0.7s forwards;
        }
        .loaded .hero-description {
            animation: fadeInUp 1s ease-out 1s forwards;
            opacity: 0;
        }
        .loaded .hero-actions {
            animation: fadeInUp 1s ease-out 1.2s forwards;
            opacity: 0;
        }
        .loaded .social-links {
            animation: fadeInUp 1s ease-out 1.4s forwards;
            opacity: 0;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
};

addLoadingAnimation();