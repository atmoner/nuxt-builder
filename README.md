# Nuxt Builder

A powerful drag-and-drop website builder for Nuxt 3 with an extensible hooks system. Build beautiful, responsive pages using pre-built components with a visual interface.

## 🌟 Features

- **Visual Page Builder**: Intuitive drag-and-drop interface for building pages
- **Rich Component Library**:
  - Hero sections (Simple, Split, With Image)
  - Headers (Simple, Centered, Mega)
  - Content blocks (Blog, CTA, Features, Testimonials, etc.)
  - Footer layouts (Simple, Newsletter, Columns)
  - UI components (Buttons, Cards, Inputs, Modals, etc.)
- **Hooks System**: Extensible plugin-based architecture inspired by PHP hooks pattern
- **Multi-Page Management**: Create and manage multiple pages in a single project
- **Props Editor**: Edit component properties in real-time
- **Preview Mode**: View your pages before publishing
- **TypeScript**: Fully typed for enhanced developer experience
- **Tailwind CSS**: Modern styling with utility-first CSS

## 📋 Prerequisites

- Node.js 16.x or higher
- npm, pnpm, yarn, or bun

## 🚀 Setup

Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 💻 Development

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏗️ Architecture

### Composables

The project uses several composables to manage state and functionality:

- **`useBuilder`**: Core builder functionality for managing components
  - Add, remove, and update components
  - Component selection and drag-and-drop state
  - Nested component management
- **`useHooks`**: Interface to the hooks system
  - Add/remove hooks
  - Execute action hooks
  - Filter hooks for data modification
- **`usePages`**: Multi-page management
  - Create, update, and delete pages
  - Active page switching
  - Page-specific component storage
- **`useComponentRegistry`**: Component catalog management
  - Register available components
  - Define component schemas and props

### Hooks System

The hooks system provides an extensible plugin architecture:

```typescript
const { addHook, executeHook, filterHook } = useHooks()

// Action hook (no return value)
addHook("builder:component:add", (component) => {
  console.log("Component added:", component)
})

// Filter hook (modifies data)
addHook("builder:component:props", (props) => {
  return { ...props, customProp: "value" }
})

// Execute hooks
executeHook("builder:component:add", newComponent)
const modifiedProps = filterHook("builder:component:props", props)
```

#### Available Hook Points

- `builder:component:add` - When a component is added
- `builder:component:remove` - When a component is removed
- `builder:component:update` - When a component is updated
- `builder:component:props` - Filter component props
- `builder:page:create` - When a page is created
- `builder:page:update` - When a page is updated
- `builder:page:delete` - When a page is deleted

### Component Structure

Components follow a standard structure:

```typescript
interface ComponentInstance {
  id: string // Unique identifier
  type: string // Component type (e.g., 'HeroSimple')
  props: Record<string, any> // Component properties
  children?: ComponentInstance[] // Nested components
}
```

## 📦 Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com)
- **UI Framework**: Vue 3 with Composition API
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **State Management**: Vue Composition API with reactive state
- **Utilities**:
  - [@vueuse/core](https://vueuse.org) - Collection of Vue composition utilities
  - [uuid](https://github.com/uuidjs/uuid) - UUID generation

## 📖 Documentation

For more information on Nuxt 3:

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Deployment Guide](https://nuxt.com/docs/getting-started/deployment)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is private and not licensed for public use.

## 👤 Author

**atmoner**

- GitHub: [@atmoner](https://github.com/atmoner)
- Repository: [nuxt-builder](https://github.com/atmoner/nuxt-builder)
