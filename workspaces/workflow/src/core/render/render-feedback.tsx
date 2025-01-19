import type { FlowFeedbackStep } from "..";
// import { getPersistentState } from "../../lib/persistent-state";
import type { FlowState } from "../flow-state";
import { createRoot, getStepFooter, getStepHeader } from "./render-common";




/**
 * Function for rendering feedback element to HTMLElement without placing it in the DOM.
 */
export const renderFeedbackElement = ({
  step,
  isFirstStep,
  isLastStep,
  root: _root,
}: {
  step: FlowFeedbackStep;
  isLastStep: boolean;
  isFirstStep: boolean;
  root?: HTMLElement;
}): { root: HTMLElement } => {
  const root = _root ?? createRoot({ step });

  const modalContent = (
    <div className="flows-feedback-wrapper">
      <div className="flows-feedback-container">
        {getStepHeader({ step })}
        {step.body && (
          <div
            className="flows-feedback-body"
            dangerouslySetInnerHTML={{ __html: step.body }}
          />
        )}
         {getStepFooter({ step, isFirstStep, isLastStep })}
      </div>
    </div>
  );

  if (!step.hideOverlay) {
    root.appendChild(
      <div
        className={`flows-modal-overlay${step.closeOnOverlayClick ? " flows-overlay-cancel" : ""}`}
        style={step.disableOverlayClickLayer ?  "pointerEvents: none;" : ""}
      />,
    );
  }
  root.appendChild(modalContent);

  return { root };
};

/**
 * Render feedback and attach it to the DOM
 */
export const renderFeedback = ({
  root,
  step,
  state,
}: {
  root: HTMLElement;
  step: FlowFeedbackStep;
  state: FlowState;
}): void => {
  renderFeedbackElement({
    step,
    root,
    isFirstStep: !state.hasPrevStep,
    isLastStep: !state.hasNextStep,
  });
};