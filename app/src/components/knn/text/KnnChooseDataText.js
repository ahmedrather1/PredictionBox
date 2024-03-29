import React from "react";

// TODO use react listgroup stuff instead of html
const KnnChooseDataText = () => {
  return (
    <p>
      <strong>If you choose to upload data</strong>:
      <ul>
        <li>Please ensure the data is in a CSV file format.</li>
        <li>
          Each column in your file should contain only numeric data, as KNN uses
          these numerical values to calculate the 'distance' between points.
        </li>
        <li>
          Non-numeric columns will be ignored to ensure the accuracy of the
          regression analysis.
        </li>
        <li>
          The first row of your data should contain the names corresponding to
          the data in your columns.
        </li>
        <li>
          <strong>
            Outliers within your data will be removed according to the IQR rule
            to obtain more accurate predictions.
          </strong>
        </li>
      </ul>
    </p>
  );
};

export default KnnChooseDataText;
