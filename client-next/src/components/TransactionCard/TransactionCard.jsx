import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./TransactionCard.module.css";

const classNames = getClassNames(styles);

export default function TransactionCard(props) {
  return (
    <div className={classNames("container")}>
      <TransactionDetails {...props} />
    </div>
  );
}
