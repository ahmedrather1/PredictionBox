import React from "react";
import KnnOptionsText from "../../common/text/KnnOptionsText";
import CustomParameterInfoCard from "../../common/infoCards/CustomParameterInfoCard";

const SlrCustomParameterInfoCard = () => {
  let title = "Understanding the SLR Custom Parameters";
  return <CustomParameterInfoCard title={title} Text={KnnOptionsText} />;
};

export default SlrCustomParameterInfoCard;
