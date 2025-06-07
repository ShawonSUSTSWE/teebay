import TransactionTabs from "@/components/TransactionTabs/TransactionTabs";

const TransactionLayout = ({ children }) => {
  return (
    <>
      <TransactionTabs />
      {children}
    </>
  );
};

export default TransactionLayout;
