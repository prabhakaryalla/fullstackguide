# Higher-Order Functions and Array Methods in JavaScript

A higher-order function either accepts a function as an argument, returns a function, or both. JavaScript's built-in array methods (`map`, `filter`, `reduce`, etc.) are the most commonly used higher-order functions, replacing manual loops with declarative, intent-revealing code.

## Short Answer

Higher-order functions let you abstract *what* to do with each element (via a callback) separately from *how* to iterate — `map` transforms each element, `filter` selects a subset, `reduce` folds everything into a single accumulated value, and many more built-ins follow this same pattern.

## Without Higher-Order Functions

```js
const numbers = [1, 2, 3, 4, 5]

// Manual loop to add 1 to each number
const incremented = []
for (let i = 0; i < numbers.length; i++) {
  incremented.push(numbers[i] + 1)
}

// Manual loop to filter odd numbers
const odds = []
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 !== 0) odds.push(numbers[i])
}
```

## With Higher-Order Array Methods

```js
const numbers = [1, 2, 3, 4, 5]

const incremented = numbers.map((n) => n + 1)      // [2, 3, 4, 5, 6]
const odds = numbers.filter((n) => n % 2 !== 0)    // [1, 3, 5]
const sum = numbers.reduce((total, n) => total + n, 0) // 15
```

- `map`/`filter`/`reduce` state the *intent* directly ("transform," "select," "accumulate") rather than the mechanics of index-based iteration — easier to read and less error-prone (no off-by-one bugs).

## Core Array Methods Reference

```js
[4, 5, 6, 7].map(x => x * 2)               // [8, 10, 12, 14] — transform each element
[4, 5, 6, 7].filter(x => x > 5)            // [6, 7] — keep elements matching a condition
[4, 5, 6, 7].find(x => x > 5)              // 6 — first matching element (or undefined)
[4, 5, 6, 7].findIndex(x => x > 5)         // 2 — index of the first match
[4, 5, 6, 7].every(x => x > 0)             // true — do ALL elements match?
[4, 5, 6, 7].some(x => x > 6)              // true — does AT LEAST ONE match?
[4, 5, 6, 7].reduce((acc, x) => acc + x, 0) // 22 — fold into a single value
[4, 5, 6, 7].includes(6)                    // true — does the array contain this value?
[4, 5, 6, 7].forEach(x => console.log(x))   // iterate for side effects, returns undefined
```

## reduce — The Most Versatile (and Most Misunderstood)

```js
// Sum
const total = [1, 2, 3].reduce((acc, n) => acc + n, 0) // 6

// Group by a property — reduce can build any shape, not just a single number
const people = [{ name: 'A', dept: 'Sales' }, { name: 'B', dept: 'IT' }, { name: 'C', dept: 'Sales' }]

const byDept = people.reduce((groups, person) => {
  const key = person.dept
  groups[key] = groups[key] || []
  groups[key].push(person)
  return groups
}, {})
// { Sales: [{...A}, {...C}], IT: [{...B}] }
```

- The second argument to `reduce` is the **initial value** of the accumulator — omitting it causes `reduce` to use the array's first element as the initial accumulator instead, which is a common source of subtle bugs on empty arrays (`[].reduce((a,b)=>a+b)` throws, since there's no first element and no initial value).

## Chaining Higher-Order Methods

```js
const activeUserNames = users
  .filter((user) => user.isActive)
  .map((user) => user.name)
  .sort()
```

```archify
diagrams/js-array-chaining.html
```

- Each method returns a new array, so calls chain naturally left to right — each step focused on one transformation, composing into the full pipeline.

## Custom Higher-Order Functions

```js
function withLogging(fn) {
  return function (...args) {
    console.log(`Calling ${fn.name} with`, args)
    return fn(...args)
  }
}

const loggedAdd = withLogging((a, b) => a + b)
loggedAdd(2, 3) // logs "Calling with [2, 3]", then returns 5
```

- `withLogging` is itself a higher-order function — it takes a function and returns a new, wrapped function, a pattern used constantly in decorators, middleware, and React HOCs.

## Common Mistake

Using `forEach` when you actually want a new array (`forEach` always returns `undefined` — it's for side effects only, not building a result), or using `map` purely for side effects and discarding its return value (should use `forEach` instead, to signal there's no transformed array being produced).

## Summary

Higher-order functions accept or return functions, letting `map`/`filter`/`reduce`/`find`/`some`/`every` express iteration intent declaratively instead of manual loops. `reduce` is the most general — capable of producing sums, grouped objects, or any other accumulated shape — while `map`/`filter` cover the common "transform" and "select" cases most directly and readably.
