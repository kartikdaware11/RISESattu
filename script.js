// RISE — the sattu | Landing Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initFAQ();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    initMouseGradient();
    initMeshParallax();
    initCounterAnimations();
});

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== FAQ Accordion =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===== Scroll Animations (Intersection Observer) =====
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(`
        .problem-card,
        .feature-card,
        .step,
        .testimonial-card,
        .faq-item,
        .trust-item,
        .video-container,
        .solution-banner
    `);

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add animate-in styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (!menuBtn) return;

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="mobile-menu-content">
            <a href="#products">Products</a>
            <a href="#benefits">Benefits</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#faq">FAQ</a>
            <a href="artifacts.html">Artifacts</a>
            <a href="#order" class="btn btn-primary">Order Now</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(253, 248, 240, 0.97);
            backdrop-filter: blur(20px);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .mobile-menu.active {
            opacity: 1;
            visibility: visible;
        }

        .mobile-menu-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
        }

        .mobile-menu-content a {
            font-size: 24px;
            font-weight: 500;
            color: var(--text-secondary);
            transition: color 0.3s ease;
        }

        .mobile-menu-content a:hover {
            color: var(--text-primary);
        }

        .mobile-menu-content .btn {
            margin-top: 16px;
        }

        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(mobileStyles);

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Counter Animation for Stats =====
function animateCounter(element, target, suffix, duration) {
    duration = duration || 2000;
    suffix = suffix || '';
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }

    updateCounter();
}

function initCounterAnimations() {
    const trustMetricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const value = entry.target.querySelector('.trust-value');
                if (value && !value.dataset.animated) {
                    value.dataset.animated = 'true';
                    const text = value.textContent;
                    const numMatch = text.match(/(\d+)/);
                    if (numMatch) {
                        const target = parseInt(numMatch[1]);
                        const suffix = text.replace(/\d+/, '');
                        animateCounter(value, target, suffix, 1500);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.trust-item').forEach(item => {
        trustMetricsObserver.observe(item);
    });
}

// ===== Parallax Effect on Hero Background =====
window.addEventListener('scroll', () => {
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
        const scroll = window.pageYOffset;
        heroGlow.style.transform = `translateX(-50%) translateY(${scroll * 0.3}px)`;
    }
});

// ===== Ripple Effect on Buttons =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();

        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${e.clientX - rect.left - 50}px;
            top: ${e.clientY - rect.top - 50}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

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

// ===== Navbar Active Link Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-links a.active {
        color: var(--accent-primary);
    }
`;
document.head.appendChild(activeLinkStyle);

// ===== Mouse-Following Gradient =====
function initMouseGradient() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const mouseGradient = document.createElement('div');
    mouseGradient.className = 'mouse-gradient';
    hero.appendChild(mouseGradient);

    const mouseGradientStyles = document.createElement('style');
    mouseGradientStyles.textContent = `
        .mouse-gradient {
            position: absolute;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(184, 117, 30, 0.08) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            filter: blur(60px);
            opacity: 0;
        }

        .hero:hover .mouse-gradient {
            opacity: 1;
        }
    `;
    document.head.appendChild(mouseGradientStyles);

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    hero.addEventListener('mouseleave', () => {
        mouseGradient.style.opacity = '0';
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        mouseGradient.style.left = `${currentX}px`;
        mouseGradient.style.top = `${currentY}px`;

        requestAnimationFrame(animate);
    }

    animate();
}

// ===== Mesh Parallax Effect =====
function initMeshParallax() {
    const meshBlobs = document.querySelectorAll('.mesh-blob');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        meshBlobs.forEach((blob, index) => {
            const speed = 0.05 + (index * 0.02);
            const yOffset = scrollY * speed;
            blob.style.transform = `translateY(${yOffset}px)`;
        });
    });

    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        meshBlobs.forEach((blob, index) => {
            const intensity = 20 + (index * 10);
            const x = mouseX * intensity;
            const y = mouseY * intensity;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ===== Card Hover Glow Effect =====
document.querySelectorAll('.feature-card, .problem-card, .step').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

const hoverGlowStyles = document.createElement('style');
hoverGlowStyles.textContent = `
    .feature-card::after,
    .problem-card::after,
    .step::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(184, 117, 30, 0.05),
            transparent 40%
        );
        border-radius: inherit;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .feature-card:hover::after,
    .problem-card:hover::after,
    .step:hover::after {
        opacity: 1;
    }
`;
document.head.appendChild(hoverGlowStyles);

console.log('🌾 RISE — the sattu | Ancient Grain. Relentless Rise.');
