# Lazy Loading, Standalone Components, and NgRx State Management

Beyond the fundamentals, three concepts show up repeatedly in modern Angular architecture discussions: lazy loading (performance), standalone components (simplified structure), and NgRx (predictable state management for complex apps).

## Short Answer

- **Lazy loading** — load a feature's code only when its route is visited, shrinking the initial bundle (same idea as React's code splitting).
- **Standalone components** — components that declare their own dependencies directly, removing the need for `NgModule` wrapper classes.
- **NgRx** — a Redux-inspired state management library for Angular, useful when app state is complex and shared across many unrelated components.

## Lazy Loading

```typescript
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.routes').then((m) => m.REPORTS_ROUTES),
  },
]
```

```archify
diagrams/angular-lazy-loading.html
```

- Only users who actually visit `/admin` or `/reports` download that code — keeping the initial load fast for everyone else.

## Standalone Components

```typescript
// Modern Angular — no NgModule required
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `<app-product-card *ngFor="let p of products" [product]="p" />`,
})
export class ProductListComponent {
  products: Product[] = []
}
```

- Each component explicitly lists what it needs (`imports: [...]`) instead of relying on an `NgModule` to declare and export it — simplifies the mental model and reduces boilerplate, especially combined with `loadComponent` for lazy loading a single component instead of a whole module.

## NgRx — When You Need It

```archify
diagrams/angular-ngrx-flow.html
```

```typescript
// Action
export const loadProducts = createAction('[Products] Load Products')
export const loadProductsSuccess = createAction('[Products] Load Success', props<{ products: Product[] }>())

// Reducer
export const productsReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({ ...state, products })),
)

// Effect (handles the async API call)
loadProducts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadProducts),
    switchMap(() => this.productService.getProducts().pipe(map((products) => loadProductsSuccess({ products })))),
  ),
)

// Component
this.store.dispatch(loadProducts())
this.products$ = this.store.select(selectAllProducts)
```

## When to Reach for NgRx (and When Not To)

| Signal | Recommendation |
|---|---|
| State is local to one component/feature | Use component state or a simple service — NgRx adds unnecessary ceremony |
| State is shared across many unrelated features | NgRx's single source of truth + selectors avoids prop drilling and duplicated fetch logic |
| Complex async flows (retries, caching, optimistic updates) | NgRx Effects centralize this logic instead of scattering it across components |
| Small app / few shared state needs | Angular's built-in `signal()`-based state or simple services are often enough |

## Real-World Example

A large internal ERP-style Angular app: each major feature (`inventory`, `orders`, `reports`) is lazy-loaded via `loadChildren`, built with standalone components throughout (no `NgModule` files at all), while cross-cutting state like the current user session and shopping cart uses NgRx — since that state is read and mutated from many unrelated feature areas and benefits from a single predictable source of truth.

## Summary

Lazy loading keeps the initial bundle small by deferring feature code until it's needed; standalone components simplify Angular's structural model by removing `NgModule` boilerplate; NgRx brings Redux-style predictable state management for apps where shared, complex state would otherwise be scattered and hard to reason about. Use NgRx selectively — not every Angular app needs it.
