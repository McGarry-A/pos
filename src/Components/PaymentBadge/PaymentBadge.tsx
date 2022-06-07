import { Dispatch, SetStateAction } from "react";

type PaymentType = "cash" | "card" | "credit";

interface props {
  payment: PaymentType;
  setPortalIsHidden?: Dispatch<SetStateAction<boolean>>;
}

const PaymentBadge: React.FC<props> = ({ payment, setPortalIsHidden }) => {
  if (payment === "card" || payment === "cash") {
    return (
      <span className="px-3 w-full py-1 rounded text-white bg-green-600 uppercase text-xs">
        {payment}
      </span>
    );
  }

  return (
    <>
      <span
        className={`px-3 w-full py-1 rounded text-white bg-red-600 text-xs uppercase cursor-pointer`}
        onClick={() => setPortalIsHidden && setPortalIsHidden(true)}
      >
        Unpaid
      </span>
      {}
    </>
  );
};

export default PaymentBadge;
