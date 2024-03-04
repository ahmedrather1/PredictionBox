import React from "react";
import ChooseDataCard from "../../common/infoCards/ChooseDataCard";
import LassoChooseDataText from "../text/LassoChooseDataText";
const LassoChooseDataCard = () => {
  let title = "Choose your Data!";
  return <ChooseDataCard title={title} Text={LassoChooseDataText} />;
};

export default LassoChooseDataCard;
