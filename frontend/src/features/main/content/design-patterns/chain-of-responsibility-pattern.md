# Chain of Responsibility Pattern

Chain of Responsibility passes a request along a sequence of handlers, where each handler decides either to process the request itself or pass it along to the next handler in the chain — decoupling the sender of a request from knowing exactly which handler will ultimately deal with it.

## Short Answer

Each handler implements a common interface with a reference to the "next" handler in the chain. When a request comes in, a handler either processes it (and optionally still passes it along) or forwards it unchanged to the next handler — the sender only ever talks to the first handler, with no knowledge of how many handlers exist or which one will actually act.

## Implementing Chain of Responsibility

```csharp
public abstract class ApprovalHandler
{
    protected ApprovalHandler? Next;
    public ApprovalHandler SetNext(ApprovalHandler next) { Next = next; return next; }
    public abstract void Handle(PurchaseRequest request);
}

public class TeamLeadApproval : ApprovalHandler
{
    public override void Handle(PurchaseRequest request)
    {
        if (request.Amount <= 1000) { Console.WriteLine("Approved by Team Lead"); return; }
        Next?.Handle(request); // beyond my authority - pass it up the chain
    }
}

public class DirectorApproval : ApprovalHandler
{
    public override void Handle(PurchaseRequest request)
    {
        if (request.Amount <= 10000) { Console.WriteLine("Approved by Director"); return; }
        Next?.Handle(request);
    }
}

public class VpApproval : ApprovalHandler
{
    public override void Handle(PurchaseRequest request) => Console.WriteLine("Approved by VP (no further limit)");
}

var teamLead = new TeamLeadApproval();
teamLead.SetNext(new DirectorApproval()).SetNext(new VpApproval());

teamLead.Handle(new PurchaseRequest { Amount = 500 });   // "Approved by Team Lead"
teamLead.Handle(new PurchaseRequest { Amount = 5000 });  // passes through, "Approved by Director"
teamLead.Handle(new PurchaseRequest { Amount = 50000 }); // passes through twice, "Approved by VP"
```

- The caller (`teamLead.Handle(request)`) has no idea how many approval levels exist or which one will ultimately approve the request — it just submits to the front of the chain.
- Adding a new approval level (or reordering them) only requires changing how the chain is wired together (`SetNext` calls) — none of the individual handler classes need to change.

## A Real-World .NET Example: Middleware Pipeline

```csharp
app.Use(async (context, next) =>
{
    // do something before...
    await next(); // pass control to the next middleware in the chain
    // do something after...
});
```

ASP.NET Core's middleware pipeline is a direct, real-world implementation of Chain of Responsibility — each middleware either handles the request (short-circuiting the pipeline) or calls `next()` to pass it along, exactly like each `ApprovalHandler` deciding whether to handle or forward.

## When to Use It

- A request might be handled by one of several possible handlers, and which one should handle it isn't known (or shouldn't be hardcoded) at the call site.
- You want to add, remove, or reorder handling steps without modifying the code that submits requests into the chain.

## Common Mistake

Building a chain where it's unclear whether a request was actually handled by *any* handler — without a final "catch-all" handler (or an explicit way to detect "nothing handled this"), a request can silently fall through the entire chain with no action taken and no error raised.

## Summary

Chain of Responsibility passes a request through a sequence of handlers, each deciding independently whether to process it or forward it onward — decoupling the sender from needing to know which specific handler (if any) will act. ASP.NET Core's middleware pipeline is a direct, familiar real-world example of exactly this pattern.
