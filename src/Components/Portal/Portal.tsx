import React from "react";
import ReactDOM from "react-dom";

const Portal: React.FC<PortalProps> = (props) => {
  return props.isHidden ? (
    ReactDOM.createPortal(props.children, props.target)
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
