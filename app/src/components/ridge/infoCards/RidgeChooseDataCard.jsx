import React from "react";
import ChooseDataCard from "../../common/infoCards/ChooseDataCard";
import RidgeChooseDataText from "../text/RidgeChooseDataText";
const RidgeChooseDataCard = () => {
  let title = "Choose your Data!";
  return <ChooseDataCard title={title} Text={RidgeChooseDataText} />;
};

export default RidgeChooseDataCard;
