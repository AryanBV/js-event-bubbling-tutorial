# Step 2: Practical Uses of Event Bubbling

## Learning Objectives
- Identify scenarios where event bubbling is beneficial
- Implement common event bubbling patterns
- Understand efficiency gains from event bubbling

## Implementation Steps

### 1. Dynamic Comment Loading
```javascript
// Before: Adding listeners to each new comment
function createComment(content) {
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `
        <div class="comment-content">
            <p>${content}</p>
            <button class="like-button" data-action="like">Like</button>
            <button class="reply-button" data-action="reply">Reply</button>
            <button class="share-button" data-action="share">Share</button>
        </div>
    `;
    
    // Inefficient: Adding multiple listeners for each new comment
    comment.querySelector('.like-button').addEventListener('click', handleLike);
    comment.querySelector('.reply-button').addEventListener('click', handleReply);
    comment.querySelector('.share-button').addEventListener('click', handleShare);
    
    return comment;
}

// After: Using event delegation
const commentsContainer = document.getElementById('comments-container');
commentsContainer.addEventListener('click', function(event) {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    const comment = button.closest('.comment');

    switch(action) {
        case 'like':
            handleLike(comment);
            break;
        case 'reply':
            handleReply(comment);
            break;
        case 'share':
            handleShare(comment);
            break;
    }
});
```

### 2. Comment Thread Management
```javascript
// Efficient handling of nested comment threads
document.getElementById('comments-container').addEventListener('click', function(event) {
    const toggleButton = event.target.closest('[data-action="toggle"]');
    if (!toggleButton) return;

    const thread = toggleButton.closest('.comment-thread');
    const replies = thread.querySelector('.replies');
    
    if (replies) {
        replies.classList.toggle('collapsed');
        toggleButton.textContent = replies.classList.contains('collapsed') ? 'Show Replies' : 'Hide Replies';
    }
});

// CSS for collapsible threads
.replies.collapsed {
    display: none;
}
```

### 3. Comment Actions Menu
```javascript
// Template for comment with multiple actions
function createCommentTemplate(content) {
    return `
        <div class="comment">
            <div class="comment-content">
                <p>${content}</p>
                <div class="action-menu">
                    <button data-action="like">👍 Like</button>
                    <button data-action="reply">💬 Reply</button>
                    <button data-action="share">↗️ Share</button>
                    <button data-action="report">⚠️ Report</button>
                </div>
            </div>
            <div class="replies"></div>
        </div>
    `;
}

// Single event listener handling all actions
function setupCommentActions() {
    document.getElementById('comments-container').addEventListener('click', function(event) {
        const button = event.target.closest('[data-action]');
        if (!button) return;

        const action = button.dataset.action;
        const comment = button.closest('.comment');

        // Action handlers object for cleaner code
        const actions = {
            like: () => handleLike(comment),
            reply: () => handleReply(comment),
            share: () => handleShare(comment),
            report: () => handleReport(comment)
        };

        if (actions[action]) {
            actions[action]();
        }
    });
}
```

## Benefits of Event Delegation
1. Memory Efficiency
   - Single event listener instead of multiple listeners
   - Reduced memory usage for large comment threads
   - Better performance with deeply nested comments

2. Dynamic Content Handling
   - New comments work automatically
   - No need to rebind event listeners
   - Simplified code maintenance

3. Cleaner Implementation
   - Centralized event handling
   - Easier to add new actions
   - Consistent behavior across all comments

## Exercise: Implementing Event Delegation
1. Update the comment system to use event delegation
2. Add multiple action buttons to each comment
3. Implement collapsible comment threads
4. Add dynamic comment loading functionality

## Next Steps
In the next section, we'll learn about controlling event propagation using `stopPropagation()` and when to use it effectively.