    // today and tomorrow date
    function setDates() {
        // Get today's date
        const today = new Date();
        
        // Create a new date object for tomorrow
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
    
        // Array of month names
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    
        // Format a date as DD MMM YYYY
        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            return `${day} ${month} ${year}`;
        }
    
        // Set the values of the input fields
        document.getElementById('checkinDate').value = formatDate(today);
        document.getElementById('checkoutDate').value = formatDate(tomorrow);
    }
    
    // Call the function when the page loads
    window.onload = setDates;


    // date picker
    document.addEventListener('DOMContentLoaded', () => {
        const checkInInput = document.getElementById('checkinDate');
        const checkOutInput = document.getElementById('checkoutDate');
        const calendarContainer = document.getElementById('calendar-container');
        const datepicker = document.querySelector('.datepicker');
    
        let currentMonth = new Date();
        let startDate = null;
        let endDate = null;
    
        function formatDate(date) {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return new Intl.DateTimeFormat('en-GB', options).format(date);
        }
    
        function generateCalendar(date) {
            const month = date.getMonth();
            const year = date.getFullYear();
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Ensure we compare only the date part
    
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
    
            let monthName = date.toLocaleString('default', { month: 'long' });
            let html = '<div class="calendar">';
            html += `<div class="header">
                <div class="nav-buttons">
                    <button class="prev-month">&lt;</button>
                    <span>${monthName} ${year}</span>
                    <button class="next-month">&gt;</button>
                </div>
            </div>`;
            html += '<div class="weekdays">';
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
                html += `<div>${day}</div>`;
            });
            html += '</div>';
            html += '<div class="days">';
    
            // Fill in empty cells before the first day of the month
            for (let i = 0; i < firstDay.getDay(); i++) {
                html += '<div></div>';
            }
    
            // Fill in the days of the month
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const currentDate = new Date(year, month, day);
                const isBeforeToday = currentDate < today;
                const isInRange = startDate && endDate && currentDate > startDate && currentDate < endDate;
                const isStartDate = startDate && currentDate.toDateString() === startDate.toDateString();
                const isEndDate = endDate && currentDate.toDateString() === endDate.toDateString();
    
                html += `<div 
                    class="${isBeforeToday ? 'disabled' : (isStartDate ? 'start-date' : isEndDate ? 'end-date' : isInRange ? 'in-range' : '')}"
                    data-date="${currentDate.toDateString()}"
                    ${isBeforeToday ? 'style="pointer-events: none;"' : ''}>
                    ${formatDate(currentDate).split(' ')[0]} <!-- Day -->
                </div>`;
    
                if ((firstDay.getDay() + day) % 7 === 0) {
                    html += '</div><div class="days">';
                }
            }
    
            html += '</div></div>';
    
            return html;
        }
    
        function updateCalendars() {
            const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;
    
            // Generate one month or two months based on screen width
            const calendarsHtml = isSmallScreen 
                ? generateCalendar(currentMonth) 
                : generateCalendar(currentMonth) + generateCalendar(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    
            calendarContainer.innerHTML = calendarsHtml;
            attachEventListeners();
        }
    
        function handleDateClick(e) {
            const target = e.target;
    
            if (target.tagName === 'DIV' && target.dataset.date && !target.classList.contains('disabled')) {
                const clickedDate = new Date(target.dataset.date);
    
                if (!startDate || (startDate && endDate)) {
                    startDate = clickedDate;
                    endDate = null;
                } else if (clickedDate < startDate) {
                    endDate = startDate;
                    startDate = clickedDate;
                } else {
                    endDate = clickedDate;
                }
    
                if (startDate && endDate) {
                    checkInInput.value = formatDate(startDate);
                    checkOutInput.value = formatDate(endDate);
                    calendarContainer.style.display = 'none'; // Hide the calendar container
                }
    
                updateCalendars();
            }
        }
    
        function navigateMonth(direction) {
            currentMonth.setMonth(currentMonth.getMonth() + direction);
            updateCalendars();
        }
    
        function attachEventListeners() {
            calendarContainer.querySelectorAll('.prev-month').forEach(btn => {
                btn.addEventListener('click', () => navigateMonth(-1));
            });
    
            calendarContainer.querySelectorAll('.next-month').forEach(btn => {
                btn.addEventListener('click', () => navigateMonth(1));
            });
    
            calendarContainer.addEventListener('click', handleDateClick);
        }
    
        function toggleCalendar(e) {
            e.stopPropagation(); // Prevent event from bubbling up to the document
    
            if (calendarContainer.style.display === 'none' || calendarContainer.style.display === '') {
                updateCalendars();
                calendarContainer.style.display = 'flex'; // Show the calendar container
                // Position the calendar container below the input field
                const rect = e.target.getBoundingClientRect();
                calendarContainer.style.top = `${rect + window.scrollY}px`;
                calendarContainer.style.left = `${rect + window.scrollX}px`;
            } else {
                calendarContainer.style.display = 'flex';
            }
        }
    
        function handleClickOutside(event) {
            if (!datepicker.contains(event.target)) {
                calendarContainer.style.display = 'none';
            }
        }
    
        checkInInput.addEventListener('focus', toggleCalendar);
        checkOutInput.addEventListener('focus', toggleCalendar);
        document.addEventListener('click', handleClickOutside);
    
        // Prevent closing calendar when clicking inside the calendar container
        calendarContainer.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    
        // Initial update to set calendar view based on screen size
        updateCalendars();
    
        // Update calendar on window resize
        window.addEventListener('resize', updateCalendars);
    });

