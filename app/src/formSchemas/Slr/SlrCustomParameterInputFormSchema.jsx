export const SlrCustomParameterInputFormSchema = () => {
  const schema = {
    type: "object",
    title: "Custom Parameter Input",
    properties: {
      b0: {
        type: "number",
        title: "Beta 0",
      },
      b1: {
        type: "number",
        title: "Beta 1",
      },
    },
    required: ["b0", "b1"],
  };
  return schema;
};
