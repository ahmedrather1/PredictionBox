import React from "react";

// TODO use react listgroup stuff instead of html
const KnnChooseDataText = () => {
  return (
    <p>
      You can either use the demo data provided in our simulator to see KNN
      regression in action or upload your own data for a more tailored
      experience.
      <br />
      <br /> <strong>If you choose to upload data</strong>:
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
      </ul>
    </p>
  );
};

export default KnnChooseDataText;