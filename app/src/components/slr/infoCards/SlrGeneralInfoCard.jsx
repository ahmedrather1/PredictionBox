import React from "react";
import AboutKnnText from "../../common/text/AboutKnnText";
import GeneralInfoCard from "../../common/infoCards/GeneralInfoCard";

const SlrGeneralInfoCard = () => {
  let title = "About the SLR algorithm";
  return <GeneralInfoCard title={title} Text={AboutKnnText} />;
};

export default SlrGeneralInfoCard;
