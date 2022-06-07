import Portal from "../Portal/Portal";
import { useAppDispatch } from "../../Store";
import orderSlice from "../../Store/orderSlice";
import { Dispatch, useState, SetStateAction } from "react";

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
  const [paymentType, setPaymentType] = useState<"cash" | "card">();

  const dispatch = useAppDispatch();
  const { markAsPaid } = orderSlice.actions;

  return (
    <Portal isHidden={portalIsHidden}>
      <div className="bg-white flex flex-col p-2">
        <h2 className="col-span-2">Please select a Payment Type</h2>
        <div className="flex space-x-4 my-4 justify-center">
          <button
            className="bg-gray-700 text-gray-100 px-4 py-2"
            onClick={() => setPaymentType("cash")}
          >
            Cash
          </button>
          <button
            className="border border-gray-700 text-gray-700 px-4 py-2"
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
          <button
            onClick={() => {
              if (!paymentType) return;
              console.log(current, orderId, paymentType);
              dispatch(markAsPaid({ current, orderId, paymentType }));
              setPortalIsHidden(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Portal>
  );
};

export default MarkAsPaidForm;
