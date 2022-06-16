import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";

interface Props {
  children: ReactNode;
  panelIsOpen: boolean;
  setPanelIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ExpandablePanel: React.FC<Props> = ({
  children,
  panelIsOpen,
  setPanelIsOpen,
}) => {
  return (
    <div
      className={`flex flex-col space-y-2 bg-white flex-1 absolute right-0 top-0 h-screen px-10 shadow-lg transition duration-150 md:pt-4 ${
        panelIsOpen ? "" : "translate-x-96"
      }`}
    >
      <div
        className="p-3 rounded-full shadow-md bg-white w-min -translate-x-16 translate-y-64 cursor-pointer "
        onClick={() => setPanelIsOpen(!panelIsOpen)}
      >
        <BsChevronRight />
      </div>
      {children}
    </div>
  );
};

export default ExpandablePanel;
