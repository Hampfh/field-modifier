type deleteFieldsReturn<V extends string | number, O extends object> = {
  [K in keyof O]: O[K] extends object
    ? Omit<deleteFieldsReturn<V, O[K]>, V>
    : O[K];
};

/**
 * Remove all nested occurances of one or more keys inside an object or array
 * @param keys A list containing the keys to be removed from the object
 * @param object A javascript object or array
 * @param deepCopy (default true) Clone the object instead of mutating it directly
 * @param keepEmpty (default false) When array encounters emptry objects or null/undefined values delete them completely
 * @returns The same object without all the properties with the keys specified in the {keys} field
 */
export function deleteFields<K extends string | number, T extends object>(
  keys: Array<K>,
  object: T,
  deepCopy = true,
  keepNull = false
): Omit<deleteFieldsReturn<K, T>, K> {
  // Deep copy object
  if (deepCopy) object = JSON.parse(JSON.stringify(object)) as T;

  if (Array.isArray(object)) {
    for (let j = 0; j < object.length; j++) {
      if (!keepNull && object[j] == null) {
        object.splice(j, 1);
        j--;
        continue;
      }
      deleteFields(keys, object[j], false, keepNull);
      if (!keepNull && Object.keys(object[j]).length <= 0) {
        object.splice(j, 1);
        j--;
      }
    }
    return object;
  }
  for (let current in object) {
    if (keys.indexOf(current as unknown as K) >= 0) delete object[current];
    else if (!keepNull && object[current] == null) {
      delete object[current];
    } else if (typeof object[current] === "object")
      deleteFields(keys, object[current] as unknown as object, false);
  }

  return object;
}

/**
 *
 * @param replacements All keys are current fields and their corresponding value will be their replacement name
 * @param object A javascript object or array
 * @param deepCopy (default true) Clone the object instead of mutating it directly
 * @param keepEmpty (default false) When array encounters emptry objects or null/undefined values delete them completely
 * @returns The same object but with the specified fields replaced with another field name
 */
export function replaceFields(
  replacements: Record<string, string>,
  object: object,
  deepCopy = true,
  keepNull = false
): any {
  // Deep copy object
  if (deepCopy) object = JSON.parse(JSON.stringify(object));

  if (Array.isArray(object)) {
    for (let j = 0; j < object.length; j++) {
      // If array item is null slice it
      if (!keepNull && object[j] == null) {
        object.splice(j, 1);
        j--;
        continue;
      }
      replaceFields(replacements, object[j], false, keepNull);

      // Remove object if empty
      if (!keepNull && Object.keys(object[j]).length <= 0) {
        object.splice(j, 1);
        j--;
      }
    }
    return object;
  }
  for (let current in object) {
    // If current field is null we remove it (if keepEmpty is false)
    if (!keepNull && (object as any)[current] == null) {
      delete (object as any)[current];
    }
    // Check if there is a replacement match
    else if (replacements[current] != undefined) {
      // Create new field
      (object as any)[replacements[current]] = (object as any)[current];
      // Remove old field
      delete (object as any)[current];

      // If replaced field is also an object the recursion continues
      if (typeof (object as any)[replacements[current]] === "object")
        replaceFields(
          replacements,
          (object as any)[replacements[current]] as unknown as object,
          false
        );
    }
    // Go down one level in the object
    else if (typeof (object as any)[current] === "object")
      replaceFields(
        replacements,
        (object as any)[current] as unknown as object,
        false
      );
  }

  return object;
}

/**
 * Create a new object from the given object but only include the given fields
 * @param keys A list containing the keys of the fields that should be included
 * @param object A javascript object or array
 * @returns A new object only including the keys specified in the keys field
 */
export function selectFields<K extends string | number, T extends object>(
  keys: Array<K>,
  object: T,
  parentObject?: object
): T {
  const newObject: any = parentObject === undefined ? {} : parentObject;

  if (Array.isArray(object)) {
    for (let j = 0; j < object.length; j++)
      newObject[j] = selectFields(keys, object[j]);
    return newObject;
  }

  for (let current in object) {
    // We always include objects
    if (typeof object[current] === "object")
      newObject[current] = selectFields(
        keys,
        object[current] as unknown as object
      );
    // If we found a match we copy the content
    else if (keys.indexOf(current as unknown as K) >= 0)
      newObject[current] = object[current];
  }

  return newObject;
}

export default { selectFields, replaceFields, deleteFields };
