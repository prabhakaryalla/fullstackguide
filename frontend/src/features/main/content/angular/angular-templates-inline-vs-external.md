# Angular Templates: Inline Template vs templateUrl and Best Practices

Every Angular component needs a template describing its UI — Angular lets you write it inline in the component decorator or in a separate HTML file. The choice mostly comes down to maintainability as templates grow.

## Short Answer

- **Inline template** (`template: ...`) — HTML lives directly inside the `@Component` decorator as a string. Good for tiny components.
- **Separate template** (`templateUrl: '...'`) — HTML lives in its own `.html` file. Preferred for anything beyond a couple of lines, since it keeps markup readable and enables full editor tooling (syntax highlighting, IntelliSense).

## Inline Template

```typescript
@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span class="badge">{{ label }}</span>`,
  styles: [`.badge { padding: 4px 8px; border-radius: 4px; }`],
})
export class BadgeComponent {
  @Input() label = ''
}
```

- Convenient for very small, single-purpose components (a badge, an icon wrapper) where the template is one or two lines.
- Multi-line inline templates using template literals are technically possible but quickly become hard to read and lose most editor tooling support (no dedicated HTML syntax highlighting inside a TS string, in most setups).

## Separate Template (templateUrl)

```typescript
@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  @Input() product!: Product
}
```

```html
<!-- product-detail.component.html -->
<article class="product-detail">
  <h1>{{ product.name }}</h1>
  <p>{{ product.description }}</p>
  <span class="price">{{ product.price | currency }}</span>
</article>
```

- Full HTML tooling (formatting, linting, IntelliSense) works properly in a real `.html` file.
- Easier for designers/frontend specialists to work on markup without touching TypeScript logic.
- Keeps the component class file focused on logic, not markup.

## Comparison

| | Inline Template | Separate Template (templateUrl) |
|---|---|---|
| Best for | Trivial, 1-2 line templates | Anything non-trivial |
| Editor tooling | Limited (string literal) | Full HTML tooling |
| File count | Fewer files | One extra `.html` file per component |
| Readability at scale | Degrades quickly | Stays clean |

## Best Practice

Use separate HTML files (`templateUrl`) for anything beyond a trivial one-liner — it keeps the component class readable, enables proper HTML tooling, and matches what most Angular style guides and generators (`ng generate component`) default to.

```archify
diagrams/angular-templates-decision.html
```

## Real-World Example

A design system library uses inline templates for tiny primitives like `IconComponent` (`template: '<svg>...</svg>'`), but every feature-level component (`ProductDetailComponent`, `CheckoutFormComponent`) uses a separate `.html` file — keeping the larger, more structurally complex markup maintainable and properly tooled.

## Summary

Inline templates are a convenience for trivial components; separate `templateUrl` files are the standard for anything with real structure, since they keep markup readable, get full HTML editor support, and separate presentation from component logic — which is why Angular's own scaffolding tools default to it.
