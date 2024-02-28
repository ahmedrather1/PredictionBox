import MlrGeneralInfoCard from "../components/mlr/infoCards/MlrGeneralInfoCard";
import MlrChooseDataCard from "../components/mlr/infoCards/MlrChooseDataCard";
import MlrPredictorSelectionInfoCard from "../components/mlr/infoCards/PredictorSelectionInfoCard";
import MlrPartialRegressionInfoCard from "../components/mlr/infoCards/MlrPartialRegressionInfoCard";
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
      AboutAlphaCard={AlphaInfoCard}
      Variant={"RIDGE"}
    />
  );
}

export default RidgePage;
