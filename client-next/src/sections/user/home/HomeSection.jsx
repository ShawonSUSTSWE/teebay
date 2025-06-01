"use client";

import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./HomeSection.module.css";
import Button from "@/components/Button/Button";
import { logout } from "@/actions/authActions";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ProductList from "@/components/ProductList/ProductList";
import { useApolloClient, useQuery } from "@apollo/client";
import {
  fetchOwnedProducts,
  GET_OWNED_PRODUCTS_QUERY,
} from "@/actions/productActions";
import { useEffect } from "react";

const classNames = getClassNames(styles);

export default function HomeSection() {
  const router = useRouter();
  const client = useApolloClient();
  const { data, loading, error } = useQuery(GET_OWNED_PRODUCTS_QUERY, {
    client,
    fetchPolicy: "cache-first",
  });

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className={classNames("container")}>
      <Button
        className={classNames("button")}
        variant="secondary"
        onClick={handleLogout}
      >
        LOGOUT
      </Button>
      <div className={classNames("my-product-section")}>
        <SectionHeader header="MY PRODUCTS" />
        <ProductList products={[]} />
      </div>
    </div>
  );
}
