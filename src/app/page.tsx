import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader="Our story" mainHeader="About us" />
        <div className=" max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            consectetur perferendis, maxime fugit animi tempora atque aliquam
            nobis. Cupiditate adipisci, eius harum suscipit commodi libero
            officia eligendi at similique quia.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            consectetur perferendis, maxime fugit animi tempora atque aliquam
            nobis. Cupiditate adipisci, eius harum suscipit commodi libero
            officia eligendi at similique quia.
          </p>
        </div>
      </section>

      <section className="text-center my-16">
        <SectionHeaders subHeader="Do not hesitate" mainHeader="Contact us" />
        <div className="mt-8">
          <Link
            href="tel:+380961234567"
            className="text-4xl underline text-gray-500"
          >
            +380 96 1234567
          </Link>
        </div>
      </section>
    </>
  );
}
