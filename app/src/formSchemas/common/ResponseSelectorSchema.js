export const ResponseSelectorSchema = (columns) => ({
  type: "object",
  properties: {
    response: {
      type: "string",
      enum: columns,
    },
  },
});
