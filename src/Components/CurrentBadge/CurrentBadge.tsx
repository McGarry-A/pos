interface Props {
  current: "cleaning" | "delivery" | "done";
}

const CurrentBadge: React.FC<Props> = ({ current }) => {
  return (
    <div className="flex items-center">
      <span
        className={`border rounded-full w-2 h-2 mx-1 animate-pulse duration-150 ${
          current === "cleaning" ? "bg-green-600" : "bg-blue-600"
        }`}
      ></span>
      <p className="uppercase text-xs opacity-60">{current}</p>
    </div>
  );
};

export default CurrentBadge;
