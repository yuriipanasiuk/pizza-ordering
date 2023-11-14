import Image from "next/image";
import Rigth from "../icons/Rigth";

const Hero = () => {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold ">
          Everything
          <br /> is better
          <br /> with a&nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="text-gray-500 my-6 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex gap-2 items-center uppercase  bg-primary text-white px-4 py-2 rounded-full">
            Order now
            <Rigth />
          </button>
          <button className="flex gap-2 py-2 items-center text-gray-600 font-semibold">
            Learn more
            <Rigth />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/pizza.png"}
          alt="pizza"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </section>
  );
};

export default Hero;
