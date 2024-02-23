export const MultipleParameterPredictionInputFormSchema = (
  checkboxLabelsObj
) => {
  let checkboxLabels = [];
  Object.keys(checkboxLabelsObj).forEach((key) =>
    checkboxLabels.push(checkboxLabelsObj[key])
  );
  let props = {};
  checkboxLabels.forEach((label) => {
    console.log(label);
    props[label] = { type: "number" };
  });
  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: props,
    required: checkboxLabels,
  };

  return schema;
};
