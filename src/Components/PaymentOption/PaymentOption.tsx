import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons/lib";

interface Props<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  current: T;
  Icon: IconType;
  title: string;
  clickHandler?: <T>(current: T) => void;
}

const PaymentOption = <T,>({
  state,
  setState,
  current,
  Icon,
  title,
  clickHandler,
}: Props<T>): JSX.Element => {
  const match = state === current ? true : false;

  return (
    <div
      className={`${
        match && "border-blue-900 border-2"
      } bg-blue-600 bg-opacity-10 p-4 rounded-2xl text-blue-900 text-xs flex justify-center items-center flex-col w-24 cursor-pointer`}
      onClick={() => {
        setState(current);
        clickHandler && clickHandler(current);
      }}
    >
      <Icon
        size={"2rem"}
        className={`${
          match ? "opacity-1" : "opacity-40"
        } text-blue-900 mb-1 hover:opacity-100`}
      />
      <p
        className={`${
          match ? "opacity-1" : "opacity-40"
        } tracking-tighter font-bold}`}
      >
        {title}
      </p>
    </div>
  );
};

export default PaymentOption;
