import { IconType } from "react-icons";

import { AiFillHome } from "react-icons/ai";
import { BsFillBadgeWcFill, BsPersonFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { FiPackage } from "react-icons/fi";
import { RiLogoutBoxRFill } from "react-icons/ri";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import useIsMobile from "../../Hooks/useIsMobile";
import Portal from "../Portal/Portal";
import { MdClear } from "react-icons/md";

interface Props {
  Icon: IconType;
  title: NavType;
  link?: string;
  activeTab: NavType;
  setActiveTab: Dispatch<SetStateAction<NavType>>;
  large?: boolean;
  setLogOut?: Dispatch<SetStateAction<boolean>>;
}

interface WrapperInterface {
  children: React.ReactNode;
  href?: string;
}

const Wrapper: React.FC<WrapperInterface> = ({ children, href }) => {
  if (href) {
    return <Link to={href}>{children}</Link>;
  }
  return <div>{children}</div>;
};

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
  setLogOut,
}) => {
  return (
    <Wrapper href={link ? link : undefined}>
      <button
        className={`flex flex-col justify-center items-center cursor-pointer  rounded-lg w-fit mx-auto p-3 my-4 hover:scale-105 transition ${
          activeTab === title ? "bg-blue-100" : "bg-white"
        }`}
        onClick={() => {
          setActiveTab(title);
          setLogOut && setLogOut(true);
        }}
      >
        <Icon
          size={`${large ? "2rem" : "1.5rem"}`}
          className={`hover:text-blue-600 ${
            activeTab === title ? "text-blue-600" : "text-gray-400"
          }`}
        />
      </button>
    </Wrapper>
  );
};

const Navbar = () => {
  const [activeTab, setActiveTab] = useState<NavType>("Workflow");
  const [logOutIsHidden, setLogOutIsHidden] = useState<boolean>(true);

  const isMobile = useIsMobile();

  const renderLogOutPortal = () => {
    return (
      <Portal isHidden={logOutIsHidden}>
        <div className="bg-white max-w-sm w-full p-6 space-y-4 relative rounded">
          <div>
            <h2 className="text-lg border-b-4 border-blue-600 w-max">
              Employee Log Out
            </h2>
          </div>
          <div>
            <p className="opacity-50">Are you sure you want to log out?</p>
          </div>
          <div className="flex">
            <button
              className="bg-blue-600 text-white py-2 px-3 text-sm hover:bg-blue-500"
              onClick={() => setLogOutIsHidden(!logOutIsHidden)}
            >
              Log Out
            </button>
          </div>
          <div
            className="absolute top-1 right-3 opacity-50 hover:cursor-pointer hover:opacity-100 transition duration-150"
            onClick={() => setLogOutIsHidden(!logOutIsHidden)}
          >
            <MdClear size={"1.3rem"} />
          </div>
        </div>
      </Portal>
    );
  };

  const renderNavItems = () =>
    links.map(({ title, link, Icon }, index) => {
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
    });

  return (
    <>
      <nav className="md:absolute fixed bg-white border-1 bottom-0 border-gray-50 md:left-0 md:top-0 md:w-28 w-full mt-32 md:mt-0 z-50">
        <div className="flex md:flex-col w-full h-full">
          <div className="hidden mx-4 mt-12 md:flex md:justify-center md:items-center md:flex-col">
            <BsFillBadgeWcFill size={"2rem"} className="text-blue-600" />
            <p className="text-xs text-center italic tracking-wider">
              WashClub
            </p>
          </div>
          <div className="flex items-center w-full justify-center md:flex-col md:flex-grow">
            {renderNavItems()}
            {isMobile && (
              <NavItem
                title="Exit"
                Icon={RiLogoutBoxRFill}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setLogOut={setLogOutIsHidden}
              />
            )}
          </div>
          <div className="hidden md:flex md:flex-col mb-2">
            <NavItem
              key="LOGOUT"
              title="Exit"
              Icon={RiLogoutBoxRFill}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              large
            />
          </div>
        </div>
      </nav>
      {renderLogOutPortal()}
    </>
  );
};

export default Navbar;
