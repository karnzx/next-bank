import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-[4rem] leading-5 m-0">About</h1>

      <p className="text-[1.5rem] my-[4rem] text-center leading-relaxed ">
        web applicaton about the Bank.
        <br />
        Deposit - Withdraw - Transfer money between users.
        <br />
        In this case, you can make a default user in DB instead of a register system.
      </p>
      <div className="text-[2rem] grid grid-flow-col gap-7 h-fit place-content-center">
        <div className="shadow-md p-5 border hover:border-blue-900 hover:shadow-lg hover:text-blue-600">
          <h3 className="font-semibold">Backend</h3>
          <p className="font-light">Nodejs, MongoDB</p>
        </div>
        <div className="shadow-md p-5 border hover:border-blue-900 hover:shadow-lg hover:text-blue-600">
          <h3 className="font-semibold">Frontend</h3>
          <p className="font-light">Nextjs, TailwindCSS</p>
        </div>
      </div>
    </div>
  );
};

export default About;
