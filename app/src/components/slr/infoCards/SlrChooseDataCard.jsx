import React from "react";
import ChooseDataCard from "../../common/infoCards/ChooseDataCard";
import KnnChooseDataText from "../../common/text/knn/KnnChooseDataText";

const SlrChooseDataCard = () => {
  let title = "Choose your Data! SLR";
  return <ChooseDataCard title={title} Text={KnnChooseDataText} />;
};

export default SlrChooseDataCard;
