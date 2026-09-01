# Why Abstract Classes Need Constructors in C#

Abstract classes cannot be created directly, but their constructors still run when a derived class instance is created.

## Short Answer

A constructor in an abstract class is used to initialize shared state that every child class needs.

## Why This Matters

- Avoids duplicated setup code in every derived class.
- Ensures base rules always run first.
- Keeps common dependencies in one place.

## Mental Model

You cannot build the foundation by itself and call it a house.
But every house must still be built on the foundation.

The abstract class is the foundation. Derived classes are the houses.

## Example 1: Shared Validation and Assignment

```csharp
public abstract class Employee
{
    public string Name { get; }

    protected Employee(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name is required", nameof(name));

        Name = name;
    }
}

public sealed class FullTimeEmployee : Employee
{
    public decimal AnnualSalary { get; }

    public FullTimeEmployee(string name, decimal annualSalary)
        : base(name)
    {
        AnnualSalary = annualSalary;
    }
}
```

Even though Employee is abstract, its constructor guarantees every employee has a valid Name.

## Example 2: Base Dependency Wiring

```csharp
public interface ILogger
{
    void Log(string message);
}

public abstract class ProcessorBase
{
    protected ILogger Logger { get; }

    protected ProcessorBase(ILogger logger)
    {
        Logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
}

public sealed class InvoiceProcessor : ProcessorBase
{
    public InvoiceProcessor(ILogger logger) : base(logger)
    {
    }

    public void ProcessInvoice(int invoiceId)
    {
        Logger.Log($"Processing invoice {invoiceId}");
    }
}
```

The abstract constructor ensures all processors have a logger before work starts.

## Constructor Call Order

When you create a derived object:

1. Base abstract class constructor runs first.
2. Then derived class constructor runs.

This is why base initialization is reliable.

## Constructor Chaining

Constructor chaining means one constructor calls another constructor.

- Use `base(...)` to call a constructor in the parent class.
- Use `this(...)` to call another constructor in the same class.

```csharp
public abstract class Person
{
    public string Name { get; }

    protected Person(string name)
    {
        Name = name;
    }
}

public sealed class Student : Person
{
    public int Grade { get; }

    public Student(string name) : this(name, 1)
    {
    }

    public Student(string name, int grade) : base(name)
    {
        Grade = grade;
    }
}
```

In this example:

1. `Student(string name)` chains to `Student(string name, int grade)` using `this(...)`.
2. `Student(string name, int grade)` chains to `Person(string name)` using `base(...)`.

This keeps initialization logic centralized and avoids duplicate constructor code.

## Common Mistakes

- Putting too much logic in base constructors.
- Calling virtual members from constructors.
- Forgetting to pass required values to base constructor.

## Real-World Analogy

A company onboarding process is never used alone by customers, but every team member still goes through it before starting role-specific work.

That onboarding process is like an abstract class constructor: not directly used, but always executed for consistency.
