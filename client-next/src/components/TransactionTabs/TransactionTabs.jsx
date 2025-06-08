"use client";

import TransactionSections from "@/lib/constants/TransactionSections";
import { Tabs, Tab, Box } from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const tabs = Object.values(TransactionSections);

export default function TransactionTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const current = searchParams.get("section") || TransactionSections.BOUGHT;

  const handleChange = (_, newValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("section", newValue);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={current}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="transaction tabs"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab}
            label={tab}
            value={tab}
            sx={{
              textTransform: "capitalize",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
