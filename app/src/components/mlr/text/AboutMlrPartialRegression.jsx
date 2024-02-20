import React from "react";

const AboutMlrPartialRegression = () => {
  return (
    <p className="mt-3">
      <strong>What are Partial Regression Plots?</strong>
      <br /> <br />
      Partial regression plots, also known as added variable plots, are a visual
      tool used in multiple linear regression to understand the relationship
      between the dependent variable and one of the independent variables, while
      controlling for the effects of other independent variables in the model.
      <br />
      <br />
      <p>
        In the context of multiple linear regression, we're often interested in
        the question: "How does the dependent variable change with one
        independent variable when all other independent variables are held
        constant?" This can be difficult to visualize, especially when working
        with more than two dimensions. Partial regression plots help to address
        this by isolating the relationship of interest.
      </p>
      Here's how to interpret the plot you're looking at:
      <ul>
        <li>Each dot on the plot represents an observation in your dataset.</li>
        <li>
          The horizontal axis shows the values of an independent variable (let's
          say 'X'), but these values have been adjusted to remove the influence
          of other variables in the model.
        </li>
        <li>
          The vertical axis shows the residuals of the dependent variable (let's
          say 'Y') - that is, the differences between the observed values and
          the values predicted by the model, again adjusted for other variables.
        </li>
        <li>
          The straight line in the plot is the partial regression line, which
          shows the relationship between 'X' and the residuals of 'Y'.
        </li>
      </ul>
      If the line slopes upwards, it suggests that there's a positive
      association between 'X' and 'Y' when other variables are controlled for:
      as 'X' increases, 'Y' also tends to increase. If the line slopes
      downwards, there would be a negative association: as 'X' increases, 'Y'
      tends to decrease.
      <br />
      <br />
      By using a partial regression plot, you can get a clearer picture of the
      direct relationship between two variables in the context of a multiple
      regression model. This is incredibly useful for understanding complex
      models.
    </p>
  );
};

export default AboutMlrPartialRegression;
