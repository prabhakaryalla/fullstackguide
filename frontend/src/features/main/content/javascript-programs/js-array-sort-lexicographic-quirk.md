# Array.prototype.sort()'s Default Lexicographic Sort Quirk

`Array.prototype.sort()` doesn't sort numbers numerically by default — it converts every element to a **string** first and compares them lexicographically (character by character), which produces a genuinely surprising order for numeric arrays.

## The Question

```js
const numbers = [25, 100, 1]
console.log(numbers.sort()) // Output?
```

**Output:** `[1, 100, 25]`

Not `[1, 25, 100]` — the "obvious" numeric order.

## Why This Happens

- Without a compare function, `sort()` converts each element to a string (via its default `toString()`) and compares those strings **lexicographically** — the same way you'd alphabetize words, character by character, not by numeric value.
- As strings: `"1"`, `"100"`, `"25"`. Comparing character by character: `"1"` comes before `"100"` (both start with `"1"`, and `"1"` is shorter/ends first), and `"100"` comes before `"25"` because the first character `'1'` is less than `'2'` — the comparison never actually looks at the numeric magnitude at all, just the leading characters.

```js
console.log(String(25) < String(100)) // false! "25" > "100" lexicographically ('2' > '1')
console.log(String(100) < String(25)) // true!  "100" < "25" lexicographically ('1' < '2')
```

## The Fix: Always Pass a Compare Function for Numbers

```js
const numbers = [25, 100, 1]

numbers.sort((a, b) => a - b) // ascending numeric sort
console.log(numbers) // [1, 25, 100]

numbers.sort((a, b) => b - a) // descending numeric sort
console.log(numbers) // [100, 25, 1]
```

- The compare function receives two elements and must return: a negative number if `a` should come before `b`, a positive number if `a` should come after `b`, or `0` if they're equal — `a - b` conveniently produces exactly this for numbers.
- `sort()` **without** a compare function is only "correct by accident" for arrays that happen to already sort correctly as strings (e.g. single-digit numbers, or actual string data that's genuinely meant to be sorted alphabetically) — anything with mixed-length numbers is a near-guaranteed bug.

## Where This Bites People

```js
const prices = [9, 25, 100, 3]
console.log(prices.sort()) // [100, 25, 3, 9] - definitely NOT what "sort the prices" meant!
```

A very common, easy-to-miss bug: sorting an array of prices, scores, or any numeric data with `.sort()` and no compare function, then being confused why a larger number (`100`) sorts before a smaller one (`25`) — the code runs without error, and the output even "looks sorted" at a glance if you're not checking carefully, making this an easy bug to ship unnoticed.

## Common Mistake

Assuming `.sort()` "just works" for numbers because it works correctly for small test arrays where every number happens to have the same number of digits (e.g. `[3, 1, 2]` sorts correctly by pure coincidence, since single-digit lexicographic order and numeric order agree). The bug only becomes visible once the array contains numbers with a different number of digits.

## Summary

`Array.prototype.sort()` defaults to lexicographic (string) comparison, not numeric comparison — this "just happens" to look correct for small, same-digit-length numeric arrays, but produces clearly wrong results the moment digit lengths differ. Always pass an explicit compare function (`(a, b) => a - b` for ascending numeric sort) when sorting numbers.
