// Neural Network Background Animation
function initNeuralBackground() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const nodes = [];
    const nodeCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Boundary collision
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 136, 0.6)';
            ctx.fill();
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const node1 = nodes[i];
                const node2 = nodes[j];
                const dist = Math.hypot(node1.x - node2.x, node1.y - node2.y);
                
                if (dist < 150) {
                    ctx.globalAlpha = 1 - dist / 150;
                    ctx.beginPath();
                    ctx.moveTo(node1.x, node1.y);
                    ctx.lineTo(node2.x, node2.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (toggle && mobileNav) {
        toggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            toggle.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                toggle.textContent = '☰';
            });
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Product modal functionality
const productDetails = {
    iot: {
        title: 'IoT Defender',
        subtitle: 'Blockchain-Based IoT Security',
        description: 'IoT Defender revolutionizes IoT security by leveraging blockchain technology to create an immutable, distributed security infrastructure. Built specifically for ARM64 architecture, it provides enterprise-grade protection for connected devices.',
        features: [
            {
                icon: '🔗',
                title: 'Blockchain Security',
                text: 'Distributed ledger technology ensures tamper-proof security logs and device authentication'
            },
            {
                icon: '⚡',
                title: 'ARM64 Optimized',
                text: 'Native support for ARM64 processors delivers maximum performance and efficiency'
            },
            {
                icon: '🔐',
                title: 'Secure Transactions',
                text: 'Cryptographically signed device-to-device communications with zero-trust verification'
            },
            {
                icon: '📊',
                title: 'Immutable Data Storage',
                text: 'All IoT data stored on blockchain ensures data integrity and audit compliance'
            },
            {
                icon: '🌐',
                title: 'Decentralized Network',
                text: 'No single point of failure with distributed consensus mechanisms'
            },
            {
                icon: '🛡️',
                title: 'Real-Time Monitoring',
                text: 'Continuous device health checks and anomaly detection across your IoT fleet'
            }
        ],
        useCases: [
            'Industrial IoT and manufacturing equipment',
            'Smart building automation systems',
            'Healthcare devices and medical IoT',
            'Energy grid and utility monitoring',
            'Supply chain and logistics tracking'
        ]
    },
    full: {
        title: 'Quant Plus Full System',
        subtitle: 'Autonomous AI Defense Platform',
        description: 'The complete Quant Plus platform delivers autonomous cybersecurity through 10 specialized AI agents working in concert. This is enterprise-grade protection that operates 24/7 with minimal human intervention.',
        features: [
            {
                icon: '🤖',
                title: 'Main Agent Orchestration',
                text: 'Central AI coordinates all sub-agents, making 2.4K decisions per minute with 99.8% accuracy'
            },
            {
                icon: '🛡️',
                title: 'ThreatScanner',
                text: 'Real-time threat detection with ML-powered behavioral analysis and zero-day identification'
            },
            {
                icon: '🌐',
                title: 'NetworkMapper',
                text: 'Automatic network discovery, asset inventory, and continuous vulnerability assessment'
            },
            {
                icon: '⚔️',
                title: 'DefenseOrchestrator',
                text: 'Automated response with honeypots, firewall orchestration, and incident playbooks'
            },
            {
                icon: '🔐',
                title: 'EncryptionManager',
                text: 'Hybrid encryption combining AES-256, ChaCha20, Kyber-1024, and Dilithium-3'
            },
            {
                icon: '🔒',
                title: 'VPNMonitor',
                text: 'Advanced VPN security with geographic anomaly detection and protocol monitoring'
            },
            {
                icon: '📊',
                title: 'AnalyticsEngine',
                text: 'Predictive threat forecasting and security KPIs with actionable intelligence'
            },
            {
                icon: '📝',
                title: 'LogAgent',
                text: 'Centralized logging with correlation analysis and tamper-proof audit trails'
            },
            {
                icon: '✅',
                title: 'ComplianceMonitor',
                text: 'SOC2, ISO27001, and NIST adherence with automated evidence collection'
            },
            {
                icon: '💬',
                title: 'Manual Override',
                text: 'AI chat interface provides full control with CLI fallback for offline operation'
            }
        ],
        useCases: [
            'Enterprise security operations centers',
            'Financial services and banking',
            'Government and defense agencies',
            'Healthcare and pharmaceutical companies',
            'Critical infrastructure protection'
        ]
    },
    module: {
        title: 'Quant Plus Module',
        subtitle: 'Plug-and-Play Encryption Integration',
        description: 'Add quantum-resistant encryption to your existing security infrastructure without disrupting operations. The Quant Plus Module integrates seamlessly with your current workflows to provide immediate protection against current and future threats.',
        features: [
            {
                icon: '🔌',
                title: 'Zero-Configuration Integration',
                text: 'Drop-in module works with existing security systems without infrastructure changes'
            },
            {
                icon: '🔐',
                title: 'Hybrid Encryption',
                text: 'Combines proven classical algorithms (AES-256, RSA-4096) with post-quantum cryptography'
            },
            {
                icon: '⚡',
                title: 'On-Demand Protection',
                text: 'Activate encryption for specific workflows, databases, or data transfers as needed'
            },
            {
                icon: '🔄',
                title: 'Automatic Key Rotation',
                text: 'Scheduled certificate and key rotation with Kyber-1024 and Dilithium-3 support'
            },
            {
                icon: '📋',
                title: 'Policy-Based Control',
                text: 'Define encryption policies for different data types and compliance requirements'
            },
            {
                icon: '📊',
                title: 'Comprehensive Audit Logging',
                text: 'Track all encryption operations with immutable audit trails for compliance'
            }
        ],
        useCases: [
            'Add encryption to legacy systems',
            'Secure specific workflows or databases',
            'Gradual migration to quantum-resistant security',
            'Compliance-driven encryption requirements',
            'Hybrid cloud and on-premise security'
        ]
    }
};

function openProductDetails(productType) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    const product = productDetails[productType];
    
    if (!product) return;
    
    let useCasesHTML = product.useCases.map(useCase => 
        `<li><span class="feature-icon">✓</span>${useCase}</li>`
    ).join('');
    
    let featuresHTML = product.features.map(feature => `
        <div class="modal-feature">
            <div class="modal-feature-icon">${feature.icon}</div>
            <div class="modal-feature-content">
                <h4>${feature.title}</h4>
                <p>${feature.text}</p>
            </div>
        </div>
    `).join('');
    
    modalBody.innerHTML = `
        <h2 class="modal-title">${product.title}</h2>
        <p class="modal-subtitle">${product.subtitle}</p>
        <p class="modal-description">${product.description}</p>
        
        <h3 class="modal-section-title">Key Features</h3>
        <div class="modal-features-grid">
            ${featuresHTML}
        </div>
        
        <h3 class="modal-section-title">Use Cases</h3>
        <ul class="modal-use-cases">
            ${useCasesHTML}
        </ul>
        
        <div class="modal-actions">
            <a href="#contact" class="btn btn-primary" onclick="closeModal()">Request Demo</a>
            <button class="btn btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            alert('Thank you for your interest! Our team will contact you within 24 hours.');
            form.reset();
        });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe solution cards
    document.querySelectorAll('.solution-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNeuralBackground();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    
    console.log('Quant Plus website initialized successfully');
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add modal styles dynamically (since they reference features from the JS)
const modalStyles = `
    .modal-title {
        font-size: 36px;
        font-weight: bold;
        background: var(--gradient-1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 10px;
    }
    
    .modal-subtitle {
        font-size: 16px;
        color: var(--secondary);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 25px;
    }
    
    .modal-description {
        font-size: 16px;
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 40px;
    }
    
    .modal-section-title {
        font-size: 24px;
        font-weight: bold;
        color: var(--primary);
        margin: 30px 0 20px 0;
    }
    
    .modal-features-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .modal-feature {
        display: flex;
        gap: 15px;
        padding: 20px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--border);
        border-radius: 10px;
        transition: all 0.3s ease;
    }
    
    .modal-feature:hover {
        background: rgba(0, 255, 136, 0.05);
        border-color: var(--primary);
    }
    
    .modal-feature-icon {
        font-size: 32px;
        filter: drop-shadow(0 0 6px currentColor);
    }
    
    .modal-feature-content h4 {
        font-size: 18px;
        color: var(--primary);
        margin-bottom: 8px;
    }
    
    .modal-feature-content p {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.6;
    }
    
    .modal-use-cases {
        list-style: none;
        margin-bottom: 30px;
    }
    
    .modal-use-cases li {
        padding: 12px 0;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid var(--border);
    }
    
    .modal-use-cases li:last-child {
        border-bottom: none;
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-top: 40px;
        padding-top: 30px;
        border-top: 1px solid var(--border);
    }
    
    @media (max-width: 768px) {
        .modal-content {
            padding: 30px 20px;
            width: 95%;
        }
        
        .modal-title {
            font-size: 28px;
        }
        
        .modal-actions {
            flex-direction: column;
        }
        
        .modal-actions .btn {
            width: 100%;
        }
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Track user engagement
function trackEngagement() {
    const events = {
        productViews: {},
        scrollDepth: 0,
        timeOnPage: 0
    };
    
    // Track scroll depth
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
        events.scrollDepth = Math.max(events.scrollDepth, Math.round(scrollPercentage));
    });
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        events.timeOnPage = Math.round((Date.now() - startTime) / 1000);
        console.log('User engagement:', events);
    });
}

