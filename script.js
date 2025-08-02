// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    
    // Efeito máquina de escrever no loader
    const loaderText = document.getElementById('loaderText');
    const text = "ÉCLAT";
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            loaderText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 200);
        } else {
            // Remover cursor após escrever
            setTimeout(() => {
                loaderText.style.borderRight = 'none';
            }, 500);
        }
    }
    
    typeWriter();
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 3000);
});

// Scroll Header Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Mostrar/ocultar botão voltar ao topo
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
const body = document.body;
const icon = darkModeToggle.querySelector('i');
const iconMobile = darkModeToggleMobile.querySelector('i');

darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

darkModeToggleMobile.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        iconMobile.classList.remove('fa-moon');
        iconMobile.classList.add('fa-sun');
    } else {
        iconMobile.classList.remove('fa-sun');
        iconMobile.classList.add('fa-moon');
    }
});

// Menu Mobile
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

hamburger.addEventListener('click', function() {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
});

// Fechar menu ao clicar em um link
const mobileLinks = document.querySelectorAll('.mobile-links a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });
});

// Scroll Reveal Animation
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', scrollReveal);
scrollReveal(); // Initialize

// Booking form submission
const bookingForm = document.getElementById('bookingForm');
if(bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset erros
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        // Validação
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const date = document.getElementById('date');
        
        if (!name.value.trim()) {
            name.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
            email.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!phone.value.trim()) {
            phone.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!service.value) {
            service.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (!date.value) {
            date.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            alert('Reserva enviada com sucesso! Entraremos em contato para confirmação.');
            bookingForm.reset();
        }
    });
}

// Lightbox para galeria
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeLightbox = document.getElementById('closeLightbox');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

closeLightbox.addEventListener('click', function() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Voltar ao topo
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Suavizar rolagem para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Script para a galeria da Antônia Costa
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    // Função para atualizar o carrossel
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualizar slides ativos
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Atualizar dots ativos
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Navegação pelos botões
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });
    
    // Navegação pelos dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Autoplay do carrossel
    let autoplay = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }, 5000);
    
    // Pausar autoplay quando o mouse estiver sobre o carrossel
    const carousel = document.querySelector('.gallery-carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplay);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 5000);
    });
});

// Script para o botão WhatsApp
document.getElementById('whatsappButton').addEventListener('click', function() {
    // Redirecionar para o WhatsApp
    window.open('https://wa.me/5581984027098', '_blank');
    
    // Efeito visual ao clicar
    this.style.transform = 'scale(0.95)';
    this.style.backgroundColor = '#075E54';
    
    setTimeout(() => {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '#25D366';
    }, 300);
});

// Manter a animação pulsando continuamente
setInterval(() => {
    const button = document.getElementById('whatsappButton');
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = 'pulse 3s infinite';
    }, 10);
}, 3000);
