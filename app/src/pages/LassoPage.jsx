import LassoGeneralInfoCard from "../components/lasso/infoCards/LassoGeneralInfoCard";
import LassoChooseDataCard from "../components/lasso/infoCards/LassoChooseDataCard";
import RidgePredictorSelectionInfoCard from "../components/ridge/infoCards/RidgePredictorSelectionInfoCard";
import LassoPartialRegressionInfoCard from "../components/lasso/infoCards/LassoPartialRegressionInfoCard";
import AlphaInfoCard from "../components/lasso/infoCards/AlphaInfoCard";

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
      FinalPlotsInfoCard={LassoPartialRegressionInfoCard}
      GeneralInfoCard={LassoGeneralInfoCard}
      ChooseDataCard={LassoChooseDataCard}
      PredictorSelectionInfoCard={RidgePredictorSelectionInfoCard}
      AboutAlphaCard={AlphaInfoCard}
      Variant={"LASSO"}
      ModelName={"LASSO Regression"}
    />
  );
}

export default LassoPage;