// Initialize engagement tracking
trackEngagement();

// Add particle effect on hover for product cards
function initProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Call after DOM load
setTimeout(initProductCardEffects, 1000);

// Add typing effect for hero title (optional enhancement)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';
    
    let index = 0;
    const typingSpeed = 50;
    
    function type() {
        if (index < originalText.length) {
            heroTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        }
    }
    
    // Uncomment to enable typing effect
    // setTimeout(type, 500);
}

// Add counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercent = target.includes('%');
        const isTime = target.includes('s');
        const isPlus = target.includes('+');
        const isSlash = target.includes('/');
        
        // Skip if not a number to animate
        if (isTime || isSlash) return;
        
        const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        let current = 0;
        const increment = numericValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            let displayValue = current.toFixed(1);
            if (isPercent) displayValue += '%';
            if (isPlus) displayValue += '+';
            
            counter.textContent = displayValue;
        }, stepTime);
    });
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add floating animation to product icons
function initFloatingIcons() {
    const icons = document.querySelectorAll('.product-icon, .feature-icon');
    
    icons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });
}

// Add float keyframe animation
const floatAnimation = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;

const animationSheet = document.createElement('style');
animationSheet.textContent = floatAnimation;
document.head.appendChild(animationSheet);

setTimeout(initFloatingIcons, 1500);

