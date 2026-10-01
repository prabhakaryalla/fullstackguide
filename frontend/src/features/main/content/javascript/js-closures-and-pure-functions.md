# JavaScript Closures and Pure Functions

Closures and pure functions are two foundational concepts behind most JavaScript design patterns — from React hooks to Redux reducers — and both come up constantly in interviews.

## Short Answer

A closure is a function that "remembers" the variables from the scope in which it was created, even after that outer scope has finished executing. A pure function always returns the same output for the same input and has no side effects (doesn't modify anything outside itself).

## Closures

```js
function makeCounter() {
  let count = 0 // this variable lives in makeCounter's scope

  return function increment() {
    count++ // the inner function "closes over" count
    return count
  }
}

const counter = makeCounter()
console.log(counter()) // 1
console.log(counter()) // 2
console.log(counter()) // 3
```

- `makeCounter()` finishes executing and would normally have its local variables cleaned up — but because `increment` still references `count`, JavaScript keeps that variable alive as part of the closure.
- Each call to `makeCounter()` creates a **new**, independent `count` — closures capture variables by reference to that specific execution's scope, not a shared global.

```archify
diagrams/js-closures.html
```

## Practical Use: Data Privacy / Encapsulation

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance // not accessible from outside directly

  return {
    deposit(amount) { balance += amount; return balance },
    withdraw(amount) { balance -= amount; return balance },
    getBalance() { return balance },
  }
}

const account = createBankAccount(100)
account.deposit(50)
console.log(account.getBalance()) // 150
console.log(account.balance)      // undefined — no direct access, only through the closure's methods
```

- This is how JavaScript achieves "private" state without a formal `private` keyword — the only way to read or change `balance` is through the functions that closed over it.

## Common Closure Pitfall: Loops

```js
// Classic bug — all three logged callbacks share the SAME `i` (function-scoped `var`)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100) // logs 3, 3, 3
}

// Fixed — `let` creates a new binding per iteration
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100) // logs 0, 1, 2
}
```

## Pure Functions

```js
// Pure — same input always produces the same output, no external state touched
function add(a, b) {
  return a + b
}

// Impure — reads external mutable state (result depends on when it's called)
let taxRate = 0.08
function calculateTotal(price) {
  return price + price * taxRate
}

// Impure — mutates its argument (a side effect)
function addItem(cart, item) {
  cart.push(item) // mutates the array passed in
  return cart
}

// Pure version — returns a new array instead of mutating the input
function addItemPure(cart, item) {
  return [...cart, item]
}
```

## Why Pure Functions Matter

- **Predictable** — no hidden dependencies on external state means the function's behavior is fully determined by its arguments.
- **Testable** — no setup/mocking of external state needed; just call it with inputs and assert on the output.
- **Safe to memoize** — since the same input always gives the same output, results can be cached (`useMemo` in React relies on this assumption).
- **Safe for concurrent/parallel execution** — no shared mutable state means no race conditions between pure function calls.

## Common Mistake

Writing a function that *looks* pure (no obvious side effects in the return statement) but secretly mutates one of its object/array arguments — since objects and arrays are passed by reference in JavaScript, mutating a passed-in object affects the caller's data too, breaking purity even without any explicit "global variable" access.

## Summary

Closures let inner functions retain access to variables from their defining scope even after that scope has returned, enabling patterns like private state and factory functions. Pure functions avoid side effects and external dependencies entirely, making code predictable, testable, and safely memoizable — both concepts underpin much of modern JavaScript's functional programming style, including React's hooks and reducers.
