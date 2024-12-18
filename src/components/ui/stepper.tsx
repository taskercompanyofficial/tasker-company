import React from "react";
import { FaAngleDoubleRight, FaCheck } from "react-icons/fa";

export default function Stepper({
  stepperItems,
  currentStep,
  setCurrentStep,
  lastStep,
}: {
  stepperItems: any;
  currentStep: number;
  setCurrentStep: any;
  lastStep: number;
}) {
  return (
    <ol className="flex w-full items-center space-x-2 overflow-x-auto rounded-lg border border-gray-200 bg-white p-3 text-center text-sm font-medium text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:space-x-4 sm:p-4 sm:text-base rtl:space-x-reverse">
      {stepperItems.map((item: string, index: number) => (
        <button
          className={`flex items-center whitespace-nowrap ${currentStep > index + 1 && "text-green-600"} disabled:cursor-not-allowed disabled:text-gray-400 ${currentStep - 1 <= index ? "text-blue-600 dark:text-blue-500" : "cursor-pointer"} `}
          onClick={() => setCurrentStep(index + 1)}
          disabled={currentStep < index + 1}
          key={index}
        >
          <span
            className={`me-2 hidden h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs md:flex ${currentStep - 1 === index && "text-blue-600 dark:text-blue-500"}`}
          >
            {currentStep > index + 1 ? <FaCheck /> : <>{index + 1}</>}
          </span>
          {item}
          {index + 1 < lastStep && (
            <FaAngleDoubleRight className="ms-2 w-4 sm:ms-4 rtl:rotate-180" />
          )}
        </button>
      ))}
    </ol>
  );
}
