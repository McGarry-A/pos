const NewOrderForm = () => {
  return (
    <div className="p-2 space-y-2">
      <div className="">
        <label htmlFor="first-name" className="">
          Customer
        </label>
        <input
          type="text"
          name=""
          id=""
          autoComplete=""
          className="border-2 block w-full rounded-md h-8"
        />
      </div>

      {/* <div className="">
        <label htmlFor="last-name" className="">
          Phone Number
        </label>
        <input
          type="text"
          name=""
          id=""
          autoComplete=""
          className="border-2 block w-full rounded-md h-8"
        />
      </div>

      <div className="">
        <label htmlFor="email-address" className="">
          Email address
        </label>
        <input
          type="text"
          name=""
          id=""
          autoComplete=""
          className="border-2 block w-full rounded-md h-8"
        />
      </div> */}
    </div>
  );
};

export default NewOrderForm;
