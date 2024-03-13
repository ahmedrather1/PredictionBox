import React from "react";
import ChooseDataCard from "../../common/infoCards/ChooseDataCard";
import SlrChooseDataText from "../text/SlrChooseDataText";

const SlrChooseDataCard = () => {
  let title = "Data Upload Instructions";
  return <ChooseDataCard title={title} Text={SlrChooseDataText} />;
};

export default SlrChooseDataCard;
