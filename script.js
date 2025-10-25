// Form validation and interactive features
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sampleForm');
    const phoneInput = document.getElementById('phone');
    
    // Phone number formatting
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 3) {
            value = value.substring(0, 3) + '-' + value.substring(3);
        }
        if (value.length >= 8) {
            value = value.substring(0, 8) + '-' + value.substring(8, 12);
        }
        e.target.value = value;
    });
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name').value.trim();
        if (!name) {
            showError('nameError', '이름을 입력해주세요.');
            isValid = false;
        } else if (name.length < 2) {
            showError('nameError', '이름은 2글자 이상 입력해주세요.');
            isValid = false;
        }
        
        // Validate gender
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            showError('genderError', '성별을 선택해주세요.');
            isValid = false;
        }
        
        // Validate age
        const age = document.getElementById('age').value;
        if (!age) {
            showError('ageError', '나이를 선택해주세요.');
            isValid = false;
        }
        
        // Validate room spray usage
        const roomSpray = document.querySelector('input[name="roomSpray"]:checked');
        if (!roomSpray) {
            showError('roomSprayError', '룸스프레이 사용 여부를 선택해주세요.');
            isValid = false;
        }
        
        // Validate pillow mist usage
        const pillowMist = document.querySelector('input[name="pillowMist"]:checked');
        if (!pillowMist) {
            showError('pillowMistError', '필로우미스트 사용 여부를 선택해주세요.');
            isValid = false;
        }
        
        // Validate neuroscent selection
        const neuroscent = document.getElementById('neuroscent').value;
        if (!neuroscent) {
            showError('neuroscentError', '희망하는 Neuroscent를 선택해주세요.');
            isValid = false;
        }
        
        // Validate address
        const address = document.getElementById('address').value.trim();
        if (!address) {
            showError('addressError', '주소를 입력해주세요.');
            isValid = false;
        } else if (address.length < 10) {
            showError('addressError', '상세한 주소를 입력해주세요.');
            isValid = false;
        }
        
        // Validate phone
        const phone = document.getElementById('phone').value;
        const phonePattern = /^010-\d{4}-\d{4}$/;
        if (!phone) {
            showError('phoneError', '연락처를 입력해주세요.');
            isValid = false;
        } else if (!phonePattern.test(phone)) {
            showError('phoneError', '올바른 연락처 형식으로 입력해주세요. (010-0000-0000)');
            isValid = false;
        }
        
        // Validate consent
        const consent = document.getElementById('consent').checked;
        if (!consent) {
            showError('consentError', '개인정보 수집 및 이용에 동의해주세요.');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage();
            // Reset form
            form.reset();
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
    
    function showSuccessMessage() {
        // Create success modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        `;
        
        modalContent.innerHTML = `
            <div style="font-size: 3rem; color: #27ae60; margin-bottom: 20px;">✓</div>
            <h3 style="color: #2c3e50; margin-bottom: 15px;">신청이 완료되었습니다!</h3>
            <p style="color: #666; margin-bottom: 25px;">NEUVV 딥슬립 향 샘플을 곧 보내드리겠습니다.</p>
            <button onclick="this.closest('.modal').remove()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 10px;
                font-size: 1rem;
                cursor: pointer;
                transition: transform 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                확인
            </button>
        `;
        
        modal.className = 'modal';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.value-card, .product-card, .brand-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.value-card, .product-card, .submit-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Form field focus effects
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Interactive radio button effects
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(radio => {
        radio.addEventListener('change', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(102, 126, 234, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add glow effect to selected option
            const radioLabel = this.closest('.radio-label');
            radioLabel.style.transform = 'scale(1.05)';
            radioLabel.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                radioLabel.style.transform = 'scale(1)';
            }, 300);
        });
    });
    
    // Interactive select effects
    const selectInputs = document.querySelectorAll('select');
    selectInputs.forEach(select => {
        select.addEventListener('change', function() {
            // Add bounce effect
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Add color change for selected option
            if (this.value) {
                this.style.borderColor = '#42FA57';
                this.style.boxShadow = '0 0 0 3px rgba(66, 250, 87, 0.1)';
                
                setTimeout(() => {
                    this.style.borderColor = '#e1e8ed';
                    this.style.boxShadow = 'none';
                }, 1000);
            }
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
