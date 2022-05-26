import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface Props {
  sideBarIsOpen: boolean;
  setSideBarIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<Props> = ({ sideBarIsOpen, setSideBarIsOpen }) => {
  if (sideBarIsOpen) {
    return (
      <div className="border w-screen bg-slate-600 bg-opacity-90 absolute h-screen">
        <button className="mt-20 z-10" onClick={() => setSideBarIsOpen(false)}>
          Close
        </button>

        <nav>
          <ul className="uppercase list-none flex flex-col space-x-4 text-xl">
            <li>
              <Link to="/search">SEARCH</Link>
            </li>
            <li>
              <Link to="/reports">REPORTS</Link>
            </li>
            <li>
              <Link to="/reset">RESET</Link>
            </li>
            <li>
              <Link to="/contact">CONTACT</Link>
            </li>
          </ul>
        </nav>

        <span>Designed and Developed By Ahmed McGarry</span>
      </div>
    );
  }

  return <></>;
};

export default Sidebar;
