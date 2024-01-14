export const PredictionInputFormSchema = (customParameters) => {
  const schema = {
    type: "object",
    title: "Custom Parameter Input",
    oneOf: [
      {
        title: "Sample Model", // Title for the first option
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
        title: "Your Custom Model", // Title for the second option
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
