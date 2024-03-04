import React from "react";
import AboutLassoPartialRegression from "../text/AboutLassoPartialRegression";
import CustomParameterInfoCard from "../../common/infoCards/CustomParameterInfoCard";

const LassoPartialRegressionInfoCard = () => {
  let title = "Understanding the LASSO Partial Regression Plots";
  return (
    <CustomParameterInfoCard title={title} Text={AboutLassoPartialRegression} />
  );
};

export default LassoPartialRegressionInfoCard;
