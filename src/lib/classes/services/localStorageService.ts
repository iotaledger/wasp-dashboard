/**
 * Class to use local storage.
 */
export class LocalStorageService {
    public static readonly ServiceName = "LocalStorageService";

    /**
     * Load an item from local storage.
     * @param key The key of the item to load.
     * @returns The item loaded.
     */
    public load<T>(key: string): T {
        let obj;
        if (window.localStorage) {
            try {
                const json = window.localStorage.getItem(key);
                if (json) {
                    obj = JSON.parse(json);
                }
            } catch (e) {
                console.error(e);
            }
        }
        return obj as T;
    }

    /**
     * Save an item to local storage.
     * @param key The key of the item to store.
     * @param item The item to store.
     */
    public save<T>(key: string, item: T): void {
        if (window.localStorage) {
            try {
                const json = JSON.stringify(item);
                window.localStorage.setItem(key, json);
            } catch (e) {
                console.error(e);
            }
        }
    }

    /**
     * Delete an item in local storage.
     * @param key The key of the item to store.
     */
    public remove(key: string): void {
        if (window.localStorage) {
            try {
                window.localStorage.removeItem(key);
            } catch (e) {
                console.error(e);
            }
        }
    }

    /**
     * Clear the local storage.
     * @param rootKey Clear all items that start with the root key, if undefined clear everything.
     */
    public clear(rootKey: string): void {
        if (window.localStorage) {
            try {
                if (rootKey) {
                    const keysToRemove = [];
                    const len = window.localStorage.length;
                    for (let i = 0; i < len; i++) {
                        const key = window.localStorage.key(i);
                        if (key?.startsWith(rootKey)) {
                            keysToRemove.push(key);
                        }
                    }
                    for (const key of keysToRemove) {
                        window.localStorage.removeItem(key);
                    }
                } else {
                    window.localStorage.clear();
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
}
