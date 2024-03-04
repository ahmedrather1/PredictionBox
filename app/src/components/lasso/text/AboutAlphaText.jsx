import React from "react";

const AboutAlphaText = () => {
  return (
    <p>
      Alpha acts as a tuning knob in LASSO Regression:
      <br />
      <ul>
        <li>
          increasing its value applies more penalty, leading to smaller
          coefficients and a simpler model, helping prevent overfitting.
        </li>
        <li>
          Decreasing alpha reduces the penalty, making the model more complex
          and similar to Multiple Linear Regression.
        </li>
      </ul>
      <strong>
        If all your coefficients are set to 0, try reducing your alpha!
      </strong>
      <br />
      <br />
      Adjusting alpha is crucial for striking the right balance between
      simplicity and accuracy in the model's predictions.
    </p>
  );
};

export default AboutAlphaText;
