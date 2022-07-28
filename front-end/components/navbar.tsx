import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../pages/_app";

type ButtonLinkType = {
  path: string;
  text: string;
};

const ButtonLink = ({ path, text }: ButtonLinkType) => {
  return (
    <Link href={path}>
      <a className="btn-trans-black capitalize">{text}</a>
    </Link>
  );
};

export default function Navbar() {
  const { isauth, setAuth } = useContext(AuthContext);

  const logOut = () => {
    sessionStorage.removeItem("access_token");
    setAuth(false);
  };

  return (
    <nav className="p-4">
      <div className="flex justify-between items-center">
        <div className="basis-1/2 flex items-center">
          <Image src="/favicon.ico" alt="" width={40} height={40} />
        </div>
        <div className="hidden md:flex gap-3 basis-1/1">
          <ButtonLink path={"/"} text="home" />
          <ButtonLink path={"/about"} text="about us" />

          {isauth ? <ButtonLink path={"/user/profile"} text="profile" /> : ""}
        </div>
        <div className="">
          {isauth ? (
            <button
              className="text-black bg-red-900 bg-opacity-10 hover:bg-opacity-30  relative h-7 items-center font-mono tracking-wider pt-0.5 md:pt-0 uppercase text-sm duration-200 px-4 rounded flex justify-center flex-row;"
              onClick={logOut}
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <a className="text-black bg-blue-900 bg-opacity-10 hover:bg-opacity-30  relative h-7 items-center font-mono tracking-wider pt-0.5 md:pt-0 uppercase text-sm duration-200 px-4 rounded flex justify-center flex-row;">
                login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
