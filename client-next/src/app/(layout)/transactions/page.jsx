import TransactionSections from "@/lib/constants/TransactionSections";
import TransactionHistory from "@/sections/user/transaction/TransactionHistory";

const Page = async ({ searchParams }) => {
  const { section = TransactionSections.BOUGHT } = await searchParams;
  return <TransactionHistory section={section} />;
};

export default Page;
