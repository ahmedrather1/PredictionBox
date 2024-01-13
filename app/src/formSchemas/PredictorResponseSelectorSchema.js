export const PredictorResponseSelectorSchema = (columns) => ({
  type: "object",
  properties: {
    predictor: {
      type: "string",
      enum: columns,
    },
    response: {
      type: "string",
      enum: columns,
    },
  },
});
