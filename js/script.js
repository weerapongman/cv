// CV Website Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initializeSkillBars();
    initializeExperienceItems();
    initializeSmoothScrolling();
    initializePrintFunction();
    initializeIntersectionObserver();
    
    // Animate skill bars on page load
    function initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.style.width;
            bar.style.width = '0';
            
            // Stagger the animations
            setTimeout(() => {
                bar.style.width = targetWidth;
                
                // Add a slight bounce effect
                bar.addEventListener('transitionend', function() {
                    this.style.transform = 'scaleY(1.2)';
                    setTimeout(() => {
                        this.style.transform = 'scaleY(1)';
                    }, 200);
                }, { once: true });
                
            }, 500 + (index * 100));
        });
    }
    
    // Enhanced hover effects for experience items
    function initializeExperienceItems() {
        const experienceItems = document.querySelectorAll('.experience-item');
        
        experienceItems.forEach(item => {
            // Add data attributes for tracking
            item.setAttribute('data-original-border', item.style.borderLeft || '1px solid #e9ecef');
            
            item.addEventListener('mouseenter', function() {
                this.style.borderLeft = '4px solid #4a6741';
                this.style.transform = 'translateY(-2px) scale(1.01)';
                
                // Add subtle glow effect
                this.style.boxShadow = '0 8px 25px rgba(74, 103, 65, 0.15)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.borderLeft = this.getAttribute('data-original-border');
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            });
            
            // Add click effect for mobile
            item.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    }
    
    // Smooth scrolling for internal links
    function initializeSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Print functionality
    function initializePrintFunction() {
        // Create print button if it doesn't exist
        const printBtn = document.getElementById('printBtn');
        if (!printBtn) {
            createPrintButton();
        } else {
            printBtn.addEventListener('click', handlePrint);
        }
        
        // Handle keyboard shortcut
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                handlePrint();
            }
        });
    }
    
    function createPrintButton() {
        const button = document.createElement('button');
        button.id = 'printBtn';
        button.className = 'btn print-btn';
        button.innerHTML = '<i class="fas fa-print"></i> Print CV';
        button.style.position = 'fixed';
        button.style.top = '20px';
        button.style.right = '20px';
        button.style.zIndex = '1000';
        
        document.body.appendChild(button);
        button.addEventListener('click', handlePrint);
    }
    
    function handlePrint() {
        // Optimize for printing
        const originalTitle = document.title;
        document.title = 'Weerapong_Saengloothong_CV';
        
        // Add print-specific styles
        document.body.classList.add('printing');
        
        window.print();
        
        // Restore after printing
        document.title = originalTitle;
        document.body.classList.remove('printing');
    }
    
    // Intersection Observer for animations
    function initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special handling for skill bars
                    if (entry.target.classList.contains('skills-section')) {
                        animateSkillsInView();
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('.section, .skills-section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    function animateSkillsInView() {
        const skillBars = document.querySelectorAll('.skill-fill');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = bar.getAttribute('data-width') || bar.style.width;
            }, index * 100);
        });
    }
    
    // Theme switcher (optional feature)
    function initializeThemeSwitcher() {
        const themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', toggleTheme);
        }
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('cv-theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
        }
    }
    
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('cv-theme', isDark ? 'dark' : 'light');
    }
    
    // Download CV as PDF (requires html2pdf library)
    function downloadPDF() {
        if (typeof html2pdf === 'undefined') {
            console.warn('html2pdf library not loaded');
            return;
        }
        
        const element = document.querySelector('.container');
        const opt = {
            margin: 0.5,
            filename: 'Weerapong_Saengloothong_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    }
    
    // Mobile menu toggle (if you add navigation)
    function initializeMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', function() {
                sidebar.classList.toggle('mobile-open');
                this.classList.toggle('active');
            });
        }
    }
    
    // Contact form handling (if you add a contact form)
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactSubmit);
        }
    }
    
    function handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Contact form submitted:', data);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            color: white;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Set background color based on type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Performance monitoring
    function logPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
            });
        }
    }
    
    // Initialize optional features if elements exist
    initializeThemeSwitcher();
    initializeMobileMenu();
    initializeContactForm();
    logPerformance();
    
    // Expose useful functions globally
    window.CVFunctions = {
        downloadPDF,
        showNotification,
        toggleTheme,
        handlePrint
    };
    
});

// Add CSS animations dynamically
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
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .experience-item.active {
        border-left: 4px solid #4a6741 !important;
        transform: translateY(-2px) !important;
    }
    
    .printing {
        animation: none !important;
    }
    
    .printing * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(style);
