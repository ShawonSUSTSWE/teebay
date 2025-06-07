import TransactionSections from "@/lib/constants/TransactionSections";
import TransactionHistory from "@/sections/user/transaction/TransactionHistory";

const Page = ({ searchParams }) => {
  const section = searchParams.section || TransactionSections.BORROWED;
  return <TransactionHistory section={section} />;
};

export default Page;
