import React from "react";
import AboutMlrText from "../text/AboutMlrText";
import GeneralInfoCard from "../../common/infoCards/GeneralInfoCard";

const MlrGeneralInfoCard = () => {
  let title = "About the Multiple Linear Regression Algorithm";
  return <GeneralInfoCard title={title} Text={AboutMlrText} />;
};

export default MlrGeneralInfoCard;
