export const DemoDataSelectorSchema = () => {
  const schema = {
    type: "object",
    properties: {
      Dataset: {
        type: "string",
        enum: ["iris", "ToyotaCorollaPrices"],
      },
    },
  };
  return schema;
};
