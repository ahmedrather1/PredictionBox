import ModelPage from "../components/pageTemplates/ModelPage/ModelPage";
import { KnnCustomParameterInputFormSchema } from "../formSchemas/Knn/KnnCustomParameterInputFormSchema";
import KnnCustomParameterInfoCard from "../components/knn/infoCards/KnnCustomParameterInfoCard";
import KnnGeneralInfoCard from "../components/knn/infoCards/KnnGeneralInfoCard";
import KnnChooseDataCard from "../components/knn/infoCards/KnnChooseDataCard";

const Endpoints = {
  SAMPLE_MODEL_URL: "/knn-gateway/call-sample-knn",
  SAMPLE_INDIVIDUAL_PREDICTION_URL: "/knn-gateway/call-sample-knn-individual",
  CUSTOM_MODEL_URL: "/knn-gateway/call-custom-knn",
  CUSTOM_INDIVIDUAL_PREDICTION_URL: "/knn-gateway/call-custom-knn-individual",
};

const PossibleCustomParams = {
  MAXK: "maxK",
  CUSTOMK: "customK",
  CUSTOMFOLDS: "customFolds",
};

function KnnPage() {
  return (
    <ModelPage
      Endpoints={Endpoints}
      PossibleCustomParams={PossibleCustomParams}
      CustomParameterInputFormSchema={KnnCustomParameterInputFormSchema}
      CustomParameterInfoCard={KnnCustomParameterInfoCard}
      GeneralInfoCard={KnnGeneralInfoCard}
      ChooseDataCard={KnnChooseDataCard}
    />
  );
}

export default KnnPage;
