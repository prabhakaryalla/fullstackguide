# ASP.NET Core Routing: Convention-Based vs Attribute Routing

ASP.NET Core maps incoming URLs to controller actions using one of two approaches — convention-based routing (centrally defined patterns) or attribute routing (declared directly on controllers/actions) — and the two can be mixed in the same application.

## Short Answer

- **Convention-based routing** — one or a few route templates defined centrally (e.g., in `Program.cs`), which apply to many controllers by following a naming pattern (`{controller}/{action}/{id?}`).
- **Attribute routing** — routes declared directly on controllers/actions via `[Route]`, `[HttpGet]`, etc., giving fine-grained control over each endpoint's exact URL.
- Modern ASP.NET Core Web APIs predominantly use attribute routing; MVC apps with predictable URL patterns often still use convention-based routing.

## Convention-Based Routing

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

```csharp
public class HomeController : Controller
{
    public IActionResult Index() => View();      // matches "/" or "/Home/Index"
    public IActionResult About() => View();       // matches "/Home/About"
}
```

- One route template handles every controller/action combination that fits the pattern — adding a new controller/action automatically works without touching the route configuration, as long as it follows the convention.

## Attribute Routing

```csharp
[Route("[controller]/[action]")]
public class ProductsController : Controller
{
    [HttpGet] // matches "/Products/List"
    public IActionResult List() => View();

    [HttpGet("{id}")] // matches "/Products/Edit/5"
    public IActionResult Edit(int id) => View();
}
```

- `[controller]` and `[action]` tokens are replaced with the actual controller/action names, keeping routes in sync with renames automatically.
- Gives explicit, self-documenting control over each endpoint's URL — especially valuable for REST APIs where URL structure (`/api/products/{id}`) matters for clients and SEO.

## Mixing Both

```csharp
app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}"); // fallback for MVC views

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase // explicit attribute routes for the API surface
{
    [HttpGet("{id}")]
    public IActionResult Get(int id) => Ok();
}
```

- It's common (and supported) to use convention-based routing for traditional MVC views and attribute routing for API controllers within the same application.

## Route Constraints

Constraints restrict which values a route parameter accepts, letting the routing engine reject non-matching requests before they even reach the action.

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id:int?}"); // id must be an integer (or absent)
```

```csharp
[Route("Home/Index/{id:int?}")]
public IActionResult Index(int? id) => View();
```

```archify
diagrams/dotnet-route-constraints.html
```

- Common constraints: `int`, `bool`, `datetime`, `guid`, `minlength(n)`, `maxlength(n)`, `range(min,max)`, `regex(pattern)`.
- Constraints improve correctness (avoiding manual type-checking inside every action) and can also help disambiguate between overlapping route templates.

## Route Attribute Tokens

```csharp
[Route("[controller]")]
public class HomeController : Controller
{
    [Route("")]           // "Home"
    [Route("Home/Index")] // "Home/Index"
    public IActionResult Index() => View();
}
```

- `[controller]`, `[action]`, and `[area]` tokens are placeholders resolved at runtime, keeping route templates consistent even if the class/method names change.

## Summary

Convention-based routing centralizes URL patterns and scales well for predictable, uniform controller/action structures; attribute routing puts routing information directly alongside the action it applies to, offering precise control especially valued in REST APIs. Route constraints add type/format validation directly into the routing layer, rejecting malformed requests before they reach action code.
