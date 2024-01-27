export const DemoDataSelectorSchema = () => {
  const schema = {
    type: "object",
    properties: {
      Dataset: {
        type: "string",
        enum: ["IrisPlant", "ToyotaCorollaPrices", "WineQuality", "NYHouses"],
      },
    },
  };
  return schema;
};
