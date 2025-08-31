// DOM yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeSearch();
    initializeCopyButtons();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeActiveSection();
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
    
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
    
    // Sayfa dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
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
`;
document.head.appendChild(style);
