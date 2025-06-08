import Link from "next/link";
import { PageRoutes } from "@/lib/utils/routeUtils";
import TransactionDetails from "../TransactionDetails/TransactionDetails";
import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./TransactionCard.module.css";

const classNames = getClassNames(styles);

export default function TransactionCard(props) {
  return (
    <Link href={PageRoutes.transactions}>
      <div className={classNames("container")}>
        <TransactionDetails {...props} />
      </div>
    </Link>
  );
}
