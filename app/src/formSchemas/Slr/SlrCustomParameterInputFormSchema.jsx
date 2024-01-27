export const SlrCustomParameterInputFormSchema = () => {
  const schema = {
    type: "object",
    title: "Custom Parameter Input",
    properties: {
      beta0: {
        type: "number",
        title: "Beta 0",
      },
      beta1: {
        type: "number",
        title: "Beta 1",
      },
    },
    required: ["beta0", "beta1"],
  };
  return schema;
};
