# JavaScript Browser Fundamentals: Window, DOM Access, and Timers

A handful of foundational browser APIs come up in almost every JavaScript interview: the global `window` object, the different ways to query the DOM, and the two timer functions that drive most asynchronous UI behavior.

## Short Answer

`window` is the global object every browser JS environment implicitly runs inside — global variables/functions become its properties automatically. The DOM offers five common query methods, each matching elements differently. `setTimeout` runs a callback once after a delay; `setInterval` repeats it indefinitely until explicitly stopped.

## The Window Object

```js
var globalVar = 'hello'
console.log(window.globalVar) // "hello" — top-level `var` declarations become window properties

function globalFn() {}
console.log(window.globalFn) // the function itself — same reason

window.document.getElementById('header') // fully qualified
document.getElementById('header')        // identical — `document` is itself a property of `window`
```

- Every global variable/function declared with `var` (not `let`/`const`, which are scoped to a "script" record rather than attached to `window`) and every built-in browser API (`document`, `location`, `localStorage`, `fetch`, etc.) is accessible as a property of `window`.

## Accessing the DOM

| Selects By | Selector-like Syntax | Method |
|---|---|---|
| ID | `#demo` | `document.getElementById('demo')` |
| Class | `.demo` | `document.getElementsByClassName('demo')` |
| Tag | `demo` | `document.getElementsByTagName('demo')` |
| CSS Selector (first match) | any CSS selector | `document.querySelector('...')` |
| CSS Selector (all matches) | any CSS selector | `document.querySelectorAll('...')` |

```js
document.getElementById('header')          // single element (or null)
document.getElementsByClassName('card')    // live HTMLCollection
document.querySelector('.card')            // first matching element (or null)
document.querySelectorAll('.card')         // static NodeList of all matches
```

- `querySelector`/`querySelectorAll` accept any valid CSS selector (`'div.card > span:first-child'`), making them the most flexible — generally preferred in modern code over the older, more specific `getElementBy...` methods.
- `getElementsByClassName`/`getElementsByTagName` return a **live** collection (automatically updates if the DOM changes); `querySelectorAll` returns a **static** snapshot taken at call time.

## setTimeout vs setInterval

```js
setTimeout(() => console.log('Runs once, after 2 seconds'), 2000)

const intervalId = setInterval(() => console.log('Runs every 2 seconds'), 2000)
// ... later
clearInterval(intervalId) // must be explicitly stopped, or it repeats forever
```

```archify
diagrams/js-settimeout-vs-setinterval.html
```

- Both are non-blocking — the JS engine continues running other code immediately, only invoking the callback once the delay has elapsed **and** the call stack is free (see the Event Loop topic for the full mechanics).
- Forgetting to `clearInterval()` when a component/page no longer needs it is a common source of memory leaks and "why is this still logging after I navigated away" bugs.

## document.onload vs window.onload

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is fully parsed (but images/styles may still be loading)')
})

window.addEventListener('load', () => {
  console.log('Everything is loaded: DOM, images, stylesheets, scripts')
})
```

- `DOMContentLoaded` (the modern equivalent of `document.onload`) fires once the HTML document has been fully parsed — **before** images, stylesheets, and other external resources finish loading.
- `window.onload`/`load` fires only after absolutely everything on the page (including images) has finished loading — always fires later than `DOMContentLoaded`.

## ES6 Classes (Brief Refresher)

```js
class Vehicle {
  constructor(make) {
    this.make = make
  }

  describe() {
    return `A ${this.make} vehicle`
  }
}

const car = new Vehicle('Toyota')
console.log(car.describe()) // "A Toyota vehicle"
```

- `class` syntax is primarily syntactic sugar over JavaScript's existing prototype-based inheritance model (see the Prototypal Inheritance topic) — it doesn't introduce a fundamentally new object model, just a cleaner way to express the same mechanics.

## Summary

`window` is the implicit global object underpinning every browser JS environment, with `var` declarations and built-in browser APIs attached to it as properties. The DOM offers ID/class/tag/CSS-selector-based query methods, with `querySelector`/`querySelectorAll` being the most flexible modern default. `setTimeout` fires once after a delay; `setInterval` repeats until explicitly cleared — and `DOMContentLoaded` fires meaningfully earlier than the full `window` `load` event, a distinction that matters for performance-sensitive startup code.
