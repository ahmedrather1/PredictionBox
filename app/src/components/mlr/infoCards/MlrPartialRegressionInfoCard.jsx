import React from "react";
import AboutMlrPartialRegression from "../text/AboutMlrPartialRegression";
import CustomParameterInfoCard from "../../common/infoCards/CustomParameterInfoCard";

const MlrPartialRegressionInfoCard = () => {
  let title = "Understanding the MLR Partial Regression Plots";
  return (
    <CustomParameterInfoCard title={title} Text={AboutMlrPartialRegression} />
  );
};

export default MlrPartialRegressionInfoCard;
