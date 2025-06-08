import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CustomSelect({
  label,
  labelId,
  size = "small",
  value,
  setValue,
  options,
  clearable = false,
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
        {clearable && (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        )}
        {Object.entries(options).map(([key, value]) => (
          <MenuItem value={key}>{value}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
