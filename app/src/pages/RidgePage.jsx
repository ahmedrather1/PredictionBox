import MlrGeneralInfoCard from "../components/mlr/infoCards/MlrGeneralInfoCard";
import MlrChooseDataCard from "../components/mlr/infoCards/MlrChooseDataCard";
import MlrPredictorSelectionInfoCard from "../components/mlr/infoCards/PredictorSelectionInfoCard";
import MlrPartialRegressionInfoCard from "../components/mlr/infoCards/MlrPartialRegressionInfoCard";

import PenaltyModelPage from "../components/pageTemplates/PenaltyModelPage/PenaltyModelPage";
import { ChoosePredictorsFormSchema } from "../formSchemas/Mlr/ChoosePredictorsFormSchema";

const Endpoints = {
  COEFFICIENT_ANALYSIS_URL: "/mlr-gateway/call-mlr-coefficient-analysis",
  PARTIAL_REGRESSIONS_URL: "/mlr-gateway/call-mlr-partial-regressions",
  INDIVIDUAL_PREDICTION_URL: "/mlr-gateway/call-mlr-individual",
};

function RidgePage() {
  return (
    <PenaltyModelPage
      Endpoints={Endpoints}
      ChoosePredictorsFormSchema={ChoosePredictorsFormSchema}
      FinalPlotsInfoCard={MlrPartialRegressionInfoCard}
      GeneralInfoCard={MlrGeneralInfoCard}
      ChooseDataCard={MlrChooseDataCard}
      PredictorSelectionInfoCard={MlrPredictorSelectionInfoCard}
    />
  );
}

export default RidgePage;
