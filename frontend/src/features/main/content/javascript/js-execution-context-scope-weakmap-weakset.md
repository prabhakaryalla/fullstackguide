# Execution Context, Scope, and WeakMap/WeakSet in JavaScript

Understanding how JavaScript sets up code to run (execution context) and where variables are visible (scope) explains hoisting, closures, and `this` all at once — and WeakMap/WeakSet solve a specific memory-management problem regular Map/Set can't.

## Short Answer

An execution context is the environment in which JavaScript code is evaluated and run — it tracks variables, `this`, and the scope chain. Scope determines where a variable is accessible. `WeakMap`/`WeakSet` are like `Map`/`Set` but hold their keys/values **weakly**, allowing the garbage collector to reclaim them when nothing else references them.

## Execution Context

```js
console.log(a) // undefined (not a ReferenceError — var is hoisted)
var a = 10

function foo() {
  console.log(b) // undefined — foo's own execution context, own hoisting
  var b = 20
}
foo()
```

```archify
diagrams/js-execution-context.html
```

- Every function call creates a **new** execution context, pushed onto the call stack; when the function returns, its context is popped off.
- Each execution context goes through a **creation phase** (hoisting `var`/function declarations, setting up `this`) before the **execution phase** actually runs the code — this two-phase process is exactly why `var` and function declarations behave as if they exist before their literal line of code.

## The Global Execution Context

- Created once, automatically, when a script first runs.
- Sets up the global object (`window` in browsers) and `this` at the top level.
- Every other execution context is created "underneath" it, forming a stack.

## Scope: Where a Variable Is Visible

```js
let globalVar = 'I am global'

function outer() {
  let outerVar = 'I am in outer'

  function inner() {
    let innerVar = 'I am in inner'
    console.log(globalVar, outerVar, innerVar) // all three accessible here
  }
  inner()
  console.log(innerVar) // ReferenceError — innerVar is NOT visible outside inner()
}
outer()
```

```archify
diagrams/js-scope-chain.html
```

- This nested visibility (inner scopes see outer variables, but not vice versa) is called the **scope chain** — when a variable isn't found in the current scope, JavaScript walks outward through each enclosing scope until it's found (or throws `ReferenceError`).
- `let`/`const` are **block-scoped** (`{ }` creates a new scope); `var` is **function-scoped** (ignores block boundaries, only respects function boundaries).

## WeakMap and WeakSet

```js
const cache = new WeakMap()

function process(obj) {
  if (cache.has(obj)) return cache.get(obj)
  const result = expensiveComputation(obj)
  cache.set(obj, result)
  return result
}

let data = { value: 42 }
process(data)

data = null // the object is now unreachable from anywhere else...
// ...and the garbage collector CAN reclaim it, along with its cached entry in `cache`
// A regular Map would keep `data` alive forever just by being a key in the map
```

- `WeakMap` keys (and `WeakSet` values) must be objects (not primitives), and they're held **weakly** — if nothing else in the program references that object, the garbage collector can reclaim it, automatically removing the corresponding `WeakMap`/`WeakSet` entry too.
- A regular `Map` would keep the key object alive indefinitely just by holding a reference to it, even if every other part of the program has finished with it — a classic memory leak source when using large objects as cache keys.

## When to Use WeakMap/WeakSet

- Caching computed results keyed by an object, without preventing that object from being garbage collected once it's no longer used elsewhere (as shown above).
- Attaching "private" metadata to an object from outside its class, without needing to expose that property directly and without leaking memory.
- **Cannot** iterate, get a size, or clear a `WeakMap`/`WeakSet` — there's no `.size`, `.keys()`, `.forEach()` — this is a deliberate trade-off, since the collection's contents can change at any moment due to garbage collection, making enumeration unreliable.

## Summary

Each function call gets its own execution context (hoisting + `this` + scope setup, then execution), stacked on top of the global execution context. Scope determines variable visibility via a chain that always looks outward, never inward. `WeakMap`/`WeakSet` behave like their non-weak counterparts but don't prevent their object keys/values from being garbage collected — solving a specific class of memory-leak-prone caching/metadata problems that a regular `Map`/`Set` would create.
