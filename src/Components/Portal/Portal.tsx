import React from "react";
import ReactDOM from "react-dom";

const Portal: React.FC<Props> = ({ children, isHidden, target }) => {
  return isHidden ? (
    ReactDOM.createPortal(
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
        {children}
      </div>,
      target
    )
  ) : (
    <div className="hidden"></div>
  );
};

export interface Props {
  target: Element;
  children: React.ReactNode;
  isHidden: boolean;
}

export default Portal;
