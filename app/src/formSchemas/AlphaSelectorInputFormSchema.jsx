export const AlphaSelectorInputFormSchema = () => {
  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "Alpha Input Form",
    description:
      "A form that accepts a single floating point number named alpha",
    type: "object",
    properties: {
      alpha: {
        type: "number",
        title: "Alpha",
        description: "Input a number greater than 0",
      },
    },
  };
  return schema;
};
