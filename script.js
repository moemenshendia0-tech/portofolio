// ===== Theme Toggle (Dark / Light Mode) =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
} else {
    body.classList.remove('dark-mode');
}

themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Navbar background on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Certificate modal (click + to enlarge) =====
const certificateModal = document.getElementById('certificateModal');
const certificateModalImg = document.getElementById('certificateModalImg');
const certificateModalTitle = document.getElementById('certificateModalTitle');
const certificateModalClose = document.getElementById('certificateModalClose');
const certificateModalBackdrop = certificateModal && certificateModal.querySelector('.certificate-modal-backdrop');

function openCertificateModal(src, title) {
    if (!certificateModal || !certificateModalImg) return;
    certificateModalImg.src = src;
    certificateModalImg.alt = title;
    certificateModalTitle.textContent = title;
    certificateModal.classList.add('open');
    certificateModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    if (!certificateModal) return;
    certificateModal.classList.remove('open');
    certificateModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (certificateModalClose) {
    certificateModalClose.addEventListener('click', closeCertificateModal);
}
if (certificateModalBackdrop) {
    certificateModalBackdrop.addEventListener('click', closeCertificateModal);
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && certificateModal && certificateModal.classList.contains('open')) {
        closeCertificateModal();
    }
});

document.querySelectorAll('.certificate-item').forEach(function (item) {
    item.addEventListener('click', function () {
        var src = item.getAttribute('data-cert-src');
        var title = item.getAttribute('data-cert-title') || '';
        if (src) openCertificateModal(src, title);
    });
});

// ===== Download CV - Update this href when you have your CV file =====
const downloadCV = document.getElementById('downloadCV');
// Example: downloadCV.href = 'assets/cv.pdf';

// ===== Contact links - Update these with your real data =====
// document.getElementById('contactEmail').href = 'mailto:your@email.com';
// document.querySelector('#contactEmail .contact-value').textContent = 'your@email.com';
// document.getElementById('contactLinkedIn').href = 'https://linkedin.com/in/yourprofile';
// document.querySelector('#contactLinkedIn .contact-value').textContent = 'linkedin.com/in/yourprofile';
// document.getElementById('contactPhone').href = 'tel:+201234567890';
// document.querySelector('#contactPhone .contact-value').textContent = '+20 123 456 7890';
// ===== Certificate modal - نسخة محسنة =====
document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ Certificate script loaded');

    const certificateModal = document.getElementById('certificateModal');
    const certificateModalImg = document.getElementById('certificateModalImg');
    const certificateModalTitle = document.getElementById('certificateModalTitle');
    const certificateModalClose = document.getElementById('certificateModalClose');
    const certificateModalBackdrop = document.querySelector('.certificate-modal-backdrop');

    // التأكد من وجود العناصر
    if (!certificateModal || !certificateModalImg) {
        console.error('❌ Modal elements not found!');
        return;
    }

    // فتح Modal
    function openCertificateModal(src, title) {
        console.log('Opening modal with:', src);
        certificateModalImg.src = src;
        certificateModalImg.alt = title;
        if (certificateModalTitle) {
            certificateModalTitle.textContent = title;
        }
        certificateModal.classList.add('open');
        certificateModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // إغلاق Modal
    function closeCertificateModal() {
        certificateModal.classList.remove('open');
        certificateModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // إضافة event listeners للشهادات
    const certificates = document.querySelectorAll('.certificate-item');
    console.log(`📊 Found ${certificates.length} certificate items`);

    certificates.forEach(function (item, index) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const src = this.getAttribute('data-cert-src');
            const title = this.getAttribute('data-cert-title') || 'Certificate';

            console.log(`🖱️ Clicked certificate ${index + 1}:`, src);

            if (src) {
                openCertificateModal(src, title);
            } else {
                console.error('❌ No src found for certificate', this);
            }
        });
    });

    // Close button
    if (certificateModalClose) {
        certificateModalClose.addEventListener('click', closeCertificateModal);
    }

    // Backdrop click
    if (certificateModalBackdrop) {
        certificateModalBackdrop.addEventListener('click', closeCertificateModal);
    }

    // ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && certificateModal.classList.contains('open')) {
            closeCertificateModal();
        }
    });
});
// ===== شبكة الجزيئات المتحركة بالـ Canvas =====
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.className = 'canvas-particles';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const PARTICLE_COUNT = 50;
    const CONNECTION_DISTANCE = 150;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    function updateParticles() {
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // الحدود
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            // تصحيح الموضع
            p.x = Math.max(0, Math.min(width, p.x));
            p.y = Math.max(0, Math.min(height, p.y));
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);

        // رسم الخطوط بين الجزيئات القريبة
        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--highlight').trim() || '#C0FF4E';
        ctx.lineWidth = 0.5;

        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECTION_DISTANCE) {
                    const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.3;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(192, 255, 78, ${opacity})`;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        // رسم الجزيئات
        particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = '#C0FF4E';
            ctx.shadowColor = '#C0FF4E';
            ctx.shadowBlur = 10;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.shadowBlur = 0;
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    resize();
    createParticles();
    animate();
}

// تشغيل الجزيئات بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', initParticles);
// ===== شبكة الجزيئات المتحركة - نسخة محسنة لـ Light Mode =====
// ===== Interactive Particles Background =====
function initParticles() {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas-particles";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null };

    const PARTICLE_COUNT = 70;
    const CONNECTION_DISTANCE = 200;
    const MOUSE_RADIUS = 150;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 3 + 1
            });
        }
    }

    function updateParticles() {
        particles.forEach(p => {

            // حركة طبيعية
            p.x += p.vx;
            p.y += p.vy;

            // تفاعل مع الماوس
            if (mouse.x && mouse.y) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                    p.x += dx * force * 0.02;
                    p.y += dy * force * 0.02;
                }
            }

            // حدود الشاشة
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains("dark-mode");

        // رسم الخطوط
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECTION_DISTANCE) {
                    const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.3;

                    ctx.beginPath();
                    ctx.strokeStyle = isDark
                        ? `rgba(122,176,160,${opacity})`
                        : `rgba(64,81,59,${opacity})`;

                    ctx.lineWidth = 0.7;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        // رسم الجزيئات
        particles.forEach(p => {
            ctx.beginPath();

            if (isDark) {
                ctx.fillStyle = "#7ab0a0";
                ctx.shadowColor = "#7ab0a0";
            } else {
                ctx.fillStyle = "#40513B";
                ctx.shadowColor = "#9DC08B";
            }

            ctx.shadowBlur = 8;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.shadowBlur = 0;
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    // حركة الماوس
    window.addEventListener("mousemove", e => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener("resize", () => {
        resize();
        createParticles();
    });

    resize();
    createParticles();
    animate();
}

document.addEventListener("DOMContentLoaded", initParticles);