import { OnboardingStep } from "../../components/OnboardingStep";

export default function Welcome() {
  return <OnboardingStep step={0} nextHref="/(onboarding)/more" />;
}
