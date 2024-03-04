import React from "react";

const AboutAlphaText = () => {
  return (
    <p>
      Alpha acts as a tuning knob in Ridge Regression:
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
      Adjusting alpha is crucial for striking the right balance between
      simplicity and accuracy in the model's predictions.
    </p>
  );
};

export default AboutAlphaText;
