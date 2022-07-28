import React from "react";
import Link from "next/link";
import Image from "next/image";

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
  return (
    <nav className="p-4">
      <div className="flex justify-between items-center">
        <div className="basis-1/2 flex items-center">
          <Image src="/favicon.ico" alt="" width={40} height={40} />
        </div>
        <div className="hidden md:flex gap-3 basis-1/1">
          <ButtonLink path={"/"} text="home" />
          <ButtonLink path={"/about"} text="about us" />
          <ButtonLink path={"/user/profile"} text="profile" />
        </div>
        <div className="">
          <ButtonLink path={"/login"} text="login" />
        </div>
      </div>
    </nav>
  );
}
