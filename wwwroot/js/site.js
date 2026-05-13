// ============ AUTHENTICATION SYSTEM ============

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current logged-in user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    
    // Get form elements - use document query if form is not available
    const fullName = (document.querySelector('input[name="fullName"]') || {}).value?.trim();
    const email = (document.querySelector('input[name="email"]') || {}).value?.trim();
    const phone = (document.querySelector('input[name="phone"]') || {}).value?.trim();
    const password = (document.querySelector('#signupPassword') || {}).value;
    const confirmPassword = (document.querySelector('#confirmPassword') || {}).value;
    const termsCheck = (document.querySelector('#termsCheck') || {}).checked;

    // Validation
    if (!fullName) {
        showToast('Please enter your full name', 'error');
        return;
    }
    
    if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!phone) {
        showToast('Please enter your phone number', 'error');
        return;
    }
    
    if (password.length < 8) {
        showToast('Password must be at least 8 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (!termsCheck) {
        showToast('Please agree to the Terms & Conditions', 'error');
        return;
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast('Email already registered. Please login or use a different email.', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now().toString(),
        fullName: fullName,
        email: email,
        phone: phone,
        password: password,
        registeredDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after signup
    localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone
    }));

    showToast('Account created successfully! Redirecting...', 'success');
    setTimeout(() => {
        window.location.href = '/Dashboard';
    }, 2000);
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    // Get form elements - use document query
    const email = (document.querySelector('input[name="email"]') || document.querySelector('input[type="email"]') || {}).value?.trim();
    const password = (document.querySelector('#passwordInput') || {}).value;
    const rememberMe = (document.querySelector('#rememberMe') || {}).checked;

    // Validation
    if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!password) {
        showToast('Please enter your password', 'error');
        return;
    }

    // Check credentials
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
        showToast('Invalid email or password', 'error');
        return;
    }

    // Login successful
    const userData = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone
    };

    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
    }

    showToast('Login successful! Redirecting...', 'success');
    setTimeout(() => {
        window.location.href = '/Dashboard';
    }, 1500);
}

// Check authentication before accessing booking
function checkAuth() {
    if (!isLoggedIn()) {
        showToast('Please login first to book an event', 'warning');
        setTimeout(() => {
            window.location.href = '/Login';
        }, 1500);
        return false;
    }
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberEmail');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = '/';
    }, 1000);
}

// Pre-fill login email if remembered
function prefillRememberedEmail() {
    const remembered = localStorage.getItem('rememberEmail');
    if (remembered) {
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.value = remembered;
        }
    }
}

// ============ BOOKING SYSTEM ============

// Handle Booking Form Submission
function submitBooking(event) {
    // Check if user is logged in
    if (!checkAuth()) {
        return;
    }

    // Get form data
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const phone = document.querySelector('input[name="phone"]').value.trim();
    const dob = document.querySelector('input[name="dob"]').value;
    const eventType = document.querySelector('select[name="eventType"]').value;
    const eventDate = document.querySelector('input[name="eventDate"]').value;
    const guestCount = parseInt(document.querySelector('input[name="guestCount"]').value) || 0;
    const venue = document.querySelector('input[name="venue"]').value.trim();
    const specialRequests = document.querySelector('textarea[name="specialRequests"]').value.trim();
    const payment = document.querySelector('input[name="payment"]:checked')?.value;
    const termsCheck = document.querySelector('#termsCheck')?.checked;

    // Validation
    if (!name) {
        showToast('Please enter your full name', 'error');
        return;
    }
    if (!email || !isValidEmail(email)) {
        showToast('Please enter a valid email', 'error');
        return;
    }
    if (!phone) {
        showToast('Please enter phone number', 'error');
        return;
    }
    if (!dob) {
        showToast('Please select date of birth', 'error');
        return;
    }
    if (!eventType) {
        showToast('Please select event type', 'error');
        return;
    }
    if (!eventDate) {
        showToast('Please select event date', 'error');
        return;
    }
    if (guestCount < 1) {
        showToast('Please enter valid guest count', 'error');
        return;
    }
    if (!venue) {
        showToast('Please enter venue/location', 'error');
        return;
    }
    if (!payment) {
        showToast('Please select a payment method', 'error');
        return;
    }
    if (!termsCheck) {
        showToast('Please agree to Terms & Conditions', 'error');
        return;
    }

    // Calculate total amount
    const perGuestPrice = 50;
    const serviceFee = (guestCount * perGuestPrice) * 0.05;
    const platformFee = 10;
    const totalAmount = (guestCount * perGuestPrice) + serviceFee + platformFee;

    // Create booking object
    const booking = {
        id: 'BOOKING-' + Date.now(),
        bookingDate: new Date().toISOString(),
        userId: getCurrentUser().id,
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        eventType: eventType,
        eventDate: eventDate,
        guestCount: guestCount,
        venue: venue,
        specialRequests: specialRequests,
        payment: payment,
        totalAmount: totalAmount,
        status: 'Confirmed'
    };

    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Show success message
    showToast('Event booked successfully!', 'success');
    
    // Show success alert and reset form
    const successAlert = document.querySelector('#successAlert');
    if (successAlert) {
        document.querySelector('#successMessage').innerHTML = `
            Your ${eventType} event on ${new Date(eventDate).toLocaleDateString()} for ${guestCount} guests has been booked.
            <br><strong>Booking ID:</strong> ${booking.id}
        `;
        successAlert.style.display = 'block';
    }

    // Reset form
    document.querySelector('.booking-form').parentElement.closest('form')?.reset();
    
    // Reset summary
    document.querySelector('#summaryEventType').textContent = '-';
    document.querySelector('#summaryGuests').textContent = '0';
    document.querySelector('#serviceFee').textContent = '$0';
    document.querySelector('#totalAmount').textContent = '$0';

    // Redirect after 3 seconds
    setTimeout(() => {
        window.location.href = '/BookingStatus';
    }, 3000);
}

// Update event type in summary
function updateEventType() {
    const eventType = document.querySelector('select[name="eventType"]').value;
    document.querySelector('#summaryEventType').textContent = eventType || '-';
    calculateTotal();
}

// Calculate total booking amount
function calculateTotal() {
    const guestCount = parseInt(document.querySelector('input[name="guestCount"]').value) || 0;
    const perGuestPrice = 50;
    const serviceFee = (guestCount * perGuestPrice) * 0.05;
    const platformFee = 10;
    const totalAmount = (guestCount * perGuestPrice) + serviceFee + platformFee;

    document.querySelector('#summaryGuests').textContent = guestCount;
    document.querySelector('#serviceFee').textContent = '$' + serviceFee.toFixed(2);
    document.querySelector('#totalAmount').textContent = '$' + totalAmount.toFixed(2);
}

// Toggle password visibility
function togglePassword() {
    const input = document.querySelector('#passwordInput');
    input.type = input.type === 'password' ? 'text' : 'password';
}

function toggleSignupPassword() {
    const input = document.querySelector('#signupPassword');
    input.type = input.type === 'password' ? 'text' : 'password';
}

// ============ UTILITY FUNCTIONS ============

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast align-items-center text-white bg-${getToastColor(type)} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    const icon = getToastIcon(type);
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="${icon} me-2"></i>${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    toastContainer.appendChild(toast);

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function getToastColor(type) {
    switch(type) {
        case 'success': return 'success';
        case 'error': return 'danger';
        case 'warning': return 'warning';
        default: return 'info';
    }
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-info-circle';
        default: return 'fas fa-info-circle';
    }
}