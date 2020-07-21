import React from "react";
import axios from "axios";

export const fetchTransactions = async () => {
  const { data } = await axios.get("http://localhost:8888/transaction");

  return data;
};

function Badge({ type }) {
  const color = type === "debit" ? "red" : "green";
  return (
    <span
      className={`
        px-3
        inline-flex
        leading-5"
        font-semibold"
        rounded-full"
        bg-${color}-100
        text-${color}-800
        text-lg
      `}
    >
      {type}
    </span>
  );
}

function Transaction({ id, type, amount, effectiveDate }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const toggle = () => setCollapsed(!collapsed);

  return (
    <article className="border-b">
      <div className="border-l-2 border-transparent">
        <header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none bg-white" onClick={toggle}>
          <span className={`font-thin text-xl ${collapsed ? "text-blue-600" : "text-grey-darkest"}`} >
            Amount: ${amount} <Badge type={type} />
          </span>
          <div className="rounded-full border border-grey w-7 h-7 flex items-center justify-center">
            <svg
              aria-hidden="true"
              className=""
              data-reactid="266"
              fill="none"
              height="24"
              stroke="#606F7B"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewbox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </header>
        {collapsed && <div className="bg-white">
          <div className="pl-8 pr-8 pb-5 text-grey-darkest">
            <ul className="pl-4">
              <li className="pb-2">
                Id ref: {id}
              </li>
              <li className="pb-2">
                Date: {new Date(effectiveDate).toDateString()}
              </li>
            </ul>
          </div>
        </div>}
      </div>
    </article>
  );
}

function App() {
  const [state, setState] = React.useState({
    status: "idle",
    data: [],
  });

  React.useEffect(() => {
    async function fetch() {
      setState({ ...state, status: "loading" });
      const response = await fetchTransactions();
      setState({ data: response, status: "success" });
    }
    fetch();
  }, []);

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-2xl">Transactions History</h1>
      <div className="mt-8">
        {state.data.map((d) => (
          <Transaction key={d.id} {...{ ...d }} />
        ))}
      </div>
    </div>
  );
}

export default App;
