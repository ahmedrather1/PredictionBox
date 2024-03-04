import RidgeGeneralInfoCard from "../components/ridge/infoCards/RidgeGeneralInfoCard";
import RidgeChooseDataCard from "../components/ridge/infoCards/RidgeChooseDataCard";
import MlrPredictorSelectionInfoCard from "../components/mlr/infoCards/PredictorSelectionInfoCard";
import RidgePartialRegressionInfoCard from "../components/ridge/infoCards/RidgePartialRegressionInfoCard";
import AlphaInfoCard from "../components/ridge/infoCards/AlphaInfoCard";

import PenaltyModelPage from "../components/pageTemplates/PenaltyModelPage/PenaltyModelPage";
import { ChoosePredictorsFormSchema } from "../formSchemas/Mlr/ChoosePredictorsFormSchema";

const Endpoints = {
  COEFFICIENT_ANALYSIS_URL: "/lasso-gateway/call-lasso-coefficient-analysis",
  CUSTOM_COEFFICIENT_ANALYSIS_URL:
    "/lasso-gateway/call-lasso-custom-coefficient-analysis",
  PARTIAL_REGRESSIONS_URL: "/lasso-gateway/call-lasso-partial-regressions",
  CUSTOM_PARTIAL_REGRESSIONS_URL:
    "/lasso-gateway/call-lasso-custom-partial-regressions",
  INDIVIDUAL_PREDICTION_URL: "/lasso-gateway/call-lasso-individual",
  CUSTOM_INDIVIDUAL_PREDICTION_URL:
    "/lasso-gateway/call-custom-lasso-individual",
};

function LassoPage() {
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

export default LassoPage;
