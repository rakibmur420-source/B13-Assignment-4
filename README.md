

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

ANS:- getElementById() is used to select one element using its unique id. It always returns a single element and is very fast.

getElementsByClassName() selects multiple elements that have the same class name. It returns an HTMLCollection, it's live ,it updates automatically when the DOM changes.

querySelector() selects the first element that matches a CSS selector.
querySelectorAll() selects all matching elements and returns a NodeList.

getElementById -> single element by id
getElementsByClassName -> multiple elements by class
querySelector / querySelectorAll -> flexible, CSS-selector based

### 2. How do you create and insert a new element into the DOM?

ANS:- A new element is created using document.createElement().
Content can be added using innerText or innerHTML.

To insert the element into the DOM, methods like appendChild(), prepend(), or insertBefore() are used.

This process allows JavaScript to dynamically add content to a webpage, which is essential for interactive web applications.

### 3. What is Event Bubbling? And how does it work?

ANS:-  Event Bubbling is a process in JavaScript where an event starts from the target element and then propagates upward through its parent elements up to the document.

exp, if a button is inside a div and the button is clicked, the event first triggers on the button, then on the div, then on the body.

By default, most JavaScript events follow the bubbling phase.
Understanding event bubbling helps in handling events efficiently.

### 4. What is Event Delegation in JavaScript? Why is it useful?

ANS :- Event Delegation is a technique where a single event listener is added to a parent element instead of adding listeners to multiple child elements.

It works using event bubbling. The parent detects which child triggered the event using event.target.

Why it is useful:
 1. Reduces the number of event listeners
 2. improves performance
 3. Works for dynamically added elements

Because of these benefits, it is widely used in modern web development.

### 5. What is the difference between preventDefault() and stopPropagation() methods?

ANS:-  preventDefault() stops the default behavior of an element.
exp: preventing a form from submitting or stopping a link from opening.

stopPropagation() stops the event from bubbling to parent elements.

preventDefault() -> stops default action
stopPropagation() -> stops event flow

