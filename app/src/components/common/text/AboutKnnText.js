import React from "react";

const AboutKnnText = () => {
  return (
    <p>
      K Nearest Neighbors (KNN) is a versatile algorithm in machine learning,
      commonly used for both classification and regression tasks. While KNN can
      be adept at classifying items into categories, our simulator is
      specifically designed to demonstrate its capabilities in regression.
      <br />
      <br /> In regression, KNN predicts a continuous output rather than a
      class. Imagine you have a set of data points, each representing a certain
      entity with a numerical value. KNN helps predict the numerical value for a
      new entity based on the values of its 'K' nearest neighbors. Here's how it
      works in our simulator: 'K' refers to the number of closest points the
      algorithm considers around a new point. It calculates the average of these
      'K' neighbors to predict the value of the new point.
      <br />
      <br /> For example, if you're predicting the price of a house based on its
      features and the prices of nearby houses, KNN looks at the 'K' nearest
      houses in your dataset and averages their prices to estimate the price of
      the new house. <br />
      <br />
      You can either use the demo data provided in our simulator to see KNN
      regression in action or upload your own data for a more tailored
      experience. If you choose to upload data, please ensure it's in a CSV file
      format. Each column in your file should contain only numeric data, as KNN
      uses these numerical values to calculate the 'distance' between points.
      Non-numeric columns will be ignored to ensure the accuracy of the
      regression analysis. This KNN regression simulator is an excellent tool
      for those looking to understand how KNN can be applied to predict
      numerical outcomes. Whether you're a student, a budding data scientist, or
      simply curious about machine learning, this simulator provides a hands-on
      experience to explore and learn from.
    </p>
  );
};

export default AboutKnnText;
