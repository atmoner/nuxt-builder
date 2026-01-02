import { v4 as uuidv4 } from "uuid"
import { useHooks } from "./useHooks"
import { usePages } from "./usePages"

export interface ComponentInstance {
  id: string
  type: string
  props: Record<string, any>
  children?: ComponentInstance[]
}

export interface ComponentDefinition {
  type: string
  name: string
  icon: string
  category: string
  defaultProps: Record<string, any>
  propsSchema: PropSchema[]
}

export interface PropSchema {
  name: string
  label: string
  type: "string" | "number" | "boolean" | "select" | "color" | "array"
  default?: any
  options?: { label: string; value: any }[]
  placeholder?: string
}

const state = reactive({
  selectedComponentId: null as string | null,
  isDragging: false,
  draggedComponentType: null as string | null,
})

export function useBuilder() {
  const { executeHook, filterHook } = useHooks()
  const pagesComposable = usePages()
  const { activePage, updatePageComponents } = pagesComposable

  // Get components from active page
  const components = computed(() => activePage.value?.components || [])

  const selectedComponentId = computed(() => state.selectedComponentId)
  const isDragging = computed(() => state.isDragging)
  const draggedComponentType = computed(() => state.draggedComponentType)

  const selectedComponent = computed(() => {
    if (!state.selectedComponentId) return null
    return findComponentById(components.value, state.selectedComponentId)
  })

  // Helper to update components in the active page
  function updateComponents(newComponents: ComponentInstance[]) {
    if (activePage.value) {
      updatePageComponents(activePage.value.id, newComponents)
    }
  }

  function findComponentById(
    components: ComponentInstance[],
    id: string
  ): ComponentInstance | null {
    for (const comp of components) {
      if (comp.id === id) return comp
      if (comp.children) {
        const found = findComponentById(comp.children, id)
        if (found) return found
      }
      // Search in grid cells
      if (comp.props?.cells) {
        for (const cell of comp.props.cells) {
          if (cell.children) {
            const found = findComponentById(cell.children, id)
            if (found) return found
          }
        }
      }
    }
    return null
  }

  function addComponent(
    type: string,
    props: Record<string, any> = {},
    index?: number
  ) {
    const newComponent: ComponentInstance = {
      id: uuidv4(),
      type,
      props: { ...props },
    }

    executeHook("builder:component:add", newComponent)

    const newComponents = [...components.value]
    if (index !== undefined) {
      newComponents.splice(index, 0, newComponent)
    } else {
      newComponents.push(newComponent)
    }

    updateComponents(newComponents)
    return newComponent
  }

  function removeComponent(id: string) {
    const component = findComponentById(components.value, id)
    if (component) {
      executeHook("builder:component:remove", component)
    }

    const removeFromArray = (
      arr: ComponentInstance[],
      targetId: string
    ): boolean => {
      const index = arr.findIndex((c) => c.id === targetId)
      if (index !== -1) {
        arr.splice(index, 1)
        return true
      }
      for (const comp of arr) {
        if (comp.children && removeFromArray(comp.children, targetId)) {
          return true
        }
      }
      return false
    }

    const newComponents = [...components.value]
    removeFromArray(newComponents, id)
    updateComponents(newComponents)

    if (state.selectedComponentId === id) {
      state.selectedComponentId = null
    }
  }

  function updateComponent(id: string, props: Record<string, any>) {
    const component = findComponentById(components.value, id)
    if (component) {
      const filteredProps = filterHook("component:props:filter", {
        component,
        props,
      })

      Object.assign(component.props, filteredProps.props || props)
      executeHook("builder:component:update", component)

      // Trigger update
      updateComponents([...components.value])
    }
  }

  function selectComponent(id: string | null) {
    state.selectedComponentId = id
    if (id) {
      const component = findComponentById(components.value, id)
      executeHook("builder:component:select", component)
    }
  }

  function moveComponent(fromIndex: number, toIndex: number) {
    const newComponents = [...components.value]
    const [component] = newComponents.splice(fromIndex, 1)
    if (component) {
      newComponents.splice(toIndex, 0, component)
      updateComponents(newComponents)
    }
  }

  function duplicateComponent(id: string) {
    const component = findComponentById(components.value, id)
    if (component) {
      const index = components.value.findIndex((c) => c.id === id)
      const newComponent = addComponent(
        component.type,
        { ...component.props },
        index + 1
      )
      return newComponent
    }
    return null
  }

  function startDrag(componentType: string) {
    state.isDragging = true
    state.draggedComponentType = componentType
  }

  function endDrag() {
    state.isDragging = false
    state.draggedComponentType = null
  }

  function clearAll() {
    updateComponents([])
    state.selectedComponentId = null
  }

  function exportLayout(): string {
    executeHook("builder:save", components.value)
    // Use the new exportAllPages from usePages
    return pagesComposable.exportAllPages()
  }

  function importLayout(json: string) {
    try {
      // Use the new importAllPages from usePages
      const success = pagesComposable.importAllPages(json)
      if (success) {
        executeHook("builder:load", components.value)
      }
      return success
    } catch {
      return false
    }
  }

  return {
    // State
    components,
    selectedComponentId,
    selectedComponent,
    isDragging,
    draggedComponentType,

    // Actions
    addComponent,
    removeComponent,
    updateComponent,
    selectComponent,
    moveComponent,
    duplicateComponent,
    startDrag,
    endDrag,
    clearAll,
    exportLayout,
    importLayout,
  }
}
