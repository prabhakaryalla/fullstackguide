# Idempotency Keys for Safe API Retries

A network timeout doesn't tell you whether the request actually succeeded on the server before the response was lost — retrying a "create payment" call blindly risks charging a customer twice. Idempotency keys let a client safely retry a non-idempotent operation without that risk.

## Short Answer

The client generates a unique key (typically a GUID) once per logical operation and sends it with every attempt (including retries) of that same operation, usually in an `Idempotency-Key` header. The server remembers which keys it has already processed and, for a repeated key, returns the **original** result instead of executing the operation again — turning an inherently non-idempotent operation (like "charge a card") into one that's safe to retry any number of times.

## Why HTTP Method Semantics Alone Aren't Enough

`POST` is defined as non-idempotent by the HTTP spec — calling it twice is explicitly allowed to create two resources. That's exactly the problem for a "charge card" or "place order" endpoint: a client that times out waiting for a response has no idea if the server actually processed the request before the connection dropped, and blindly retrying a `POST` can create a duplicate charge or a duplicate order.

## Implementing an Idempotency Key

```csharp
public class PaymentsController : ControllerBase
{
    [HttpPost("/api/payments")]
    public async Task<IActionResult> ChargeAsync(
        [FromHeader(Name = "Idempotency-Key")] string idempotencyKey,
        ChargeRequest request)
    {
        if (string.IsNullOrEmpty(idempotencyKey))
            return BadRequest("Idempotency-Key header is required.");

        // Has this exact key already been processed? Return the ORIGINAL result, don't charge again.
        var existing = await _idempotencyStore.TryGetAsync(idempotencyKey);
        if (existing is not null)
            return StatusCode(existing.StatusCode, existing.Body);

        var result = await _paymentService.ChargeAsync(request);

        await _idempotencyStore.SaveAsync(idempotencyKey, statusCode: 200, body: result);
        return Ok(result);
    }
}
```

```csharp
// Client side: generate the key ONCE per logical operation, reuse it across every retry attempt
var idempotencyKey = Guid.NewGuid().ToString();

for (int attempt = 0; attempt < 3; attempt++)
{
    var response = await httpClient.PostAsJsonAsync("/api/payments",
        request, new HttpRequestMessage { Headers = { { "Idempotency-Key", idempotencyKey } } });

    if (response.IsSuccessStatusCode) break;
    // on timeout/transient failure, retry with the SAME key - never generate a new one for a retry
}
```

## Designing the Idempotency Store Correctly

- **Store the full response, not just "already processed."** A retried request needs to get back the exact same result the original call would have produced (e.g. the created payment's ID) — not a generic "duplicate" error, which would break clients relying on the response.
- **Guard against concurrent duplicate requests racing each other.** If two identical requests with the same key arrive nearly simultaneously (a client that fires a retry slightly too early), the store needs to atomically claim the key first (e.g. an `INSERT` with a unique constraint on the key) so only one of them actually executes the operation — the other waits for/returns the first one's result rather than both running the charge concurrently.
- **Expire keys after a reasonable window** (hours to days, not forever) — an idempotency key only needs to prevent duplicate processing during the realistic retry window for one logical operation, not act as a permanent audit log.
- **Scope keys per client/tenant**, not globally — two different customers should never collide on the same key by coincidence.

## Common Mistake

Generating a *new* idempotency key on every retry attempt "to be safe." That defeats the entire purpose — a new key on each attempt means the server sees each retry as a brand-new, never-seen-before request, and processes (and potentially duplicates) it every time. The key must stay identical across every retry of the *same* logical operation.

## Summary

Idempotency keys let a client safely retry an inherently non-idempotent operation (like a payment charge) after a network failure, timeout, or ambiguous response, by having the server recognize and short-circuit a repeated key instead of re-executing the operation. The key is generated once per logical operation and reused across every retry — never regenerated — and the server must store enough to return the original result, not just a "duplicate" flag.
