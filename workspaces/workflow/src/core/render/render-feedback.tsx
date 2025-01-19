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
          <p
            className="flows-feedback-body"
            dangerouslySetInnerHTML={{ __html: step.body }}
          />
        )}
        {step.fields && Array.isArray(step.fields) && (
            <div
            className="flows-feedback-form-container"
            dangerouslySetInnerHTML={{
              __html: `
              <form 
                class="flows-feedback-form" 
                onsubmit="(async (event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                const formJson = {};
                formData.forEach((value, key) => {
                  formJson[key] = value;
                });

                try {
                  console.log('PACKAGE Form===> ', formJson);
                  console.log('PACKAGE Step===>', ${JSON.stringify(step)});
                  console.log('RIGHT HERE');
                  const data = getPersistentState();

                  console.log('PACKAGE Data ===> ', data);
                } catch (error) {
                  console.error('Error during API call:', error);
                }
                })(event)"
              >
                ${step.fields.map((field, index) => `
                <div
                  key=${index}
                  class="flows-feedback-form-group"
                >
                  ${field.label ? `
                  <label
                    for="${field.label + index}"
                    class="flows-feedback-form-label"
                  >
                    ${field.label}
                    ${field.required ? '<span style="color: red;"> *</span>' : ''}
                  </label>
                  ` : ''}
                  <input
                  type="${field.type || 'text'}"
                  id="${field.label + index}"
                  name="${field.label}"
                  placeholder="${field.placeholder || ''}"
                  required="${!!field.required}"
                  class="flows-feedback-form-input"
                  />
                </div>
                `).join('')}

                ${getStepFooter({ step, isFirstStep, isLastStep })}
              </form>
              `,
            }}
            />
        )}
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
