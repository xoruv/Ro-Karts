document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Keep only the parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const title = document.querySelector('.split-text');
        const depth = 30;
        
        if (title) {
            title.style.transform = `
                translate(${mouseX * depth}px, ${mouseY * depth}px)
                rotateX(${mouseY * 10}deg)
                rotateY(${mouseX * 10}deg)
            `;
        }
    });

    // Add dynamic glow effect on mouse movement
    const hero = document.querySelector('.hero-section');
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        hero.style.setProperty('--mouse-x', `${x}px`);
        hero.style.setProperty('--mouse-y', `${y}px`);
    });

    // Logo spin on scroll
    let lastScrollTop = 0;
    const logo = document.querySelector('.logo-container');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && !logo.classList.contains('logo-spin')) {
            logo.classList.add('logo-spin');
            setTimeout(() => {
                logo.classList.remove('logo-spin');
            }, 800);
        }
        lastScrollTop = scrollTop;
    });

    // Optional: Add replay functionality
    const replayAnimation = () => {
        const elements = ['race', 'drift', 'victory', 'rokarts'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = '';
        });
        
        // Reset subtitle and buttons
        document.querySelector('.hero-subtitle').style.animation = 'none';
        document.querySelector('.cta-buttons').style.animation = 'none';
        document.querySelector('.hero-subtitle').offsetHeight; // Trigger reflow
        document.querySelector('.hero-subtitle').style.animation = '';
        document.querySelector('.cta-buttons').style.animation = '';
    };

    // Optional: Click to replay
    document.querySelector('.animated-title').addEventListener('click', replayAnimation);

    // Add particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#FFD700'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.2,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#FFD700',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                out_mode: 'out'
            }
        }
    });

    // Add hover effect for buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });

    // Ensure smooth loading even if images aren't loaded yet
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Optional: Add preloading for critical assets
    const preloadImages = () => {
        const images = ['logo.webp']; // Add your critical images here
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    preloadImages();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements
    document.querySelectorAll('.section-title, .about-content, .feature-card').forEach(el => {
        observer.observe(el);
    });

    // Add this to your existing JavaScript
    document.addEventListener('DOMContentLoaded', () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe footer
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.classList.add('reveal');
            observer.observe(footer);
        }
    });

    // Check if the URL contains /team or /about
    if (window.location.pathname === '/team') {
        // Redirect to homepage and scroll to team section
        window.location.href = '/#team';
    }
    if (window.location.pathname === '/about') {
        // Redirect to homepage and scroll to about section
        window.location.href = '/#about';
    }

    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').replace('/', '');
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 