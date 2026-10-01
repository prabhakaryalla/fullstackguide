# Compound Components Pattern

Compound components let a group of related components share implicit state and communicate with each other through their position in a parent's JSX — the same way native HTML `<select>` and `<option>` work together — instead of forcing a single, giant component to accept a large, ever-growing set of configuration props.

## Short Answer

A compound component is a parent component that manages shared state and passes it down to specific, related child components (usually via Context), letting the *caller* freely compose, reorder, and structure the children in JSX — rather than the parent needing an exhaustive set of props to configure every possible variation of what the children could look like.

## The Problem: A Single Component With Too Many Props

```tsx
<Tabs
  items={[
    { label: 'Profile', content: <ProfilePanel /> },
    { label: 'Settings', content: <SettingsPanel />, disabled: true },
  ]}
  activeIndex={activeIndex}
  onTabChange={setActiveIndex}
  tabListClassName="..."
  tabPanelClassName="..."
  renderTabIcon={(item) => item.icon}
  // ...growing indefinitely as more customization is needed
/>
```

Every new customization need (an icon, a badge, custom styling per tab, a close button on one specific tab) adds another prop to an already sprawling API — and some combinations of props may not even make sense together, but nothing stops a caller from passing them.

## The Compound Component Version

```tsx
<Tabs activeIndex={activeIndex} onTabChange={setActiveIndex}>
  <Tabs.List>
    <Tabs.Tab index={0}>Profile</Tabs.Tab>
    <Tabs.Tab index={1} disabled>Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel index={0}><ProfilePanel /></Tabs.Panel>
    <Tabs.Panel index={1}><SettingsPanel /></Tabs.Panel>
  </Tabs.Panels>
</Tabs>
```

The caller now composes the structure directly in JSX — adding an icon to one specific tab, wrapping a tab in a tooltip, or reordering tabs is just normal JSX composition, with no new prop needed on `Tabs` itself for any of it.

## Implementing It with Context

```tsx
const TabsContext = createContext(null)

function Tabs({ activeIndex, onTabChange, children }) {
  return (
    <TabsContext.Provider value={{ activeIndex, onTabChange }}>
      {children}
    </TabsContext.Provider>
  )
}

function Tab({ index, disabled, children }) {
  const { activeIndex, onTabChange } = useContext(TabsContext)
  return (
    <button
      disabled={disabled}
      aria-selected={activeIndex === index}
      onClick={() => onTabChange(index)}
    >
      {children}
    </button>
  )
}

Tabs.List = ({ children }) => <div role="tablist">{children}</div>
Tabs.Tab = Tab
Tabs.Panels = ({ children }) => <div>{children}</div>
Tabs.Panel = ({ index, children }) => {
  const { activeIndex } = useContext(TabsContext)
  return activeIndex === index ? <div role="tabpanel">{children}</div> : null
}
```

- `Tabs` owns the shared state (`activeIndex`) and exposes it via Context; `Tab` and `Panel` read from that context rather than receiving everything as explicit props passed down manually through every layer.
- Attaching the sub-components as properties on `Tabs` (`Tabs.List`, `Tabs.Tab`, etc.) is a naming convention that signals "these components only make sense used together, as part of `Tabs`" — it doesn't have special React behavior beyond being a normal object property assignment.

## Common Mistake

Over-applying the pattern to components that don't actually need flexible, caller-defined composition — a simple, single-purpose component (a styled button, a basic card) gains nothing from being split into compound pieces and just adds indirection. Compound components earn their complexity specifically when a component family has many valid structural variations that a fixed prop-based API can't cleanly express.

## Real-World Example

A `<Select>` component family (`Select`, `Select.Option`, `Select.Group`) lets callers freely mix option groups, disabled options, and custom option rendering (icons, descriptions) directly in JSX — matching how a caller would naturally think about composing a dropdown's contents, instead of trying to describe every possible option shape through a single `options` prop's data structure.

## Summary

Compound components share implicit state (via Context) among a family of related components, letting the caller freely compose and structure them in JSX instead of configuring every variation through an ever-growing prop list on one component. The trade-off is more internal pieces and slightly more implementation complexity, which pays off specifically when a component family has many valid, caller-driven structural variations.
