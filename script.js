document.addEventListener('DOMContentLoaded', function() {
    const commentsContainer = document.getElementById('comments-container');
    const eventLog = document.getElementById('event-log');
    const phaseIndicator = document.getElementById('phase-indicator');
    const addCommentBtn = document.getElementById('add-comment');
    const phaseLog = document.getElementById('phase-log');

    function clearEventLog() {
        eventLog.innerHTML = '';
        phaseIndicator.innerHTML = '';
    }

    function highlightPath(event) {
        const path = event.composedPath();
        let delay = 0;
        
        path.forEach((el) => {
            if (el.nodeType === 1) {
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

        switch(action) {
            case 'like':
                comment.classList.add('highlight');
                setTimeout(() => comment.classList.remove('highlight'), 1000);
                break;
            case 'reply':
                const newComment = createComment('New reply comment');
                comment.querySelector('.replies')?.appendChild(newComment);
                break;
            case 'share':
                alert('Share functionality would go here');
                break;
            case 'toggle':
                const replies = comment.querySelector('.replies');
                if (replies) {
                    replies.classList.toggle('collapsed');
                    const button = comment.querySelector('[data-action="toggle"]');
                    button.textContent = replies.classList.contains('collapsed') ? '🔼 Show' : '🔽 Hide';
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
                    <div class="dropdown">
                        <button data-action="options">⚙️ Options</button>
                        <div class="dropdown-content">
                            <button data-action="edit">✏️ Edit</button>
                            <button data-action="delete">🗑️ Delete</button>
                        </div>
                    </div>
                    <button data-action="like">👍 Like</button>
                    <button data-action="reply">💬 Reply</button>
                    <button data-action="toggle">🔽 Toggle Replies</button>
                </div>
            </div>
            <div class="replies"></div>
        `;
        return comment;
    }

    // Phase Demo Setup
    function setupPhaseDemo() {
        commentsContainer.addEventListener('click', function(event) {
            if (event.target.matches('[data-action]')) {
                visualizePhase('Capture', event);
            }
        }, true);

        commentsContainer.addEventListener('click', function(event) {
            if (event.target.matches('[data-action]')) {
                visualizePhase('Bubble', event);
            }
        });
    }

    function visualizePhase(phase, event) {
        const element = event.currentTarget;
        element.classList.add(`phase-${phase.toLowerCase()}`);
        
        logPhase(phase, event.target, event.currentTarget);
        
        setTimeout(() => {
            element.classList.remove(`phase-${phase.toLowerCase()}`);
        }, 500);
    }

    function logPhase(phase, target, current) {
        phaseLog.innerHTML += `
            <div class="phase-entry ${phase.toLowerCase()}">
                <strong>${phase} Phase:</strong>
                Target: ${target.dataset.action || 'unknown'} →
                Current: ${current.id || 'container'}
            </div>
        `;
    }

    function setupPhaseToggles() {
        const captureToggle = document.getElementById('capture-toggle');
        const bubbleToggle = document.getElementById('bubble-toggle');
        
        function updateListeners() {
            removeAllListeners();
            if (captureToggle.checked) addCaptureListeners();
            if (bubbleToggle.checked) addBubbleListeners();
        }
        
        captureToggle.addEventListener('change', updateListeners);
        bubbleToggle.addEventListener('change', updateListeners);
        
        updateListeners();
    }

    function removeAllListeners() {
        const elements = document.querySelectorAll('.comment, .action-menu button');
        elements.forEach(element => {
            element.removeEventListener('click', handleCapture, true);
            element.removeEventListener('click', handleBubble);
        });
    }

    function addCaptureListeners() {
        const elements = document.querySelectorAll('.comment, .action-menu button');
        elements.forEach(element => {
            element.addEventListener('click', handleCapture, true);
        });
    }

    function addBubbleListeners() {
        const elements = document.querySelectorAll('.comment, .action-menu button');
        elements.forEach(element => {
            element.addEventListener('click', handleBubble);
        });
    }

    function handleCapture(event) {
        if (event.target.matches('[data-action]')) {
            logPhase('Capture', event.target, event.currentTarget);
        }
    }

    function handleBubble(event) {
        if (event.target.matches('[data-action]')) {
            logPhase('Bubble', event.target, event.currentTarget);
        }
    }

    // Event Listeners
    commentsContainer.addEventListener('click', function(event) {
        if (event.target.matches('[data-action]')) {
            logEvent(this, event.eventPhase, event);
        }
    }, true);

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
    });

    addCommentBtn.addEventListener('click', function() {
        const newComment = createComment('New top-level comment');
        commentsContainer.appendChild(newComment);
    });

    document.addEventListener('click', function(event) {
        if (event.target.matches('[data-action]')) {
            clearEventLog();
        }
    }, true);

    document.addEventListener('click', function(event) {
        const dropdownAction = event.target.closest('.dropdown-content button');
        if (dropdownAction) {
            event.stopPropagation();
            const action = dropdownAction.dataset.action;
            const comment = dropdownAction.closest('.comment');
            
            dropdownAction.classList.add('stop-indicator');
            setTimeout(() => dropdownAction.classList.remove('stop-indicator'), 1000);

            handleDropdownAction(action, comment);
            
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

    // Initialize phase demo and toggles
    setupPhaseDemo();
    setupPhaseToggles();
});