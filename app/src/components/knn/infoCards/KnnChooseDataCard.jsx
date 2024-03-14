import React from "react";
import ChooseDataCard from "../../common/infoCards/ChooseDataCard";
import KnnChooseDataText from "../text/KnnChooseDataText";

const KnnChooseDataCard = () => {
  let title = "Data Upload Instructions";
  return <ChooseDataCard title={title} Text={KnnChooseDataText} />;
};

export default KnnChooseDataCard;
