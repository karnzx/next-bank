import { AxiosError } from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AccountInfoType,
  getAccountInfo,
  getTransactions,
  Transactions,
} from "../../../helper/account";
import strftime from "strftime";

const Profile: NextPage = () => {
  const [user, setUserData] = useState<AccountInfoType>();
  const [transactions, setTransactions] = useState<Transactions>();
  const [txOnTable, setTxOnTable] = useState<Transactions["transfer"]>();

  const refeshUserAccountInfo = () => {
    getAccountInfo()
      .then((res: AccountInfoType) => {
        setUserData(res);
      })
      .catch((err: AxiosError) => {
        window.location.href = "/login";
      });
  };

  const getUserTransactions = () => {
    getTransactions().then((res: Transactions) => {
      setTransactions(res);
      setTxOnTable(res.transfer);
    });
  };

  useEffect(() => {
    refeshUserAccountInfo();
    getUserTransactions();
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
                      <Link href="/user/withdraw&amp;deposit">
                        <a className="capitalize bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                          withdraw and deposit
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
      <div className="pt-10">
        <div className="p-10 items-center border border-blue-900 shadow-lg rounded-md">
          {transactions ? (
            <div className="flex justify-evenly pb-6">
              <button
                className="capitalize bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  setTxOnTable(transactions.transfer);
                }}
              >
                transfer
              </button>
              <button
                className="capitalize bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => {
                  setTxOnTable(transactions.receive);
                }}
              >
                receive
              </button>
            </div>
          ) : (
            ""
          )}
          <h1 className="text-[3rem] font-bold under text-blue-700 text-center">
            Transactions
          </h1>
          <hr className="border-4 border-blue-200" />
          <div className="py-5">
            <table className="table-fixed w-full text-center">
              <thead>
                <tr>
                  <th>DateTime</th>
                  <th>User</th>
                  <th>Remain</th>
                  <th>Action</th>
                  <th>From</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {txOnTable ? (
                  <>
                    {txOnTable.map((data, index) => (
                      <tr key={`${data}-${index}`}>
                        <td>{data.dateTime}</td>
                        <td>{data.to}</td>
                        <td>{data.remain}</td>
                        <td>{data.action}</td>
                        <td>{data.from}</td>
                        <td>{data.amount}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
