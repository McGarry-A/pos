import Portal from "../Portal/Portal";
import { useAppDispatch } from "../../Store";
import orderSlice from "../../Store/orderSlice";
import { Dispatch, useState, SetStateAction } from "react";
import { MdClear } from "react-icons/md";

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
  const [paymentType, setPaymentType] = useState<"cash" | "card" | null>(
    "cash"
  );
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();
  const activeClass = "border-b-4 border-blue-500";

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
      <div className="bg-white relative shadow-md rounded max-w-xs w-full py-12 px-6 space-y-2">
        <h2 className="text-xl font-semibold uppercase border-b-4 border-blue-600 w-max">
          Payment Type
        </h2>
        <p className="text-sm opacity-50 italic mb-2">
          How did this customer pay?
        </p>
        <p className="text-red-500 text-xs">{error}</p>
        <div className="flex space-x-4 my-3">
          <button
            className={`transition duration-300 ease-in-out text-sm h-min ${
              paymentType === "cash" ? activeClass : "text-gray-500"
            }`}
            onClick={() => setPaymentType("cash")}
          >
            Cash
          </button>
          <button
            className={`transition duration-300 ease-in-out text-sm h-min ${
              paymentType === "card" ? activeClass : "text-gray-500"
            }`}
            onClick={() => setPaymentType("card")}
          >
            Card
          </button>
        </div>
        <div className="flex justify-end mb-2">
          <button
            onClick={() => handleSubmit({ current, orderId })}
            className="px-3 py-2 bg-blue-600 text-gray-50 hover:bg-blue-500 text-sm"
          >
            Confirm
          </button>
        </div>
        <div className="absolute top-4 right-4 cursor-pointer opacity-30 hover:opacity-100 transition duration-150">
          <MdClear
            className=""
            size={"2rem"}
            onClick={() => setPortalIsHidden(false)}
          />
        </div>
      </div>
    </Portal>
  );
};

export default MarkAsPaidForm;
