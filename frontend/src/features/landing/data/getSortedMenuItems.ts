import rawConfig from './menuConfig.json'
import type { NavigationMenuItem } from '../model/types'

export function getSortedMenuItems(): NavigationMenuItem[] {
  return [...(rawConfig.items as NavigationMenuItem[])].sort((a, b) => a.order - b.order)
}
