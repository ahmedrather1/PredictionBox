import React from "react";

export const AboutKnnText = {
  paragraph1:
    "K Nearest Neighbors (KNN) is a versatile algorithm in machine learning, commonly used for both classification and regression tasks. While KNN can be adept at classifying items into categories, our simulator is specifically designed to demonstrate its capabilities in regression.",
  paragraph2:
    "In regression, KNN predicts a continuous output rather than a class. Imagine you have a set of data points, each representing a certain entity with a numerical value. KNN helps predict the numerical value for a new entity based on the values of its 'K' nearest neighbors. Here's how it works in our simulator: 'K' refers to the number of closest points the algorithm considers around a new point. It calculates the average of these 'K' neighbors to predict the value of the new point.",
  paragraph3:
    "For example, if you're predicting the price of a house based on its features and the prices of nearby houses, KNN looks at the 'K' nearest houses in your dataset and averages their prices to estimate the price of the new house. "
};

export default AboutKnnText;
