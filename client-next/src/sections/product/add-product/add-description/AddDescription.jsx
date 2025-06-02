import AddProductFormStep from "../AddProductFormStep";

export default function AddDescription({}) {
  return (
    <AddProductFormStep
      fieldKey={"description"}
      inputType={"textarea"}
      promptText={"Select a description for your product"}
      nextRoute={"/add-product/price"}
    />
  );
}
