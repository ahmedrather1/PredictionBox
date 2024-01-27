import React from "react";
import KnnOptionsText from "../../common/text/knn/KnnOptionsText";
import ChooseDataCard from "../../common/infoCards/ChooseDataCard";
import KnnChooseDataText from "../../common/text/knn/KnnChooseDataText";

const KnnChooseDataCard = () => {
  let title = "Choose your Data!";
  return <ChooseDataCard title={title} Text={KnnChooseDataText} />;
};

export default KnnChooseDataCard;
