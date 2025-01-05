# Step 1: Understanding Event Bubbling

## What is Event Bubbling?
When you click a button inside a div, the click event "bubbles up" through all parent elements. 
Think of dropping a stone in water - the ripples move outward.

## The Comment System Project
We'll build a comment system to show event bubbling in action.

### What You'll Build:
- Comments with like/reply buttons
- Visual feedback when clicking buttons
- See how events move up through elements

### The Code Structure:
1. HTML: Nested comments structure
```html
<div class="comment">
    <button>Like</button>
    <div class="reply">
        <button>Like</button>
    </div>
</div>
```

2. JavaScript: Event handling
```javascript
document.addEventListener('click', event => {
    // Shows which element was clicked
    console.log('Clicked:', event.target);
    // Shows the path the event takes
    console.log('Path:', event.composedPath());
});
```

3. CSS: Visual feedback
```css
.highlight {
    background-color: yellow;
    transition: background-color 0.3s;
}
```

## Key Points:
1. Events start at the clicked element
2. Move up to parent elements
3. Each parent can handle the same event
4. Great for managing multiple similar elements