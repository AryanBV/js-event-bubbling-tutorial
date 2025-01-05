# JavaScript Event Bubbling Tutorial

A practical tutorial to understand Event Bubbling in JavaScript through a real-world comment system application.

## Learning Objectives

By the end of this tutorial, you will:
1. Understand the concept of event bubbling and how events propagate in the DOM
2. Identify problems where event bubbling can be utilized for better solutions
3. Learn to prevent event bubbling using event.stopPropagation()
4. Understand the difference between event bubbling and event capturing
5. Implement event delegation by leveraging event bubbling

## Project Structure

```
js-event-bubbling-tutorial/
├── index.html         # Main HTML file with our comment system
├── styles.css         # Styles for visual feedback and layout
├── script.js          # JavaScript code demonstrating event bubbling
└── steps/            # Step-by-step tutorial documentation
    ├── step1.md      # Understanding Event Bubbling
    ├── step2.md      # Identifying Use Cases
    ├── step3.md      # Preventing Event Bubbling
    ├── step4.md      # Event Bubbling vs Capturing
    └── step5.md      # Event Delegation Implementation
```

## Application Overview

This tutorial uses a comment system to demonstrate event bubbling concepts:
- Nested comment structure (parent comments and replies)
- Interactive elements (like buttons, reply buttons)
- Visual feedback for event propagation
- Dynamic comment management
- Event delegation implementation

## Prerequisites

- Basic understanding of HTML, CSS, and JavaScript
- Familiarity with DOM manipulation
- Basic understanding of event handlers in JavaScript

## Getting Started

1. Clone this repository:
```bash
git clone https://github.com/AryanBV/js-event-bubbling-tutorial.git
```

2. Open the project in your preferred code editor

3. Follow along with the step-by-step tutorials in the `steps` folder

## Tutorial Steps

1. **Basic Event Bubbling** (step1.md)
   - Set up basic comment structure
   - Add event listeners
   - Visualize event bubbling flow

2. **Practical Use Cases** (step2.md)
   - Dynamic comment addition
   - Event handling efficiency

3. **Controlling Event Propagation** (step3.md)
   - Using stopPropagation()
   - Understanding when to prevent bubbling

4. **Event Flow Deep Dive** (step4.md)
   - Event capturing vs bubbling
   - Practical applications of both phases

5. **Event Delegation** (step5.md)
   - Implementing efficient event handling
   - Managing dynamic elements
