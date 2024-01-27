import ModelPage from "./ModelPage";
import { SlrCustomParameterInputFormSchema } from "../formSchemas/Slr/SlrCustomParameterInputFormSchema";
import SlrCustomParameterInfoCard from "../components/slr/infoCards/SlrCustomParameterInfoCard";
import SlrGeneralInfoCard from "../components/slr/infoCards/SlrGeneralInfoCard";
import SlrChooseDataCard from "../components/slr/infoCards/SlrChooseDataCard";

const Endpoints = {
  SAMPLE_MODEL_URL: "/slr-gateway/call-sample-slr",
  SAMPLE_INDIVIDUAL_PREDICTION_URL: "/slr-gateway/call-sample-slr-individual",
  CUSTOM_MODEL_URL: "/slr-gateway/call-custom-slr",
  CUSTOM_INDIVIDUAL_PREDICTION_URL: "/slr-gateway/call-custom-slr-individual",
};

const PossibleCustomParams = {
  B0: "b0",
  B1: "b1",
};

function SlrPage() {
  return (
    <ModelPage
      Endpoints={Endpoints}
      PossibleCustomParams={PossibleCustomParams}
      CustomParameterInputFormSchema={SlrCustomParameterInputFormSchema}
      CustomParameterInfoCard={SlrCustomParameterInfoCard}
      GeneralInfoCard={SlrGeneralInfoCard}
      ChooseDataCard={SlrChooseDataCard}
    />
  );
}

export default SlrPage;
