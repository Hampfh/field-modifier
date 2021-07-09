# field-modifier
![Tests](https://github.com/hampfh/field-modifier/actions/workflows/node.js.yml/badge.svg)

A library for modifying nested fields/properties in javascript objects. Full support for typescript.

* [Install](#install)
* [Import](#import-in-project)
* [Examples](#examples)
* [Api](#api)

## Install
```
npm install field-modifier
```
## Import in project
```javascript
import fieldModifier from "field-modifier"
```

## Examples
### Simple field deletion
```javascript
import { deleteFields } from "field-modifier"

// Remove key from nested object
const result = deleteFields(["fieldOne", "fieldTwo"], {
    "fieldOne": "test",
    "fieldTwo": "test",
    "fieldThree": "test"
})

console.log(JSON.stringify(result))
/* Returns 
{
  "fieldThree":"test"
}
*/
```
### Remove fields in deep nested object
```javascript
import { deleteFields } from "field-modifier"

// Remove key from nested object
const result = deleteFields(["fieldOne"], {
    "fieldOne": "test",
    "fieldNested": {
        "fieldTwo": "test",
        "fieldOne": "test",
        "fieldThree": "test",
        "nestedNestedField": {
            "fieldFour": [
                {
                    "fieldThree": "test",
                    "fieldTwo": "test",
                    "fieldOne": "test"
                }
            ],
            "fieldThree": "test",
            "fieldTwo": "test",
            "fieldOne": {
                "nestedNestedNestedField": "test"
            },
        }
    }
})

console.log(JSON.stringify(result))
/* Returns
{
  "fieldNested": {
    "fieldTwo": "test",
    "fieldThree": "test",
    "nestedNestedField": {
      "fieldFour": [
        {
          "fieldThree":"test",
          "fieldTwo":"test"
        }
      ],
      "fieldThree":"test",
      "fieldTwo":"test"
    }
  }
}
*/
```

### Replace fields in deep nested object
```javascript
import { replaceFields } from "field-modifier"

const result = replaceFields({
    "fieldOne": "notFieldOne",
    "fieldTwo": "notFieldTwo"
}, {
    fieldOne: "test",
    fieldTwo: "test",
    fieldThree: {
        fieldOne: "test",
        fieldTwo: {
            someArray: [
                {
                    fieldOne: "test",
                    fieldTwo: "test"
                },
                {
                    fieldOne: "test",
                    fieldTwo: "test"
                }
            ]
        }
    }
})

console.log(JSON.stringify(result))

/* Returns
{
    "fieldThree": {
        "notFieldOne": "test",
        "notFieldTwo": {
            "someArray": [
                {
                    "notFieldOne": "test",
                    "notFieldTwo": "test"
                },
                {
                    "notFieldOne": "test",
                    "notFieldTwo": "test"
                }
            ]
        }
    },
    "notFieldOne": "test",
    "notFieldTwo": "test"
}
*/
```

## Api
### deleteFields
Remove one or more fields from an object (supports nested objects).

**Function signature:**
```
function deleteFields(keys: Array<string | number>, object: any, deepCopy = true, keepEmpty = false)
```

**Arguments:**  
keys: An array defining all keys that should be removed from the object  
object: Either a javascript object or an array  
deepCopy: If false the `object` field will be mutated directly  
keepEmpty: If any null/undefined values are encountered in the object they are removed

### replaceFields
Replace one ore more fields from object (supports nested objects).

**Function signature:**
```
function replaceFields(replacements: Record<string, string>, object: object, deepCopy = true, keepEmpty = false)
```

**Arguments:**
replacements: A js object where the key is the current value and the value is the the replacement key name 
object: Either a javascript object or an array
deepCopy: If false the `object` field will be mutated directly  
keepEmpty: If any null/undefined values are encountered in the object they are removed
