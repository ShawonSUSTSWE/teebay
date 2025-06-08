import { getClassNames } from "@/lib/utils/commonUtils";
import Button from "../Button/Button";
import Modal from "../modal/Modal";
import styles from "./RentalModal.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Box, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SectionHeader from "../SectionHeader/SectionHeader";

const classNames = getClassNames(styles);

export default function RentalModal({
  startDate = null,
  endDate = null,
  setStartDate = () => {},
  setEndDate = () => {},
  cancel = () => {},
  confirm = () => {},
  ...props
}) {
  return (
    <Modal className={classNames("container")} {...props}>
      <SectionHeader header="Rental Period" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box display="flex" gap={4}>
          <Box>
            <Typography fontWeight="bold" mb={1}>
              From
            </Typography>
            <DatePicker
              format="DD/MM/YYYY"
              value={startDate}
              minDate={dayjs()}
              maxDate={endDate || undefined}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  placeholder: "dd/mm/yyyy",
                  variant: "outlined",
                  size: "small",
                },
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight="bold" mb={1}>
              To
            </Typography>
            <DatePicker
              format="DD/MM/YYYY"
              value={endDate}
              minDate={startDate || dayjs()}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{
                textField: {
                  placeholder: "dd/mm/yyyy",
                  variant: "outlined",
                  size: "small",
                },
              }}
            />
          </Box>
        </Box>
      </LocalizationProvider>
      <div className={classNames("btn-container")}>
        <Button onClick={cancel} variant="secondary">
          Go Back
        </Button>
        <Button onClick={confirm}>Confirm rent</Button>
      </div>
    </Modal>
  );
}
