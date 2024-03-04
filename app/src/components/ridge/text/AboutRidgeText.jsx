import React from "react";

const AboutRidgeText = () => {
  return (
    <p>
      Ridge Regression is an extension of the Multiple Linear Regression
      technique, designed to handle a specific problem known as
      multicollinearity. Multicollinearity occurs when the independent variables
      in a regression model are highly correlated with each other, which can
      make the model's predictions less reliable. Imagine trying to predict the
      quality of wine based on various factors like acidity, sweetness, and
      alcohol content. If some of these factors are closely related, it might be
      hard to determine their individual effects on the wine's quality.
      <br />
      <br /> Ridge Regression addresses this issue by introducing a penalty term
      to the equation of Multiple Linear Regression. In our case, this penalty
      term is called <strong>alpha</strong>. This penalty term shrinks the
      coefficients of the less important variables, effectively reducing their
      impact on the prediction. It's like telling the model, "Focus more on the
      most significant factors and don't get distracted by the noise."
      <br />
      <br /> By balancing the influence of various predictors, Ridge Regression
      helps us make more accurate and reliable predictions when faced with the
      challenge of multicollinearity, ensuring that our model can understand the
      subtle nuances between different variables without getting overwhelmed.
      <br />
    </p>
  );
};

export default AboutRidgeText;
