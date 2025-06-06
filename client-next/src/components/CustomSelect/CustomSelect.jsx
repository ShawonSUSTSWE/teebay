import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CustomSelect({
  label,
  labelId,
  size = "small",
  value,
  setValue,
  options,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size={size}
        label={label}
      >
        {Object.entries(options).map(([key, value]) => (
          <MenuItem value={key}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
