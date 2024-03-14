import React from "react";
import CustomParameterInfoCardSmall from "../../common/infoCards/CustomParameterInfoCardSmall";
import AboutPredictorSelectionText from "../text/AboutPredictorSelectionText";

const RidgePredictorSelectionInfoCard = () => {
  let title = "About this Chart";
  return (
    <CustomParameterInfoCardSmall
      title={title}
      Text={AboutPredictorSelectionText}
    />
  );
};

export default RidgePredictorSelectionInfoCard;
