import { ReactNode } from "react";

type props = { children: ReactNode, isHidden: boolean };

const Modal: React.FC<props> = ({ children, isHidden }) => {
  if (isHidden) return <div className="hidden"></div>
  return (
      <div className="block z-50">
          {children}
      </div>
  )
};

export default Modal;
