# JavaScript this, call, apply, and bind

`this` in JavaScript is determined by how a function is **called**, not where it's defined — and `call`, `apply`, and `bind` are the three tools for explicitly controlling what `this` refers to.

## Short Answer

- **`this`** — refers to the object a function is invoked on; for a plain function call it's the global object (or `undefined` in strict mode); for a method call it's the object before the dot.
- **`call(thisArg, ...args)`** — invokes the function immediately with a given `this` and individual arguments.
- **`apply(thisArg, argsArray)`** — same as `call`, but arguments are passed as an array.
- **`bind(thisArg)`** — returns a **new** function permanently bound to the given `this`, without invoking it immediately.

## this Depends on the Call Site

```js
const user = {
  name: 'Priya',
  greet() {
    return `Hello, ${this.name}`
  },
}

console.log(user.greet()) // "Hello, Priya" — called as a method, this = user

const detachedGreet = user.greet
console.log(detachedGreet()) // "Hello, undefined" — called plainly, this is NOT user anymore
```

- Assigning `user.greet` to a plain variable and calling it loses the connection to `user` entirely — `this` is determined at call time, not at definition time.

## call — Invoke Immediately With a Specific this

```js
function greet(greeting) {
  return `${greeting}, ${this.name}`
}

const user = { name: 'Priya' }
console.log(greet.call(user, 'Hello')) // "Hello, Priya"
```

- Arguments after `thisArg` are passed individually, just like a normal function call.

## apply — Same as call, but Arguments as an Array

```js
console.log(greet.apply(user, ['Hi'])) // "Hi, Priya"

// Classic use case: passing an array to a function expecting individual arguments
const numbers = [4, 2, 9, 1]
console.log(Math.max.apply(null, numbers)) // 9 — Math.max doesn't accept an array directly
console.log(Math.max(...numbers))          // 9 — modern equivalent using the spread operator
```

- Before the spread operator (`...`), `apply` was the standard way to "spread" an array into a function expecting separate arguments.

## bind — Create a Permanently Bound Function

```js
const boundGreet = greet.bind(user)
console.log(boundGreet('Hey')) // "Hey, Priya" — this is now permanently user, no matter how it's later called

setTimeout(boundGreet, 100, 'Later') // still correctly bound even when called by setTimeout
```

- Unlike `call`/`apply`, `bind` doesn't invoke the function — it returns a new function with `this` locked in, useful for passing a method as a callback without losing its intended `this`.

```archify
diagrams/js-call-apply-bind.html
```

## Real-World Example: Class Methods as Event Handlers

```js
class Button {
  constructor(label) {
    this.label = label
    this.handleClick = this.handleClick.bind(this) // without this, `this` inside handleClick would be undefined/wrong
  }

  handleClick() {
    console.log(`${this.label} clicked`)
  }
}

const btn = new Button('Submit')
document.querySelector('#submit').addEventListener('click', btn.handleClick) // safely bound
```

- This exact pattern (binding methods in the constructor) was extremely common in React class components before hooks/arrow-function class fields simplified it — arrow functions as class fields (`handleClick = () => {...}`) achieve the same result today without an explicit `bind` call, since arrow functions don't have their own `this` and inherit it lexically instead.

## Summary

`this` is resolved based on how a function is invoked, not where it's written — a detached method call loses its intended `this`. `call` and `apply` invoke a function immediately with an explicitly specified `this` (differing only in how arguments are passed), while `bind` returns a new function with `this` permanently fixed, ideal for passing methods as callbacks without losing their context.
