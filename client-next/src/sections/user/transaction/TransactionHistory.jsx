"use client";

import { TRANSACTION_LIST } from "@/actions/transactionActions";
import Loader from "@/components/Loader/Loader";
import { getClassNames } from "@/lib/utils/commonUtils";
import { showErrorToast } from "@/lib/utils/toastUtils";
import { useQuery } from "@apollo/client";
import styles from "./TransactionHistory.module.css";
import ProductList from "@/components/ProductList/ProductList";
import TransactionType from "@/lib/constants/TransactionType";

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

  const products =
    transactions.length > 0
      ? transactions.map((transaction) => ({
          ...transaction.product,
          ...(transaction.type === TransactionType.BUY
            ? { price: transaction.amount }
            : {
                rentPrice: transaction.amount,
                rentDuration: transaction.rentDuration,
              }),
        }))
      : [];

  if (loading) {
    return <Loader />;
  }
  if (error) {
    showErrorToast(error.message);
    return null;
  }

  return (
    <div className={classNames("container")}>
      <ProductList products={products} />
    </div>
  );
}
