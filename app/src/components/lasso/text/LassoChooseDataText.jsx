import React from "react";

// TODO use react listgroup stuff instead of html
const LassoChooseDataText = () => {
  return (
    <p>
      You can either use the demo data provided in our simulator to see multiple
      linear regression in action or upload your own data for a more tailored
      experience.
      <br />
      <br /> <strong>If you choose to upload data</strong>:
      <ul>
        <li>Please ensure the data is in a CSV file format.</li>
        <li>
          Each column in your file should contain only numeric data, as LASSO
          regression uses these numerical values to establish a linear
          relationship between the independent and dependent variables.
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

export default LassoChooseDataText;
