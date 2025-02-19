import { useState, useEffect, useCallback } from 'react';

interface UseStepOptions {
  initialStep?: number;
  maxStep?: number;
}

const useStep = (options: UseStepOptions = {}) => {
  const { initialStep = 1, maxStep = Infinity } = options;

  const [currentStep, setCurrentStep] = useState<number>(() => {
    return Math.max(initialStep, Math.min(initialStep, maxStep));
  });

  useEffect(() => {
    setCurrentStep(prev => Math.max(initialStep, Math.min(prev, maxStep)));
  }, [maxStep]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, maxStep));
  }, [maxStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    const targetStep = Math.max(1, Math.min(step, maxStep));
    setCurrentStep(targetStep);
  }, [maxStep]);

  const reset = useCallback(() => {
    setCurrentStep(Math.max(1, Math.min(initialStep, maxStep)));
  }, [initialStep, maxStep]);

  const isFirstStep: boolean = currentStep === 1;
  const isLastStep: boolean = currentStep === maxStep;

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    reset,
    isFirstStep,
    isLastStep,
  };
};

export default useStep;