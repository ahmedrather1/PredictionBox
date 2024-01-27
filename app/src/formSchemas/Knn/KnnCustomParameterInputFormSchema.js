export const KnnCustomParameterInputFormSchema = (originalData) => {
  const schema = {
    type: "object",
    title: "Custom Parameter Input",
    oneOf: [
      {
        title: "Option 1: Custom K Value",
        properties: {
          customK: {
            type: "integer",
            title: "Custom K value",
            minimum: 1,
            maximum: originalData ? originalData.length : 0,
          },
        },
        required: ["customK"],
      },
      {
        title: "Option 2: Custom Folds and Maximum K",
        properties: {
          maxK: {
            type: "integer",
            title: "Maximum K value",
            minimum: 1,
            maximum: originalData ? originalData.length : 0,
          },
          customFolds: {
            type: "integer",
            title: "Number of cross validation folds",
            minimum: 1,
            maximum: originalData ? originalData.length : 0,
          },
        },
        required: ["maxK", "customFolds"],
      },
    ],
  };
  return schema;
};
