import { replaceFields } from "../src"

describe("Replace fields tests", () => {
    it("Replaces one field on simple object", () => {
        const result = replaceFields({
            "fieldOne": "notFieldOne"
        }, {
            fieldOne: "test",
            fieldTwo: "test",
            fieldThree: "test"
        })
    
        expect(result.fieldOne).toBeUndefined()
        expect(result.fieldTwo).toBeDefined()
        expect(result.fieldThree).toBeDefined()
        expect(result.notFieldOne).toBeDefined()
    })

    it("Replaces two fields on simple object", () => {
        const result = replaceFields({
            "fieldOne": "notFieldOne",
            "fieldTwo": "notFieldTwo"
        }, {
            fieldOne: "test",
            fieldTwo: "test",
            fieldThree: "test"
        })
    
        expect(result.fieldOne).toBeUndefined()
        expect(result.fieldTwo).toBeUndefined()
        expect(result.fieldThree).toBeDefined()
        expect(result.notFieldOne).toBeDefined()
        expect(result.notFieldTwo).toBeDefined()
    })

    it("Replaces two nested fields on nested object and array", () => {
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
    
        // First level
        expect(result.fieldOne).toBeUndefined()
        expect(result.fieldTwo).toBeUndefined()
        expect(result.notFieldOne).toBeDefined()
        expect(result.notFieldTwo).toBeDefined()
        expect(result.fieldThree).toBeDefined()

        // Second level
        expect(result.fieldThree.fieldOne).toBeUndefined()
        expect(result.fieldThree.fieldTwo).toBeUndefined()
        expect(result.fieldThree.notFieldOne).toBeDefined()
        expect(result.fieldThree.notFieldTwo).toBeDefined()
        
        // Third level
        expect(result.fieldThree.notFieldTwo.someArray).toBeDefined()
        expect(result.fieldThree.notFieldTwo.someArray.length).toEqual(2)
        
        // Fourth level
        expect(result.fieldThree.notFieldTwo.someArray[0].fieldOne).toBeUndefined()
        expect(result.fieldThree.notFieldTwo.someArray[0].fieldTwo).toBeUndefined()
        expect(result.fieldThree.notFieldTwo.someArray[0].notFieldOne).toBeDefined()
        expect(result.fieldThree.notFieldTwo.someArray[0].notFieldTwo).toBeDefined()
        expect(result.fieldThree.notFieldTwo.someArray[1].fieldOne).toBeUndefined()
        expect(result.fieldThree.notFieldTwo.someArray[1].fieldTwo).toBeUndefined()
        expect(result.fieldThree.notFieldTwo.someArray[1].notFieldOne).toBeDefined()
        expect(result.fieldThree.notFieldTwo.someArray[1].notFieldTwo).toBeDefined()
    })
})