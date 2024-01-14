export const fetchCsvFileAsBlob = async (fileName) => {
  try {
    // Assuming your CSV files are in the 'public' folder
    // and your React app is served from the root
    const response = await fetch(`/demoData/${fileName}.csv`);
    if (!response.ok) {
      throw new Error("File not found");
    }
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching file:", error);
    return null;
  }
};
