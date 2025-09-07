// DOM yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeSearch();
    initializeCopyButtons();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeActiveSection();
    initializeMobileOptimizations();
});

// Tema yönetimi
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Local storage'dan tema tercihini al
    const savedTheme = localStorage.getItem('lst-docs-theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Tema değiştirme butonu
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('lst-docs-theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Navigasyon yönetimi
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Aktif link stilini güncelle
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Mobil menüyü kapat
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.remove('open');
        });
    });
}

// Arama fonksiyonu
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = [];
    
    // Sayfa içeriğini indexle
    const sections = document.querySelectorAll('.doc-section');
    sections.forEach(section => {
        const headings = section.querySelectorAll('h1, h2, h3, h4');
        const content = section.textContent;
        
        headings.forEach(heading => {
            searchResults.push({
                title: heading.textContent,
                id: heading.id || section.id,
                content: content.substring(0, 200) + '...',
                section: section
            });
        });
    });
    
    // Arama işlevi
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            hideSearchResults();
            return;
        }
        
        const results = searchResults.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );
        
        showSearchResults(results, query);
    });
    
    // Arama sonuçlarını göster
    function showSearchResults(results, query) {
        hideSearchResults();
        
        if (results.length === 0) {
            return;
        }
        
        const searchContainer = searchInput.parentElement;
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';
        resultsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            margin-top: 0.5rem;
        `;
        
        results.slice(0, 10).forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.style.cssText = `
                padding: 0.75rem 1rem;
                border-bottom: 1px solid var(--border-color);
                cursor: pointer;
                transition: background-color 0.2s;
            `;
            
            const title = document.createElement('div');
            title.style.cssText = `
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            `;
            title.textContent = result.title;
            
            const content = document.createElement('div');
            content.style.cssText = `
                font-size: 0.875rem;
                color: var(--text-secondary);
            `;
            content.textContent = result.content;
            
            resultItem.appendChild(title);
            resultItem.appendChild(content);
            
            resultItem.addEventListener('click', function() {
                document.getElementById(result.id).scrollIntoView({ behavior: 'smooth' });
                hideSearchResults();
                searchInput.value = '';
            });
            
            resultItem.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--bg-secondary)';
            });
            
            resultItem.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
            
            resultsContainer.appendChild(resultItem);
        });
        
        searchContainer.appendChild(resultsContainer);
    }
    
    function hideSearchResults() {
        const existingResults = document.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }
    }
    
    // Sayfa dışına tıklandığında sonuçları gizle
    document.addEventListener('click', function(e) {
        if (!searchInput.parentElement.contains(e.target)) {
            hideSearchResults();
        }
    });
}

// Kopyalama butonları
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.getAttribute('data-clipboard-text');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showCopySuccess(this);
                }).catch(() => {
                    fallbackCopyText(text, this);
                });
            } else {
                fallbackCopyText(text, this);
            }
        });
    });
}

function showCopySuccess(button) {
    const originalIcon = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.style.color = 'var(--success-color)';
    
    setTimeout(() => {
        button.innerHTML = originalIcon;
        button.style.color = '';
    }, 2000);
}

function fallbackCopyText(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(button);
    } catch (err) {
        console.error('Kopyalama başarısız:', err);
    }
    
    document.body.removeChild(textArea);
}

// Mobil menü
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        sidebar.classList.toggle('open');
        
        // Body scroll'u engelle/etkinleştir
        if (sidebar.classList.contains('open')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // Sayfa dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
            body.style.overflow = '';
        }
    });
    
    // ESC tuşu ile menüyü kapat
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            body.style.overflow = '';
        }
    });
    
    // Swipe gesture desteği (mobil için)
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const diffX = startX - e.touches[0].clientX;
        const diffY = startY - e.touches[0].clientY;
        
        // Yatay kaydırma dikey kaydırmadan daha fazlaysa
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Sağdan sola kaydırma - menüyü aç
            if (diffX > 50 && startX < 50 && !sidebar.classList.contains('open')) {
                sidebar.classList.add('open');
                body.style.overflow = 'hidden';
            }
            // Soldan sağa kaydırma - menüyü kapat
            else if (diffX < -50 && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                body.style.overflow = '';
            }
        }
    });
    
    document.addEventListener('touchend', function() {
        startX = 0;
        startY = 0;
    });
}

// Smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 60;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Aktif bölüm takibi
function initializeActiveSection() {
    const sections = document.querySelectorAll('.doc-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // İlk yükleme için
}

// Kod bloklarını vurgulama
function highlightCodeBlocks() {
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}

// Sayfa yüklendiğinde kod vurgulamasını çalıştır
window.addEventListener('load', highlightCodeBlocks);

// Intersection Observer ile animasyonlar
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animasyon için elementleri gözlemle
    const animatedElements = document.querySelectorAll('.feature-card, .tokenomics-card, .step, .function-doc');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Performans optimizasyonu için debounce fonksiyonu
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll event'ini optimize et
const optimizedScrollHandler = debounce(() => {
    initializeActiveSection();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Sayfa yüklendiğinde animasyonları başlat
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeAnimations, 100);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K ile arama
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // ESC ile arama sonuçlarını kapat
    if (e.key === 'Escape') {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.remove();
        }
        document.getElementById('searchInput').blur();
    }
    
    // Ctrl/Cmd + / ile mobil menüyü aç/kapat
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    }
});

// Service Worker kaydı (PWA desteği için)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker başarıyla kaydedildi:', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker kaydı başarısız:', error);
            });
    });
}

// Analytics ve performans izleme
function trackPageView(section) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: section,
            page_location: window.location.href
        });
    }
}

// Bölüm değişikliklerini izle
let currentSection = '';
function trackSectionChange(section) {
    if (section !== currentSection) {
        currentSection = section;
        trackPageView(section);
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Sayfa hatası:', e.error);
    
    // Hata raporlama (isteğe bağlı)
    if (typeof Sentry !== 'undefined') {
        Sentry.captureException(e.error);
    }
});

// Offline desteği
window.addEventListener('online', function() {
    document.body.classList.remove('offline');
    showNotification('İnternet bağlantısı geri geldi', 'success');
});

window.addEventListener('offline', function() {
    document.body.classList.add('offline');
    showNotification('İnternet bağlantısı kesildi', 'warning');
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Mobil optimizasyonları
function initializeMobileOptimizations() {
    // Viewport meta tag kontrolü
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
        document.head.appendChild(meta);
    }
    
    // Prevent horizontal scroll
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.width = '100%';
    document.body.style.width = '100%';
    document.documentElement.style.maxWidth = '100vw';
    document.body.style.maxWidth = '100vw';
    
    // Force text wrapping on all elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        element.style.wordWrap = 'break-word';
        element.style.overflowWrap = 'break-word';
        element.style.wordBreak = 'break-word';
        element.style.maxWidth = '100%';
        element.style.boxSizing = 'border-box';
        element.style.overflowX = 'hidden';
    });
    
    // Touch action optimizasyonları
    const touchElements = document.querySelectorAll('button, .nav-link, .copy-btn, .theme-toggle, .mobile-menu-toggle');
    touchElements.forEach(element => {
        element.style.touchAction = 'manipulation';
    });
    
    // Lazy loading için intersection observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Mobile-specific scroll optimizations
    let ticking = false;
    function updateScrollPosition() {
        // Scroll-based optimizations
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header shadow on scroll
        const header = document.querySelector('.header');
        if (scrollTop > 10) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Mobile keyboard handling
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            // Delay to ensure keyboard is shown
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }
    
    // Performance monitoring for mobile
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData && perfData.loadEventEnd - perfData.loadEventStart > 3000) {
                    console.warn('Slow page load detected on mobile');
                }
            }, 0);
        });
    }
}

// CSS animasyonları için style ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .offline .online-only {
        opacity: 0.5;
        pointer-events: none;
    }
    
    /* Mobile-specific improvements */
    @media (max-width: 768px) {
        .header {
            transition: box-shadow 0.3s ease;
        }
        
        /* Prevent text selection on buttons */
        button, .nav-link, .copy-btn {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        /* Improve tap highlights */
        button, .nav-link, .copy-btn, .theme-toggle, .mobile-menu-toggle {
            -webkit-tap-highlight-color: rgba(59, 130, 246, 0.1);
        }
        
        /* Smooth transitions for mobile */
        * {
            -webkit-transition: all 0.3s ease;
            transition: all 0.3s ease;
        }
    }
`;
document.head.appendChild(style);

