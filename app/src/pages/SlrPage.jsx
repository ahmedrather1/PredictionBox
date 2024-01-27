import ModelPage from "./ModelPage";
import { SlrCustomParameterInputFormSchema } from "../formSchemas/Slr/SlrCustomParameterInputFormSchema";
import SlrCustomParameterInfoCard from "../components/slr/infoCards/SlrCustomParameterInfoCard";
import KnnGeneralInfoCard from "../components/knn/infoCards/KnnGeneralInfoCard";
import KnnChooseDataCard from "../components/knn/infoCards/KnnChooseDataCard";

const Endpoints = {
  SAMPLE_MODEL_URL: "/knn-gateway/call-sample-slr",
  SAMPLE_INDIVIDUAL_PREDICTION_URL: "/knn-gateway/call-sample-slr-individual",
  CUSTOM_MODEL_URL: "/knn-gateway/call-custom-slr",
  CUSTOM_INDIVIDUAL_PREDICTION_URL: "/knn-gateway/call-custom-slr-individual",
};

const PossibleCustomParams = {
  B0: "b0",
  B1: "b1",
};

function KnnPage() {
  return (
    <ModelPage
      Endpoints={Endpoints}
      PossibleCustomParams={PossibleCustomParams}
      CustomParameterInputFormSchema={SlrCustomParameterInputFormSchema}
      CustomParameterInfoCard={SlrCustomParameterInfoCard}
      GeneralInfoCard={KnnGeneralInfoCard}
      ChooseDataCard={KnnChooseDataCard}
    />
  );
}

export default KnnPage;
