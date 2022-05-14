import { AiOutlinePlus } from "react-icons/ai"

const NewOrderForm = () => {
  return (
    <div className="space-y-2 max-w-xl">
      <div className="">
        <label htmlFor="first-name" className="text-lg">
          Customer
        </label>
        <div className="flex space-x-1 items-center">
        <input
          type="text"
          name=""
          id=""
          autoComplete=""
          className="border-2 block w-full rounded-md h-8"
        />
        <button className="p-1 border rounded bg-green-600">
          <AiOutlinePlus color="white" size={"1.2rem"}/>
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default NewOrderForm;
