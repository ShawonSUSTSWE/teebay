import { punctualizeString } from "@/lib/utils/commonUtils";

export default function ProductInfo({ field, value }) {
  if (Array.isArray(value)) {
    value = value.map((v) => punctualizeString(v)).join(", ");
  }

  return (
    <div>
      {punctualizeString(field)}: {value}
    </div>
  );
}
