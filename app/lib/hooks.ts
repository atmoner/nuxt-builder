/**
 * Hooks System - TypeScript implementation inspired by PHP hooks pattern
 * Provides a plugin-based architecture for extending functionality
 */

export type HookCallback<T = any> = (args: T) => T | void;
export type HookPriority = number; // 0-20, lower = earlier execution

interface HookEntry<T = any> {
  callback: HookCallback<T>;
  priority: HookPriority;
  id: string;
}

interface Plugin {
  id: string;
  name: string;
  description?: string;
  version?: string;
  author?: string;
  data: Record<string, any>;
}

class HooksSystem {
  private hooks: Map<string, HookEntry[]> = new Map();
  private plugins: Map<string, Plugin> = new Map();
  private activePlugins: Set<string> = new Set();

  /**
   * Register a new hook point
   */
  setHook(tag: string): void {
    if (!this.hooks.has(tag)) {
      this.hooks.set(tag, []);
    }
  }

  /**
   * Register multiple hook points
   */
  setHooks(tags: string[]): void {
    tags.forEach(tag => this.setHook(tag));
  }

  /**
   * Remove a hook point
   */
  unsetHook(tag: string): void {
    this.hooks.delete(tag);
  }

  /**
   * Check if a hook exists
   */
  hookExists(tag: string): boolean {
    return this.hooks.has(tag) && (this.hooks.get(tag)?.length ?? 0) > 0;
  }

  /**
   * Add a callback to a hook
   */
  addHook<T = any>(
    tag: string,
    callback: HookCallback<T>,
    priority: HookPriority = 10,
    id?: string
  ): string {
    if (!this.hooks.has(tag)) {
      console.warn(`Hook "${tag}" does not exist. Creating it.`);
      this.setHook(tag);
    }

    const hookId = id || `hook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const hooks = this.hooks.get(tag)!;
    hooks.push({ callback, priority, id: hookId });
    
    // Sort by priority (ascending)
    hooks.sort((a, b) => a.priority - b.priority);
    
    return hookId;
  }

  /**
   * Remove a specific callback from a hook
   */
  removeHook(tag: string, hookId: string): boolean {
    if (!this.hooks.has(tag)) return false;
    
    const hooks = this.hooks.get(tag)!;
    const index = hooks.findIndex(h => h.id === hookId);
    
    if (index !== -1) {
      hooks.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Execute all callbacks attached to a hook
   * Returns the result of the last callback
   */
  executeHook<T = any>(tag: string, args?: T): T | null {
    if (!this.hooks.has(tag)) {
      console.warn(`Hook "${tag}" does not exist.`);
      return null;
    }

    const hooks = this.hooks.get(tag)!;
    let result: T | null = null;

    for (const hook of hooks) {
      const callbackResult = hook.callback(args as T);
      if (callbackResult !== undefined) {
        result = callbackResult as T;
      }
    }

    return result;
  }

  /**
   * Filter data through all callbacks attached to a hook
   * Each callback receives the result of the previous one
   */
  filterHook<T = any>(tag: string, args: T): T {
    if (!this.hooks.has(tag)) {
      console.warn(`Hook "${tag}" does not exist.`);
      return args;
    }

    const hooks = this.hooks.get(tag)!;
    let result = args;

    for (const hook of hooks) {
      const callbackResult = hook.callback(result);
      if (callbackResult !== undefined) {
        result = callbackResult as T;
      }
    }

    return result;
  }

  /**
   * Register a plugin
   */
  registerPlugin(pluginId: string, data: Partial<Plugin> = {}): void {
    this.plugins.set(pluginId, {
      id: pluginId,
      name: data.name || pluginId,
      description: data.description,
      version: data.version,
      author: data.author,
      data: data.data || {},
    });
  }

  /**
   * Activate a plugin
   */
  activatePlugin(pluginId: string): boolean {
    if (this.plugins.has(pluginId)) {
      this.activePlugins.add(pluginId);
      return true;
    }
    return false;
  }

  /**
   * Deactivate a plugin
   */
  deactivatePlugin(pluginId: string): boolean {
    return this.activePlugins.delete(pluginId);
  }

  /**
   * Get plugin data
   */
  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId);
  }

  /**
   * Get all registered plugins
   */
  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Get all active plugins
   */
  getActivePlugins(): Plugin[] {
    return Array.from(this.activePlugins)
      .map(id => this.plugins.get(id))
      .filter((p): p is Plugin => p !== undefined);
  }

  /**
   * Check if a plugin is active
   */
  isPluginActive(pluginId: string): boolean {
    return this.activePlugins.has(pluginId);
  }

  /**
   * Get all registered hooks
   */
  getAllHooks(): string[] {
    return Array.from(this.hooks.keys());
  }

  /**
   * Get hook info
   */
  getHookInfo(tag: string): { count: number; priorities: number[] } | null {
    if (!this.hooks.has(tag)) return null;
    
    const hooks = this.hooks.get(tag)!;
    return {
      count: hooks.length,
      priorities: hooks.map(h => h.priority),
    };
  }
}

// Singleton instance
export const hooks = new HooksSystem();

// Initialize default hooks for the builder
hooks.setHooks([
  'builder:init',
  'builder:component:add',
  'builder:component:remove',
  'builder:component:update',
  'builder:component:select',
  'builder:render:before',
  'builder:render:after',
  'builder:save',
  'builder:load',
  'component:props:filter',
  'component:render:before',
  'component:render:after',
]);

export default hooks;
