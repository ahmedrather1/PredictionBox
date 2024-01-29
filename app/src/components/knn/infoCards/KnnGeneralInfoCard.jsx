import React from "react";
import AboutKnnText from "../text/AboutKnnText";
import GeneralInfoCard from "../../common/infoCards/GeneralInfoCard";

const KnnGeneralInfoCard = () => {
  let title = "About the K Nearest Neighbors Algorithm";
  return <GeneralInfoCard title={title} Text={AboutKnnText} />;
};

export default KnnGeneralInfoCard;
