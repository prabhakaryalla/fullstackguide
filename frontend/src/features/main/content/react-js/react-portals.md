# React Portals

A Portal lets you render a child component's output into a completely different part of the DOM tree than where the component is logically nested in React — essential for UI like modals, tooltips, and dropdowns that need to visually escape a parent's layout constraints (like `overflow: hidden` or a low `z-index` stacking context).

## Short Answer

`ReactDOM.createPortal(children, domNode)` renders `children` into `domNode` in the actual DOM, while keeping the component in its normal place in the **React tree** — meaning event bubbling, context, and component lifecycle all behave exactly as if it were rendered in its original location, even though visually it's somewhere else entirely in the page.

## The Problem Portals Solve

```tsx
function App() {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <Modal>This modal gets visually clipped by the parent's overflow:hidden!</Modal>
    </div>
  )
}
```

A modal, tooltip, or dropdown nested deep inside a component with `overflow: hidden`, a constrained `z-index` stacking context, or `position: relative` ancestors can get visually clipped or layered incorrectly — no amount of CSS on the modal itself reliably fixes this, because the problem is the ancestor's layout, not the modal's own styles.

## The Fix: Render Into a Different DOM Node

```tsx
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal-overlay">{children}</div>,
    document.getElementById('modal-root') // a sibling of #root, outside any clipping ancestor
  )
}
```

```html
<body>
  <div id="root"></div>
  <div id="modal-root"></div> <!-- Modal renders HERE in the actual DOM -->
</body>
```

The modal's actual DOM position is now a direct child of `<body>`, completely unaffected by any CSS on components further up the React tree — while still being written and used exactly like a normal nested component from the code's perspective.

## Events Still Bubble Through the React Tree, Not the DOM Tree

```tsx
function App() {
  return (
    <div onClick={() => console.log('App div clicked')}>
      <Modal>
        <button onClick={() => console.log('Button clicked')}>Click me</button>
      </Modal>
    </div>
  )
}
```

Clicking the button inside the portal-rendered modal logs **both** "Button clicked" *and* "App div clicked" — even though, in the actual DOM, the button lives outside `<div id="root">` entirely, nowhere near the `onClick`-handling `<div>`. React's synthetic event system bubbles according to the **React component tree** (where `Modal` is logically nested inside `App`), not the physical DOM tree — this is exactly why context, event handlers, and lifecycle all keep working normally through a portal.

## Common Mistake

Assuming a portal's contents are "outside React" once rendered elsewhere in the DOM. They aren't — a portal only changes *where in the DOM* something renders; it remains fully part of the same React tree for context, state, event bubbling, and reconciliation purposes. Bugs usually come from the opposite assumption: forgetting that click-outside-to-close logic based on DOM traversal (`event.target.closest(...)`) needs to account for the fact that the portal's DOM location is physically elsewhere.

## Real-World Example

A design system's `<Tooltip>` component is used inside a scrollable data table cell with `overflow: hidden` (needed so long cell text truncates properly). Without a portal, the tooltip gets clipped by the cell's overflow the moment it needs to extend beyond the cell's bounds. Rendering the tooltip's content through a portal into a dedicated `#tooltip-root` at the end of `<body>` lets it visually float above everything, entirely unaffected by the table cell's own layout constraints — while `props`, `context`, and hover/focus event handling all continue to work exactly as if it were rendered inline.

## Summary

Portals decouple *where something renders visually in the DOM* from *where it lives logically in the React tree* — solving CSS containment problems (clipping, stacking contexts) for UI like modals and tooltips, without giving up React's normal event bubbling, context propagation, or component lifecycle behavior.
