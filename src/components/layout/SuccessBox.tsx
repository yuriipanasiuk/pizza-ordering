import { IStringProps } from "@/interface/header.interface";

const SuccessBox = ({ text }: IStringProps) => {
  return (
    <div className="text-center bg-green-100 p-4 rounded-lg border-1 border-green-300">
      {text}
    </div>
  );
};

export default SuccessBox;
