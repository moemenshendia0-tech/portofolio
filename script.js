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
