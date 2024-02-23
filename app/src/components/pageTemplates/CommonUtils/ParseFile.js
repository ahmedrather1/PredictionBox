import Papa from "papaparse";

export const parseFile = async (file, setFileData) => {
  await Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      setFileData(results.data);
    },
  });
};

export const processFileColumns = async (fileData, setColumns) => {
  let sample = fileData[0];
  let colsRaw = Object.keys(sample);
  let cols = [];
  colsRaw.forEach((col) => {
    if (!isNaN(sample[col])) {
      cols.push(col);
    }
  });
  setColumns(cols);
};
