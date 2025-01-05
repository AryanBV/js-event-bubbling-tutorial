# Step 1: Understanding Event Bubbling

In this step, we'll create a comment system that demonstrates how event bubbling works in JavaScript. We'll focus on creating a visual representation of how events propagate up through the DOM tree.

## Learning Objectives
- Understand what event bubbling is
- See how events flow from child to parent elements
- Visualize the event propagation path

## Implementation Steps

### 1. HTML Structure
We'll create a nested comment structure with:
- A main comments container
- A parent comment with a like button
- A nested reply comment with a like button
- Each element will have a unique ID for demonstration

### 2. CSS Styling
We'll add styles to:
- Structure the comments visually
- Add visual feedback when events bubble (highlighting elements)
- Make the propagation path clear to users

### 3. JavaScript Implementation
We'll:
- Add event listeners to multiple levels
- Show visual feedback when events bubble
- Log the event path to the console
- Demonstrate the order of event propagation

## Expected Behavior
1. When clicking a like button:
   - The button itself will highlight first
   - The comment containing the button will highlight next
   - Finally, the comments container will highlight
   - Each step will be visible for a short duration
   - Console logs will show the precise order of event propagation

## Tips for Understanding
- Events bubble up from the target element to its ancestors
- Each element in the path can handle the same event
- The event travels up until it reaches the root or is stopped
- Multiple handlers can respond to the same event

## Next Steps
After completing this step, you'll be ready to:
- Identify practical use cases for event bubbling
- Learn about controlling event propagation