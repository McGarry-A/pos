import React from "react";
import ReactDOM from "react-dom";

const Portal: React.FC<PortalProps> = ({ children, isHidden, target }) => {
  return isHidden ? (
    ReactDOM.createPortal(children, target)
  ) : (
    <div className="hidden"></div>
  );
};

export interface PortalProps {
  target: Element;
  children: React.ReactNode;
  isHidden: boolean;
}

export default Portal;
