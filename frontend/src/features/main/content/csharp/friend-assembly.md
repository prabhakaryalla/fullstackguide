# Friend Assembly in C#

A Friend Assembly lets one assembly access the internal members of another assembly.

In C#, this is done using the InternalsVisibleTo attribute.

## Why It Exists

Normally:

- public members are visible everywhere
- internal members are visible only inside the same assembly

Friend Assembly allows a specific external assembly to see internal members without making them public for everyone.

## Basic Syntax

Add this in the assembly that owns the internal code:

```csharp
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("MyProject.Tests")]
```

Now MyProject.Tests can access internal classes, methods, and properties from MyProject.

## Example

### Production Assembly

```csharp
namespace Billing.Core;

internal class TaxCalculator
{
    internal decimal Calculate(decimal amount) => amount * 0.18m;
}
```

```csharp
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("Billing.Core.Tests")]
```

### Test Assembly

```csharp
using Billing.Core;
using Xunit;

public class TaxCalculatorTests
{
    [Fact]
    public void Calculate_ReturnsExpectedTax()
    {
        var calc = new TaxCalculator();
        var tax = calc.Calculate(100m);

        Assert.Equal(18m, tax);
    }
}
```

Without Friend Assembly, this test could not access TaxCalculator because it is internal.

## Common Use Cases

- Unit testing internal logic
- Keeping APIs clean while sharing internals with trusted tooling assemblies
- Sharing internals between closely related assemblies

## Important Notes

- Only the named assembly gets access.
- Do not use it to bypass good design.
- Prefer testing through public APIs first; use Friend Assembly when internal testing is truly needed.

If assemblies are strong-named, the friend assembly name must include its public key.

## Real-World Analogy

Think of a company building where most rooms are restricted to employees.
A visitor pass gives one trusted external team access to selected internal rooms.

Friend Assembly is that trusted pass for one specific assembly.
