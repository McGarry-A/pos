const CreateCustomerForm = () => {
  // need to pass set modal to be able to close it

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSave = () => {};
  const handleExit = () => {};

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
      <div className="bg-white max-w-lg m-auto left-0 right-0 shadow-md rounded mt-[25%]">
        <form
          className="p-4 space-y-4"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <div>
            <h3 className="text-2xl font-semibold">Create a New Customer</h3>
            <p className="opacity-40 text-sm mb-2 italic">Please enter some personal information about this customer.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div className="">
              <label>First Name</label>
              <input placeholder="Ahmed" type="text" />
            </div>
            <div className="grid g">
              <label>Last Name</label>
              <input placeholder="McGarry" type="text" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div className="">
              <label>E-mail Address</label>
              <input placeholder="atomcgarry@hotmail.com" type="email" />
            </div>
            <div className="">
              <label>Phone Number</label>
              <input placeholder="07907733824" type="email" />
            </div>
          </div>
          <div>
            <label>Street Address</label>
            <input placeholder="357 Leyland Road" type="email" />
          </div>
          <div className="flex w-full justify-end space-x-4">
            <button
              className="border px-6 py-2 rounded font-semibold"
              onClick={() => handleExit()}
            >
              Exit
            </button>
            <button
              className="border px-6 py-2 rounded font-semibold bg-green-600 text-white"
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerForm;
