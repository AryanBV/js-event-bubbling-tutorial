# Step 5: Event Delegation

## What is Event Delegation?
Using event bubbling to handle events on multiple elements with a single listener. Like having one person manage multiple buttons instead of one person per button.

## How It Works
```html
<div id="comments">
    <div class="comment">
        <button class="like">Like</button>
    </div>
    <div class="comment">
        <button class="like">Like</button>
    </div>
</div>
```

```javascript
// Instead of this:
document.querySelectorAll('.like').forEach(button => {
    button.addEventListener('click', handleLike);
});

// Do this:
document.getElementById('comments').addEventListener('click', event => {
    if (event.target.matches('.like')) {
        handleLike(event);
    }
});
```

## Benefits
1. Works with new elements automatically
2. Less memory usage
3. Better performance
4. Cleaner code

## Performance Check
```javascript
// Add performance tracking
commentsContainer.addEventListener('click', event => {
    const start = performance.now();
    
    handleAction(event);
    
    const end = performance.now();
    console.log(`Handled in ${end - start}ms`);
});
```