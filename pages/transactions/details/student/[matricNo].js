import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Layout } from "../../../../components";
import { getTransactionStudentByMatric } from "../../../../lib/getTransactions";
import { formatDate, formatTime } from "../../../../utils/formatTime";

const StudentTransaction = () => {
  const router = useRouter();
  const { matricNo } = router.query;

  const [transactions, setTransactions] = useState([]);
  console.log(matricNo);
  useEffect(() => {
    if (matricNo)
      getTransactionStudentByMatric(matricNo)
        .then(setTransactions)
        .catch(err => console.log(err));
  }, [matricNo]);

  return (
    <Layout>
      <div className="w-2/3 items-center my-6">
        <h1 className="font-bold text-3xl">Student Transaction Details</h1>
        <p className="mb-[30px] mt-3">
          {transactions[0]?.student_name} - {matricNo}
        </p>
        <div className="p-8 border-[1px] rounded-md bg-[#FFFFFF] border-gray-300">
          <table className="centertable">
            <thead>
              <tr>
                <td className="w-[6rem]"></td>
                <td className="pb-[37px] font-medium">Recepient</td>
                <td className="pb-[37px] font-medium">Date</td>
                <td className="pb-[37px] font-medium text-center">
                  Amount(RM)
                </td>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((data, i) => {
                return (
                  <tr className="text-gray-500" key={i}>
                    <td className="pb-6 pr-4 text-center">{i + 1}.</td>
                    <td className="pb-6">{data.cafe_name}</td>
                    <td className="pb-6">
                      {formatDate(data.created_at)} -{" "}
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

export default StudentTransaction;
