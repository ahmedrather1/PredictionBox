export const DemoDataSelectorSchema = () => {
  const schema = {
    type: "object",
    properties: {
      Dataset: {
        type: "string",
        title: "Select Dataset",
        enum: ["IrisPlant", "ToyotaCorollaPrices", "WineQuality", "NYHouses"],
      },
    },
  };
  return schema;
};