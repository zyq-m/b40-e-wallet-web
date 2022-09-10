// import { useEffect, useState } from "react"; // AYUHH https://www.youtube.com/watch?v=AMBVRVrNmB0

// import { Layout, Input } from "../../components";
// import { getTransactions } from "../../lib/getTransactions";
// import { useTime } from "../../hooks";
// import handleTransactions from "../../utils/handleTransactions";

// const transactions = () => {
//   const [transactions, setTransactions] = useState([{}]);
//   const format = useTime();

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getTransactions();

//       setTransactions(handleTransactions({ array: res, student: true }));
//     };

//     fetchData();
//   }, []);

//   return (
//     <Layout>
//       <div className="w-2/3 items-center">
//         <h1 className="mb-[30px] font-bold text-3xl">
//           Transactions List (Students)
//         </h1>
//         <Input type="search" placeholder="Search by Name/ Matric Number..." />
//         <div className="mt-4 p-8 border-[1px] rounded-md bg-[#FFFFFF] border-gray-300">
//           <table className="centertable">
//             <thead>
//               <tr>
//                 <td className="w-[6rem]"></td>
//                 <td className="pb-[37px] font-medium">Student Name</td>
//                 <td className="pb-[37px] font-medium">Matric No.</td>
//                 <td className="pb-[37px] w-[14rem] font-medium text-center">
//                   Total(RM)
//                 </td>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions &&
//                 transactions.map((data, i) => {
//                   const { student_name, matricNo, total } = data;

//                   return (
//                     <tr key={i} className="text-gray-500">
//                       <td className="pb-6 pr-4 text-center">{i + 1}.</td>
//                       <td className="pb-6">{student_name}</td>
//                       <td className="pb-6">{matricNo}</td>
//                       <td className="pb-6 font-medium text-center">{total}</td>
//                     </tr>
//                   );
//                 })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default transactions;

import { useEffect, useState } from "react";

import { Layout, Input } from "../../components";
import { getTransactions } from "../../lib/getTransactions";
import { useTime } from "../../hooks";
import handleTransactions from "../../utils/handleTransactions";

const transactions = () => {
  //CHANGED
  //const [transactions, setTransactions] = useState([{}]);
  const [transactions, setTransactions] = useState([]);
  const format = useTime();
  // Filter Student
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTransactions();

      setTransactions(handleTransactions({ array: res, student: true }));
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="w-2/3 items-center">
        <h1 className="mb-[30px] font-bold text-3xl">
          Transactions List (Students)
        </h1>
        {transactions &&
          transactions.map((data, i) => {
            const { student_name, matricNo, total } = data;

            //Filter Student
            const filteredstudent = transactions.filter(({ student_name }) =>
              student_name.toLowerCase().includes(searchText.toLowerCase())
            );

            return (
              <div>
                <input
                  className="border w-full px-2 py-2 border-gray-300 rounded-md"
                  type="text"
                  value={searchText}
                  placeholder="Search by Name/ Matric Number..."
                  onChange={({ target }) => setSearchText(target.value)}
                />
                <div className="mt-4 p-8 border-[1px] rounded-md bg-[#FFFFFF] border-gray-300">
                  <table className="centertable">
                    <thead>
                      <tr>
                        <td className="w-[6rem]"></td>
                        <td className="pb-[37px] font-medium">Student Name</td>
                        <td className="pb-[37px] font-medium">Matric No.</td>
                        <td className="pb-[37px] w-[14rem] font-medium text-center">
                          Total(RM)
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={i} className="text-gray-500">
                        <td className="pb-6 pr-4 text-center">{i + 1}.</td>
                        {/* Filter Student */}
                        {filteredstudent.map(({ student_name }) => (
                          <td>{student_name}</td>
                        ))}
                        <td className="pb-6">{matricNo}</td>
                        <td className="pb-6 font-medium text-center">
                          {total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default transactions;
