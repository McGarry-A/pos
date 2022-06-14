import { IconType } from "react-icons";

import { AiFillHome } from "react-icons/ai";
import { BsFillBadgeWcFill, BsPersonFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { FiPackage } from "react-icons/fi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  Icon: IconType;
  title: NavType;
  link: string;
  activeTab: NavType;
  setActiveTab: Dispatch<SetStateAction<NavType>>;
  large?: boolean;
}

type NavType = "Workflow" | "Orders" | "Customers" | "Reports" | "Exit";

const links = [
  {
    title: "Workflow",
    link: "/",
    Icon: AiFillHome,
  },
  {
    title: "Orders",
    link: "/orders",
    Icon: FiPackage,
  },
  {
    title: "Customers",
    link: "/customers",
    Icon: BsPersonFill,
  },
  {
    title: "Reports",
    link: "/reports",
    Icon: HiDocumentReport,
  },
];

const NavItem: React.FC<Props> = ({
  Icon,
  title,
  link,
  activeTab,
  setActiveTab,
  large,
}) => {
  return (
    <Link to={link}>
      <button
        className={`flex flex-col justify-center items-center cursor-pointer  rounded-lg w-fit mx-auto p-3 my-4 hover:scale-105 transition ${
          activeTab === title ? "bg-blue-100" : "bg-white"
        }`}
        onClick={() => {
          setActiveTab(title);
        }}
      >
        <Icon
          size={`${large ? "2rem" : "1.5rem"}`}
          className={`hover:text-blue-600 ${
            activeTab === title ? "text-blue-600" : "text-gray-400"
          }`}
        />
      </button>
    </Link>
  );
};

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<NavType>("Workflow");

  return (
    <nav className="md:absolute fixed bg-white border-1 bottom-0 border-gray-50 md:left-0 md:top-0 md:w-28 w-full">
      <div className="flex md:flex-col w-full h-full">
        <div className="hidden mx-4 mt-12 md:flex md:justify-center md:items-center md:flex-col">
          <BsFillBadgeWcFill size={"2rem"} className="text-blue-600" />
          <p className="text-xs text-center italic tracking-wider">WashClub</p>
        </div>
        <div className="flex items-center w-full justify-center md:flex-col md:flex-grow">
          {links.map(({ title, link, Icon }, index) => {
            return (
              <NavItem
                key={index}
                title={title as NavType}
                link={link}
                Icon={Icon}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            );
          })}
        </div>
        <div className="hidden md:flex md:flex-col mb-2">
          <NavItem
            key="LOGOUT"
            title="Exit"
            link="link"
            Icon={RiLogoutBoxRFill}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            large
          />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
