import React from "react";
import CustomParameterInfoCard from "../../common/infoCards/CustomParameterInfoCard";
import AboutPredictorSelectionText from "../text/AboutPredictorSelectionText";

const MlrPredictorSelectionInfoCard = () => {
  let title = "About this Chart";
  return <CustomParameterInfoCard title={title} Text={AboutPredictorSelectionText} />;
};

export default MlrPredictorSelectionInfoCard;
