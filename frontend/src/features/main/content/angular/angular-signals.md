# Angular Signals

Signals are Angular's newer, fine-grained reactive primitive — a wrapper around a value that automatically notifies exactly the parts of the app that actually depend on it when it changes, without needing Zone.js or a manual `OnPush` reference-equality dance.

## Short Answer

A `signal()` holds a value and tracks who reads it — when the value changes, only the specific computations/templates that actually read that signal are notified and re-evaluated, not the entire component tree. This gives change detection much finer granularity than the traditional Zone.js-driven, "re-check everything" model, without requiring the immutability discipline `OnPush` demands.

## Creating and Reading a Signal

```typescript
import { signal } from '@angular/core'

export class CounterComponent {
  count = signal(0) // create a signal with an initial value

  increment() {
    this.count.set(this.count() + 1)   // .set() replaces the value
    // or: this.count.update(c => c + 1) // .update() derives the new value from the old one
  }
}
```

```html
<button (click)="increment()">Count: {{ count() }}</button>
```

- Reading a signal's current value is done by **calling it as a function** (`count()`), not accessing a plain property — this is what lets Angular track exactly where a signal is read.
- Unlike a plain component property, updating a signal automatically triggers re-rendering of only the template expressions that actually read it — no `OnPush` reference-equality rules to worry about, no need to create a new object just to trigger a re-render.

## Computed Signals

```typescript
firstName = signal('Ada')
lastName = signal('Lovelace')
fullName = computed(() => `${this.firstName()} ${this.lastName()}`)
```

- `computed()` creates a derived, read-only signal that automatically recalculates whenever any signal it reads inside its function changes — and, importantly, it's **lazy and memoized**: it only recomputes when actually read again after one of its dependencies changed, not on every change detection cycle.
- Dependencies are tracked automatically, just by which signals are called inside the computed function's body — there's no explicit dependency array to maintain (unlike, say, a React `useMemo`'s dependency array).

## Effects: Reacting to Signal Changes

```typescript
effect(() => {
  console.log(`Count changed to: ${this.count()}`) // re-runs automatically whenever count() changes
})
```

- An `effect()` runs a side effect automatically whenever any signal it reads changes — useful for things like logging, syncing to `localStorage`, or imperative DOM work that needs to react to signal changes, outside of template rendering.

## Why Signals, When OnPush Already Exists

- `OnPush` still relies on Angular re-checking a whole component's template when *any* of its tracked triggers fire, and requires strict immutable-reference discipline to work correctly (mutating an object in place is invisible to it, as covered in the `OnPush` topic).
- Signals track dependencies at the level of **individual expressions**, not whole components — and they don't care whether you mutate or replace values, since a signal's own `.set()`/`.update()` is *always* the explicit, trackable point of change, not an ambient property mutation Angular has to infer from reference equality.
- This is a step toward Angular eventually being able to skip Zone.js-based, tree-wide change detection entirely for signal-driven parts of an application — a fundamentally more fine-grained reactivity model, philosophically similar to how frameworks like Vue and Solid.js already work.

## Common Mistake

Mixing signals and traditional mutable component properties inconsistently within the same component, without a clear plan — reading a signal's value outside a reactive context (like directly in a regular method, not inside a template binding, `computed()`, or `effect()`) doesn't get you any of the automatic tracking benefit; it's just a slightly more awkward way to read a plain value at that point.

## Summary

Signals are values that automatically track their own readers and notify exactly those readers (not the whole component tree) when they change, read via calling them as functions (`count()`). `computed()` builds automatically-tracked, memoized derived values, and `effect()` runs side effects reactively in response to signal changes — together forming a more fine-grained alternative to Zone.js-driven change detection and `OnPush`'s reference-equality requirements.
