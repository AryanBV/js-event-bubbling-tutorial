// Get DOM elements
const commentsContainer = document.getElementById('comments-container');
const parentComment = document.getElementById('parent-comment');
const childComment = document.getElementById('child-comment');
const eventLog = document.getElementById('event-log');

// Function to add visual feedback
function highlightElement(element, order) {
    // Add highlight class
    element.classList.add('highlight');
    
    // Add propagation indicator
    element.classList.add('propagation-active');
    
    // Log the event path
    const elementId = element.id || 'unnamed-element';
    eventLog.innerHTML += `<div>${order}. Event bubbled through: ${elementId}</div>`;
    
    // Remove highlight after animation
    setTimeout(() => {
        element.classList.remove('highlight');
        element.classList.remove('propagation-active');
    }, 1000);
}

// Clear previous event log
function clearEventLog() {
    eventLog.innerHTML = '';
}

// Add event listeners to demonstrate bubbling
commentsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('like-button')) {
        highlightElement(this, 3);
        console.log('Event reached comments container');
    }
});

parentComment.addEventListener('click', function(event) {
    if (event.target.classList.contains('like-button')) {
        highlightElement(this, 2);
        console.log('Event reached parent comment');
    }
});

childComment.addEventListener('click', function(event) {
    if (event.target.classList.contains('like-button')) {
        highlightElement(this, 2);
        console.log('Event reached child comment');
    }
});

// Add event listeners to all like buttons
document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function(event) {
        clearEventLog(); // Clear previous event log
        highlightElement(this, 1);
        console.log('Event started at like button');
    });
});

// Add explanatory log at startup
console.log('Event bubbling demo initialized! Click any like button to see the event bubble up through the DOM.');