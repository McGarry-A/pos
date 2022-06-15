import { Dispatch, SetStateAction } from "react";

type PaymentType = "cash" | "card" | "credit";
type CurrentType = "cleaning" | "delivery" | "done";

interface portalInterface {
  current: CurrentType;
  orderId: string;
}

interface props {
  payment: PaymentType;
  orderId?: string;
  current?: CurrentType;
  setPortalProps?: Dispatch<SetStateAction<portalInterface | undefined>>;
  setPortalIsHidden?: Dispatch<SetStateAction<boolean>>;
}

const PaymentBadge: React.FC<props> = ({
  payment,
  setPortalIsHidden,
  setPortalProps,
  orderId,
  current,
}) => {
  if (payment === "card" || payment === "cash") {
    return (
      <span className="px-3 w-full py-1 rounded text-white bg-green-600 uppercase text-xs hover:bg-green-500">
        {payment}
      </span>
    );
  }

  return (
    <>
      <span
        className={`px-3 w-full py-1 rounded text-white bg-red-600 text-xs uppercase cursor-pointer hover:bg-red-500`}
        onClick={() => {
          setPortalIsHidden && setPortalIsHidden(true);
          setPortalProps &&
            setPortalProps({ current, orderId } as portalInterface);
        }}
      >
        Unpaid
      </span>
    </>
  );
};

export default PaymentBadge;
