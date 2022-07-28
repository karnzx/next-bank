import type { NextPage } from "next";
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
      <div className="flex justify-center border-2 border-blue-900 shadow-lg rounded-md md:mx-20">
        <div className="flex flex-col p-5 w-full pl-10">
          <h1 className="text-[3rem] font-semi-bold under text-blue-700">
            Profile
          </h1>
          <hr className="horizontal" />
          <div>
            {user ? (
              <div>
                <div className="text-[2rem] md:flex gap-3">
                  <h2>username: </h2>
                  <h2>{user.username}</h2>
                </div>
                <div className="text-[2rem] md:flex gap-3">
                  <h2>balance: </h2>
                  <h2>{user.balance} $</h2>
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
