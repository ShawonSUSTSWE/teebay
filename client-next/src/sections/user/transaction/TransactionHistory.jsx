"use client";

import { TRANSACTION_LIST } from "@/actions/transactionActions";
import Loader from "@/components/Loader/Loader";
import { getClassNames } from "@/lib/utils/commonUtils";
import { showErrorToast } from "@/lib/utils/toastUtils";
import { useQuery } from "@apollo/client";
import styles from "./TransactionHistory.module.css";
import TransactionCard from "@/components/TransactionCard/TransactionCard";

const classNames = getClassNames(styles);

export default function TransactionHistory({ section }) {
  const {
    data: productsList,
    loading,
    error,
  } = useQuery(TRANSACTION_LIST, {
    variables: { type: section.toUpperCase() },
  });

  const transactions = productsList?.getMyTransactions || [];

  if (loading) {
    return <Loader />;
  }
  if (error) {
    showErrorToast(error.message);
    return null;
  }

  return (
    <div className={classNames("container")}>
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          section={section}
        />
      ))}
      {transactions.length === 0 && (
        <div className={classNames("text")}>No items to show</div>
      )}
    </div>
  );
}
