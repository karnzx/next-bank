import axios, { AxiosResponse } from "axios";
import config from "../config";

export type AccountInfoType = {
  username: string;
  balance: number;
};

async function getAccountInfo(): Promise<AccountInfoType> {
  try {
    const resp = await axios.get<AccountInfoType>(`${config.apiUrl}/info`);
    return resp.data;
  } catch (err: any) {
    throw new Error(`Error in 'fetAccountInfo()': ${err.message}`);
  }
}

export { getAccountInfo };
