import React from "react";
import KnnOptionsText from "../text/KnnOptionsText";
import ChooseDataCard from "../../common/infoCards/ChooseDataCard";
import KnnChooseDataText from "../text/KnnChooseDataText";

const KnnChooseDataCard = () => {
  let title = "Choose your Data!";
  return <ChooseDataCard title={title} Text={KnnChooseDataText} />;
};

export default KnnChooseDataCard;