export const FileUploadFormSchema = () => {
  const schema = {
    type: "object",
    properties: {
      file: {
        type: "string",
        format: "data-url",
      },
    },
  };
  return schema;
};
