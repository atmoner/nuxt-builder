<template>
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <aside
      v-if="isOpen"
      class="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto overflow-x-hidden flex-shrink-0"
    >
      <div
        class="p-4 border-b border-gray-200 flex items-center justify-between"
      >
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Properties</h2>
          <p v-if="componentDef" class="text-sm text-gray-500">
            {{ componentDef.name }}
          </p>
        </div>
        <button
          class="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
          @click="$emit('close')"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div v-if="component && componentDef" class="p-4 space-y-4">
        <div
          v-for="prop in componentDef.propsSchema"
          :key="prop.name"
          class="space-y-1"
        >
          <!-- String input -->
          <template v-if="prop.type === 'string'">
            <label class="block text-sm font-medium text-gray-700">
              {{ prop.label }}
            </label>
            <input
              :value="component.props[prop.name]"
              :placeholder="prop.placeholder"
              type="text"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
              @input="
                updateProp(prop.name, ($event.target as HTMLInputElement).value)
              "
            />
          </template>

          <!-- Number input -->
          <template v-else-if="prop.type === 'number'">
            <label class="block text-sm font-medium text-gray-700">
              {{ prop.label }}
            </label>
            <input
              :value="component.props[prop.name]"
              type="number"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
              @input="
                updateProp(
                  prop.name,
                  Number(($event.target as HTMLInputElement).value)
                )
              "
            />
          </template>

          <!-- Boolean toggle -->
          <template v-else-if="prop.type === 'boolean'">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-gray-700">
                {{ prop.label }}
              </label>
              <button
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                  component.props[prop.name] ? 'bg-primary-600' : 'bg-gray-200',
                ]"
                @click="updateProp(prop.name, !component.props[prop.name])"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    component.props[prop.name]
                      ? 'translate-x-5'
                      : 'translate-x-0',
                  ]"
                />
              </button>
            </div>
          </template>

          <!-- Select dropdown -->
          <template v-else-if="prop.type === 'select'">
            <label class="block text-sm font-medium text-gray-700">
              {{ prop.label }}
            </label>
            <select
              :value="component.props[prop.name]"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm"
              @change="
                updateProp(
                  prop.name,
                  ($event.target as HTMLSelectElement).value
                )
              "
            >
              <option
                v-for="option in prop.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </template>

          <!-- Color picker -->
          <template v-else-if="prop.type === 'color'">
            <label class="block text-sm font-medium text-gray-700">
              {{ prop.label }}
            </label>
            <div class="flex items-center gap-2">
              <input
                :value="component.props[prop.name]"
                type="color"
                class="h-10 w-10 rounded border border-gray-300 cursor-pointer"
                @input="
                  updateProp(
                    prop.name,
                    ($event.target as HTMLInputElement).value
                  )
                "
              />
              <input
                :value="component.props[prop.name]"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm"
                @input="
                  updateProp(
                    prop.name,
                    ($event.target as HTMLInputElement).value
                  )
                "
              />
            </div>
          </template>
        </div>
      </div>

      <div v-else class="p-4 text-center text-gray-500">
        <p>Select a component to edit its properties</p>
      </div>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
  import type { ComponentInstance } from "~/composables/useBuilder"

  interface Props {
    component: ComponentInstance | null
    isOpen: boolean
  }

  const props = defineProps<Props>()

  defineEmits<{
    close: []
  }>()

  const { updateComponent } = useBuilder()
  const { getComponent } = useComponentRegistry()

  const componentDef = computed(() => {
    if (!props.component) return null
    return getComponent(props.component.type)
  })

  const updateProp = (propName: string, value: any) => {
    if (props.component) {
      updateComponent(props.component.id, { [propName]: value })
    }
  }
</script>
