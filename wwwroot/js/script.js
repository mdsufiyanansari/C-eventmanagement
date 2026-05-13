/* ===========================
   EVENTPRO - MAIN JAVASCRIPT - COMPLETE
   =========================== */

// ===========================
// SAMPLE DATA
// ===========================

const sampleEvents = [
    {
        id: 1,
        title: 'Summer Music Festival',
        category: 'Concert',
        date: '2026-06-15',
        time: '18:00',
        location: 'Central Park, NYC',
        price: 85,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1519671482677-504be0271101?w=500&h=300&fit=crop',
        description: 'Join us for an amazing night of live music with top artists and performers.',
        image_large: 'https://images.unsplash.com/photo-1519671482677-504be0271101?w=800&h=600&fit=crop'
    },
    {
        id: 2,
        title: 'Wedding Ceremony & Reception',
        category: 'Wedding',
        date: '2026-06-20',
        time: '17:00',
        location: 'Grand Hotel Ballroom',
        price: 150,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&h=300&fit=crop',
        description: 'Celebrate love with an elegant wedding ceremony and reception.',
        image_large: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&h=600&fit=crop'
    },
    {
        id: 3,
        title: 'Birthday Bash Party',
        category: 'Birthday',
        date: '2026-06-25',
        time: '19:00',
        location: 'Downtown Club',
        price: 50,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1533995405351-39bdf266198c?w=500&h=300&fit=crop',
        description: 'Celebrate your special day with friends and family.',
        image_large: 'https://images.unsplash.com/photo-1533995405351-39bdf266198c?w=800&h=600&fit=crop'
    },
    {
        id: 4,
        title: 'Corporate Conference 2026',
        category: 'Corporate',
        date: '2026-07-01',
        time: '09:00',
        location: 'Convention Center',
        price: 200,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
        description: 'Annual corporate conference with networking opportunities.',
        image_large: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop'
    },
    {
        id: 5,
        title: 'Epic Party Night',
        category: 'Party',
        date: '2026-07-05',
        time: '20:00',
        location: 'Sky Bar Rooftop',
        price: 75,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=300&fit=crop',
        description: 'An unforgettable night of fun, music, and dancing.',
        image_large: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop'
    },
    {
        id: 6,
        title: 'Jazz Night Live',
        category: 'Concert',
        date: '2026-07-10',
        time: '20:00',
        location: 'Blue Note Jazz Club',
        price: 95,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
        description: 'Experience the smooth sounds of live jazz performances.',
        image_large: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop'
    }
];

// ===========================
// THEME TOGGLE (Dark Mode)
// ===========================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===========================
// AUTHENTICATION FUNCTIONS
// ===========================

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

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        updateNavbar();
        showToast('You have been logged out');
        setTimeout(() => {
            window.location.href = '/';
        }, 1000);
    }
}

// ===========================
// NAVBAR UPDATES
// ===========================

function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authNav = document.getElementById('authNav');

    if (authNav) {
        if (user) {
            authNav.innerHTML = `
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="userMenu" role="button" data-bs-toggle="dropdown">
                        <i class="fas fa-user-circle me-2"></i>${user.name}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
                        <li><a class="dropdown-item" href="/Dashboard"><i class="fas fa-user me-2"></i>Dashboard</a></li>
                        <li><a class="dropdown-item" href="/Events"><i class="fas fa-calendar me-2"></i>Browse Events</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" onclick="handleLogout(); return false;"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                    </ul>
                </div>
            `;
        } else {
            authNav.innerHTML = '<a class="nav-link btn btn-primary px-3 ms-2" href="/Login">Login</a>';
        }
    }
}

// ===========================
// PASSWORD VISIBILITY TOGGLE
// ===========================

