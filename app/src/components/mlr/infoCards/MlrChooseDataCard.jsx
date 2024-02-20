import React from "react";
import ChooseDataCard from "../../common/infoCards/ChooseDataCard";
import MlrChooseDataText from "../text/MlrChooseDataText";

const MlrChooseDataCard = () => {
  let title = "Choose your Data!";
  return <ChooseDataCard title={title} Text={MlrChooseDataText} />;
};

export default MlrChooseDataCard;
