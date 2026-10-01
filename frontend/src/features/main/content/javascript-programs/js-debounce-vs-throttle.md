# Implementing Debounce vs Throttle From Scratch

Both debounce and throttle limit how often a function runs in response to a rapidly-firing event (typing, scrolling, resizing) — but they enforce that limit with different rules, and mixing them up produces subtly different (and often wrong) behavior.

## The Question

```js
// Given a function fired on every keystroke/scroll/resize event, how do you
// limit how often the expensive handler actually runs?

function expensiveSearch(query) {
  console.log('Searching for:', query)
}
```

**The two answers:**

- **Debounce**: only run the function after the events **stop** arriving for a given delay — every new event resets the timer, so a function only fires once the user pauses.
- **Throttle**: run the function at most **once per fixed interval**, no matter how many events arrive — guarantees a steady, capped execution rate even during continuous, uninterrupted activity.

## Implementing Debounce

```js
function debounce(fn, delay) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId) // cancel any previously scheduled call
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

const debouncedSearch = debounce(expensiveSearch, 300)

input.addEventListener('input', (e) => debouncedSearch(e.target.value))
// Typing "hello" fast: expensiveSearch only runs ONCE, 300ms after the LAST keystroke
```

- Every call to the debounced function cancels the previously scheduled timer and starts a new one — so as long as calls keep arriving faster than the delay, the wrapped function never actually runs.
- The wrapped function only fires once activity genuinely pauses for the full delay — ideal for search-as-you-type (don't hit the API on every keystroke, only once the user stops typing) or window-resize handlers (only recalculate layout once resizing has settled).

## Implementing Throttle

```js
function throttle(fn, interval) {
  let lastCallTime = 0

  return function (...args) {
    const now = Date.now()
    if (now - lastCallTime >= interval) {
      lastCallTime = now
      fn.apply(this, args)
    }
  }
}

const throttledScrollHandler = throttle(() => console.log('scroll position:', window.scrollY), 200)

window.addEventListener('scroll', throttledScrollHandler)
// Scrolling continuously: the handler fires AT MOST once every 200ms, throughout the entire scroll
```

- Unlike debounce, throttle **does** let the function run periodically even during continuous activity — it just caps the rate, guaranteeing no more than one execution per interval.
- Ideal for scroll/mousemove handlers where you need periodic updates *during* continuous activity (a progress indicator, an infinite-scroll trigger) — debounce would never fire at all until scrolling fully stops, which is the wrong behavior here.

## The Key Behavioral Difference, Side by Side

```
Events arrive:     |--|--|--|--|--|--|--|--|--|--| (continuous activity, no pause)

Debounce(300ms):    (nothing fires until activity stops for 300ms, THEN fires once)

Throttle(200ms):    fires--------fires--------fires--------fires (fires periodically throughout)
```

- Debounce: "wait for silence, then act once."
- Throttle: "act periodically, no matter how much noise there is."

## Common Mistake

Using debounce for a scroll-position/progress-tracking handler — since debounce only fires after activity stops, a user who scrolls continuously without pausing would never see the handler run until they finally stop scrolling entirely, which is rarely the desired UX for something like an infinite-scroll loader that needs to trigger *during* scrolling, not just after it ends.

## Summary

Debounce delays execution until the event stream goes quiet for a specified duration — every new event resets the clock, so it's ideal for "act once the user is done" scenarios (search-as-you-type, resize settling). Throttle guarantees execution at a steady, capped rate throughout continuous activity — ideal for "keep reacting periodically while this keeps happening" scenarios (scroll position tracking, drag handlers). Picking the wrong one produces working-looking code with the wrong actual behavior under load.
