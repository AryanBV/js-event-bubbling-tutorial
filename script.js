document.addEventListener('DOMContentLoaded', function() {
    const commentsContainer = document.getElementById('comments-container');
    const eventLog = document.getElementById('event-log');
    const phaseIndicator = document.getElementById('phase-indicator');
    const addCommentBtn = document.getElementById('add-comment');

    function clearEventLog() {
        eventLog.innerHTML = '';
        phaseIndicator.innerHTML = '';
    }

    function highlightPath(event) {
    const path = event.composedPath();
    let delay = 0;
    
    path.forEach((el) => {
        if (el.nodeType === 1) { // Check if element node
            setTimeout(() => {
                el.classList.add('highlight-path');
                setTimeout(() => el.classList.remove('highlight-path'), 500);
            }, delay);
            delay += 200;
        }
    });
}

function logEvent(element, phase, event) {
    highlightPath(event);
        const elementId = element.id || element.className || 'unnamed-element';
        const phaseName = phase === 1 ? 'Capture' : phase === 2 ? 'Target' : 'Bubble';
        phaseIndicator.textContent = `Current Phase: ${phaseName}`;
        
        // Get complete event path
        let path = event.composedPath();
        let pathString = path
            .map(el => el.id || el.className || 'unnamed')
            .join(' → ');
            
        eventLog.innerHTML = `
            <div><strong>Event Target:</strong> ${event.target.id || event.target.className}</div>
            <div><strong>Complete Path:</strong> ${pathString}</div>
            <div><strong>Current Element:</strong> ${elementId} (${phaseName} phase)</div>
        `;
    }

    function handleAction(action, comment) {
        if (!comment) {
            console.warn('No comment element found');
            return;
        }

        // Cache DOM elements
        const repliesContainer = comment.querySelector('.replies');
        const toggleButton = comment.querySelector('[data-action="toggle"]');

        switch(action) {
            case 'like':
                comment.classList.add('highlight');
                setTimeout(() => comment.classList.remove('highlight'), 1000);
                break;
            case 'reply':
                const newComment = createComment('New reply comment');
                repliesContainer?.appendChild(newComment);
                break;
            case 'share':
                alert('Share functionality would go here');
                break;
            case 'toggle':
                if (repliesContainer) {
                    repliesContainer.classList.toggle('collapsed');
                    if (toggleButton) {
                        toggleButton.textContent = repliesContainer.classList.contains('collapsed') 
                            ? '🔼 Show' 
                            : '🔽 Hide';
                    }
                }
                break;
        }
    }

    function createComment(content) {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerHTML = `
            <div class="comment-content">
                <p>${content}</p>
                <div class="action-menu">
                    <button data-action="like">👍 Like</button>
                    <button data-action="reply">💬 Reply</button>
                    <button data-action="share">↗️ Share</button>
                </div>
            </div>
            <div class="replies"></div>
        `;
        return comment;
    }

    // Demonstrate capture and bubble phases
    commentsContainer.addEventListener('click', function(event) {
        if (event.target.matches('[data-action]')) {
            logEvent(this, event.eventPhase, event);
        }
    }, true); // Capture phase

    commentsContainer.addEventListener('click', function(event) {
        if (event.target.matches('[data-action]')) {
            logEvent(this, event.eventPhase, event);
            const button = event.target;
            const action = button.dataset.action;
            const comment = button.closest('.comment');
            if (comment && action) {
                handleAction(action, comment);
            }
        }
    }); // Bubble phase

    // Add new comment button handler
    addCommentBtn.addEventListener('click', function() {
        const newComment = createComment('New top-level comment');
        commentsContainer.appendChild(newComment);
    });

    // Clear log when starting new action
    document.addEventListener('click', function(event) {
        if (event.target.matches('[data-action]')) {
            clearEventLog();
        }
    }, true);

    // Add handlers for dropdown actions
    document.addEventListener('click', function(event) {
        const dropdownAction = event.target.closest('.dropdown-content button');
        if (dropdownAction) {
            event.stopPropagation(); // Stop event from bubbling
            const action = dropdownAction.dataset.action;
            const comment = dropdownAction.closest('.comment');
            
            // Add stop indicator
            dropdownAction.classList.add('stop-indicator');
            setTimeout(() => dropdownAction.classList.remove('stop-indicator'), 1000);

            handleDropdownAction(action, comment);
            
            // Update event log to show propagation was stopped
            eventLog.innerHTML += '<div style="color: red">Event propagation stopped! ⛔</div>';
        }
    });

    function handleDropdownAction(action, comment) {
        switch(action) {
            case 'edit':
                const newText = prompt('Edit comment:', comment.querySelector('p').textContent);
                if (newText) {
                    comment.querySelector('p').textContent = newText;
                }
                break;
            case 'delete':
                if (confirm('Delete this comment?')) {
                    comment.remove();
                }
                break;
        }
    }

    // Update logEvent function to show when propagation is stopped
    function logEvent(element, phase, event) {
        const elementId = element.id || element.className || 'unnamed-element';
        const phaseName = phase === 1 ? 'Capture' : phase === 2 ? 'Target' : 'Bubble';
        phaseIndicator.textContent = `Current Phase: ${phaseName}`;
        
        let path = event.composedPath();
        let pathString = path
            .map(el => el.id || el.className || 'unnamed')
            .join(' → ');
            
        eventLog.innerHTML = `
            <div><strong>Event Target:</strong> ${event.target.id || event.target.className}</div>
            <div><strong>Complete Path:</strong> ${pathString}</div>
            <div><strong>Current Element:</strong> ${elementId} (${phaseName} phase)</div>
        `;
    }
});