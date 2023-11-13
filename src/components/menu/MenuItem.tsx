import Image from "next/image";

const MenuItem = () => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div>
        <Image
          width={100}
          height={100}
          src="/pizza.png"
          alt="pizza"
          className="block mx-auto"
        />
      </div>
      <h4 className="text-xl font-semibold my-3">title</h4>
      <p className=" text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <button className="bg-primary text-white rounded-full px-8 py-2 mt-4">
        Add to card $12
      </button>
    </div>
  );
};

export default MenuItem;
