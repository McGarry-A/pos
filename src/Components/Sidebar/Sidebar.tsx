import { IconType } from "react-icons";
import Logo from "../../icons/Logo.png";
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
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
}) => {
  return (
    <Link to={link}>
      <button
        className={`flex flex-col justify-center items-center cursor-pointer  rounded-lg w-fit mx-auto p-3 my-10 hover:scale-105 transition ${
          activeTab === title ? "bg-blue-100" : "bg-white"
        }`}
        onClick={() => {
          setActiveTab(title);
        }}
      >
        <Icon
          size={"1.5rem"}
          className={`${
            activeTab === title ? "text-blue-900" : "text-gray-400"
          }`}
        />
      </button>
    </Link>
  );
};

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<NavType>("Workflow");

  return (
    <nav className="absolute bg-white border-1 bottom-0 border-gray-50 md:pt-6 md:left-0 md:h-screen md:w-32 w-full">
      <div className="flex md:flex-col justify-evenly w-full">
        <div className="hidden md:block">
          <img src={Logo} alt="random Logo" />
          <p className="text-xs text-center leading-tighter italic opacity-70">
            Cleaning Solutions
          </p>
        </div>
        <div className="flex items-center w-full justify-evenly md:flex-col md:space-y-8 md:mt-10">
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
      </div>
      <div className="hidden md:flex md:flex-col md:mt-20 md:h-full md:justify-start">
        <NavItem
          key="LOGOUT"
          title="Exit"
          link="link"
          Icon={RiLogoutBoxRFill}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
