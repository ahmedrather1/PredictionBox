import React from "react";

const AboutMlrText = () => {
  return (
    <p>
      Multiple Linear Regression is a statistical technique used to understand
      the relationship between one dependent variable and two or more
      independent variables. Imagine you're trying to predict the price of a
      house (the dependent variable) based on its size, location, number of
      bedrooms, and age (the independent variables). Multiple Linear Regression
      helps us understand how each of these factors contributes to the house's
      price.
      <br />
      <br /> The method works by finding the equation that best fits the data
      points available, allowing us to make predictions about the dependent
      variable based on the values of the independent variables. For example, it
      can tell us how much the price is expected to increase for each additional
      square foot of size or for each year the house is newer.
      <br />
      <br /> This technique is widely used across various fields such as
      economics, finance, health sciences, and more, for making informed
      decisions and predictions based on multiple factors.
      <br />
    </p>
  );
};

export default AboutMlrText;
