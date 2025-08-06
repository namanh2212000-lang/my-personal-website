// Enhanced navigation and mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sample data
    initializeSampleData();
    
    // Mobile dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add navbar shadow on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
    });
});
// Enhanced mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sample data
    initializeSampleData();
    
    // Mobile menu elements
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
    
    // Mobile menu toggle
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', function() {
            mobileToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu
        mobileClose?.addEventListener('click', closeMobileMenu);
        
        // Close when clicking overlay
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                closeMobileMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // Mobile dropdown functionality
    mobileDropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.mobile-dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                mobileDropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Close mobile menu function
    function closeMobileMenu() {
        mobileToggle?.classList.remove('active');
        mobileOverlay?.classList.remove('active');
        document.body.style.overflow = '';
        
        // Close all dropdowns
        mobileDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
    
    // Desktop dropdown functionality (existing code)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                // Only prevent default on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown') && !e.target.closest('.mobile-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMobileMenu(); // Close mobile menu after navigation
            }
        });
    });
    
    // Add navbar shadow on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});