// Booking
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const property = document.getElementById('property').value;
    const checkinDate = formatDate(new Date(document.getElementById('checkinDate').value));
    const checkoutDate = formatDate(new Date(document.getElementById('checkoutDate').value));
    const totalGuests = document.getElementById('totalGuests').value;
    
    if (!property || !checkinDate || !checkoutDate || !totalGuests) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simple validation
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    
    if (checkout <= checkin) {
        alert('Check-out date must be after the check-in date.');
        return;
    }
    
    // Map properties to their specific URLs
    const propertyUrls = {
        'property1': 'https://hotels.cloudbeds.com/en/reservation/PeZXom?currency=usd',
        'property2': 'https://hotels.cloudbeds.com/en/reservation/rmVKYa?currency=usd',
        'property3': 'https://hotels.cloudbeds.com/reservation/CFTvLu',
        'property4': 'https://hotels.cloudbeds.com/reservation/ZyjPPV',
        'property5': 'https://hotels.cloudbeds.com/reservation/VUxg0w',
        'property6': 'https://hotels.cloudbeds.com/en/reservation/XS8E0S?currency=usd'
    };
    
    const baseUrl = propertyUrls[property];
    
    if (!baseUrl) {
        alert('Invalid property selected.');
        return;
    }
    
    // Build the booking URL with parameters
    const url = `${baseUrl}#checkin=${encodeURIComponent(checkinDate)}&checkout=${encodeURIComponent(checkoutDate)}&guests=${encodeURIComponent(totalGuests)}`;
    
    // Redirect to the booking page
    window.open(url, '_self');
});


// Mobile Show/hide booking
document.addEventListener('DOMContentLoaded', function () {
    const containerForm = document.getElementById('container-form');
    const overlay = document.getElementById('overlay');
    const openButton = document.querySelector('.booking-mobile-btn');

    function openForm() {
        containerForm.classList.add('show');
        overlay.style.display = 'block';
        document.body.classList.add('no-scroll');
    }

    function closeForm() {
        containerForm.classList.add('closing');
        setTimeout(() => {
            containerForm.classList.remove('show', 'closing');
            overlay.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }, 1000); // Match the duration of the closing animation
    }

    // Open form when button is clicked
    openButton.addEventListener('click', openForm);

    // Close form when overlay is clicked
    overlay.addEventListener('click', closeForm);

    // Prevent closing when clicking inside the form container
    containerForm.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// Mobile Zoom on Scroll
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function applyScaleOnScroll() {
    const images = document.querySelectorAll('.destination-photo-mobile'); // Select all images

    // Only run this if the screen width is 600px or less
    if (window.innerWidth <= 600) {
        const windowHeight = window.innerHeight;

        images.forEach(function(image) {
            const rect = image.getBoundingClientRect();

            // Check if the image is in the viewport
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                // Apply scale of 1 when in viewport
                image.style.transform = 'scale(1)';
            } else {
                // Apply scale of 0 when out of viewport
                image.style.transform = 'scale(0)';
            }
        });
    }
}

// Attach the event listener
window.addEventListener('scroll', debounce(applyScaleOnScroll, 10));

//READ MORE//
function toggleReadMore(dotsId, moreTextId, readMoreBtnId, readLessBtnId) {
    var dots = document.getElementById(dotsId);
    var moreText = document.getElementById(moreTextId);
    var readMoreBtn = document.getElementById(readMoreBtnId);
    var readLessBtn = document.getElementById(readLessBtnId);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        moreText.style.display = "none";
        readMoreBtn.style.display = "inline";
        readLessBtn.style.display = "none";
    } else {
        dots.style.display = "none";
        moreText.style.display = "inline";
        readMoreBtn.style.display = "none";
        readLessBtn.style.display = "inline";
    }
}