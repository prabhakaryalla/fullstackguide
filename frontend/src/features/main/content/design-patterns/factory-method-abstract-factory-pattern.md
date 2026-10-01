# Factory Method and Abstract Factory Patterns

Both patterns move object-creation logic out of client code and behind an interface — Factory Method creates **one** family of related objects via subclassing, while Abstract Factory creates **multiple related families** of objects behind a single "super factory."

## Short Answer

- **Factory Method** — defines an interface for creating an object, but lets a subclass decide which concrete class to instantiate.
- **Abstract Factory** — provides an interface for creating families of related objects without specifying their concrete classes; it's essentially "a factory of factories."

## The Problem Without a Factory

```csharp
// Business logic tightly coupled into a controller — adding a new employee type means editing this method
public ActionResult Create(Employee employee)
{
    if (employee.EmployeeTypeID == 1) { employee.HourlyPay = 8; employee.Bonus = 10; }
    else if (employee.EmployeeTypeID == 2) { employee.HourlyPay = 12; employee.Bonus = 6; }

    db.Employees.Add(employee);
    db.SaveChanges();
    return RedirectToAction("Index");
}
```

- Every new employee type requires modifying this method — violates the Open/Closed Principle and mixes business rules into a controller that should only handle HTTP concerns.

## Factory Method Pattern

```csharp
public interface IEmployeeManager
{
    decimal GetHourlyPay();
    decimal GetBonus();
}

public class PermanentEmployeeManager : IEmployeeManager
{
    public decimal GetHourlyPay() => 8;
    public decimal GetBonus() => 10;
}

public class ContractEmployeeManager : IEmployeeManager
{
    public decimal GetHourlyPay() => 12;
    public decimal GetBonus() => 6;
}

public abstract class BaseEmployeeFactory
{
    protected Employee _emp;
    protected BaseEmployeeFactory(Employee employee) => _emp = employee;

    public abstract IEmployeeManager Create(); // subclasses decide which concrete manager to instantiate

    public Employee ApplySalary()
    {
        var manager = Create();
        _emp.Bonus = manager.GetBonus();
        _emp.HourlyPay = manager.GetHourlyPay();
        return _emp;
    }
}

public class PermanentEmployeeFactory : BaseEmployeeFactory
{
    public PermanentEmployeeFactory(Employee employee) : base(employee) { }
    public override IEmployeeManager Create() => new PermanentEmployeeManager();
}

public class ContractEmployeeFactory : BaseEmployeeFactory
{
    public ContractEmployeeFactory(Employee employee) : base(employee) { }
    public override IEmployeeManager Create() => new ContractEmployeeManager();
}
```

```csharp
public class EmployeeManagerFactory
{
    public BaseEmployeeFactory CreateFactory(Employee employee) => employee.EmployeeTypeID switch
    {
        1 => new PermanentEmployeeFactory(employee),
        2 => new ContractEmployeeFactory(employee),
        _ => throw new ArgumentException("Unknown employee type"),
    };
}
```

```csharp
public ActionResult Create(Employee employee)
{
    var factory = new EmployeeManagerFactory().CreateFactory(employee);
    factory.ApplySalary(); // controller no longer knows the pay/bonus rules at all
    db.Employees.Add(employee);
    db.SaveChanges();
    return RedirectToAction("Index");
}
```

```archify
diagrams/factory-method-pattern.html
```

- Adding a new employee type now means adding a new `IEmployeeManager` + factory class — the controller and `EmployeeManagerFactory` switch statement are the only places touched, and existing types are untouched.

## Choose Factory Method When

- The exact subclass to create isn't known until runtime.
- The object needs to be extended via subclasses without changing client code.
- The product implementation is expected to change over time while the client stays the same.

## Abstract Factory Pattern

```csharp
// Creates families of related objects: laptop + desktop, per employment type
public interface IComputerFactory
{
    IComputer CreateManagerComputer();
    IComputer CreateStaffComputer();
}

public class PermanentEmployeeComputerFactory : IComputerFactory
{
    public IComputer CreateManagerComputer() => new MacBookLaptop();
    public IComputer CreateStaffComputer() => new MacDesktop();
}

public class ContractEmployeeComputerFactory : IComputerFactory
{
    public IComputer CreateManagerComputer() => new DellLaptop();
    public IComputer CreateStaffComputer() => new DellDesktop();
}
```

```archify
diagrams/abstract-factory-pattern.html
```

## Choose Abstract Factory When

- The application needs to create multiple **families** of related objects (not just one product type).
- Only one family should be in use at a given time (e.g., either the "Permanent" family or the "Contract" family, never mixed).
- You want to hide the concrete implementation details of each family behind a common interface.

## Factory Method vs Abstract Factory

| | Factory Method | Abstract Factory |
|---|---|---|
| Creates | One product, via subclassing | Multiple related products (a "family") |
| Mechanism | Inheritance (override `Create()`) | Composition (inject a concrete factory) |
| Typical use | "Which single class do I instantiate?" | "Which entire family of related classes do I use?" |

## Summary

Factory Method delegates the decision of *which single class* to instantiate to a subclass, decoupling client code from concrete types. Abstract Factory extends this idea to *entire families* of related objects, ensuring a consistent set of related products (e.g., all "Permanent employee" equipment) is used together without the client ever referencing concrete classes directly.
