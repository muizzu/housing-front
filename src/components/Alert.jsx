import React from "react";
import {
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
  ExclamationCircleIcon
  
} from "@heroicons/react/20/solid";

const alertTypes = {
  error: {
    bg: "bg-red-50",
    progress: "bg-red-200",
    text: "text-red-700",
    focus: "focus:ring-offset-red-50 focus:ring-red-600",
    hover: "hover:bg-red-100",
    icon: <XMarkIcon />,
  },
  info: {
    bg: "bg-blue-50",
    progress: "bg-blue-200",
    text: "text-blue-700",
    focus: "focus:ring-offset-blue-50 focus:ring-blue-600",
    hover: "hover:bg-blue-100",
    icon: <InformationCircleIcon />,
  },
  warning: {
    bg: "bg-yellow-50",
    progress: "bg-yellow-200",
    text: "text-yellow-700",
    focus: "focus:ring-offset-yellow-50 focus:ring-yellow-600",
    hover: "hover:bg-yellow-100",
    icon: <ExclamationCircleIcon />,
  },
  success: {
    bg: "bg-green-50",
    progress: "bg-green-200",
    text: "text-green-700",
    focus: "focus:ring-offset-green-50 focus:ring-green-600",
    hover: "hover:bg-green-100",
    icon: <CheckCircleIcon />,
  },
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Alert({ message, type, onClick, completed }) {
  return (
    <div className=" mx-auto w-full  ">
      <div
        className={classNames(
          alertTypes[type].bg,
          alertTypes[type].text,
          "mt-6 mx-auto sm:rounded-md  py-4 px-4"
        )}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <div
              className={classNames(alertTypes[type].text, "h-5 w-5")}
              aria-hidden="true"
            >
              {alertTypes[type].icon}
            </div>
          </div>
          <div className="ml-3">
            <p className={classNames(alertTypes[type], "text-sm font-medium")}>
              {message}
            </p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClick}
                type="button"
                className={classNames(
                  alertTypes[type].hover,
                  alertTypes[type].focus,
                  "inline-flex rounded-md p-1.5  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                )}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
