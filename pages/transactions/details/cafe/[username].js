import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Layout } from "../../../../components";

import { getTransactionCafeByUsername } from "../../../../lib/getTransactions";
import { formatDate, formatTime } from "../../../../utils/formatTime";

const CafeTransaction = () => {
  const router = useRouter();
  const { username } = router.query;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (username)
      getTransactionCafeByUsername(username)
        .then(setTransactions)
        .catch(err => console.log(err));
  }, [username]);

  return (
    <Layout>
      <div className="w-2/3 items-center my-6">
        <h1 className="font-bold text-3xl">Cafe Transactions Details</h1>
        <p className="mb-[30px] mt-3">{transactions[0]?.cafe_name}</p>
        <div className="p-8 border-[1px] rounded-md bg-[#FFFFFF] border-gray-300">
          <table className="centertable">
            <thead>
              <tr>
                <td className="w-[6rem]"></td>
                <td className="pb-[37px] font-medium">Sender</td>
                <td className="pb-[37px] font-medium">Date</td>
                <td className="pb-[37px] font-medium text-center">
                  Amount(RM)
                </td>
              </tr>
            </thead>
            <tbody>
              {transactions.map((data, i) => {
                return (
                  <tr className="text-gray-500" key={i}>
                    <td className="pb-6 pr-4 text-center">{i + 1}.</td>
                    <td className="pb-6">{data.student_name}</td>
                    <td className="pb-6">
                      {formatDate(data.created_at)} -
                      {formatTime(data.created_at)}
                    </td>
                    <td className="pb-6 text-center">{data.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CafeTransaction;
