import Portal from "../Portal/Portal";
import { useAppDispatch } from "../../Store";
import orderSlice from "../../Store/orderSlice";
import { Dispatch, useState, SetStateAction, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

interface props {
  current: "cleaning" | "delivery" | "done";
  orderId: string;
  setPortalIsHidden: Dispatch<SetStateAction<boolean>>;
  portalIsHidden: boolean;
}

const MarkAsPaidForm: React.FC<props> = ({
  current,
  orderId,
  setPortalIsHidden,
  portalIsHidden,
}) => {
  const [paymentType, setPaymentType] = useState<"cash" | "card" | null>();
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();
  const activeClass = "bg-slate-800 text-gray-100";

  const { markAsPaid } = orderSlice.actions;

  interface SubmitInterface {
    current: string;
    orderId: string;
  }

  const handleSubmit = ({ current, orderId }: SubmitInterface): void => {
    if (!paymentType) {
      setError("Please select a payment type");
    } else {
      console.log(`${orderId} In Form`);
      dispatch(markAsPaid({ current, orderId, paymentType }));
      setPaymentType(null);
      setPortalIsHidden(false);
    }
  };

  return (
    <Portal isHidden={portalIsHidden}>
      <div className="bg-white flex flex-col p-4 relative shadow-md">
        <h2 className="col-span-2">Please select a Payment Type</h2>
        <p className="text-red-500 text-xs">{error}</p>
        <div className="flex space-x-4 my-4 justify-center">
          <button
            className={`border-gray-800 border px-4 py-2 ${
              paymentType === "cash" ? activeClass : "text-gray-800"
            }`}
            onClick={() => setPaymentType("cash")}
          >
            Cash
          </button>
          <button
            className={`border-gray-800 border px-4 py-2 ${
              paymentType === "card" ? activeClass : "text-gray-800"
            }`}
            onClick={() => setPaymentType("card")}
          >
            Card
          </button>
        </div>
        <div className="flex justify-end space-x-3 p-2">
          <button
            className="text-red-700 border border-red-600 px-3 py-1 text-sm"
            onClick={() => setPortalIsHidden(false)}
          >
            Exit
          </button>
          <button onClick={() => handleSubmit({ current, orderId })}>
            Confirm
          </button>
        </div>
        <div className="bg-white absolute -top-3 -left-4 rounded-full cursor-pointer">
          <MdOutlineCancel
            size={"2rem"}
            onClick={() => setPortalIsHidden(false)}
          />
        </div>
      </div>
    </Portal>
  );
};

export default MarkAsPaidForm;
