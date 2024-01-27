import React from "react";
import AboutKnnText from "../../common/text/knn/AboutKnnText";
import GeneralInfoCard from "../../common/infoCards/GeneralInfoCard";

const SlrGeneralInfoCard = () => {
  let title = "About the SLR algorithm";
  return <GeneralInfoCard title={title} Text={AboutKnnText} />;
};

export default SlrGeneralInfoCard;
