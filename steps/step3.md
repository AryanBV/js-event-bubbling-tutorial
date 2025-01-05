# Step 3: Controlling Event Bubbling

## What is stopPropagation()?
Stops an event from bubbling up to parent elements. Like putting up a barrier to stop the ripples.

## When to Use It?
1. Dropdown menus
2. Modal windows
3. When you don't want parent handlers to run

## Example: Dropdown Menu
```html
<div class="comment">
    <div class="dropdown">
        <button>Options ▼</button>
        <div class="menu">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
</div>
```

```javascript
// Stop dropdown clicks from triggering comment actions
document.querySelector('.dropdown').addEventListener('click', event => {
    event.stopPropagation();  // Stop here!
    // Handle dropdown action
});

// Won't run for dropdown clicks
document.querySelector('.comment').addEventListener('click', event => {
    // Comment actions
});
```

## Visual Example:
```javascript
dropdownButton.addEventListener('click', event => {
    event.stopPropagation();
    dropdownButton.classList.add('stopped-here');
    setTimeout(() => {
        dropdownButton.classList.remove('stopped-here');
    }, 1000);
});
```