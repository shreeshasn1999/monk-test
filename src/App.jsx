import { useRef, useState } from "react";
import ProductPicker from "./components/ProductPicker";
import ProductList from "./components/ProductList";

function App() {
  const modalRef = useRef(null);
  const [allProducts, setAllProducts] = useState([]);
  const [currIdx, setCurrIdx] = useState(0);

  function addEmptyProduct() {
    const newObj = {
      id: -(allProducts.length + 1),
      isSelected: false,
      title: "Select Product",
      image: null,
      indeterminate: false,
      variants: [],
    };
    setAllProducts([...allProducts, newObj]);
  }

  return (
    <main className="w-full flex flex-col items-center bg-[#F6F6F8] h-screen font-['SF_Pro_Text']">
      <h1 className="">Add Products</h1>
      <ProductPicker
        modalRef={modalRef}
        currIdx={currIdx}
        setAllProducts={setAllProducts}
      />
      <ProductList
        setCurrIdx={setCurrIdx}
        modalRef={modalRef}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
      />
      <button
        className="text-[#008060] border-2 px-12 py-3 rounded border-[#008060]"
        onClick={addEmptyProduct}
      >
        Add Product
      </button>
    </main>
  );
}

export default App;
