import { selectFields } from "../src";

describe("Select fields", () => {
  it("Successfully removes all fields expect from selected", () => {
    const result = selectFields(["fieldOne", "fieldTwo"], {
      fieldOne: "test",
      fieldNested: {
        fieldTwo: "two",
        fieldOne: "one",
        fieldThree: "three",
      },
    });

    expect(result.fieldOne).toBeDefined();
    expect(result.fieldNested).toBeDefined();
    expect(result.fieldNested.fieldOne).toBeDefined();
    expect(result.fieldNested.fieldTwo).toBeDefined();
    expect(result.fieldNested.fieldThree).toBeUndefined();
  });

  it("Successfully selects properties from array", () => {
    const result = selectFields(
      ["fieldOne"],
      [
        {
          fieldOne: "test",
          fieldTwo: "test",
        },
        {
          fieldOne: "test2",
          fieldTwo: "test2",
        },
      ]
    ) as any;

    expect(result[0].fieldOne).toBeDefined();
    expect(result[0].fieldTwo).toBeUndefined();

    expect(result[1].fieldOne).toBeDefined();
    expect(result[1].fieldTwo).toBeUndefined();
  });
});
