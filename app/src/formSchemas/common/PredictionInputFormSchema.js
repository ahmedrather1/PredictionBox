export const PredictionInputFormSchema = (customParameters) => {
  const schema = {
    type: "object",
    title: "Custom Parameter Input",
    oneOf: [
      {
        title: "Sample Model",
        properties: {
          predictorSample: {
            type: "integer",
            title: "Predictor (X value)",
            minimum: 1,
          },
        },
        required: ["predictorSample"],
      },
      {
        title: "Your Custom Model",
        properties: {
          predictorCustom: {
            type: "integer",
            title: "Predictor (X value)",
            minimum: 1,
            readOnly: customParameters ? false : true,
          },
        },
        required: ["predictorCustom"],
      },
    ],
  };
  return schema;
};
