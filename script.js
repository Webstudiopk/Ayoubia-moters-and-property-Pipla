/* ==========================================================================
   AYOUBIA MOTORS & PROPERTY ADVISER - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. STICKY NAVBAR ON SCROLL
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting on Scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 2. MOBILE MENU TOGGLE
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    });

    // 3. SHOWCASE TABS SWITCHER (MOTORS vs PROPERTIES)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const showcasePanes = document.querySelectorAll('.showcase-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');

            // Set active button
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show active pane
            showcasePanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('id') === target) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // 4. INSTALLMENT & LOAN CALCULATOR
    const calcPriceRange = document.getElementById('calc-price-range');
    const calcPriceInput = document.getElementById('calc-price-val');
    const calcDownPercent = document.getElementById('calc-down-percent');
    const calcDownVal = document.getElementById('calc-down-val');
    const calcTenure = document.getElementById('calc-tenure');
    const calcType = document.getElementById('calc-type');
    const calcResultVal = document.getElementById('calc-result-val');

    function formatPKR(num) {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            maximumFractionDigits: 0
        }).format(num).replace('PKR', 'Rs.');
    }

    function calculateInstallment() {
        const price = parseInt(calcPriceRange.value);
        const downPercent = parseInt(calcDownPercent.value);
        const tenureYears = parseInt(calcTenure.value);
        const type = calcType.value; // 'motors' or 'property'

        // Calculate Down Payment Amount
        const downPayment = (price * downPercent) / 100;
        calcDownVal.textContent = formatPKR(downPayment) + ` (${downPercent}%)`;

        // Loan Amount (Remaining Principal)
        const principal = price - downPayment;

        // Set markup rate based on category
        const markupRate = (type === 'motors') ? 0.12 : 0.10; // 12% for cars, 10% for property

        // Total markup over the years
        const totalMarkup = principal * markupRate * tenureYears;

        // Total payable amount
        const totalPayable = principal + totalMarkup;

        // Total months
        const totalMonths = tenureYears * 12;

        // Monthly installment
        const monthlyInstallment = totalPayable / totalMonths;

        // Display Result
        calcResultVal.textContent = formatPKR(monthlyInstallment) + ' / Month';
    }

    if (calcPriceRange && calcPriceInput) {
        // Sync Range Slider and Number Input
        calcPriceRange.addEventListener('input', () => {
            calcPriceInput.value = calcPriceRange.value;
            calculateInstallment();
        });

        calcPriceInput.addEventListener('input', () => {
            if (calcPriceInput.value > 50000000) calcPriceInput.value = 50000000;
            if (calcPriceInput.value < 500000) calcPriceInput.value = 500000;
            calcPriceRange.value = calcPriceInput.value;
            calculateInstallment();
        });

        calcDownPercent.addEventListener('input', calculateInstallment);
        calcTenure.addEventListener('change', calculateInstallment);
        calcType.addEventListener('change', calculateInstallment);

        // Run initial calculation
        calculateInstallment();
    }

    // 5. DIRECT WHATSAPP INQUIRIES FOR LISTINGS
    const inquireBtns = document.querySelectorAll('.inquire-btn');
    const phoneNum = '923025044085'; // Business WhatsApp number

    inquireBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const itemName = btn.getAttribute('data-name');
            const itemType = btn.getAttribute('data-type'); // 'car' or 'property'
            const itemPrice = btn.getAttribute('data-price');

            let message = '';
            if (itemType === 'car') {
                message = `Assalam-o-Alaikum Ayoubia Motors & Property Adviser, I saw the vehicle "${itemName}" (${itemPrice}) listed on your website and would like to get more information about its availability and details.`;
            } else {
                message = `Assalam-o-Alaikum Ayoubia Motors & Property Adviser, I am interested in the property/plot "${itemName}" (${itemPrice}) listed on your website. Please share further details and location plan.`;
            }

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNum}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // 6. CONTACT FORM SUBMISSION TO WHATSAPP
    const contactForm = document.getElementById('ayoubia-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const service = document.getElementById('form-service').value;
            const message = document.getElementById('form-message').value.trim();

            if (!name || !phone || !message) {
                alert('Please fill out all required fields.');
                return;
            }

            const formattedMessage = `Assalam-o-Alaikum Ayoubia Motors & Property Adviser,
My Name: ${name}
My Phone: ${phone}
Inquiry Category: ${service.toUpperCase()}
Message: ${message}

(Sent via Ayoubia Website Contact Form)`;

            const encodedMessage = encodeURIComponent(formattedMessage);
            const whatsappUrl = `https://wa.me/${phoneNum}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');

            // Reset form
            contactForm.reset();
            alert('Your message has been prepared! We are redirecting you to WhatsApp to connect with our representative.');
        });
    }

    // 7. QUICK SEARCH CTA REDIRECTS
    const searchForm = document.getElementById('quick-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const category = document.getElementById('search-category').value;
            
            // Toggle to the correct showcase tab
            const tabBtn = document.querySelector(`.tab-btn[data-target="${category}"]`);
            if (tabBtn) {
                tabBtn.click();
            }

            // Scroll to the showcase section
            const showcaseSection = document.getElementById('showroom');
            if (showcaseSection) {
                showcaseSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
