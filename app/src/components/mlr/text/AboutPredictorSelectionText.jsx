import React from "react";

const AboutPredictorSelectionText = () => {
  return (
    <p>
      This chart shows the relationship between all the predictors and the
      response that we're trying to predict. The distance each point is away
      from 0 indicates how much impact its corresponding predictor has.
      <br />
      <br />
      <ul>
        <li>Values above 0 suggest a positive influence</li>
        <li>Values below 0 suggest a negative influence</li>
        <li>
          The further a point is from 0, the stronger the influence of the
          predictor.
        </li>
        <li>
          The error bars between each point show how confident we are in our
          analysis of the significance of each predictor. Smaller error bars
          indicate higher confidence.
        </li>
      </ul>
      This visual helps us see at a glance which factors are most important for
      our predictions.
      <br />
    </p>
  );
};

export default AboutPredictorSelectionText;
