import { SlrCustomParameterInputFormSchema } from "../formSchemas/Slr/SlrCustomParameterInputFormSchema";
import SlrCustomParameterInfoCard from "../components/slr/infoCards/SlrCustomParameterInfoCard";
import SlrGeneralInfoCard from "../components/slr/infoCards/SlrGeneralInfoCard";
import SlrChooseDataCard from "../components/slr/infoCards/SlrChooseDataCard";

import MultipleModelPage from "./MultipleModelPage";

const Endpoints = {
  SAMPLE_MODEL_URL: "/mlr-gateway/call-mlr-coefficient-analysis",
  SAMPLE_INDIVIDUAL_PREDICTION_URL: "/mlr-gateway/call-mlr-partial-regressions",
  CUSTOM_MODEL_URL: "/mlr-gateway/call-mlr-individual",
  CUSTOM_INDIVIDUAL_PREDICTION_URL: "/slr-gateway/call-custom-slr-individual",
};

const PossibleCustomParams = {
  B0: "b0",
  B1: "b1",
};

function MlrPage() {
  return (
    <MultipleModelPage
      Endpoints={Endpoints}
      PossibleCustomParams={PossibleCustomParams}
      CustomParameterInputFormSchema={SlrCustomParameterInputFormSchema}
      CustomParameterInfoCard={SlrCustomParameterInfoCard}
      GeneralInfoCard={SlrGeneralInfoCard}
      ChooseDataCard={SlrChooseDataCard}
    />
  );
}

export default MlrPage;
