# field-modifier
![Tests](https://github.com/hampfh/field-modifier/actions/workflows/node.js.yml/badge.svg)

A library for modifying nested fields/properties in javascript objects. Full support for typescript.

## Install
```
npm install field-modifier
```
## Import in project
```
import fieldModifier from "field-modifier"
```

## Examples
### Simple
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
### Deep nested object
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

## Functions
### deleteFields
Remove one or more fields from an object. 

**Function signature:**
```
function deleteFields(keys: Array<string | number>, object: any, deepCopy = true, keepEmpty = false)
```

**Arguments:**  
keys: An array defining all keys that should be removed from the object  
object: Either a javascript object or an array  
deepCopy: If false the `object` field will be mutated directly  
keepEmpty: If any null/undefined values are encountered in the object they are removed  
