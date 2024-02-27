import React from "react";
import GeneralInfoCard from "../../common/infoCards/GeneralInfoCard";
import AboutAlphaText from "../text/AboutAlphaText";

const AlphaInfoCard = () => {
  let title = "About Alpha";
  return <GeneralInfoCard title={title} Text={AboutAlphaText} />;
};

export default AlphaInfoCard;
