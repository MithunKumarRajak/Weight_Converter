// Enhanced Weight Converter App with Cursor and Realistic Animations
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('converterForm');
    const weightInput = document.querySelector('[name="weight"]');
    const unitSelect = document.querySelector('[name="unit"]');
    const submitBtn = document.getElementById('submitBtn');
    const resultContainer = document.getElementById('resultContainer');

    // Initialize cursor animation
    initializeCursorAnimation();

    // Initialize number counter animation
    initializeNumberCounter();

    // Input validation and real-time feedback
    if (weightInput) {
        weightInput.addEventListener('input', function() {
            updateInputState();
        });

        weightInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        weightInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }

    // Form submission with animation
    if (form) {
        form.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault();
                shakeElement(submitBtn);
            } else {
                animateSubmit();
            }
        });
    }

    // Ripple effect on button click
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    }

    // Add smooth scroll for result
    if (resultContainer) {
        setTimeout(() => {
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            addResultAnimation();
        }, 100);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.target === weightInput || e.target === unitSelect)) {
            e.preventDefault();
            if (form) form.submit();
        }
    });

    // Tab key animation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add CSS for dynamic effects
    addDynamicStyles();
});

// Cursor Animation with Glow Effect
function initializeCursorAnimation() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isMoving = false;
    let moveTimer;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        isMoving = true;
        cursor.classList.add('active');
        clearTimeout(moveTimer);
        moveTimer = setTimeout(() => {
            isMoving = false;
            cursor.classList.remove('active');
        }, 100);

        // Smooth cursor following with lag effect (smooth tracking)
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        // Create trail effect randomly
        createCursorTrail(mouseX, mouseY);
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Change cursor color on element hover
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('button, a, input, select, textarea')) {
            cursor.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
            cursor.style.boxShadow = '0 0 15px rgba(240, 147, 251, 0.7), 0 0 30px rgba(240, 147, 251, 0.4)';
        } else {
            cursor.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            cursor.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.5), 0 0 20px rgba(102, 126, 234, 0.3)';
        }
    });
}

// Cursor Trail Effect - Particles that follow the cursor
function createCursorTrail(x, y) {
    if (Math.random() > 0.8) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        // Randomize position slightly for organic feel
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        trail.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        
        document.body.appendChild(trail);

        // Animate trail with fade out
        let opacity = 0.5;
        const interval = setInterval(() => {
            opacity -= 0.1;
            trail.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(interval);
                trail.remove();
            }
        }, 30);
    }
}

// Number Counter Animation - Counts from 0 to final value
function initializeNumberCounter() {
    const resultValue = document.getElementById('resultValue');
    
    if (resultValue && resultValue.textContent) {
        const finalValue = parseFloat(resultValue.textContent);
        
        // Animate from 0 to final value
        animateCounter(resultValue, 0, finalValue, 800);
    }
}

// Counter animation function - Smooth number counting
function animateCounter(element, start, end, duration) {
    let current = start;
    const increment = (end - start) / (duration / 16);

    function update() {
        current += increment;
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
        }

        element.textContent = current.toFixed(2);

        if (current !== end) {
            requestAnimationFrame(update);
        }
    }

    update();
}

// Form validation function
function validateForm() {
    const weightInput = document.querySelector('[name="weight"]');
    const unitSelect = document.querySelector('[name="unit"]');

    if (!weightInput.value || isNaN(weightInput.value) || parseFloat(weightInput.value) <= 0) {
        highlightError(weightInput);
        return false;
    }

    if (!unitSelect.value) {
        highlightError(unitSelect);
        return false;
    }

    return true;
}

// Highlight error state
function highlightError(element) {
    const wrapper = element.parentElement;
    wrapper.classList.add('error-state');
    setTimeout(() => {
        wrapper.classList.remove('error-state');
    }, 2000);
    shakeElement(element);
}

// Shake animation for errors
function shakeElement(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = '';
    }, 10);
}

// Ripple effect for button
function createRipple(e, button) {
    const ripple = button.querySelector('.btn-ripple');
    if (!ripple) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const rippleEl = document.createElement('span');
    rippleEl.style.width = rippleEl.style.height = size + 'px';
    rippleEl.style.left = x + 'px';
    rippleEl.style.top = y + 'px';
    rippleEl.classList.add('ripple-wave');

    ripple.appendChild(rippleEl);

    setTimeout(() => rippleEl.remove(), 600);
}

// Update input state styling
function updateInputState() {
    const weightInput = document.querySelector('[name="weight"]');
    if (weightInput && weightInput.value) {
        weightInput.classList.add('filled');
    } else {
        weightInput.classList.remove('filled');
    }
}

// Animate submission
function animateSubmit() {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="btn-text">Converting...</span>
            <span class="spinner"></span>
        `;
    }
}

// Add result animation
function addResultAnimation() {
    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
        resultCard.style.animation = 'slideUp 0.6s ease-out';
    }
}

// Add dynamic CSS styles for animations
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple-wave {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-left: 8px;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        .form-input.filled,
        .form-select:not([value=""]) {
            background: rgba(102, 126, 234, 0.08);
        }

        .error-state {
            animation: shake 0.4s ease-out;
        }

        .keyboard-navigation *:focus {
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize on page load
window.addEventListener('load', function() {
    // Trigger animations on load
    const elements = document.querySelectorAll('[class*="animation"]');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, index * 50);
    });
});

// Add smooth scrolling behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Console welcome message
console.log('%cWeight Converter Pro', 'font-size: 24px; font-weight: bold; color: #667eea;');
console.log('%cBuilt with ❤️ for precision conversion', 'font-size: 14px; color: #764ba2;');
console.log('%cCursor Animation: Enhanced ✨ | Number Counter: Enabled 🔢', 'font-size: 12px; color: #f093fb;');

