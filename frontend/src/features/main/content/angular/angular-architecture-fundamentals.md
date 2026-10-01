# Angular Architecture Fundamentals: Modules, Components, Services, DI, Routing, Directives, Pipes

Angular applications are built from a small set of core building blocks that combine into a predictable layered architecture: components render UI, services hold logic/data access, dependency injection wires them together, and routing coordinates navigation between feature areas.

## Short Answer

- **Components** — the UI building block (template + class + styles).
- **Services** — reusable logic/data-access classes, provided via dependency injection.
- **Modules** (or standalone components in modern Angular) — group related components/services together.
- **Dependency Injection (DI)** — Angular's mechanism for supplying a class with the services it depends on.
- **Routing** — maps URLs to components, enabling navigation without full page reloads.
- **Directives** — extend HTML with custom behavior (`*ngIf`, `*ngFor`, or custom attribute directives).
- **Pipes** — transform displayed values in templates (`date`, `currency`, or custom pipes).

## Typical Layered Architecture

```archify
diagrams/angular-layered-architecture.html
```

- Components should stay thin — delegate data fetching and business rules to services, keeping the component focused on presentation and user interaction.

## Components

```typescript
@Component({
  selector: 'app-product-card',
  standalone: true,
  template: `<div>{{ product.name }} - {{ product.price | currency }}</div>`,
})
export class ProductCardComponent {
  @Input() product!: Product
}
```

## Services and Dependency Injection

```typescript
@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products')
  }
}
```

```typescript
@Component({ selector: 'app-product-list', standalone: true, template: `...` })
export class ProductListComponent {
  constructor(private productService: ProductService) {} // DI supplies the instance
}
```

- `providedIn: 'root'` registers the service as a singleton available application-wide — Angular's injector creates and supplies it automatically wherever it's requested.

## Routing

```typescript
export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
]
```

```archify
diagrams/angular-router-navigation.html
```

## Directives

```html
<div *ngIf="isLoggedIn">Welcome back!</div>
<li *ngFor="let item of items">{{ item.name }}</li>
<input [appHighlightOnFocus] />
```

- Structural directives (`*ngIf`, `*ngFor`) change the DOM structure; attribute directives (`appHighlightOnFocus`) change behavior/appearance of an existing element.

## Pipes

```html
{{ order.total | currency:'USD' }}
{{ order.createdAt | date:'mediumDate' }}
{{ product.name | uppercase }}
```

```typescript
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 20): string {
    return value.length > limit ? `${value.slice(0, limit)}...` : value
  }
}
```

## Common Mistake

Putting HTTP calls and business logic directly inside components. This makes components hard to test and reuse — always route data access through a service, and keep the component focused on binding data to the template.

## Real-World Example

A product catalog feature: `ProductListComponent` (presentation) injects `ProductService` (business layer), which calls `HttpClient` (data layer) to fetch from `/api/products`; the list uses `*ngFor` to render `ProductCardComponent` instances, each formatting price with the `currency` pipe, while the Angular `Router` handles navigating from the list to a detail page.

## Summary

Angular's architecture separates concerns cleanly: components for presentation, services (via DI) for business logic and data access, routing for navigation, and directives/pipes for template-level behavior and formatting — together forming a predictable, testable layered structure.
