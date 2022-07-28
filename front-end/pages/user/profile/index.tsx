import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AccountInfoType, getAccountInfo } from "../../../helper/account";

const Profile: NextPage = () => {
  const [user, setUserData] = useState<AccountInfoType>();
  useEffect(() => {
    getAccountInfo().then((res: AccountInfoType) => {
      setUserData(res);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div className="p-10 items-center border border-blue-900 shadow-lg rounded-md">
          <h1 className="text-[3rem] font-bold under text-blue-700 text-center">
            Profile
          </h1>
          <hr className="border-4 border-blue-200" />
          <div>
            {user ? (
              <div>
                <div className="userData">
                  <div className="text-[2rem] flex gap-3">
                    <h2>username: </h2>
                    <h2>{user.username}</h2>
                  </div>
                  <div className="text-[2rem] flex gap-3">
                    <h2>balance: </h2>
                    <h2>{user.balance} $</h2>
                  </div>
                </div>
                <hr className="pb-2" />
                <div className="actions py-5">
                  <div className="md:flex md:justify-center grid gap-5">
                    <div>
                      <Link href="/user/deposit">
                        <a className="capitalize bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          deposit
                        </a>
                      </Link>
                    </div>
                    <div>
                      <Link href="/user/withdraw">
                        <a className="capitalize bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          withdraw
                        </a>
                      </Link>
                    </div>
                    <div>
                      <Link href="/user/transfer">
                        <a className="capitalize bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          transfer
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
