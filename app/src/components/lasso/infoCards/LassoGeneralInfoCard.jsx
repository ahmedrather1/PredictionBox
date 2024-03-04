import React from "react";
import AboutLassoText from "../text/AboutLassoText";
import GeneralInfoCard from "../../common/infoCards/GeneralInfoCard";

const LassoGeneralInfoCard = () => {
  let title = "About the LASSO Regression Algorithm";
  return <GeneralInfoCard title={title} Text={AboutLassoText} />;
};

export default LassoGeneralInfoCard;
