import React from "react";
import KnnOptionsText from "../../common/text/knn/KnnOptionsText";
import CustomParameterInfoCard from "../../common/infoCards/CustomParameterInfoCard";

const KnnCustomParameterInfoCard = () => {
  let title = "Understanding the KNN Custom Parameters";
  return <CustomParameterInfoCard title={title} Text={KnnOptionsText} />;
};

export default KnnCustomParameterInfoCard;
