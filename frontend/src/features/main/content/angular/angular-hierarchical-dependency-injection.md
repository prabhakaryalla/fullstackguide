# Hierarchical Dependency Injection in Angular

Angular's dependency injection isn't a single, flat container — it's a **tree** of injectors that mirrors the component tree, and understanding how a service request walks up that tree (and how to deliberately scope a service to just part of the app) is a core senior-level Angular topic.

## Short Answer

Every component (and module) can have its own injector, forming a hierarchy that mirrors the component tree. When a component asks for a dependency, Angular starts at that component's own injector and walks **up** the tree until it finds a provider for that dependency — the first one found wins, which means the *same* service token can resolve to genuinely different instances depending on where in the tree it's requested from.

## The Injector Hierarchy

```
Root Injector (providedIn: 'root', or providers in bootstrapApplication)
  └── ParentComponent's injector (if it has its own `providers` array)
        └── ChildComponent's injector (if IT has its own `providers` array)
              └── GrandchildComponent (no own providers - looks up to Parent, then Root)
```

- A service registered with `@Injectable({ providedIn: 'root' })` gets **one single instance** shared across the entire application — the most common, simplest scoping.
- A service listed in a specific component's `providers: [...]` array gets a **new instance created for that component and shared by all of its descendants** — until a descendant declares its own provider for the same token, which creates yet another, separate instance from that point down.

## Component-Level Providers: Scoping a Service to a Subtree

```typescript
@Component({
  selector: 'app-shopping-cart',
  providers: [CartService], // a NEW CartService instance, scoped to this component and its children
  template: `...`
})
export class ShoppingCartComponent { }
```

```typescript
@Component({ selector: 'app-cart-item', template: `...` })
export class CartItemComponent {
  constructor(private cart: CartService) {} // gets the SAME CartService instance as ShoppingCartComponent
}
```

- Every `CartItemComponent` nested inside a single `ShoppingCartComponent` shares that one `CartService` instance — but if the app has two independent `ShoppingCartComponent`s on the page (e.g. a mini-cart widget and a full cart page), each gets its own, completely separate `CartService` instance, since each has its own component-level provider.
- This is the standard technique for "per-feature" or "per-instance" state — a service that should be shared *within* a feature's component subtree, but reset/isolated between separate instances of that feature elsewhere in the app.

## Why This Matters: A Common Real Bug

```typescript
// Two completely independent CartService instances - NOT sharing cart state,
// even though both components inject "the same" CartService type:
<app-shopping-cart></app-shopping-cart>  <!-- gets its own CartService instance -->
<app-shopping-cart></app-shopping-cart>  <!-- gets a DIFFERENT CartService instance -->
```

A developer expecting `CartService` to always be a true, app-wide singleton (because it's the "same" injectable class) can be surprised when two instances of a component that provides it at the component level end up with independent state — this is the correct, intended behavior of hierarchical DI, not a bug, but it trips people up who don't yet think of DI as tree-shaped.

## Common Mistake

Registering a service in a component's `providers` array when it was actually meant to be a true, single, app-wide instance — accidentally creating multiple independent instances across different parts of the component tree, each with its own separate state, when a single shared state was intended. If genuine app-wide singleton behavior is needed, `providedIn: 'root'` (not a component-level provider) is the correct choice.

## Summary

Angular's DI system is a tree of injectors mirroring the component tree — a dependency lookup starts at the requesting component and walks upward until a provider is found. `providedIn: 'root'` gives a true app-wide singleton; a component's own `providers` array creates a new instance scoped to that component's subtree, which is the standard way to isolate or share state per feature instance, but a common source of confusion when it happens unintentionally.
