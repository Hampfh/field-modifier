type StripFieldsReturn<V extends string | number, O extends object> = {
    [K in keyof O]: O[K] extends object ? Omit<StripFieldsReturn<V, O[K]>, V> : O[K]
}

/**
 * Remove all nested occurances of one or more keys inside an object or array
 * @param keys A list containing the keys to be removed from the object
 * @param object A javascript object or array
 * @param deepCopy (default true) Clone the object instead of mutating it directly
 * @param keepEmpty (default false) When array encounters emptry objects or null/undefined values delete them completely
 * @returns The same object without all the properties with the keys specified in the {keys} field
 */
export function stripFields<K extends string | number, T extends object>(keys: Array<K>, object: T, deepCopy = true, keepEmpty = false): Omit<StripFieldsReturn<K, T>, K> {

    // Deep copy object
    if (deepCopy)
        object = JSON.parse(JSON.stringify(object)) as T

    for (let current in object) {
        if (Array.isArray(current)) {
            for (let j = 0; j < current.length; j++) {
                stripFields(keys, current[j], false)
            }
        } else {
            for (let i = 0; i < keys.length; i++) {
                if (keys.indexOf(current as unknown as K) >= 0)
                    delete object[current]
                else if (typeof object[current] === "object")
                    stripFields(keys, (object[current] as unknown as object), false)
            } 
        }
    }

    return object
}