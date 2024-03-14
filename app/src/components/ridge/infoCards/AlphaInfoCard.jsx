import React from "react";
import AboutAlphaText from "../text/AboutAlphaText";
import CustomParameterInfoCardSmall from "../../common/infoCards/CustomParameterInfoCardSmall";

const AlphaInfoCard = () => {
  let title = "About Alpha";
  return <CustomParameterInfoCardSmall title={title} Text={AboutAlphaText} />;
};

export default AlphaInfoCard;
