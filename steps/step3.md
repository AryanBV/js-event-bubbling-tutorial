# Step 3: Controlling Event Propagation

## Learning Objectives
- Understanding event.stopPropagation()
- Identifying when to stop event bubbling
- Implementing propagation control in comment system

## Implementation Steps

### 1. Add Nested Action Menus
```javascript
function createNestedMenu(comment) {
    return `
        <div class="comment-content">
            <p>${comment.text}</p>
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
            </div>
        </div>
    `;
}
```

### 2. Control Event Propagation
```javascript
// Prevent dropdown menu from triggering parent handlers
document.querySelector('.dropdown').addEventListener('click', function(event) {
    if (event.target.matches('[data-action="edit"], [data-action="delete"]')) {
        event.stopPropagation();
        handleNestedAction(event.target.dataset.action, this.closest('.comment'));
    }
});

function handleNestedAction(action, comment) {
    switch(action) {
        case 'edit':
            // Edit functionality
            break;
        case 'delete':
            // Delete functionality
            break;
    }
}
```

### 3. Add Visual Indicators
```css
.event-stopped {
    position: relative;
}

.event-stopped::after {
    content: '🛑';
    position: absolute;
    right: -20px;
    animation: fadeIn 0.3s;
}
```

## Use Cases for stopPropagation()

1. Nested Menus
   - Prevent parent menu actions when using submenus
   - Example: Options dropdown within comment actions

2. Modal Windows
   - Stop clicks inside modal from closing it
   - Keep event handling contained

3. Independent Components
   - Isolate component event handling
   - Prevent unwanted parent reactions

## Exercise: Implementing Propagation Control

1. Add Options Menu:
   - Create dropdown with Edit/Delete
   - Stop propagation for dropdown actions
   - Show visual feedback when propagation stops

2. Test Different Cases:
   - Click regular actions (should bubble)
   - Click dropdown actions (should not bubble)
   - Verify event path display

## Next Steps
In Step 4, we'll explore event capturing and how it differs from bubbling.