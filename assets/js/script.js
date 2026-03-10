const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
});

const thumb = document.createElement('div');
thumb.className = 'custom-scrollbar-thumb';
document.body.appendChild(thumb);

let scrollTimer;

function updateThumb() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollable = docHeight - winHeight;

    if (scrollable <= 0) return; // page doesn't need scrolling

    const thumbHeight = Math.max(40, (winHeight / docHeight) * winHeight);
    const thumbTop = (scrollTop / scrollable) * (winHeight - thumbHeight);

    thumb.style.height = thumbHeight + 'px';
    thumb.style.top = thumbTop + 'px';

    thumb.classList.add('visible');

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
        thumb.classList.remove('visible');
    }, 300);
}

window.addEventListener('scroll', updateThumb, { passive: true });
window.addEventListener('resize', updateThumb, { passive: true });


// nav-toggle (left sidebar)
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");

// Inject ✕ close button into the sidebar
const closeBtn = document.createElement("button");
closeBtn.className = "sidebar-close-btn";
closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
navLinks.prepend(closeBtn);

function openSidebar() {
    navLinks.classList.add("show");
    navOverlay.classList.add("show");
}

function closeSidebar() {
    navLinks.classList.remove("show");
    navOverlay.classList.remove("show");
}

menuToggle.addEventListener("click", () => {
    navLinks.classList.contains("show") ? closeSidebar() : openSidebar();
});

closeBtn.addEventListener("click", closeSidebar);
navOverlay.addEventListener("click", closeSidebar);

// Close sidebar when a nav link is clicked
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeSidebar);
});


// ─── SCROLL TO TOP BUTTON ──────────────────────────────────────
const scrollTopBtn = document.createElement("button");
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.setAttribute("aria-label", "Scroll to top");
scrollTopBtn.innerHTML = '<i class="bi bi-chevron-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add("visible");
    } else {
        scrollTopBtn.classList.remove("visible");
    }
}, { passive: true });

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});