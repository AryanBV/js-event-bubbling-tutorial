# Step 5: Event Delegation

## Learning Objectives
- Understand event delegation basics
- Implement event delegation in the comment system
- See performance benefits of delegation

## Key Concepts

### What is Event Delegation?
Event delegation lets you handle events on multiple elements with a single listener on their parent. Instead of adding listeners to each button, we add one listener to the container.

### Benefits
1. Better Performance: Fewer event listeners
2. Dynamic Elements: Works with new elements automatically
3. Less Memory Usage: One listener instead of many

## Implementation

### 1. Comment List with Delegation
```javascript
// Before: Multiple listeners
const buttons = document.querySelectorAll('.like-button');
buttons.forEach(button => {
    button.addEventListener('click', handleLike);
});

// After: Single delegated listener
commentsContainer.addEventListener('click', e => {
    if (e.target.matches('.like-button')) {
        handleLike(e);
    }
});
```

### 2. Dynamic Comment Loading
```javascript
function addNewComment() {
    const comment = createComment('New comment');
    commentsContainer.appendChild(comment);
    // No need to add new listeners!
}
```

## Exercise: Convert to Delegation
1. Remove individual button listeners
2. Add container listener for all actions
3. Test with dynamically added comments
4. Compare performance (before/after)

## Tips
- Use e.target.matches() for element checking
- Keep handler logic simple
- Test with different nesting levels

## Next Steps
- Try adding new features using delegation
- Experiment with different event types
- Practice with your own projects