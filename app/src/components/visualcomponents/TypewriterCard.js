import React from "react";
import Card from "react-bootstrap/Card";
import Typewriter from "typewriter-effect"; // Assuming 'typewriter-effect' library is used

const TypeWriterCard = () => {


  return (
    <Card
      style={{
        width: "80%",
        height: "60%",
        backgroundColor: "#404040",
        color:"#00ff41",
        fontSize:"1.8rem",
        textAlign: "left",
        fontFamily: "'Source Code Pro', monospace"
      }}
      className="mt-2"
    >
      <Card.Body>
        <Typewriter
          options={{
            strings: [
              "> knn = KNeighborsRegressor(n_neighbors=best_k)",
              "> mlrModel = LinearRegression()                ",
              "> model_sm = sm.OLS(y, X_scaled_sm)            ",
              "> lasso_cv = LassoCV(alphas=alphas, cv=5)      ",
            ],
            autoStart: true,
            loop: true,
            skipAddStyles: true
          }}
        />
        <Typewriter
          options={{
            strings: [
              "> knn.fit(X, y)                                ",
              "> mlrModel.fit(X, y)                           ",
              "> model_sm = model_sm.fit()                    ",
              "> lasso_cv.fit(X_scaled, y)                    ",
            ],

            autoStart: true,
            loop: true,
            skipAddStyles: true
          }}
        />
        <Typewriter
          options={{
            strings: [
              "> y_pred = knn.predict(x_range)                ",
              "> prediction = mlrModel.predict(dataPointDf)   ",
              "> coefficients = model_sm.params               ",
              "> coefficients[predictor] = lasso_cv.coef_[i]  ",
            ],

            autoStart: true,
            loop: true,
            skipAddStyles: true
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default TypeWriterCard;

// strings: [
//     "knn = KNeighborsRegressor(n_neighbors=best_k)",
//     "mlrModel = LinearRegression()",
//     "model_sm = sm.OLS(y, X_scaled_sm)",
//     "lasso_cv = LassoCV(alphas=alphas, cv=5, max_iter=10000)",
//   ],

//   strings: [
//     "knn.fit(X, y)",
//     "mlrModel.fit(X, y)",
//     "model_sm = model_sm.fit()",
//     "lasso_cv.fit(X_scaled, y)",
//   ],

//   strings: [
//     "y_pred = knn.predict(x_range)",
//     "prediction = mlrModel.predict(dataPointDf)",
//     "coefficients = model_sm.params",
//     "coefficients[predictor] = lasso_cv.coef_[i]",
//   ],
