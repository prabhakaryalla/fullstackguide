# Builder Pattern

The Builder pattern separates the construction of a complex object from its final representation, letting you assemble an object step by step — avoiding a constructor with a dozen optional parameters, or a partially-valid object left in an inconsistent state mid-construction.

## Short Answer

Instead of one large constructor (or many overloaded constructors) trying to cover every combination of optional parameters, a Builder exposes a fluent chain of methods to set each piece of an object's state incrementally, then a final `Build()` method that validates everything and produces the finished, immutable object.

## The Problem Without Builder

```csharp
// Which of these six booleans/strings is which, at the call site? Impossible to tell without checking the signature.
var pizza = new Pizza(12, "Thin", true, false, true, "Extra cheese, light sauce");
```

Constructors with many parameters (especially several of the same type, like multiple `bool`s) are error-prone and unreadable at the call site — there's nothing stopping you from accidentally swapping two arguments of the same type.

## Applying Builder

```csharp
public class Pizza
{
    public int SizeInInches { get; }
    public string Crust { get; }
    public bool ExtraCheese { get; }
    public bool ExtraSauce { get; }
    public List<string> Toppings { get; }

    // Constructor is intentionally internal/private - only the Builder can create a valid Pizza
    internal Pizza(int size, string crust, bool extraCheese, bool extraSauce, List<string> toppings)
    {
        SizeInInches = size;
        Crust = crust;
        ExtraCheese = extraCheese;
        ExtraSauce = extraSauce;
        Toppings = toppings;
    }
}

public class PizzaBuilder
{
    private int _size = 12;
    private string _crust = "Regular";
    private bool _extraCheese;
    private bool _extraSauce;
    private readonly List<string> _toppings = new();

    public PizzaBuilder WithSize(int size) { _size = size; return this; }
    public PizzaBuilder WithCrust(string crust) { _crust = crust; return this; }
    public PizzaBuilder AddExtraCheese() { _extraCheese = true; return this; }
    public PizzaBuilder AddTopping(string topping) { _toppings.Add(topping); return this; }

    public Pizza Build() => new Pizza(_size, _crust, _extraCheese, _extraSauce, _toppings);
}

var pizza = new PizzaBuilder()
    .WithSize(14)
    .WithCrust("Thin")
    .AddExtraCheese()
    .AddTopping("Mushrooms")
    .Build();
```

- Every option at the call site is named explicitly (`.WithCrust("Thin")`, `.AddExtraCheese()`) — there's no ambiguity about which value means what, and no risk of accidentally transposing two same-typed arguments.
- Optional settings simply aren't called — there's no need for a dozen overloaded constructors to cover every combination of "with/without" options.
- The final `Pizza` object is immutable and only ever constructed in a fully valid state, since its constructor is only reachable through the builder.

## Real-World .NET Examples

```csharp
var app = WebApplication.CreateBuilder(args); // WebApplicationBuilder - configures services/middleware step by step
// ... app.Services.AddX(), app.Use(...), etc. ...
var builtApp = app.Build();

var connectionString = new SqlConnectionStringBuilder
{
    DataSource = "server", InitialCatalog = "db", IntegratedSecurity = true
}.ConnectionString;
```

`WebApplicationBuilder` and `SqlConnectionStringBuilder` are both real, widely-used examples of the Builder pattern already present throughout .NET's own APIs.

## When to Use It

- An object has many optional parameters/configuration options, especially several of the same type, where constructor overloads would be ambiguous or unwieldy.
- Construction genuinely happens in distinct steps, and you want to prevent an incompletely-configured object from ever being used.

## Common Mistake

Using Builder for a simple object with only 2-3 straightforward parameters — the added ceremony (a separate builder class, fluent methods) isn't worth it unless the object genuinely has enough optional/combinable configuration to make a plain constructor unwieldy.

## Summary

Builder replaces an unwieldy multi-parameter constructor (or a pile of overloads) with a fluent, step-by-step configuration API, producing a fully-validated, immutable object only once `Build()` is called. It's already a familiar pattern in .NET itself — `WebApplicationBuilder` and `SqlConnectionStringBuilder` both use exactly this approach.
