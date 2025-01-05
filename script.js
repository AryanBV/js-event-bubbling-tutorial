document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const commentsContainer = document.getElementById('comments-container');
    const eventLog = document.getElementById('event-log');
    const phaseIndicator = document.getElementById('phase-indicator');
    const addCommentBtn = document.getElementById('add-comment');
    const phaseLog = document.getElementById('phase-log');
    const perfLog = document.getElementById('perf-log');

    // Step 1: Basic Event Bubbling
    commentsContainer.addEventListener('click', function(e) {
        const startTime = performance.now();
        const button = e.target.closest('[data-action]');
        if (!button) return;
        
        const action = button.dataset.action;
        const comment = button.closest('.comment');
        
        if (action && comment) {
            handleAction(action, comment);
            logEvent(this, e.eventPhase, e);
            visualizePhase(e.eventPhase === 1 ? 'Capture' : 'Bubble', e);
            
            const endTime = performance.now();
            perfLog.textContent = `Action handled in ${(endTime - startTime).toFixed(2)}ms`;
        }
    });

    // Helper Functions
    function clearEventLog() {
        eventLog.innerHTML = '';
        phaseIndicator.innerHTML = '';
        perfLog.innerHTML = '';
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
        
        let path = event.composedPath()
            .map(el => el.id || el.className || 'unnamed')
            .join(' → ');
            
        eventLog.innerHTML = `
            <div><strong>Event Target:</strong> ${event.target.id || event.target.className}</div>
            <div><strong>Complete Path:</strong> ${path}</div>
            <div><strong>Current Element:</strong> ${elementId} (${phaseName} phase)</div>
        `;
    }

    // Step 2: Practical Applications
    function handleAction(action, comment) {
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

    // Step 3: Event Propagation Control
    function handleDropdownAction(action, comment) {
        event.stopPropagation();
        handleAction(action, comment);
        eventLog.innerHTML += '<div style="color: red">Event propagation stopped! ⛔</div>';
    }

    // Step 4: Event Flow Phases
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

    // Step 5: Event Delegation Implementation
    function setupEventDelegation() {
        let oldHandlerCount = 0;
        let newHandlerCount = 1;

        function updatePerformanceMetrics() {
            const buttons = document.querySelectorAll('[data-action]');
            oldHandlerCount = buttons.length;
            perfLog.innerHTML += `
                <div>Traditional approach: ${oldHandlerCount} handlers</div>
                <div>Delegation approach: ${newHandlerCount} handler</div>
                <div>Memory saved: ${(oldHandlerCount - newHandlerCount) * 4}KB</div>
            `;
        }

        addCommentBtn.addEventListener('click', () => {
            setTimeout(updatePerformanceMetrics, 100);
        });

        updatePerformanceMetrics();
    }

    // Phase Controls
    function setupPhaseToggles() {
        const captureToggle = document.getElementById('capture-toggle');
        const bubbleToggle = document.getElementById('bubble-toggle');
        
        function updatePhases() {
            commentsContainer.removeEventListener('click', handleCapture, true);
            commentsContainer.removeEventListener('click', handleBubble);

            if (captureToggle.checked) {
                commentsContainer.addEventListener('click', handleCapture, true);
            }
            if (bubbleToggle.checked) {
                commentsContainer.addEventListener('click', handleBubble);
            }
        }
        
        captureToggle.addEventListener('change', updatePhases);
        bubbleToggle.addEventListener('change', updatePhases);
        updatePhases();
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

    // Initialize
    setupPhaseToggles();
    setupEventDelegation();
    
    addCommentBtn.addEventListener('click', () => {
        const newComment = createComment('New top-level comment');
        commentsContainer.appendChild(newComment);
    });

    // Handle dropdown actions with stopPropagation
    document.addEventListener('click', function(event) {
        const dropdownAction = event.target.closest('.dropdown-content button');
        if (dropdownAction) {
            event.stopPropagation();
            const action = dropdownAction.dataset.action;
            const comment = dropdownAction.closest('.comment');
            
            dropdownAction.classList.add('stop-indicator');
            setTimeout(() => dropdownAction.classList.remove('stop-indicator'), 1000);
            
            handleAction(action, comment);
            eventLog.innerHTML += '<div style="color: red">Event propagation stopped! ⛔</div>';
        }
    });
});