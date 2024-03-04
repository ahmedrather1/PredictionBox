import RidgeGeneralInfoCard from "../components/ridge/infoCards/RidgeGeneralInfoCard";
import RidgeChooseDataCard from "../components/ridge/infoCards/RidgeChooseDataCard";
import MlrPredictorSelectionInfoCard from "../components/mlr/infoCards/PredictorSelectionInfoCard";
import RidgePartialRegressionInfoCard from "../components/ridge/infoCards/RidgePartialRegressionInfoCard";
import AlphaInfoCard from "../components/ridge/infoCards/AlphaInfoCard";

import PenaltyModelPage from "../components/pageTemplates/PenaltyModelPage/PenaltyModelPage";
import { ChoosePredictorsFormSchema } from "../formSchemas/Mlr/ChoosePredictorsFormSchema";

const Endpoints = {
  COEFFICIENT_ANALYSIS_URL: "/ridge-gateway/call-ridge-coefficient-analysis",
  CUSTOM_COEFFICIENT_ANALYSIS_URL:
    "/ridge-gateway/call-ridge-custom-coefficient-analysis",
  PARTIAL_REGRESSIONS_URL: "/ridge-gateway/call-ridge-partial-regressions",
  CUSTOM_PARTIAL_REGRESSIONS_URL:
    "/ridge-gateway/call-ridge-custom-partial-regressions",
  INDIVIDUAL_PREDICTION_URL: "/ridge-gateway/call-ridge-individual",
  CUSTOM_INDIVIDUAL_PREDICTION_URL:
    "/ridge-gateway/call-custom-ridge-individual",
};

function RidgePage() {
  return (
    <PenaltyModelPage
      Endpoints={Endpoints}
      ChoosePredictorsFormSchema={ChoosePredictorsFormSchema}
      FinalPlotsInfoCard={RidgePartialRegressionInfoCard}
      GeneralInfoCard={RidgeGeneralInfoCard}
      ChooseDataCard={RidgeChooseDataCard}
      PredictorSelectionInfoCard={MlrPredictorSelectionInfoCard}
      AboutAlphaCard={AlphaInfoCard}
      Variant={"RIDGE"}
    />
  );
}

export default RidgePage;
