import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type ButtonLinkType = {
  path: string
}

const ButtonLink = ({ path }: ButtonLinkType) => {
  return (
    <Link href={`/${path}`}>
      <a className="btn-trans-black capitalize">{path}</a>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="p-4">
      <div className="flex justify-between items-center">
        <div className="basis-1/2 flex items-center">
          <Image src="/favicon.ico" alt="" width={40} height={40} />
        </div>
        <div className="hidden md:flex gap-3 basis-1/1">
          <ButtonLink path={"home"} />
          <ButtonLink path={"about"} />
        </div>
        <div className="">
          <button className="btn-trans-black">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
