export const CustomMultipleParameterInputSchema = (checkboxLabelsObj) => {
  let checkboxLabels = Object.values(checkboxLabelsObj);
  let props = {};
  checkboxLabels.forEach((label) => {
    props[label] = { type: "number" };
  });

  const modelOption = (title) => ({
    title: title,
    type: "object",
    properties: props,
    required: checkboxLabels,
  });

  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    oneOf: [modelOption("Standard Model"), modelOption("Custom Model")],
  };

  return schema;
};
