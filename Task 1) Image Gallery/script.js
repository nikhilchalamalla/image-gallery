const images = [
    { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop', category: 'nature', title: 'Mountain Landscape' },
    { src: 'https://t4.ftcdn.net/jpg/06/53/38/75/360_F_653387549_DDZXMlqu7GUSb16s0MIj7PFtAroIIeHI.jpg', category: 'nature', title: 'Forest Path' },
    { src: 'https://images.pexels.com/photos/1552212/pexels-photo-1552212.jpeg', category: 'nature', title: 'Winter Snow' },
    { src: 'https://assets.telegraphindia.com/telegraph/2020/Sep/1600798111_shutterstock_559426471.jpg', category: 'urban', title: 'City Lights' },
    { src: 'https://img.freepik.com/free-photo/facade-modern-building-with-geometric-windows-curved-walls_181624-16998.jpg', category: 'urban', title: 'Modern Buildings' },
    { src: 'https://images.unsplash.com/photo-1548177333-65ddbd7582f5', category: 'urban', title: 'Street Scene' },
    { src: 'https://thumbs.dreamstime.com/b/big-lion-lying-savannah-grass-landscape-characteristic-trees-plain-hills-background-35172905.jpg', category: 'animals', title: 'Lion' },
    { src: 'https://www.sarahspetportraits.co.uk/wp-content/uploads/2020/12/Woody-Small.jpg', category: 'animals', title: 'Dog Portrait' },
    { src: 'https://cdn.britannica.com/10/250610-050-BC5CCDAF/Zebra-finch-Taeniopygia-guttata-bird.jpg', category: 'animals', title: 'Bird' }
];

let filteredImages = [...images];
let currentIndex = 0;

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderGallery() {
    gallery.innerHTML = filteredImages.map((img, idx) => `
        <div class="gallery-item" data-index="${idx}">
            <img src="${img.src}" alt="${img.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <div class="overlay-text">${img.title}</div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', (e) => openLightbox(parseInt(e.currentTarget.dataset.index)));
    });
}

function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function updateLightbox() {
    lightboxImg.src = filteredImages[currentIndex].src;
    document.getElementById('currentIndex').textContent = currentIndex + 1;
    document.getElementById('totalImages').textContent = filteredImages.length;
}

function nextImage() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightbox();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeLightbox();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        filteredImages = filter === 'all' ? [...images] : images.filter(img => img.category === filter);
        currentIndex = 0;
        renderGallery();
    });
});

renderGallery();
