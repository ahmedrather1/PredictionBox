export const AboutMlrPartialRegression = {
  paragraph1:
    "Partial regression plots, also known as added variable plots, are a visual tool used in multiple linear regression to understand the relationship between the dependent variable and one of the independent variables, while controlling for the effects of other independent variables in the model.",
  paragraph2:
    "In the context of multiple linear regression, we're often interested in the question: 'How does the dependent variable change with one independent variable when all other independent variables are held constant?' This can be difficult to visualize, especially when working with more than two dimensions. Partial regression plots help to address this by isolating the relationship of interest.",
  paragraph3:
    "Each dot on the plot represents an observation in your dataset. ",
    paragraph4:
    "The horizontal axis shows the values of an independent variable (let's say 'X'), but these values have been adjusted to remove the influence of other variables in the model.",
    paragraph5:
    "The vertical axis shows the residuals of the dependent variable (let's say 'Y') - that is, the differences between the observed values and the values predicted by the model, again adjusted for other variables.",
    paragraph6:
    "The straight line in the plot is the partial regression line, which shows the relationship between 'X' and the residuals of 'Y'.",
    paragraph7:
    "If the line slopes upwards, it suggests that there's a positive association between 'X' and 'Y' when other variables are controlled for: as 'X' increases, 'Y' also tends to increase. If the line slopes downwards, there would be a negative association: as 'X' increases, 'Y' tends to decrease.",
    paragraph8:
    "By using a partial regression plot, you can get a clearer picture of the direct relationship between two variables in the context of a multiple regression model. This is incredibly useful for understanding complex models.",

  };

export default AboutMlrPartialRegression;
