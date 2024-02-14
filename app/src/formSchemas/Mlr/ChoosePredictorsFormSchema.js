export const ChoosePredictorsFormSchema = (checkboxLabels) => {
  console.log(checkboxLabels);
  let props = {};
  checkboxLabels.forEach((label) => {
    console.log(label);
    props[label] = { type: "boolean" };
  });

  console.log(props);

  const schema = {
    type: "object",
    title: "Checkbox Input",
    properties: props,
    required: ["checkboxes"],
  };

  return schema;
};
