export type Attribute = {
  name: string;
  values: string[];
};

export type AttributeValue = {
  name: string;
  value: string;
};

export function generateCombinations(
  attributes: Attribute[]
): AttributeValue[][] {
  const result: AttributeValue[][] = [];

  function helper(
    prefix: AttributeValue[],
    remainingAttributes: Attribute[]
  ): void {
    if (remainingAttributes.length === 0) {
      result.push(prefix);
      return;
    }

    const [currentAttribute, ...restAttributes] = remainingAttributes;

    if (currentAttribute.values.length === 0) {
      helper(prefix, restAttributes);
    } else {
      currentAttribute.values.forEach((value) => {
        helper(
          [...prefix, { name: currentAttribute.name, value }],
          restAttributes
        );
      });
    }
  }

  helper([], attributes);
  return result;
}
