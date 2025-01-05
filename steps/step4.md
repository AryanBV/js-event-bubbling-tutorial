# Step 4: Event Bubbling vs Capturing

## Learning Objectives
- Understand event capturing phase
- Compare bubbling and capturing behaviors
- Implement both phases in comment system
- Visualize event flow in both directions

## Key Concepts

### Event Flow Phases
1. Capture Phase: Event travels down from root to target
2. Target Phase: Event reaches target element
3. Bubble Phase: Event bubbles up from target to root

### Implementation Details

#### 1. Phase Visualization System
```javascript
function setupPhaseDemo() {
    const commentsContainer = document.getElementById('comments-container');
    
    // Capture phase listener
    commentsContainer.addEventListener('click', function(event) {
        if (event.target.matches('[data-action]')) {
            visualizePhase('Capture', event);
        }
    }, true); // true enables capture phase

    // Bubble phase listener
    commentsContainer.addEventListener('click', function(event) {
        if (event.target.matches('[data-action]')) {
            visualizePhase('Bubble', event);
        }
    }); // false (default) for bubble phase
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
    const phaseLog = document.getElementById('phase-log');
    phaseLog.innerHTML += `
        <div class="phase-entry ${phase.toLowerCase()}">
            <strong>${phase} Phase:</strong>
            Target: ${target.dataset.action || 'unknown'} →
            Current: ${current.id || 'container'}
        </div>
    `;
}
```

#### 2. Phase Styles
```css
/* Phase Visualization Styles */
.phase-capture {
    border: 2px solid #4CAF50;
    animation: captureHighlight 0.5s ease;
}

.phase-bubble {
    border: 2px solid #2196F3;
    animation: bubbleHighlight 0.5s ease;
}

@keyframes captureHighlight {
    0% { background-color: rgba(76, 175, 80, 0.2); }
    100% { background-color: transparent; }
}

@keyframes bubbleHighlight {
    0% { background-color: rgba(33, 150, 243, 0.2); }
    100% { background-color: transparent; }
}

.phase-entry {
    padding: 5px;
    margin: 2px 0;
    border-radius: 4px;
}

.phase-entry.capture {
    background-color: #E8F5E9;
}

.phase-entry.bubble {
    background-color: #E3F2FD;
}
```

#### 3. Phase Controls Interface
```html
<div class="phase-controls">
    <label>
        <input type="checkbox" id="capture-toggle" checked>
        Enable Capture Phase
    </label>
    <label>
        <input type="checkbox" id="bubble-toggle" checked>
        Enable Bubble Phase
    </label>
</div>

<div id="phase-log" class="phase-log">
    <h3>Event Phases Log</h3>
</div>
```

#### 4. Phase Toggle Implementation
```javascript
function setupPhaseToggles() {
    const captureToggle = document.getElementById('capture-toggle');
    const bubbleToggle = document.getElementById('bubble-toggle');
    
    function updateListeners() {
        removeAllListeners();
        if (captureToggle.checked) {
            addCaptureListeners();
        }
        if (bubbleToggle.checked) {
            addBubbleListeners();
        }
    }
    
    captureToggle.addEventListener('change', updateListeners);
    bubbleToggle.addEventListener('change', updateListeners);
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

function clearPhaseLog() {
    const phaseLog = document.getElementById('phase-log');
    phaseLog.innerHTML = '<h3>Event Phases Log</h3>';
}
```

## Exercises

### 1. Phase Flow Visualization
Implement the phase visualization system in the comment section:
1. Add capture and bubble phase listeners
2. Create visual indicators for each phase
3. Add a phase log display
4. Test with nested comments

### 2. Phase Control Implementation
Add the ability to control event phases:
1. Implement phase toggle controls
2. Add listener management
3. Create phase-specific handlers
4. Test different phase combinations

### 3. Event Flow Testing
Test various event scenarios:
1. Click actions at different nesting levels
2. Toggle phases on/off
3. Observe event path differences
4. Test with stopPropagation()

## Key Takeaways
1. Events flow in two phases: capture (down) and bubble (up)
2. Capture phase happens before bubble phase
3. Most event handlers use bubble phase by default
4. Capture phase useful for intercepting events early
5. Both phases can be used simultaneously

## Next Steps
After completing this section, you'll be ready for Step 5: Event Delegation, where we'll learn how to leverage bubbling for efficient event handling.