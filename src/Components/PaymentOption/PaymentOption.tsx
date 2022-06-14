import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons/lib";

interface Props<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>> | Dispatch<SetStateAction<T>>;
  current: T;
  Icon: IconType;
  title: string;
}

const PaymentOption = <T,>({
  state,
  setState,
  current,
  Icon,
  title,
}: Props<T>): JSX.Element => {
  return (
    <div
      className={`${
        state === current ? "border-blue-900 border-2" : ""
      } bg-blue-600 bg-opacity-10 p-4 rounded-2xl text-blue-900 text-xs flex justify-center items-center flex-col w-24 cursor-pointer`}
      onClick={() => setState(current)}
    >
      <Icon
        size={"2rem"}
        className={`${
          state === current ? "opacity-1" : "opacity-40"
        } text-blue-900 mb-1 hover:opacity-100`}
      />
      <p
        className={` ${
          state === current ? "opacity-1" : "opacity-40"
        } tracking-tighter font-bold}`}
      >
        {title}
      </p>
    </div>
  );
};

export default PaymentOption;
