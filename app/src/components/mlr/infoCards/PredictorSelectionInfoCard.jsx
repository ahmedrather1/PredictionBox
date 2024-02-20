import React from "react";
import GeneralInfoCard from "../../common/infoCards/GeneralInfoCard";
import AboutPredictorSelectionText from "../text/AboutPredictorSelectionText";

const MlrPredictorSelectionInfoCard = () => {
  let title = "About this Chart";
  return <GeneralInfoCard title={title} Text={AboutPredictorSelectionText} />;
};

export default MlrPredictorSelectionInfoCard;
