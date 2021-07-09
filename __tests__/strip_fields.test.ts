import { deleteFields } from "../src"

describe("Strip field tests", () => {
    it("Successfully manages null fields", () => {
        const result = deleteFields(["fieldOne", "fieldTwo"], [
            { "fieldOne": "test" },
            {"fieldNested": {
                "fieldTwo": "test",
                "fieldOne": "test",
                "fieldThree": "test",
                "nullField": null
            }},
            null,
            undefined
        ]) as any[]

        expect(result.length).toEqual(1)
        expect(result[0].fieldNested.fieldThree).toBeDefined()
        expect(result[0].fieldNested.fieldTwo).toBeUndefined()
        expect(result[0].fieldNested.fieldOne).toBeUndefined()
        expect(result[0].fieldNested.nullField).toBeUndefined()
    })

    it("Keeps null fields when \"keepEmptry\" is true", () => {
        const result = deleteFields(["fieldOne"], [
            "fieldOne",
            "fieldTwo",
            null,
            undefined
        ], true, true)

        expect(result.length).toEqual(4)
    })

    it("Sucessfully deletes multiple properties from object", () => {
        const result = deleteFields(["fieldOne", "fieldTwo"], {
            "fieldOne": "test",
            "fieldNested": {
                "fieldTwo": "test",
                "fieldOne": "test",
                "fieldThree": "test",
            }
        }) as any

        expect(result.fieldOne).toBeUndefined()
        expect(result.fieldNested).toBeDefined()

        expect(result.fieldNested.fieldOne).toBeUndefined()
        expect(result.fieldNested.fieldTwo).toBeUndefined()
        expect(result.fieldNested.fieldThree).toBeDefined()
    })

    it("Successfully deletes properties from array", () => {
        const result = deleteFields(["fieldOne"], [
            {
                "fieldOne": "test",
                "fieldTwo": "test"
            },
            {
                "fieldOne": "test2",
                "fieldTwo": "test2"
            }
        ]) as any

        expect(result[0].fieldOne).toBeUndefined()
        expect(result[0].fieldTwo).toBeDefined()
        
        expect(result[1].fieldOne).toBeUndefined()
        expect(result[1].fieldTwo).toBeDefined()
    })
    it("Sucessfully deletes nested property", () => {
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
        }) as any

        // First layer
        expect(result.fieldOne).toBeUndefined()
        expect(result.fieldNested).toBeDefined()

        // Second layer
        expect(result.fieldNested.fieldOne).toBeUndefined()
        expect(result.fieldNested.fieldTwo).toBeDefined()
        expect(result.fieldNested.fieldThree).toBeDefined()
        expect(result.fieldNested.nestedNestedField).toBeDefined()

        // Third layer
        expect(result.fieldNested.nestedNestedField.fieldThree).toBeDefined()
        expect(result.fieldNested.nestedNestedField.fieldTwo).toBeDefined()
        expect(result.fieldNested.nestedNestedField.fieldOne).toBeUndefined()
        expect(result.fieldNested.nestedNestedField.fieldFour).toBeDefined()

        // Forth layer (in array)
        expect(result.fieldNested.nestedNestedField.fieldFour[0]).toBeDefined()
        expect(result.fieldNested.nestedNestedField.fieldFour[0].fieldThree).toBeDefined()
        expect(result.fieldNested.nestedNestedField.fieldFour[0].fieldTwo).toBeDefined()
        expect(result.fieldNested.nestedNestedField.fieldFour[0].fieldOne).toBeUndefined()
    })
})