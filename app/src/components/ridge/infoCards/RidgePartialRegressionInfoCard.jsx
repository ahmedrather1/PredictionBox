import React from "react";
import AboutRidgePartialRegression from "../text/AboutRidgePartialRegression";
import CustomParameterInfoCard from "../../common/infoCards/CustomParameterInfoCard";

const RidgePartialRegressionInfoCard = () => {
  let title = "Understanding the Ridge Partial Regression Plots";
  return (
    <CustomParameterInfoCard title={title} Text={AboutRidgePartialRegression} />
  );
};

export default RidgePartialRegressionInfoCard;