function togglePassword() {
    const input = document.getElementById('passwordInput');
    const button = event.target.closest('button');
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

function toggleSignupPassword() {
    const input = document.getElementById('signupPassword');
    const button = event.target.closest('button');
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

function toggleConfirmPassword() {
    const input = document.getElementById('confirmPassword');
    if (!input) return;
    const button = event.target.closest('button');
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// ===========================
// TOAST NOTIFICATIONS
// ===========================

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-warning';
    if (type === 'info') icon = 'fa-info-circle';

    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;

    container.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===========================
// SWIPER INITIALIZATION
// ===========================

function initSwipers() {
    // Featured Events Swiper
    if (document.querySelector('.featuredSwiper')) {
        const featuredSwiper = new Swiper('.featuredSwiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            }
        });
    }

    // Testimonials Swiper
    if (document.querySelector('.testimonialsSwiper')) {
        const testimonialsSwiper = new Swiper('.testimonialsSwiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            breakpoints: {
                768: {
                    slidesPerView: 2
                }
            }
        });
    }
}

// ===========================
// EVENTS PAGE FUNCTIONS
// ===========================

function initEventsPage() {
    displayEvents(sampleEvents);
    setupEventFilters();
}

function displayEvents(events) {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;

    if (events.length === 0) {
        eventsGrid.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No events found.</p></div>';
        return;
    }

    eventsGrid.innerHTML = events.map(event => `
        <div class="col-md-6 col-lg-4">
            <div class="event-card" data-aos="fade-up">
                <div class="event-image">
                    <img src="${event.image}" alt="${event.title}" class="img-fluid">
                    <span class="event-category">${event.category}</span>
                    <div class="event-rating">
                        <i class="fas fa-star"></i> ${event.rating}
                    </div>
                </div>
                <div class="event-body">
                    <h5 class="fw-bold">${event.title}</h5>
                    <p class="text-muted small mb-2">
                        <i class="fas fa-calendar me-2"></i>${event.date}
                    </p>
                    <p class="text-muted small mb-3">
                        <i class="fas fa-map-marker-alt me-2"></i>${event.location}
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-primary" style="font-size: 1.3rem;">$${event.price}</span>
                        <button class="btn btn-sm btn-primary" onclick="viewEventDetails(${event.id})">
                            <i class="fas fa-info-circle me-1"></i>Details
                        </button>
                    </div>
                    <button class="btn btn-outline-primary w-100 mt-2" onclick="bookEvent(${event.id})">
                        <i class="fas fa-ticket me-1"></i>Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterEvents() {
    const searchInput = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const priceFilter = document.getElementById('priceFilter')?.value || '';

    let filtered = sampleEvents;

    // Search filter
    if (searchInput) {
        filtered = filtered.filter(e => 
            e.title.toLowerCase().includes(searchInput) || 
            e.location.toLowerCase().includes(searchInput)
        );
    }

    // Category filter
    if (categoryFilter) {
        filtered = filtered.filter(e => e.category === categoryFilter);
    }

    // Price filter
    if (priceFilter) {
        const [min, max] = priceFilter.split('-');
        filtered = filtered.filter(e => {
            if (max) {
                return e.price >= parseInt(min) && e.price <= parseInt(max);
            } else {
                return e.price >= parseInt(min);
            }
        });
    }

    displayEvents(filtered);
}

function setupEventFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');

    if (searchInput) {
        searchInput.addEventListener('keyup', filterEvents);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterEvents);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', filterEvents);
    }
}

// ===========================
// EVENT DETAILS & BOOKING
// ===========================

function viewEventDetails(eventId) {
    const event = sampleEvents.find(e => e.id === eventId);
    if (!event) return;

    const modal = document.getElementById('eventModal');
    if (!modal) return;

    document.getElementById('modalEventTitle').textContent = event.title;
    document.getElementById('eventModalContent').innerHTML = `
        <img src="${event.image_large}" alt="${event.title}" class="img-fluid rounded mb-3">
        <h6 class="fw-bold">Event Details</h6>
        <p><strong>Category:</strong> ${event.category}</p>
        <p><strong>Date:</strong> ${event.date} at ${event.time}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Price:</strong> $${event.price}</p>
        <p><strong>Rating:</strong> <i class="fas fa-star text-warning"></i> ${event.rating}</p>
        <p>${event.description}</p>
        <button class="btn btn-primary w-100" onclick="bookEvent(${event.id})">
            <i class="fas fa-check me-2"></i>Proceed to Book
        </button>
    `;

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function bookEvent(eventId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        showToast('Please login to book events', 'warning');
        setTimeout(() => {
            window.location.href = '/Login';
        }, 1500);
        return;
    }

    const event = sampleEvents.find(e => e.id === eventId);
    localStorage.setItem('selectedEvent', JSON.stringify(event));
    window.location.href = '/Booking';
}

// ===========================
// BOOKING FORM
// ===========================

function submitBooking(event) {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        showToast('Please login first', 'error');
        return;
    }

    const form = event.target;
    const selectedEvent = JSON.parse(localStorage.getItem('selectedEvent'));

    // Get form values
    const name = form.querySelector('input[name="name"]')?.value || form.querySelectorAll('input[type="text"]')[0]?.value || '';
    const email = form.querySelector('input[name="email"]')?.value || form.querySelectorAll('input[type="email"]')[0]?.value || '';
    const phone = form.querySelector('input[name="phone"]')?.value || form.querySelectorAll('input[type="tel"]')[0]?.value || '';
    const guestCount = form.querySelector('input[name="guestCount"]')?.value || form.querySelectorAll('input[type="number"]')[0]?.value || '';
    const eventType = form.querySelector('select[name="eventType"]')?.value || form.querySelectorAll('select')[0]?.value || '';
    const eventDate = form.querySelector('input[name="eventDate"]')?.value || form.querySelectorAll('input[type="date"]')[0]?.value || '';

    if (!name || !email || !phone || !guestCount || !eventType) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    // Create booking object
    const booking = {
        id: Date.now(),
        userId: user.id,
        eventId: selectedEvent?.id || null,
        eventTitle: selectedEvent?.title || eventType,
        name: name,
        email: email,
        phone: phone,
        guestCount: parseInt(guestCount),
        eventType: eventType,
        eventDate: eventDate || selectedEvent?.date,
        amount: selectedEvent ? selectedEvent.price * parseInt(guestCount) : 0,
        bookingDate: new Date().toLocaleDateString(),
        status: 'Confirmed'
    };

    // Store booking
    let bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    bookings.push(booking);
    localStorage.setItem('userBookings', JSON.stringify(bookings));

    // Clear selected event
    localStorage.removeItem('selectedEvent');

    // Show success and redirect
    showToast('Event booked successfully! 🎉', 'success');
    setTimeout(() => {
        window.location.href = '/Dashboard';
    }, 2000);
}

function proceedToBooking(eventId) {
    bookEvent(eventId);
}

function selectPayment(method) {
    const radio = document.getElementById('payment' + method.charAt(0).toUpperCase() + method.slice(1));
    if (radio) {
        radio.checked = true;
    }
}

function increaseQty() {
    const input = document.getElementById('guestCount');
    if (input) {
        input.value = parseInt(input.value) + 1;
    }
}

function decreaseQty() {
    const input = document.getElementById('guestCount');
    if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// ===========================
// DASHBOARD FUNCTIONS
// ===========================

function initDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = '/Login';
        return;
    }

    // Update welcome message
    const userName = document.getElementById('userName');
    if (userName) userName.textContent = user.name || 'User';
    
    const profileName = document.getElementById('profileName');
    if (profileName) profileName.textContent = user.name || 'Guest User';
    
    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) profileEmail.textContent = user.email || 'guest@example.com';
    
    const memberSince = document.getElementById('memberSince');
    if (memberSince) memberSince.textContent = user.signupDate || new Date().toLocaleDateString();

    // Load bookings
    displayUserBookings();
    updateDashboardStats();
}

function displayUserBookings() {
    const bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    const bookingsList = document.getElementById('bookingsList');

    if (!bookingsList) return;

    if (bookings.length === 0) {
        bookingsList.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-calendar-alt" style="font-size: 3rem; color: #ddd;"></i>
                <p class="text-muted mt-3">No bookings yet. <a href="/Events">Browse events</a></p>
            </div>
        `;
        return;
    }

    bookingsList.innerHTML = bookings.map(booking => `
        <div class="booking-item mb-3" data-aos="fade-up">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <h6 class="fw-bold mb-1">${booking.eventTitle}</h6>
                            <p class="text-muted small mb-0">
                                <i class="fas fa-calendar me-2"></i>${booking.eventDate}
                            </p>
                            <p class="text-muted small">
                                <i class="fas fa-users me-2"></i>${booking.guestCount} Guests
                            </p>
                        </div>
                        <div class="col-md-4 text-end">
                            <span class="badge bg-success mb-2">${booking.status}</span>
                            <p class="fw-bold text-primary mb-0">$${booking.amount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function updateDashboardStats() {
    const bookings = JSON.parse(localStorage.getItem('userBookings')) || [];
    
    const bookingCount = document.getElementById('bookingCount');
    if (bookingCount) bookingCount.textContent = bookings.length;
    
    const totalBookings = document.getElementById('totalBookings');
    if (totalBookings) totalBookings.textContent = bookings.length;
    
    const upcomingCount = bookings.filter(b => new Date(b.eventDate) > new Date()).length;
    const upcomingElement = document.getElementById('upcomingCount');
    if (upcomingElement) upcomingElement.textContent = upcomingCount;
    
    const totalGuests = bookings.reduce((sum, b) => sum + parseInt(b.guestCount || 0), 0);
    const guestCount = document.getElementById('guestCount');
    if (guestCount) guestCount.textContent = totalGuests;
    
    const favoriteCount = document.getElementById('favoriteCount');
    if (favoriteCount) favoriteCount.textContent = '0';
}

// ===========================
// GALLERY FUNCTIONS
// ===========================

const galleryImages = [
    { id: 1, category: 'Wedding', src: 'https://images.unsplash.com/photo-1519671482677-504be0271101?w=500&h=500&fit=crop' },
    { id: 2, category: 'Birthday', src: 'https://images.unsplash.com/photo-1533995405351-39bdf266198c?w=500&h=500&fit=crop' },
    { id: 3, category: 'Corporate', src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop' },
    { id: 4, category: 'Concert', src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop' },
    { id: 5, category: 'Party', src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=500&fit=crop' },
    { id: 6, category: 'Wedding', src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&h=500&fit=crop' }
];

function initGallery() {
    displayGallery(galleryImages);
    setupGalleryFilters();
}

function displayGallery(images) {
    const gallery = document.getElementById('galleryGrid');
    if (!gallery) return;

    gallery.innerHTML = images.map((img, index) => `
        <div class="col-md-4 col-sm-6 mb-3" data-aos="fade-up">
            <div class="gallery-item" onclick="openLightbox(${index})">
                <img src="${img.src}" alt="${img.category}" class="img-fluid rounded">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
        </div>
    `).join('');
}

function openLightbox(index) {
    const images = galleryImages.filter(img => {
        const filter = document.getElementById('galleryFilter');
        if (filter && filter.value) {
            return img.category === filter.value;
        }
        return true;
    });

    const modal = document.getElementById('lightboxModal');
    if (!modal) return;

    const lightboxImg = document.getElementById('lightboxImage');
    if (lightboxImg) {
        lightboxImg.src = images[index].src;
    }

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function filterGallery() {
    const filter = document.getElementById('galleryFilter')?.value || '';
    const filtered = filter ? galleryImages.filter(img => img.category === filter) : galleryImages;
    displayGallery(filtered);
}

function setupGalleryFilters() {
    const filter = document.getElementById('galleryFilter');
    if (filter) {
        filter.addEventListener('change', filterGallery);
    }
}

// ===========================
// CONTACT FORM
// ===========================

function handleContactSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.querySelector('input[name="name"]')?.value || form.querySelectorAll('input[type="text"]')[0]?.value || '';
    const email = form.querySelector('input[name="email"]')?.value || form.querySelectorAll('input[type="email"]')[0]?.value || '';
    const subject = form.querySelector('input[name="subject"]')?.value || form.querySelectorAll('input[type="text"]')[1]?.value || '';
    const message = form.querySelector('textarea')?.value || '';

    if (!name || !email || !subject || !message) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    // Store contact submission
    let contacts = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    contacts.push({
        id: Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleDateString()
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(contacts));

    showToast('Thank you for your message! We will contact you soon.', 'success');
    form.reset();
}

// ===========================
// NEWSLETTER SUBSCRIPTION
// ===========================

function handleNewsletterSubscribe(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]')?.value || '';

    if (!email) {
        showToast('Please enter your email', 'error');
        return;
    }

    // Store subscription
    let subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
    }

    showToast('Thank you for subscribing! Check your email for updates.', 'success');
    form.reset();
}

// ===========================
// CATEGORY FILTER
// ===========================

function filterCategory(category) {
    window.location.href = '/Events?category=' + category;
}

// ===========================
// CHECK AUTHENTICATION ON PAGE LOAD
// ===========================

function checkAuthentication() {
    const currentPage = window.location.pathname;
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (currentPage === '/Dashboard' && !user) {
        window.location.href = '/Login';
    }
}

// ===========================
// SMOOTH SCROLL BEHAVIOR
// ===========================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// LAZY LOADING IMAGES
// ===========================

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
}

// ===========================
// FORM VALIDATION
// ===========================

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// ===========================
// INITIALIZE ON PAGE LOAD
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    updateNavbar();
    checkAuthentication();
    initSmoothScroll();
    initSwipers();
    initLazyLoading();

    // Initialize page-specific functions
    if (window.location.pathname === '/Events' || window.location.pathname.includes('Events')) {
        setTimeout(initEventsPage, 100);
    }
    if (window.location.pathname === '/Dashboard' || window.location.pathname.includes('Dashboard')) {
        setTimeout(initDashboard, 100);
    }
    if (window.location.pathname === '/Gallery' || window.location.pathname.includes('Gallery')) {
        setTimeout(initGallery, 100);
    }

    // Fade animations
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // Event delegation for dynamic elements
    document.addEventListener('click', function(e) {
        if (e.target.closest('.dropdown-menu')) {
            e.stopPropagation();
        }
    });
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

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

// ===========================
// WINDOW RESIZE HANDLER
// ===========================

window.addEventListener('resize', debounce(function() {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

// ===========================
// PAGE SCROLL EFFECTS
// ===========================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.modern-navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});

// ===========================
// HELPER FUNCTIONS - AUTH
// ===========================

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberEmail');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = '/';
    }, 1000);
}

function prefillRememberedEmail() {
    const remembered = localStorage.getItem('rememberEmail');
    if (remembered) {
        const emailInput = document.querySelector('input[name="email"]') || document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.value = remembered;
        }
    }
}

// ===========================
// BOOKING CALCULATION FUNCTIONS
// ===========================

function calculateTotal() {
    const guestCountInput = document.querySelector('input[name="guestCount"]') || document.querySelectorAll('input[type="number"]')[0];
    const guestCount = parseInt(guestCountInput?.value) || 0;
    
    const perGuestPrice = 50;
    const platformFee = 10;
    
    const subtotal = guestCount * perGuestPrice;
    const serviceFee = Math.round(subtotal * 0.05);
    const totalAmount = subtotal + serviceFee + platformFee;
    
    // Update summary display
    const summaryGuests = document.getElementById('summaryGuests');
    const serviceFeeElement = document.getElementById('serviceFee');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (summaryGuests) summaryGuests.textContent = guestCount;
    if (serviceFeeElement) serviceFeeElement.textContent = '$' + serviceFee;
    if (totalAmountElement) totalAmountElement.textContent = '$' + totalAmount;
}

function updateEventType() {
    const eventTypeSelect = document.querySelector('select[name="eventType"]') || document.querySelectorAll('select')[0];
    const eventType = eventTypeSelect?.value || '';
    
    const summaryEventType = document.getElementById('summaryEventType');
    if (summaryEventType) {
        summaryEventType.textContent = eventType || '-';
    }
}

// ===========================
// ERROR HANDLING
// ===========================

window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});
