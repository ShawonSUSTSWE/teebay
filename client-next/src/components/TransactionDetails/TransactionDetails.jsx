import TransactionType from "@/lib/constants/TransactionType";
import ProductDetails from "../ProductDetails/ProductDetails";
import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./TransactionDetails.module.css";

const classNames = getClassNames(styles);

export default function TransactionDetails({ section, transaction }) {
  const productDetails = {
    ...transaction.product,
    ...(transaction.type === TransactionType.BUY
      ? { price: transaction.amount }
      : {
          rentalPrice: transaction.amount,
          rentDuration: transaction.rentDuration,
        }),
  };
  return (
    <div className={classNames("container")}>
      {transaction.type === TransactionType.RENT ? (
        <div>
          {section} from {new Date(transaction.startDate).toLocaleDateString()}{" "}
          to {new Date(transaction.endDate).toLocaleDateString()}
        </div>
      ) : (
        <div>
          {section} at {new Date(transaction.createdAt).toLocaleDateString()}
        </div>
      )}
      <ProductDetails {...productDetails} />
    </div>
  );
}
