import React from "react";
import AboutSlrText from "../text/AboutSlrText";
import GeneralInfoCard from "../../common/infoCards/GeneralInfoCard";

const SlrGeneralInfoCard = () => {
  let title = "About the Simple Linear Regression Algorithm";
  return <GeneralInfoCard title={title} Text={AboutSlrText} />;
};

export default SlrGeneralInfoCard;
