import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="bg-fixed bg-cover opacity-90 main-bg-img">
      <main className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-8xl text-transparent font-extrabold bg-clip-text bg-gradient-to-tl from-purple-100 to-indigo-100">
          Next Bank
        </h1>

        <p className="my-6 leading-6 text-3xl text-white font-mono">
          <Link href="/about">
            <a>about this bank web app</a>
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Home;
