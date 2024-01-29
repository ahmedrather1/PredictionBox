import React from "react";

const SlrOptionsText = () => {
  return (
    <p className="mt-3">
      <strong>What is Simple Linear Regression?</strong>
      <br /> <br />
      Simple linear regression is a statistical method that allows us to
      summarize and study relationships between two continuous (quantitative)
      variables. It aims to model the relationship between a dependent variable
      and one independent variable by fitting a linear equation to observed
      data. The equation of the linear relationship is:
      <br />
      <br />
      <strong>Y = b0 + b1*X</strong>
      <br />
      <br />
      Here, Y represents the dependent variable we're trying to predict or
      explain, and X is the independent variable we're using to make
      predictions. b0 and b1 are coefficients representing the y-intercept and
      the slope of the line, respectively.
      <br /> <br />
      <strong>Provided Prediction : </strong>
      In this sandbox, you will first see a sample prediction where the values
      of b0 (intercept) and b1 (slope) have been automatically chosen using
      scikit-learn, a popular machine learning library. This prediction
      represents the "best fit" line, calculated based on minimizing the sum of
      the squares of the differences between observed and predicted values. This
      means, for the given dataset,
      <strong>
        the provided line represents the most accurate linear relationship
        between the independent and dependent variables according to the linear
        regression model
      </strong>
      .
      <br /> <br />
      <strong>User-Customizable Parameters</strong>
      <ol>
        <li>
          <strong>Intercept (b0): </strong>
          <ul>
            <li>
              Increasing b0: This will shift the line upwards on the graph,
              without changing its slope. It affects the starting point of the
              line on the Y-axis.
            </li>
            <li>
              Decreasing b0: This will shift the line downwards on the graph,
              also without altering its slope. It lowers the line's starting
              point on the Y-axis.
            </li>
          </ul>
        </li>
        <li>
          <strong>Slope (b1): </strong>
          <ul>
            <li>
              Increasing b1: This will make the line steeper, indicating a
              stronger positive relationship between the independent and
              dependent variables. It means that for each unit increase in X,
              the increase in Y becomes more pronounced.
            </li>
            <li>
              Decreasing b1: This will make the line flatter or even downward
              sloping if b1 becomes negative. It shows a weaker positive
              relationship, or even a negative relationship between X and Y,
              meaning Y increases less with each unit increase in X, or
              decreases with an increase in X.
            </li>
          </ul>
        </li>
      </ol>
      Feel free to experiment with different values of b0 and b1 to see how they
      impact the regression line. Remember, the provided prediction is the
      statistically determined "best fit" for the given data, but exploring
      different values can help deepen your understanding of the basic concepts
      of linear regression.
    </p>
  );
};

export default SlrOptionsText;
