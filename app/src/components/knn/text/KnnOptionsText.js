import React from "react";

const KnnOptionsText = () => {
  return (
    <p className="mt-3">
      <ol>
        {" "}
        <li>
          {" "}
          <strong>Custom K Value: </strong>
          <br /> <br />
          In K-Nearest Neighbors (KNN), 'K' represents the number of nearest
          neighbors used to make predictions. When you choose a custom value of
          K, you're deciding how many neighbors will influence the
          classification of a new data point.
          <br />
          <br />
          <strong> Increasing K: </strong>
          A higher K means more neighbors are considered, which generally
          smoothens the decision boundary and can lead to more generalized
          predictions. It can be useful for reducing noise in the data. However,
          too high a value might oversimplify the model, leading to underfitting
          (poor generalization on unseen data). <br />
          <br />
          <strong> Decreasing K: </strong>A smaller K makes the model more
          sensitive to local data patterns, creating a more complex decision
          boundary. This can be good for capturing specific data characteristics
          but may also capture noise, leading to overfitting (model is too
          tailored to the training data).
        </li>
        <br />
        <br />
        <li>
          <strong>Custom Number of Folds & Maximum K Value:</strong> <br />
          <br />
          This option involves using cross-validation to choose the best K.
          Here, you can select the number of folds (parts) the data is split
          into and the maximum K value to test.
          <br />
          <br />
          <strong> Number of Cross Validation Folds:</strong> Cross-validation
          involves splitting your dataset into a given number of folds, or
          parts. Each fold gets a turn at being the test set, with the rest
          serving as the training set. A higher number of folds means more
          testing scenarios, which can lead to a more reliable estimation of
          model performance but increases computational time. <br />
          <br />
          <strong>Maximum K Value:</strong> This sets the upper limit of K
          values to be tested. The sandbox will automatically find the best K
          (from 1 to this maximum) based on model performance across all folds.
          A higher maximum K allows exploring a wider range of neighbor
          influences but can be more computationally intensive.
        </li>
      </ol>
      Remember, the optimal values for K and the number of folds depend on your
      specific dataset and problem. Experimenting with these parameters in the
      KNN sandbox can help you find the best model for your data. The sample
      prediction uses 5 fold cross validation with a maximum K value of 31 to
      choose the best K.
    </p>
  );
};

export default KnnOptionsText;
