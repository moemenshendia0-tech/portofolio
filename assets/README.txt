Place your files here:
- photo.jpg (or .png) - Your profile photo (used in Home and About)
- cv.pdf - Your CV for the Download CV button

Then in index.html you can keep "assets/photo.jpg" and "assets/cv.pdf".
In script.js set: document.getElementById('downloadCV').href = 'assets/cv.pdf';

For certificates: edit the href of each .certificate-card in index.html to your Google Drive links or image URLs.
