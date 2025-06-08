"use client";

import { getClassNames } from "@/lib/utils/commonUtils";
import styles from "./ProductDetailsSection.module.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_AVAILABLE_PRODUCTS,
  GET_PRODUCT_DETAILS,
} from "@/actions/productActions";
import Loader from "@/components/Loader/Loader";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { PageRoutes } from "@/lib/utils/routeUtils";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import { useRef, useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import {
  BUY_PRODUCT,
  RENT_PRODUCT,
  TRANSACTION_LIST,
} from "@/actions/transactionActions";
import { showErrorToast, showSuccessToast } from "@/lib/utils/toastUtils";
import {
  prependToCacheList,
  removeFromCacheList,
} from "@/lib/utils/cacheUtils";
import RentalModal from "@/components/RentalModal/RentalModal";
import TransactionType from "@/lib/constants/TransactionType";
import TransactionSections from "@/lib/constants/TransactionSections";

const classNames = getClassNames(styles);

const createTransactionUpdater = (type) => {
  return (cache, { data }) => {
    const transaction =
      type === TransactionType.BUY ? data?.buyProduct : data?.rentProduct;

    if (!transaction) return;

    if (type === TransactionType.BUY) {
      removeFromCacheList({
        cache,
        query: GET_AVAILABLE_PRODUCTS,
        fieldName: "getAllAvailableProducts",
        removedItem: transaction.product,
      });
    }

    const cacheTypeToUpdate = (
      type === TransactionType.BUY
        ? TransactionSections.BOUGHT
        : TransactionSections.BORROWED
    ).toUpperCase();

    const updatedData = {
      ...transaction,
      rentDuration: transaction.product.rentDuration ?? null,
      startDate: transaction.startDate ?? null,
      endDate: transaction.endDate ?? null,
    };

    prependToCacheList({
      cache,
      query: TRANSACTION_LIST,
      variables: {
        type: cacheTypeToUpdate,
      },
      fieldName: "getMyTransactions",
      newItem: updatedData,
    });
  };
};

export default function ProductDetailsSection({ id }) {
  const { data, loading, error } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id },
  });
  const [buyProductMutation] = useMutation(BUY_PRODUCT, {
    update: createTransactionUpdater(TransactionType.BUY),
  });
  const [rentProductMutation] = useMutation(RENT_PRODUCT, {
    update: createTransactionUpdater(TransactionType.RENT),
  });
  const { user } = useSession();
  const router = useRouter();
  const [modalType, setModalType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const buyModalRef = useRef(null);

  const productData = data?.getProductById;

  const routeToEditPage = () => {
    const page = PageRoutes.productEditPage(productData.id);
    router.push(page);
  };

  const showModal = (type) => {
    setModalType(type);
  };

  const buyProduct = async () => {
    let isSuccessful = false;
    try {
      await buyProductMutation({
        variables: { data: { productId: productData.id } },
      });
      showSuccessToast("Product bought successfully");
      isSuccessful = true;
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      closeModal();
      if (isSuccessful) {
        router.push(PageRoutes.home);
      }
    }
  };

  const rentProduct = async () => {
    let isSuccessful = false;
    if (!(startDate && endDate)) {
      showErrorToast("Please select both dates to proceed");
      return;
    }
    try {
      await rentProductMutation({
        variables: {
          data: {
            productId: productData.id,
            startDate: startDate?.toDate(),
            endDate: endDate?.toDate(),
          },
        },
      });
      showSuccessToast("Product rented successfully");
      isSuccessful = true;
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      closeModal();
      if (isSuccessful) {
        router.push(PageRoutes.home);
      }
    }
  };

  const closeModal = () => {
    setModalType(null);
  };

  const renderModal = () => {
    switch (modalType) {
      case "BUY":
        return (
          <ConfirmationModal
            confirmMessage="Are you sure you want to buy the product?"
            confirm={buyProduct}
            cancel={closeModal}
            ref={buyModalRef}
          />
        );

      case "RENT":
        return (
          <RentalModal
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            cancel={closeModal}
            confirm={rentProduct}
          />
        );

      default:
        return null;
    }
  };

  useOnClickOutside(buyModalRef, closeModal);

  if (loading) return <Loader />;

  if (error) return null;

  return (
    <div className={classNames("wrapper")}>
      <div className={classNames("container")}>
        <ProductDetails {...productData} />
        <div className={classNames("button-container")}>
          {user?.id === productData?.owner?.id ? (
            <Button onClick={routeToEditPage}>Edit Product</Button>
          ) : (
            <div className={classNames("button-container")}>
              {productData?.rentalPrice && (
                <Button onClick={() => showModal("RENT")}>Rent</Button>
              )}
              {productData?.price && (
                <Button onClick={() => showModal("BUY")}>Buy</Button>
              )}
            </div>
          )}
          {renderModal()}
        </div>
      </div>
    </div>
  );
}
