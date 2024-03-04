import React from "react";

const AboutRidgePartialRegression = () => {
  return (
    <p className="mt-3">
      <strong>What are Partial Regression Plots in Ridge Regression?</strong>
      <br /> <br />
      Partial regression plots in the context of Ridge Regression serve a
      similar purpose as in Multiple Linear Regression (MLR), but with an added
      focus on the impact of regularization. They help in visualizing the
      relationship between the dependent variable and one of the independent
      variables, considering the Ridge penalty's effect on shrinking the
      coefficients of other variables in the model.
      <br />
      <br />
      <p>
        In the context of Ridge regression, we're often interested in the
        question: "How does the dependent variable change with one independent
        variable when all other independent variables are held constant?" This
        can be difficult to visualize, especially when working with more than
        two dimensions. Partial regression plots help to address this by
        isolating the relationship of interest.
      </p>
      Here's how to interpret the plot you're looking at:
      <ul>
        <li>
          {" "}
          Each dot represents an observation, showing how individual data points
          relate to the variable of interest and the outcome, after accounting
          for the Ridge penalty.
        </li>
        <li>
          This axis displays the values of an independent variable, adjusted for
          the influence of other variables and the regularization effect. This
          adjustment gives insight into the variable's unique contribution to
          the model.
        </li>
        <li>
          Shows the residuals of the dependent variable — the difference between
          observed values and those predicted by the Ridge model, adjusted for
          the penalties applied to other variables.
        </li>
        <li>
          The line in the plot illustrates the relationship between the chosen
          independent variable and the residuals of the dependent variable,
          under the Ridge Regression framework.
        </li>
      </ul>
      The slope of this line indicates the nature of the association between the
      independent variable and the dependent variable, while other variables'
      effects are minimized by the Ridge adjustment. An upward slope suggests a
      positive relationship, where increasing the independent variable leads to
      an increase in the dependent variable, considering the Ridge penalty.
      Conversely, a downward slope indicates a negative relationship.
      <br />
      <br />
      These plots are particularly valuable in Ridge Regression as they offer
      insights into how regularization affects the relationships between
      variables. By highlighting the direct impact of one variable on the
      outcome, while factoring in the complexity reduction through the Ridge
      penalty, partial regression plots provide a nuanced understanding of the
      model.
    </p>
  );
};

export default AboutRidgePartialRegression;
