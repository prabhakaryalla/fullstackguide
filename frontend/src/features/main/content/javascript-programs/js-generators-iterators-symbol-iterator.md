# Generators, Iterators, and Symbol.iterator

A generator function is a special function that can pause and resume its own execution, yielding a sequence of values one at a time — instead of computing and returning an entire collection up front, it produces values lazily, exactly when the caller asks for the next one.

## The Question

```js
function* countUpTo(max) {
  console.log('generator started')
  for (let i = 1; i <= max; i++) {
    yield i
  }
  console.log('generator finished')
}

const gen = countUpTo(3)
console.log('got the generator object, nothing printed yet')

console.log(gen.next()) // Output?
console.log(gen.next()) // Output?
```

**Output:**

```
got the generator object, nothing printed yet
generator started
{ value: 1, done: false }
{ value: 2, done: false }
```

Calling `countUpTo(3)` does **not** run any of the function's body — it only creates a generator object. The body only starts executing (and only up to the first `yield`) once `.next()` is actually called.

## Why This Happens

- A `function*` (generator function) doesn't execute like a normal function when called — calling it returns a **generator object** (an iterator) immediately, without running any code inside the function body yet.
- Each call to `.next()` resumes execution from wherever it last paused (the very start, the first time), and runs until the next `yield` statement — at which point execution pauses again, and the yielded value is returned wrapped in `{ value, done: false }`.
- Once the function body finishes running entirely (falls off the end, or hits a `return`), the final `.next()` call returns `{ value: returnValue, done: true }`, and further calls just keep returning `{ value: undefined, done: true }`.

## Generators Implement the Iterator Protocol

```js
const gen = countUpTo(3)

for (const num of gen) {
  console.log(num) // 1, 2, 3 - works directly with for...of
}

console.log([...countUpTo(3)]) // [1, 2, 3] - works with spread syntax too
```

- Generator objects automatically implement the **iterator protocol** (they have a `.next()` method returning `{ value, done }`) *and* the **iterable protocol** (they have a `Symbol.iterator` method, which just returns themselves) — this is exactly why they work directly with `for...of`, spread syntax, and `Array.from`, without any extra glue code.

## Implementing a Custom Iterable with Symbol.iterator

```js
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from
    const last = this.to
    return {
      next() {
        return current <= last
          ? { value: current++, done: false }
          : { value: undefined, done: true }
      }
    }
  }
}

console.log([...range]) // [1, 2, 3, 4, 5] - works with spread, because it implements Symbol.iterator
for (const n of range) console.log(n) // also works with for...of
```

- Any plain object that defines a `[Symbol.iterator]` method (returning something with a `.next()` method) becomes usable with `for...of`, spread syntax, destructuring, and anything else that expects an iterable — this is the actual mechanism underlying arrays, strings, `Map`, and `Set` all being iterable, and it's exactly what generators implement automatically for you.
- Writing the same `range` behavior with a generator function is much shorter — `function* range(from, to) { for (let i = from; i <= to; i++) yield i }` — which is the main practical reason generators exist: they're a concise way to implement the iterator protocol without manually managing `next()`/state yourself.

## Common Mistake

Assuming calling a generator function runs its body immediately, the same way a normal function call does. It doesn't — calling `countUpTo(3)` only ever creates the generator object; none of the function's code (including any `console.log` at the very top) runs until the first `.next()` call, which is the same "nothing runs until you ask for a value" laziness that makes generators useful for representing large or infinite sequences without computing them all upfront.

## Summary

Generator functions (`function*`) return a generator object immediately when called, without running any code — each `.next()` call resumes execution up to the next `yield`. Generators automatically implement both the iterator and iterable protocols, which is why they work directly with `for...of` and spread syntax. The same iterable behavior can be implemented manually on any object via a `[Symbol.iterator]` method, but generators offer a far more concise way to write it.
