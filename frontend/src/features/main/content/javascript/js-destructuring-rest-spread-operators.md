# Destructuring, Rest, and Spread Operators in JavaScript

Destructuring, rest, and spread all use similar `...`/pattern-matching syntax but serve different purposes: destructuring *extracts* values, rest *collects* remaining values, and spread *expands* a collection into individual elements.

## Short Answer

- **Destructuring** — unpacks values from arrays/objects into distinct variables.
- **Rest (`...`)** — collects multiple remaining elements/properties into a single array/object (used in function parameters and destructuring patterns).
- **Spread (`...`)** — expands an array/object into individual elements/properties (used in function calls, array/object literals).

## Object Destructuring

```js
const user = { name: 'Prabhakar', age: 33, city: 'Kakinada' }

const { name, age } = user
console.log(name, age) // "Prabhakar" 33

const { name: userName } = user // rename while destructuring
console.log(userName) // "Prabhakar"

const { country = 'India' } = user // default value if the property doesn't exist
console.log(country) // "India"
```

## Array Destructuring

```js
const coordinates = [10, 20, 30]
const [x, y] = coordinates
console.log(x, y) // 10 20

const [, , z] = coordinates // skip elements with empty commas
console.log(z) // 30

// Classic swap without a temporary variable
let a = 1, b = 2
;[a, b] = [b, a]
console.log(a, b) // 2 1
```

## Rest — Collecting the Remainder

```js
const { name, ...rest } = user
console.log(name) // "Prabhakar"
console.log(rest) // { age: 33, city: 'Kakinada' } — everything except `name`

function sum(...numbers) { // rest parameter: collects all arguments into an array
  return numbers.reduce((total, n) => total + n, 0)
}
console.log(sum(1, 2, 3, 4)) // 10
```

- In a destructuring pattern, `...rest` must be the **last** element/property — it collects "everything not already destructured."
- In a function signature, a rest parameter lets a function accept any number of arguments as a proper array (replacing the old, array-like-but-not-quite `arguments` object).

## Spread — Expanding a Collection

```js
const numbers = [1, 2, 3]
console.log(Math.max(...numbers)) // 3 — spreads the array into individual arguments

const combined = [...numbers, 4, 5] // [1, 2, 3, 4, 5] — expand into a new array literal
const clone = [...numbers]          // shallow copy of the array

const baseConfig = { theme: 'dark', retries: 3 }
const finalConfig = { ...baseConfig, retries: 5 } // { theme: 'dark', retries: 5 } — override via later spread
```

```archify
diagrams/js-rest-vs-spread.html
```

- The same `...` syntax means "collect" on the left side of an assignment/parameter list (rest) and "expand" on the right side of an assignment/call (spread) — context determines which behavior applies.

## Common Pitfall: Shallow Copies

```js
const original = { name: 'A', address: { city: 'X' } }
const copy = { ...original }

copy.address.city = 'Y'
console.log(original.address.city) // "Y" — the nested object is still shared!
```

- Both spread (`{...obj}`) and `Object.assign({}, obj)` only copy **top-level** properties — nested objects/arrays remain shared references between the original and the copy (see the Shallow vs Deep Clone topic for the full explanation and fixes).

## Real-World Example: Immutable State Updates

```js
function updateUser(state, changes) {
  return { ...state, ...changes } // new object, original state untouched
}

const state = { name: 'A', age: 30 }
const newState = updateUser(state, { age: 31 })
console.log(state.age)    // 30 — original unchanged
console.log(newState.age) // 31
```

- This pattern (spread to create a new object with overrides) is the standard way to update state immutably in React/Redux — never mutating the original object directly, which is essential for React's shallow-comparison-based re-render optimizations to work correctly.

## Summary

Destructuring extracts named values out of objects/arrays into variables; rest (`...`) gathers remaining values into a single array/object, typically as the last element of a pattern or parameter list; spread (`...`) does the inverse — expanding a collection's contents into individual elements/properties, commonly used for immutable copying, merging, and passing array elements as individual function arguments.
