import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./Loader.module.css";

const classNames = getClassNames(styles);

const Loader = () => {
  return (
    <div className={classNames("overlay")}>
      <span className={classNames("loader")}></span>
    </div>
  );
};

export default Loader;
