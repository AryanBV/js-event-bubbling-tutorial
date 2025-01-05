# Step 2: Practical Uses of Event Bubbling

## Why Use Event Bubbling?
Instead of adding a click handler to every button, add one handler to their parent. This is called event delegation.

## Comment System Example

### Before (Without Event Bubbling):
```javascript
// Need to add handlers to each button
document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', handleLike);
});
document.querySelectorAll('.reply-button').forEach(button => {
    button.addEventListener('click', handleReply);
});
```

### After (With Event Bubbling):
```javascript
// One handler for all buttons
document.getElementById('comments').addEventListener('click', event => {
    if (event.target.matches('.like-button')) {
        handleLike(event);
    }
    if (event.target.matches('.reply-button')) {
        handleReply(event);
    }
});
```

## Benefits:
1. Works with new buttons automatically
2. Less code to write
3. Better performance
4. Easier to manage

## Example: Adding New Comments
```javascript
function addComment(text) {
    const comment = document.createElement('div');
    comment.innerHTML = `
        <p>${text}</p>
        <button class="like-button">Like</button>
        <button class="reply-button">Reply</button>
    `;
    commentsContainer.appendChild(comment);
    // No need to add click handlers!
}
```