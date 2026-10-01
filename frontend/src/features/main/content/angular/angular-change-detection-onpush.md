# Angular Change Detection and OnPush Strategy

Angular's default change detection checks every component in the tree on every possible event (a click, an HTTP response, a timer) — `OnPush` lets you tell Angular "only re-check this component when I explicitly tell you something relevant changed," which is one of the most impactful performance techniques in a large Angular app.

## Short Answer

By default (`ChangeDetectionStrategy.Default`), Angular re-runs change detection for **every component in the entire tree** whenever any asynchronous event fires anywhere in the app (a click, an HTTP response, a `setTimeout`) — checking every template binding to see if anything changed. `OnPush` restricts a component to only being re-checked when one of a few specific triggers occurs: one of its `@Input()` references changes, an event originates from within the component itself, or an observable bound via the `async` pipe emits.

## Default Change Detection

```typescript
@Component({ selector: 'app-item', template: `{{ item.name }}` })
export class ItemComponent {
  @Input() item!: Item
}
```

- With the default strategy, **every** component's template is re-checked on every change detection cycle, regardless of whether that specific component's data could plausibly have changed. In a large app with hundreds of components, this becomes measurably expensive, especially in components rendering large lists.

## OnPush Strategy

```typescript
@Component({
  selector: 'app-item',
  template: `{{ item.name }}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() item!: Item
}
```

With `OnPush`, this component is only re-checked when:

1. An `@Input()` property receives a **new reference** (not just a mutated property on the same object — see below).
2. An event originates from inside the component itself (a `(click)` handler on its own template).
3. An `Observable` bound via the `async` pipe in its template emits a new value.
4. Change detection is manually triggered (`ChangeDetectorRef.markForCheck()`).

## The Critical Gotcha: Reference Equality, Not Deep Equality

```typescript
// Parent component
updateItemName(item: Item) {
  item.name = 'Updated'; // MUTATES the existing object - OnPush child will NOT re-render!
}

updateItemNameCorrectly(item: Item) {
  this.item = { ...item, name: 'Updated' }; // NEW reference - OnPush child WILL re-render
}
```

- `OnPush` checks whether the `@Input()` binding received a **different object reference**, not whether any property on the existing object changed. Mutating a property on the same object in place is invisible to `OnPush`'s check — the reference passed to `@Input()` never actually changed, so Angular has no signal to re-check that component.
- This is exactly why `OnPush` pushes you toward **immutable data patterns** — always creating new objects/arrays instead of mutating existing ones — which also happens to align naturally with patterns like NgRx/Redux-style state management.

## Common Mistake

Adopting `OnPush` throughout an app without also adopting immutable update patterns — this produces components that silently stop re-rendering when their bound data is mutated in place, a bug that's easy to miss in development (since it "usually" seems to work, until a specific mutation-based update path is hit) and confusing to debug later, since nothing throws an error — the UI just quietly doesn't reflect an actual, real underlying data change.

## Summary

Default change detection re-checks every component on every async event, which scales poorly in large component trees. `OnPush` restricts a component to being re-checked only on new `@Input()` references, internal events, or `async`-piped observable emissions — a significant performance win, but one that requires committing to immutable data updates throughout the app, since `OnPush` can't detect in-place mutation of an existing object/array reference.
