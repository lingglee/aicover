import Social from "@/components/social";

export default function () {
  return (
    <section>
      <div className="w-screen flex-col px-6 py-20 lg:flex lg:px-10 xl:px-24">
        <div className="mx-auto my-6 w-full border border-[#E4E4E7] lg:my-10"></div>
        <div className="lg:flex lg:flex-row lg:justify-between">
          <div>
            <div className="mb-8 mt-6">{/* <Social /> */}</div>
            <div className="mt-4 flex flex-col lg:mt-0">
              <div className="mb-4 flex flex-row items-center">
                <p className="block">联系作者: </p>
                <p className="font-inter ml-4 text-black">lixcee8@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="font-inter text-center text-sm text-gray-500 lg:mt-0">
            © Copyright 2024.{" "}
            <a
              className="text-primary hidden md:inline-block"
            >
              lingguang.wang
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
