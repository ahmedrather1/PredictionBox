import ModelPage from "./ModelPage";

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
    />
  );
}

export default KnnPage;
