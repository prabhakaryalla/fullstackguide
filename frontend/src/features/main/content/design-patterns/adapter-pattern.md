# Adapter Pattern

The Adapter pattern lets two incompatible interfaces work together by wrapping one of them in a translator class — without modifying either the existing client code or the incompatible class it needs to talk to.

## Short Answer

An Adapter implements the interface your code already expects, and internally translates each call into whatever the wrapped, incompatible class actually needs — letting you plug in a third-party library, legacy class, or any interface mismatch without touching either side's existing code.

## The Problem: Two Interfaces That Don't Match

```csharp
// Your application code expects this interface:
public interface IPaymentProcessor
{
    bool ProcessPayment(decimal amount, string currency);
}

// But the third-party SDK you need to integrate looks like this, and you can't change it:
public class LegacyPaymentGateway
{
    public int ChargeCard(int amountInCents, string currencyCode) { /* ... */ return 200; }
}
```

Your application code calls `IPaymentProcessor.ProcessPayment(decimal, string)`, but the library you need to use has an entirely different method name, parameter types (cents as an int, not decimal dollars), and return type (an HTTP-style status code, not a bool).

## Applying Adapter

```csharp
public class LegacyPaymentGatewayAdapter : IPaymentProcessor
{
    private readonly LegacyPaymentGateway _legacyGateway;
    public LegacyPaymentGatewayAdapter(LegacyPaymentGateway legacyGateway) => _legacyGateway = legacyGateway;

    public bool ProcessPayment(decimal amount, string currency)
    {
        int amountInCents = (int)(amount * 100); // translate: dollars -> cents
        int statusCode = _legacyGateway.ChargeCard(amountInCents, currency);
        return statusCode == 200; // translate: status code -> bool
    }
}

IPaymentProcessor processor = new LegacyPaymentGatewayAdapter(new LegacyPaymentGateway());
processor.ProcessPayment(19.99m, "USD"); // application code never knows about LegacyPaymentGateway directly
```

- The rest of the application only ever depends on `IPaymentProcessor` — it has no idea `LegacyPaymentGateway` even exists, and no idea it uses cents-as-int instead of decimal dollars.
- If the legacy gateway is later replaced with a different provider, only the adapter needs to change — application code that depends on `IPaymentProcessor` is completely unaffected.

## When to Use It

- Integrating a third-party library or legacy code whose interface doesn't match what your application code expects, and you can't (or shouldn't) modify that external code directly.
- Migrating from an old interface to a new one gradually — an adapter lets new code use the new interface while the adapter internally still calls the old implementation, until it's eventually fully replaced.

## Adapter vs Decorator: Don't Confuse Them

- **Adapter** changes an interface to match what the caller expects — the wrapped object's interface is genuinely incompatible with what's needed.
- **Decorator** keeps the *same* interface as what it wraps, and adds extra behavior around it — the interfaces already match; the point is adding behavior, not translating between mismatched ones.

## Common Mistake

Writing an adapter that does more than pure translation — if an adapter starts adding business logic beyond converting types/method signatures, it's taking on responsibilities that belong elsewhere (either in the calling code, or in a dedicated service), and becomes harder to reason about as "just a translation layer."

## Summary

Adapter resolves an interface mismatch by wrapping the incompatible class in a translator that implements the interface your code already expects — letting you integrate third-party libraries, legacy code, or any mismatched interface without modifying either side. It's distinct from Decorator, which keeps the same interface and adds behavior rather than translating between different ones.
