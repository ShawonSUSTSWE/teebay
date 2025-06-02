import { getClassNames } from "@/lib/utils/commonUtils";
import Button from "../Button/Button";
import Modal from "../modal/Modal";
import styles from "./ConfirmationModal.module.css";

const classNames = getClassNames(styles);

export default function ConfirmationModal({
  confirmMessage = "",
  cancel = () => {},
  confirm = () => {},
  ...props
}) {
  return (
    <Modal className={classNames("container")} {...props}>
      <strong className={classNames("message")}>{confirmMessage}</strong>
      <div className={classNames("btn-container")}>
        <Button onClick={cancel} variant="secondary">
          No
        </Button>
        <Button onClick={confirm}>Yes</Button>
      </div>
    </Modal>
  );
}
