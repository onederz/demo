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
    
            const monthName = date.toLocaleString('default', { month: 'long' });
            let html = '<div class="calendar">';
            html += `<div class="header">
                <div class="nav-buttons">
                    <button class="prev-month">◀</button>
                    <span>${monthName} ${year}</span>
                    <button class="next-month">▶</button>
                </div>
            </div>`;
            html += '<div class="weekdays">';
            ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
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
                const isStartDate = startDate && currentDate.toDateString() === startDate.toDateString();
                const isEndDate = endDate && currentDate.toDateString() === endDate.toDateString();
                const isInRange = startDate && endDate && currentDate > startDate && currentDate < endDate;
    
                html += `<div 
                    class="${isBeforeToday ? 'disabled' : 
                        (isStartDate ? 'start-date' : 
                        isEndDate ? 'end-date' : 
                        isInRange ? 'in-range' : '')}"
                    data-date="${currentDate.toDateString()}"
                    ${isBeforeToday ? 'style="pointer-events: none;"' : ''}>
                    ${day}
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
        
            // Disable previous month button if the calendar is showing the current month
            const prevMonthButton = document.querySelector('.prev-month');
            const today = new Date();
        
            // Disable "Previous" button only when the current month is being shown
            if (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth()) {
                prevMonthButton.style.display = 'none'; // Hide the button if it's the current month
            } else {
                prevMonthButton.style.display = 'inline-block'; // Show the button otherwise
            }
        }
        
        
        function navigateMonth(direction) {
            // Check if the calendar is showing the current month
            const today = new Date();
            if (direction === -1 && (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth())) {
                return; // Don't allow navigating to the previous month if it's the current month
            }
        
            // Navigate to the next or previous month
            currentMonth.setMonth(currentMonth.getMonth() + direction);
            updateCalendars();
        }
        
    
        function handleDateClick(e) {
            const target = e.target;
    
            if (target.tagName === 'DIV' && target.dataset.date && !target.classList.contains('disabled')) {
                const clickedDate = new Date(target.dataset.date);
    
                // Prevent selecting the same date for both start and end
                if (startDate && clickedDate.toDateString() === startDate.toDateString()) {
                    return; // Do nothing if the same date is clicked
                }
    
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
    
        function handleDateHover(e) {
            const target = e.target;
    
            // Only respond to valid date elements
            if (target.tagName === 'DIV' && target.dataset.date && !target.classList.contains('disabled') && startDate) {
                const hoveredDate = new Date(target.dataset.date);
    
                // Clear previous hover highlights
                calendarContainer.querySelectorAll('.in-range-hover').forEach(el => {
                    el.classList.remove('in-range-hover');
                });
    
                // Highlight dates between startDate and hoveredDate
                const start = startDate < hoveredDate ? startDate : hoveredDate;
                const end = startDate > hoveredDate ? startDate : hoveredDate;
    
                calendarContainer.querySelectorAll('[data-date]').forEach(el => {
                    const date = new Date(el.dataset.date);
    
                    if (date >= start && date <= end && !el.classList.contains('disabled')) {
                        el.classList.add('in-range-hover');
                    }
                });
            }
        }
                    
        function attachEventListeners() {
            calendarContainer.querySelectorAll('.prev-month').forEach(btn => {
                btn.addEventListener('click', () => navigateMonth(-1));
            });
    
            calendarContainer.querySelectorAll('.next-month').forEach(btn => {
                btn.addEventListener('click', () => navigateMonth(1));
            });
    
            // Attach hover event for range highlighting
            calendarContainer.querySelectorAll('.days div').forEach(day => {
                day.addEventListener('mouseenter', handleDateHover);
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

document.getElementById('bookingForm').addEventListener('submit', function (event) {
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

    // Show loading animation
    const button = document.getElementById('booking-btn');
    button.querySelector('.button-text').style.display = 'none';
    button.querySelector('.loading-animation').style.display = 'inline';
    button.disabled = true; // Disable the button to prevent multiple submissions

    // Simulate loading delay before redirect (e.g., wait for processing)
    setTimeout(() => {
        const url = `${baseUrl}#checkin=${encodeURIComponent(checkinDate)}&checkout=${encodeURIComponent(checkoutDate)}&guests=${encodeURIComponent(totalGuests)}`;

        // Redirect to the booking page
        window.open(url, '_self');
    }, 2000);
});



// Mobile Show/hide booking
document.addEventListener('DOMContentLoaded', function () {
    const containerForm = document.getElementById('container-form');
    const overlay = document.getElementById('overlay');
    const openButton = document.querySelector('.booking-mobile-btn');
    const menu = document.getElementById('menu');
    const hamburgerIcon = document.getElementById('humburger_icon');
    const background = document.getElementById('background'); // For background blur

    // Open the booking form
    function openForm() {
        containerForm.classList.add('show');
        overlay.style.display = 'block';
        document.body.classList.add('no-scroll');
    }

    // Close the booking form
    function closeForm() {
        containerForm.classList.add('closing');
        setTimeout(() => {
            containerForm.classList.remove('show', 'closing');
            overlay.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }, 100); // Match the duration of the closing animation
    }

    // Open the menu and apply blur effect
    function openMenu() {
        menu.classList.add('show');
        document.body.classList.add('no-scroll'); // Prevent scroll when menu is open
        background.classList.add('no-scroll'); // Apply background blur
    }

    // Close the menu and remove blur effect
    function closeMenu() {
        menu.classList.remove('show');
        document.body.classList.remove('no-scroll'); // Enable scroll when menu is closed
        background.classList.remove('no-scroll'); // Remove background blur
    }

    // Open form when booking button is clicked
    openButton.addEventListener('click', openForm);

    // Close form when overlay is clicked
    overlay.addEventListener('click', closeForm);

    // Prevent closing the form when clicking inside the form container
    containerForm.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Open the menu when hamburger icon is clicked
    hamburgerIcon.addEventListener('click', function(event) {
        event.preventDefault();
        if (menu.classList.contains('show')) {
            closeMenu(); // Close the menu if it's already open
        } else {
            openMenu(); // Otherwise, open the menu
        }
    });

    // Close the menu and enable scrolling when clicking outside of the menu
    overlay.addEventListener('click', function() {
        if (menu.classList.contains('show')) {
            closeMenu();
        }
    });

    // Close the menu when clicking anywhere outside of the menu (not on the hamburger icon or menu items)
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !hamburgerIcon.contains(event.target) && menu.classList.contains('show')) {
            closeMenu();
        }
    });

    // Allow the links inside the menu to function properly
    const menuLinks = menu.querySelectorAll('li a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Here, we don't care if the link jumps or not for now
            // But if needed, you could prevent it using event.preventDefault()

            // Close the menu for all valid links
            closeMenu();
        });
    });
});


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

