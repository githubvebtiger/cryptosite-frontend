import { useState, useEffect } from "react";
import "./styles.scss";
import WrapperPage from "../../components/WrapperPage";
import { ColumnConfig, Table } from "../../components/Table/intex";
import { CardIcon, WhiteCardIcon } from "../../assets";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useTheme } from "../../provider/ThemeProvider";
import Header from "../../components/Header";
import { fetchTransactions } from "../../api/fetchTransactions";
import moment from "moment";

type Props = {};

type TableData = {
  id: string;
  date: string;
  sum: number;
  paymentSystem: string;
  status: "In Progress" | "Success" | "Canceled";
  comment: string | null;
};

const RefillTable = () => {
  const [refillData, setRefillData] = useState<TableData[]>([]);

  const data: TableData[] = [
    {
      id: "0",
      date: "30.09.2024",
      sum: 2000,
      paymentSystem: "Payer",
      status: "Success",
      comment: "Comment",
    },
    {
      id: "1",
      date: "30.09.2024",
      sum: 2000,
      paymentSystem: "Payer",
      status: "Canceled",
      comment: null,
    },
    {
      id: "2",
      date: "30.09.2024",
      sum: 2000,
      paymentSystem: "Payer",
      status: "Success",
      comment: null,
    },
    {
      id: "3",
      date: "30.09.2024",
      sum: 2000,
      paymentSystem: "Payer",
      status: "In Progress",
      comment: null,
    },
    {
      id: "4",
      date: "30.09.2024",
      sum: 2000,
      paymentSystem: "Payer",
      status: "Success",
      comment: null,
    },
  ];

  const columns: ColumnConfig<TableData>[] = [
    {
      header: "Date",
      render: (row) => row.date,
    },
    {
      header: "Sum",
      render: (row) => `$${row.sum}`,
    },
    {
      header: "Payment system",
      render: (row) => (
        <div className="payment-system">
          <img
            src={theme === "dark" ? WhiteCardIcon : CardIcon}
            alt="CardIcon"
            height={24}
            width={24}
          />
          {row.paymentSystem}
        </div>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`status ${row.status.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Comment",
      render: (row) => (
        <span className={`comment ${!row.comment ? "comment-is-empty" : ""}`}>
          {row.comment ? row.comment : ""}
        </span>
      ),
    },
  ];
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  const { isMobile } = useWindowWidth(880);

  const getStatusFromCode = (
    statusCode: number
  ): "In Progress" | "Success" | "Canceled" => {
    switch (statusCode) {
      case 1:
        return "In Progress";
      case 2:
        return "Success";
      case 3:
        return "Canceled";
      default:
        return "In Progress";
    }
  };

  useEffect(() => {
    fetchTransactions("refill")
      .then((data) => {
        const transformedData = data.map((item: any) => ({
          id: item.id,
          date: moment(item.created_at).format("DD.MM.YYYY HH:mm:ss"),
          sum: item.amount,
          paymentSystem: item.system,
          status: getStatusFromCode(item.status),
          comment: item.comment,
        }));
        setRefillData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  return (
    <div className="tables-container">
      {!isMobile && (
        <div className="table1">
          <div className="raw-data">
            {refillData.map((row) => (
              <div key={row.id} className="table-row">
                <div className="table-flex">
                  <div className="table-cell">
                    <span className="title">Date</span>
                    <span className="gray">{row.date}</span>
                  </div>
                  <div className="table-cell align ">
                    <span className="title">Sum</span>
                    <span className="gray">${row.sum}</span>
                  </div>
                </div>

                <div className="table-flex">
                  <div className="table-cell payment-system">
                    <span className="title">Payment system</span>
                    <span className="center-card gray">
                      <img
                        src={theme === "dark" ? WhiteCardIcon : CardIcon}
                        alt="Card Icon"
                        height={24}
                        width={24}
                      />{" "}
                      {row.paymentSystem}
                    </span>
                  </div>
                  <div className="table-cell align">
                    <span className="title">Status</span>
                    <span
                      className={`status ${row.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>

                <div className="table-cell">
                  <span className="title">Comment</span>
                  <span
                    className={`comment ${
                      !row.comment ? "comment-is-empty" : ""
                    }`}
                  >
                    {row.comment ? row.comment : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Table data={refillData} columns={columns} />
    </div>
  );
};

export default function RefillPage(props: Props) {
  return (
    <div className="refil-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="refill-page">
          <h2>Refill</h2>
          <RefillTable />
        </div>
      </WrapperPage>
    </div>
  );
}
