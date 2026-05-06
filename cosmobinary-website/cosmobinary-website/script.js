document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 3. Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve if you want it to trigger again, but usually once is best
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));

    // 4. Number Counter Animation for Stats
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.about-stats');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    // 5. Form Submission Mock
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.8';
            
            // Simulate network request
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#00FF00'; // Success color
                btn.style.color = '#000';
                form.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // 6. Fraud Alert Banner
    const fraudAlert = document.getElementById('fraud-alert');
    const closeFraudAlertBtn = document.getElementById('close-fraud-alert');

    if (fraudAlert && closeFraudAlertBtn) {
        closeFraudAlertBtn.addEventListener('click', () => {
            fraudAlert.classList.add('hidden');
        });
    }
});
