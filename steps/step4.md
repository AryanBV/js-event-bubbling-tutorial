# Step 4: Event Bubbling vs Capturing

## Two Ways Events Travel
1. Capturing: Top → Down (parent to child)
2. Bubbling: Bottom → Up (child to parent)

## Simple Example
```html
<div id="outer">
    <div id="inner">
        <button>Click Me</button>
    </div>
</div>
```

```javascript
// Capturing (down)
outer.addEventListener('click', () => {
    console.log('1. Outer (capture)');
}, true);

inner.addEventListener('click', () => {
    console.log('2. Inner (capture)');
}, true);

// Bubbling (up)
inner.addEventListener('click', () => {
    console.log('3. Inner (bubble)');
});

outer.addEventListener('click', () => {
    console.log('4. Outer (bubble)');
});
```

When you click the button, you'll see:
```
1. Outer (capture)
2. Inner (capture)
3. Inner (bubble)
4. Outer (bubble)
```

## Toggle Between Phases
```javascript
function setupPhaseDemo() {
    const checkbox = document.getElementById('show-capture');
    
    checkbox.addEventListener('change', event => {
        // true = capture phase, false = bubble phase
        useCapture = event.target.checked;
        setupListeners(useCapture);
    });
}
```