import axios, { AxiosError, AxiosResponse } from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import config from "../../../config";
import { AccountInfoType, getAccountInfo } from "../../../helper/account";

const Transfer: NextPage = () => {
  const [user, setUserData] = useState<AccountInfoType>();
  const [transactionError, setTransactionError] = useState("");
  const [transactionSuccess, setTransactionSuccess] = useState("");
  const amount = useRef<HTMLInputElement>(null);
  const toUser = useRef<HTMLInputElement>(null);

  const refeshUserAccountInfo = () => {
    getAccountInfo()
      .then((res: AccountInfoType) => {
        setUserData(res);
      })
      .catch((err: AxiosError) => {
        window.location.href = "/login";
      });
  };

  useEffect(() => {
    refeshUserAccountInfo();
  }, []);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    axios
      .post(`${config.apiUrl}/transfer`, {
        amount: amount.current?.value,
        to: toUser.current?.value,
      })
      .then((res: AxiosResponse<string>) => {
        // console.log(res);
        setTransactionSuccess("Transfered");
        setTransactionError("");
        refeshUserAccountInfo();
      })
      .catch((err: AxiosError<string>) => {
        if (err.response) {
          console.log(err.response.data);
          setTransactionError(err.response.data);
          setTransactionSuccess("");
        }
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-10 lg:w-1/3 border border-blue-900 shadow-lg rounded-md">
          <h1 className="text-[3rem] font-bold under text-blue-700 text-center">
            Transfer
          </h1>
          <hr className="border-4 border-blue-200" />
          <div className="">
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
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="pt-5">
            <form onSubmit={handleSubmit}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    htmlFor="toUser"
                    className="text-blue-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  >
                    to user
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    ref={toUser}
                    className="bg-gray-100 border border-gray-200 rounded w-full py-2 px-4 text-blue-700 focus:outline-none focus:bg-white focus:border-blue-500"
                    id="toUser"
                    type="text"
                    placeholder="toUser"
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    htmlFor="amount"
                    className="text-blue-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  >
                    amount
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    ref={amount}
                    className="bg-gray-100 border border-gray-200 rounded w-full py-2 px-4 text-blue-700 focus:outline-none focus:bg-white focus:border-blue-500"
                    id="amount"
                    type="text"
                    placeholder="amount"
                    required
                  />
                </div>
              </div>
              {transactionError != "" ? (
                <div className="text-center pb-5">
                  <p className="text-red-500">{transactionError}</p>
                </div>
              ) : (
                ""
              )}
              {transactionSuccess != "" ? (
                <div className="text-center pb-5">
                  <p className="text-blue-500">{transactionSuccess}</p>
                </div>
              ) : (
                ""
              )}
              <div className="flex justify-center gap-20">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-400 rounded"
                  type="submit"
                >
                  Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transfer;
