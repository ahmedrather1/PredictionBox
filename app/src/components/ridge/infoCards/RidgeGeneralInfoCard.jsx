import React from "react";
import AboutRidgeText from "../text/AboutRidgeText";
import GeneralInfoCard from "../../common/infoCards/GeneralInfoCard";

const RidgeGeneralInfoCard = () => {
  let title =
    "About the Regularized Linear Regression (RIDGE) Regression Algorithm";
  return <GeneralInfoCard title={title} Text={AboutRidgeText} />;
};

export default RidgeGeneralInfoCard;
