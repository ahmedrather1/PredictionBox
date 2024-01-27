import React from "react";
import SlrOptionsText from "../text/SlrOptionsText";
import CustomParameterInfoCard from "../../common/infoCards/CustomParameterInfoCard";

const SlrCustomParameterInfoCard = () => {
  let title = "Understanding the SLR Custom Parameters";
  return <CustomParameterInfoCard title={title} Text={SlrOptionsText} />;
};

export default SlrCustomParameterInfoCard;
