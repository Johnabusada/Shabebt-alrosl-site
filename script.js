// تنشيط القائمة المتنقلة
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}

// تأثير التمرير لشريط التنقل
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// الانتقال السلس عند النقر على الأزرار
document.querySelector('.cta-button')?.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#features')?.scrollIntoView({
        behavior: 'smooth'
    });
});

// معالجة الصور المفقودة
document.addEventListener('DOMContentLoaded', function() {
    // صورة المسؤول
    const adminImage = document.querySelector('.admin-image img');
    if (adminImage) {
        adminImage.addEventListener('error', function() {
            this.style.display = 'none';
            this.parentElement.innerHTML = '<i class="fas fa-user"></i>';
        });
    }
    
    // تأثير ظهور بسيط للصفحة
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s';
        document.body.style.opacity = '1';
    }, 100);
});


// وظائف خاصة بصفحة "عن الشبيبة" (اختياري)
if (document.querySelector('.about-hero')) {
    // معرض الصور البسيط
    const slider = document.getElementById('gallerySlider');
    const dots = document.querySelectorAll('.nav-dot');
    
    if (slider && dots.length > 0) {
        let currentSlide = 0;
        
        // التمرير التلقائي البسيط
        setInterval(() => {
            currentSlide = (currentSlide + 1) % dots.length;
            slider.scrollLeft = slider.offsetWidth * currentSlide;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }, 5000);
        
        // النقر على النقاط
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                slider.scrollLeft = slider.offsetWidth * index;
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
    }
}