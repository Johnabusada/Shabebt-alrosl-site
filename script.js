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


// Countdown للقاء يسوع فرحي
function initCountdown() {
    const eventDate = new Date('2025-10-10').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        // إذا انتهى الوقت
        if (distance < 0) {
            clearInterval(countdownTimer);
            // عرض أصفار في جميع الخانات
            document.getElementById('days').textContent = '000';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // تحديث مؤشر التقدم إلى 100%
            document.getElementById('progress-percent').textContent = '100%';
            document.getElementById('progress-fill').style.width = '100%';
            
            // رسالة انتهاء الحدث
            document.querySelector('.countdown-timer').innerHTML = '<div class="event-ended">🎉 انطلق اللقاء! 🎉</div>';
            return;
        }
        
        // الحسابات
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // تحديث الواجهة
        document.getElementById('days').textContent = days.toString().padStart(3, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // تحديث مؤشر التقدم
        const totalDays = 365; // سنة كاملة
        const progress = Math.max(0, Math.min(100, ((totalDays - days) / totalDays) * 100));
        document.getElementById('progress-percent').textContent = Math.round(progress) + '%';
        document.getElementById('progress-fill').style.width = progress + '%';
        
        // رسائل ديناميكية
        updateMessage(days);
    }

    // بدء العد التنازلي
    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // التشغيل الفوري
}




// وظائف الأزرار
function registerForEvent() {
    const googleFormUrl = 'https://forms.gle/9PgWdoYhrEgDfHm8A';
    window.open(googleFormUrl, '_blank', 'width=800,height=600');
}
// دالة للذهاب إلى البث المباشر على Facebook
function goToLiveStream() {
    window.open('https://www.facebook.com/shabebet.alrosol', '_blank');
}



// تهيئة Countdown عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initCountdown);




// التحكم في فيديو الشرح
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-container video');
    const videoSection = document.querySelector('.video-explanation');
    
    if (video) {
        // تشغيل/إيقاف الفيديو عند التمرير إليه
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // يمكنك إضافة تأثير عند ظهور الفيديو
                    videoSection.classList.add('video-visible');
                }
            });
        }, { threshold: 0.3 });
        
        videoObserver.observe(videoSection);
        
        // تتبع مشاهدات الفيديو
        video.addEventListener('play', function() {
            console.log('بدأ المستخدم بمشاهدة فيديو الشرح');
            // يمكنك إرسال إحصائية لـ Google Analytics هنا
            trackVideoPlay('site_explanation_video');
        });
        
        // تتبع إكمال الفيديو
        video.addEventListener('ended', function() {
            console.log('أكمل المستخدم مشاهدة فيديو الشرح');
            showCompletionMessage();
        });
        
        // التحكم في الصوت
        let isMuted = false;
        
        // إضافة زر كتم الصوت ديناميكيًا
        const muteButton = document.createElement('button');
        muteButton.innerHTML = '🔊';
        muteButton.className = 'mute-btn';
        muteButton.style.cssText = `
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            z-index: 10;
        `;
        
        video.parentElement.style.position = 'relative';
        video.parentElement.appendChild(muteButton);
        
        muteButton.addEventListener('click', function() {
            isMuted = !isMuted;
            video.muted = isMuted;
            muteButton.innerHTML = isMuted ? '🔇' : '🔊';
        });
    }
});

// دالة تتبع تشغيل الفيديو
function trackVideoPlay(videoName) {
    // إذا كنت تستخدم Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'video_play', {
            'event_category': 'video',
            'event_label': videoName
        });
    }
    
    // أو إذا كنت تستخدم إحصاءات مخصصة
    logVideoView(videoName);
}

// دالة تسجيل مشاهدات الفيديو
function logVideoView(videoName) {
    const views = parseInt(localStorage.getItem(videoName + '_views') || '0');
    localStorage.setItem(videoName + '_views', (views + 1).toString());
}

// دالة عرض رسالة بعد إكمال الفيديو
function showCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'video-completion-message';
    message.innerHTML = `
        <div style="
            background: #4CAF50;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            text-align: center;
            animation: fadeIn 0.5s;
        ">
            <strong>شكرًا لك!</strong> نأمل أن يكون الفيديو قد ساعدك في فهم الموقع بشكل أفضل.
        </div>
    `;
    
    const videoContainer = document.querySelector('.video-container');
    videoContainer.appendChild(message);
    
    // إخفاء الرسالة بعد 5 ثوانٍ
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transition = 'opacity 0.5s';
        setTimeout(() => message.remove(), 500);
    }, 5000);
}

// تأثيرات CSS إضافية
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .video-visible {
        animation: slideInUp 0.8s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .video-completion-message {
        animation: fadeIn 0.5s ease-in;
    }
`;
document.head.appendChild(style);



