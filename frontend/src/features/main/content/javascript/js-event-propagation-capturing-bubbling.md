# Event Propagation: Capturing and Bubbling in JavaScript

When you click a nested element, the click event doesn't just fire on that element — it travels through the DOM tree in two phases, and understanding this is essential for correctly using event listeners, especially with delegation.

## Short Answer

An event first travels **down** from the document root to the target element (the **capturing** phase), then travels back **up** from the target to the root (the **bubbling** phase). Most event listeners are registered for the bubbling phase by default; capturing must be explicitly requested.

## The Three Phases

```archify
diagrams/js-event-propagation-phases.html
```

```html
<div id="outer">
  <div id="inner">
    <button id="btn">Click me</button>
  </div>
</div>
```

```js
document.getElementById('outer').addEventListener('click', () => console.log('outer (bubble)'))
document.getElementById('inner').addEventListener('click', () => console.log('inner (bubble)'))
document.getElementById('btn').addEventListener('click', () => console.log('button (target)'))
```

Clicking the button logs:

```
button (target)
inner (bubble)
outer (bubble)
```

- By default, `addEventListener(type, handler)` listens during the **bubbling** phase — the target's own handler fires first, then each ancestor's handler fires in order, moving outward.

## Listening During the Capturing Phase

```js
document.getElementById('outer').addEventListener(
  'click',
  () => console.log('outer (capture)'),
  { capture: true } // or simply `true` as the third argument
)
```

Clicking the button now logs:

```
outer (capture)
button (target)
inner (bubble)
outer (bubble)
```

- Capturing-phase listeners fire **before** the target's own handler, moving inward from the document root down to the target.

## Stopping Propagation

```js
document.getElementById('inner').addEventListener('click', (e) => {
  e.stopPropagation() // prevents the event from continuing to bubble up to #outer
  console.log('inner handled it, outer will not see this click')
})
```

- `stopPropagation()` halts the event from moving to the next ancestor — but other listeners on the **same** element still run; use `stopImmediatePropagation()` to also block other listeners on the same element.

## Event Delegation — The Practical Payoff of Bubbling

```js
// Instead of attaching a listener to every <li>, attach ONE listener to the parent
document.getElementById('todo-list').addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    console.log('Clicked item:', e.target.textContent)
  }
})
```

```archify
diagrams/js-event-delegation.html
```

- Instead of attaching a separate listener to every list item (expensive for large or dynamically-changing lists), attach one listener to the shared parent and inspect `e.target` to determine which child was actually clicked.
- This automatically works for items added to the list **later**, since the listener is on the stable parent, not the dynamically created children.

## Common Mistake

Calling `e.stopPropagation()` unnecessarily, which can silently break other legitimate functionality relying on that event bubbling further up (e.g., an analytics click-tracker listening at the document level, or a "click outside to close" handler on a modal's backdrop).

## Summary

Every DOM event travels down through ancestors to the target (capturing), then back up through the same ancestors (bubbling) — most listeners run during the bubbling phase by default. `stopPropagation()` halts this travel, and event delegation exploits bubbling to handle events for many (including future) child elements with a single listener on a shared parent.
