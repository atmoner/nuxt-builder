<template>
  <div class="overflow-x-auto">
    <table :class="tableClasses">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="header in parsedHeaders"
            :key="header"
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody :class="bodyClasses">
        <tr
          v-for="(row, rowIndex) in parsedRows"
          :key="rowIndex"
          :class="striped && rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface Props {
  headers?: string;
  rows?: string;
  striped?: boolean;
  bordered?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  headers: 'Column 1, Column 2, Column 3',
  rows: 'Row 1 Col 1, Row 1 Col 2, Row 1 Col 3',
  striped: true,
  bordered: true,
});

const parsedHeaders = computed(() => {
  if (!props.headers) return [];
  return props.headers.split(',').map(h => h.trim()).filter(Boolean);
});

const parsedRows = computed(() => {
  if (!props.rows) return [];
  return props.rows.split('|').map(row => 
    row.split(',').map(cell => cell.trim()).filter(Boolean)
  );
});

const tableClasses = computed(() => {
  const classes = ['min-w-full', 'divide-y', 'divide-gray-200'];
  if (props.bordered) {
    classes.push('border', 'border-gray-200');
  }
  return classes.join(' ');
});

const bodyClasses = computed(() => {
  return props.bordered ? 'divide-y divide-gray-200' : '';
});
</script>
