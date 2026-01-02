import { hooks, type HookCallback, type HookPriority } from '~/lib/hooks';

/**
 * Composable for using the hooks system in Vue components
 */
export function useHooks() {
  const addHook = <T = any>(
    tag: string,
    callback: HookCallback<T>,
    priority: HookPriority = 10,
    id?: string
  ) => {
    return hooks.addHook(tag, callback, priority, id);
  };

  const removeHook = (tag: string, hookId: string) => {
    return hooks.removeHook(tag, hookId);
  };

  const executeHook = <T = any>(tag: string, args?: T) => {
    return hooks.executeHook(tag, args);
  };

  const filterHook = <T = any>(tag: string, args: T) => {
    return hooks.filterHook(tag, args);
  };

  const hookExists = (tag: string) => {
    return hooks.hookExists(tag);
  };

  const getAllHooks = () => {
    return hooks.getAllHooks();
  };

  return {
    addHook,
    removeHook,
    executeHook,
    filterHook,
    hookExists,
    getAllHooks,
    hooks,
  };
}
