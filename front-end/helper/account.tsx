import axios, { AxiosResponse } from "axios";
import config from "../config";

export type AccountInfoType = {
  username: string;
  balance: number;
};

type Transfer = {
  from: string;
  to: string;
  remain: number;
  amount: number;
  action: string;
  dateTime: Date;
};

export type Transactions = {
  transfer: Transfer[];
  receive: Transfer[];
};

async function getAccountInfo(): Promise<AccountInfoType> {
  try {
    const resp = await axios.get<AccountInfoType>(`${config.apiUrl}/info`);
    return resp.data;
  } catch (err: any) {
    throw new Error(`Error in 'fetAccountInfo()': ${err.message}`);
  }
}

async function getTransactions(): Promise<Transactions> {
  try {
    const resp = await axios.get<Transactions>(`${config.apiUrl}/transactions`);
    return resp.data;
  } catch (err: any) {
    throw new Error(`Error in 'fetAccountInfo()': ${err.message}`);
  }
}

export { getAccountInfo, getTransactions };
