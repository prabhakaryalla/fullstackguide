# JavaScript Promises and Avoiding Callback Hell

Before Promises, chaining multiple asynchronous operations meant nesting callbacks inside callbacks — "callback hell." Promises give asynchronous code a flat, chainable, and much more readable structure.

## Short Answer

A Promise represents the eventual result of an asynchronous operation — it's either pending, fulfilled (with a value), or rejected (with an error). `.then()` chains let you sequence async steps without nesting, and `async`/`await` is syntactic sugar on top of Promises that makes async code read like synchronous code.

## The Callback Hell Problem

```js
getUser(userId, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      getShippingStatus(details.id, (status) => {
        console.log(status) // 4 levels deep, and this is a small example
      }, handleError)
    }, handleError)
  }, handleError)
}, handleError)
```

- Each step nests inside the previous callback, growing indentation ("the pyramid of doom"), duplicating error handling at every level, and making the actual sequential logic hard to follow.

## Promises Flatten the Chain

```js
getUser(userId)
  .then((user) => getOrders(user.id))
  .then((orders) => getOrderDetails(orders[0].id))
  .then((details) => getShippingStatus(details.id))
  .then((status) => console.log(status))
  .catch((error) => handleError(error)) // one catch handles errors from ANY step above
```

- Each `.then()` returns a new Promise, so the chain stays flat regardless of how many steps are involved.
- A single `.catch()` at the end catches a rejection from any preceding step — no need to repeat error handling at every level.

## Creating a Promise

```js
function delay(ms) {
  return new Promise((resolve, reject) => {
    if (ms < 0) {
      reject(new Error('Delay must be non-negative'))
      return
    }
    setTimeout(() => resolve(`Waited ${ms}ms`), ms)
  })
}

delay(1000).then((message) => console.log(message))
```

- The executor function receives `resolve`/`reject` callbacks — calling `resolve(value)` fulfills the promise, `reject(error)` rejects it.

## async/await — Promises Made to Look Synchronous

```js
async function getShippingStatusForFirstOrder(userId) {
  try {
    const user = await getUser(userId)
    const orders = await getOrders(user.id)
    const details = await getOrderDetails(orders[0].id)
    const status = await getShippingStatus(details.id)
    return status
  } catch (error) {
    handleError(error)
  }
}
```

```archify
diagrams/js-async-evolution.html
```

- `await` pauses execution of the `async` function (without blocking the JS engine's event loop) until the awaited Promise settles, then resumes with its resolved value — or throws if it rejected, which a surrounding `try/catch` handles naturally.

## Promise.all vs Promise.race vs Promise.allSettled

```js
// Wait for all — fails fast if any one rejects
const [user, orders] = await Promise.all([getUser(id), getOrders(id)])

// Wait for the first to settle (resolve or reject), ignore the rest
const first = await Promise.race([fetchFromMirror1(), fetchFromMirror2()])

// Wait for all, but never short-circuits on rejection — get every outcome
const results = await Promise.allSettled([task1(), task2(), task3()])
```

## Common Mistake

Mixing `.then()` chains with `async`/`await` unnecessarily, or forgetting to `await` a Promise-returning function (which silently returns a pending Promise object instead of the resolved value) — a common source of `[object Promise]` bugs when a value is logged or used before it's actually resolved.

## Summary

Promises replace deeply nested, error-handling-duplicated callbacks with a flat, chainable structure representing an eventual async result. `async`/`await` builds on Promises to let asynchronous code read almost identically to synchronous code, with familiar `try`/`catch` error handling — both are fundamentally the same underlying mechanism, just different syntax for expressing it.
