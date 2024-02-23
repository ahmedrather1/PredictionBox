export const ChoosePredictorsFormSchema = (checkboxLabelsObj) => {
  let checkboxLabels = [];
  Object.keys(checkboxLabelsObj).forEach((key) =>
    checkboxLabels.push(checkboxLabelsObj[key])
  );
  let props = {};
  checkboxLabels.forEach((label) => {
    props[label] = { type: "boolean" };
  });

  const schema = {
    type: "object",
    title: "Checkbox Input",
    properties: props,
    required: ["checkboxes"],
  };

  return schema;
};
