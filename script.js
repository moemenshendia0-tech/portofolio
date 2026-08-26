(function () {
    'use strict';

    const body = document.body;

    // ===== Theme (قبل أي شيء — بدون أخطاء لو العنصر ناقص) =====
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.setAttribute(
            'aria-label',
            body.classList.contains('dark-mode') ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    function closeMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navBackdrop = document.getElementById('navBackdrop');
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        navBackdrop?.classList.remove('active');
        navBackdrop?.setAttribute('aria-hidden', 'true');
        body.classList.remove('menu-open');
        body.style.overflow = '';
        navToggle?.setAttribute('aria-expanded', 'false');
    }

    function openMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navBackdrop = document.getElementById('navBackdrop');
        navToggle?.classList.add('active');
        navMenu?.classList.add('active');
        navBackdrop?.classList.add('active');
        navBackdrop?.setAttribute('aria-hidden', 'false');
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
        navToggle?.setAttribute('aria-expanded', 'true');
    }

    function toggleMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        if (!navMenu) return;
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    document.getElementById('themeToggle')?.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        this.setAttribute(
            'aria-label',
            body.classList.contains('dark-mode') ? 'Switch to light mode' : 'Switch to dark mode'
        );
    });

    document.getElementById('navToggle')?.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    document.getElementById('navBackdrop')?.addEventListener('click', function () {
        closeMobileMenu();
    });

    document.querySelectorAll('.nav-menu a').forEach(function (link) {
        link.addEventListener('click', function () {
            closeMobileMenu();
        });
    });

    // ===== Navbar shadow on scroll =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.style.boxShadow =
                window.scrollY > 50 ? '0 2px 20px rgba(0,0,0,0.08)' : 'none';
        });
    }

    // ===== Footer year =====
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    // ===== Certificate modal =====
    const certificateModal = document.getElementById('certificateModal');
    const certificateModalImg = document.getElementById('certificateModalImg');
    const certificateModalClose = document.getElementById('certificateModalClose');
    const certificateModalBackdrop = certificateModal?.querySelector('.certificate-modal-backdrop');

    function openCertificateModal(src, title) {
        if (!certificateModal || !certificateModalImg) return;
        certificateModalImg.src = src;
        certificateModalImg.alt = title || '';
        certificateModal.classList.add('open');
        certificateModal.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
    }

    function closeCertificateModal() {
        if (!certificateModal) return;
        certificateModal.classList.remove('open');
        certificateModal.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
    }

    certificateModalClose?.addEventListener('click', closeCertificateModal);
    certificateModalBackdrop?.addEventListener('click', closeCertificateModal);

    document.querySelectorAll('.certificate-item').forEach(function (item) {
        item.addEventListener('click', function () {
            const src = item.getAttribute('data-cert-src');
            const title = item.getAttribute('data-cert-title') || '';
            if (!src) return;
            if (/\.pdf$/i.test(src)) {
                window.open(src, '_blank', 'noopener');
                return;
            }
            openCertificateModal(src, title);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (certificateModal?.classList.contains('open')) {
            closeCertificateModal();
        } else if (document.getElementById('projectModal')?.classList.contains('open')) {
            closeProjectModal();
        } else {
            closeMobileMenu();
        }
    });

    // ===== Project details modal (for projects without a public repo) =====
    const projectModal = document.getElementById('projectModal');
    const projectModalTitle = document.getElementById('projectModalTitle');
    const projectModalBody = document.getElementById('projectModalBody');

    function openProjectModal(title, bodyText) {
        if (!projectModal) return;
        if (projectModalTitle) projectModalTitle.textContent = title || '';
        if (projectModalBody) projectModalBody.textContent = bodyText || '';
        projectModal.classList.add('open');
        projectModal.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('open');
        projectModal.setAttribute('aria-hidden', 'true');
        body.style.overflow = '';
    }

    document.getElementById('projectModalClose')?.addEventListener('click', closeProjectModal);
    document.getElementById('projectModalBackdrop')?.addEventListener('click', closeProjectModal);

    document.querySelectorAll('.js-project-details').forEach(function (btn) {
        btn.addEventListener('click', function () {
            openProjectModal(
                btn.getAttribute('data-project-title'),
                btn.getAttribute('data-project-body')
            );
        });
    });

    // ===== Contact form (FormSubmit AJAX) =====
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const formSubmit = document.getElementById('formSubmit');

    function setFormStatus(type, message) {
        if (!formStatus) return;
        formStatus.hidden = false;
        formStatus.className = 'form-status ' + type;
        formStatus.textContent = message;
    }

    contactForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        const honey = contactForm.querySelector('[name="_honey"]');
        if (honey && honey.value) {
            setFormStatus('success', 'Thanks — your message was sent.');
            contactForm.reset();
            return;
        }

        const payload = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value,
            _subject: 'New message from Portfolio'
        };

        if (formSubmit) {
            formSubmit.disabled = true;
            formSubmit.textContent = 'Sending...';
        }

        fetch('https://formsubmit.co/ajax/moemen.mohamed.it@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(function (res) {
                return res.json().then(function (data) {
                    return { ok: res.ok, data: data };
                });
            })
            .then(function (result) {
                if (result.ok && result.data && result.data.success !== 'false') {
                    setFormStatus('success', 'Message sent. I will get back to you soon.');
                    contactForm.reset();
                } else {
                    throw new Error((result.data && result.data.message) || 'Send failed');
                }
            })
            .catch(function () {
                setFormStatus(
                    'error',
                    'Could not send the message. Please email moemen.mohamed.it@gmail.com directly.'
                );
            })
            .finally(function () {
                if (formSubmit) {
                    formSubmit.disabled = false;
                    formSubmit.textContent = 'Send Message';
                }
            });
    });

    // ===== Particles — Home فقط، أخف + يتوقف لما القسم مش ظاهر =====
    function initHomeParticles() {
        const host = document.getElementById('homeParticlesHost');
        if (!host) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = document.createElement('canvas');
        canvas.className = 'canvas-particles';
        canvas.setAttribute('aria-hidden', 'true');
        host.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        let width = 1;
        let height = 1;
        let particles = [];
        let running = false;
        let frameId = 0;

        const PARTICLE_COUNT = 28;
        const CONNECTION_DISTANCE = 130;

        function resize() {
            const r = host.getBoundingClientRect();
            width = Math.max(1, Math.floor(r.width));
            height = Math.max(1, Math.floor(r.height));
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            createParticles();
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    size: Math.random() * 2 + 0.7
                });
            }
        }

        function updateParticles() {
            particles.forEach(function (p) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
                p.x = Math.max(0, Math.min(width, p.x));
                p.y = Math.max(0, Math.min(height, p.y));
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            const isDark = body.classList.contains('dark-mode');

            particles.forEach(function (p1, i) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < CONNECTION_DISTANCE) {
                        const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.22;
                        ctx.beginPath();
                        ctx.strokeStyle = isDark
                            ? 'rgba(122,176,160,' + opacity + ')'
                            : 'rgba(64,81,59,' + opacity + ')';
                        ctx.lineWidth = 0.55;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            particles.forEach(function (p) {
                ctx.beginPath();
                ctx.fillStyle = isDark ? '#7ab0a0' : '#40513B';
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function tick() {
            if (!running) return;
            updateParticles();
            drawParticles();
            frameId = requestAnimationFrame(tick);
        }

        function setRunning(on) {
            if (on === running) return;
            running = on;
            if (running) {
                frameId = requestAnimationFrame(tick);
            } else if (frameId) {
                cancelAnimationFrame(frameId);
                frameId = 0;
            }
        }

        const homeSection = document.getElementById('home');
        if (homeSection && 'IntersectionObserver' in window) {
            var io = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (en) {
                        setRunning(en.isIntersecting);
                    });
                },
                { root: null, threshold: 0.08, rootMargin: '40px' }
            );
            io.observe(homeSection);
        } else {
            setRunning(true);
        }

        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(resize).observe(host);
        }
        window.addEventListener('resize', resize);

        resize();
    }

    initHomeParticles();

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
})();