// Add parallax effect to hero section
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

initParallax();

// Easter egg: Konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    const canvas = document.getElementById('neuralCanvas');
    canvas.style.opacity = '1';
    canvas.style.filter = 'hue-rotate(90deg)';
    
    setTimeout(() => {
        canvas.style.opacity = '0.25';
        canvas.style.filter = 'none';
    }, 5000);
    
    console.log('🎉 Quant Plus Easter Egg Activated! Maximum security engaged!');
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance monitoring
function monitorPerformance() {
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        });
        
        observer.observe({ entryTypes: ['measure', 'navigation'] });
    }
}

// Uncomment to enable performance monitoring
// monitorPerformance();

// Add dynamic gradient to hero based on time
function initDynamicGradient() {
    const hour = new Date().getHours();
    const hero = document.querySelector('.hero');
    
    if (hero) {
        if (hour >= 6 && hour < 12) {
            // Morning - lighter tones
            hero.style.background = 'linear-gradient(180deg, rgba(0, 255, 136, 0.03) 0%, var(--bg-darker) 100%)';
        } else if (hour >= 12 && hour < 18) {
            // Afternoon - vibrant
            hero.style.background = 'linear-gradient(180deg, rgba(0, 204, 255, 0.03) 0%, var(--bg-darker) 100%)';
        } else if (hour >= 18 && hour < 22) {
            // Evening - purple tones
            hero.style.background = 'linear-gradient(180deg, rgba(124, 58, 237, 0.03) 0%, var(--bg-darker) 100%)';
        } else {
            // Night - deep blue
            hero.style.background = 'linear-gradient(180deg, rgba(0, 102, 204, 0.02) 0%, var(--bg-darker) 100%)';
        }
    }
}

initDynamicGradient();

// Expose functions to global scope for inline onclick handlers
window.openProductDetails = openProductDetails;
window.closeModal = closeModal;

console.log('🛡️ Quant Plus - Enterprise Security Solutions Loaded');
console.log('💼 Ready to secure your enterprise infrastructure');
console.log('🚀 Three powerful products at your command');
