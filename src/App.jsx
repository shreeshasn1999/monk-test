import { FaPen } from "react-icons/fa";
import { RiDraggable } from "react-icons/ri";
import { useRef, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import Modal from "./components/Modal";
function App() {
  const modalRef = useRef(null);
  const [allProducts, setAllProducts] = useState([]);
  // const [currIdx, setCurrIdx] = useState(0)
  const controls = useDragControls();

  function onVariantReorder(newOrderedVars, item_index) {
    const updatedVarOrder = [...allProducts];
    updatedVarOrder[item_index].variants = newOrderedVars;
    setAllProducts(updatedVarOrder);
  }

  function addEmptyProduct() {
    const newObj = {
      id: -1,
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
      <Modal
        modalRef={modalRef}
        allProducts={allProducts}
        setAllProducts={setAllProducts}
      />
      <Reorder.Group values={allProducts} onReorder={setAllProducts}>
        {allProducts.map((product, prod_i) => {
          if (product.id === -1)
            return (
              <Reorder.Item
                className="flex items-center"
                value={product}
                key={product.id}
              >
                <RiDraggable onPointerDown={(e) => controls.start(e)} />
                {prod_i + 1}.
                <div className="bg-white border text-sm h-8 w-[215px] flex items-center justify-between">
                  Select Product
                  <button
                    onClick={() => {
                      modalRef.current.showModal();
                    }}
                  >
                    <FaPen className="text-black/20" />
                  </button>
                </div>
                <button className="w-[141px] bg-[#008060] border-[#008060] text-sm p-2 rounded rounded-s border-2 text-white h-8">
                  Add Discount
                </button>
              </Reorder.Item>
            );
          return (
            <Reorder.Item
              key={product.id}
              value={product}
              dragListener={false}
              dragControls={controls}
              className="flex items-center mb-3"
            >
              <RiDraggable onPointerDown={(e) => controls.start(e)} />
              {prod_i + 1}.
              <div
                key={prod_i}
                className="bg-white border text-sm h-8 w-[215px] flex items-center justify-between"
              >
                {product.title}
                <button
                  onClick={() => {
                    modalRef.current.showModal();
                  }}
                >
                  <FaPen />
                </button>
              </div>
              <button className="w-[141px] h-8 bg-[#008060] border-[#008060] text-sm p-2 rounded rounded-s border-2 text-white">
                Add Discount
              </button>
              <Reorder.Group
                values={product.variants}
                onReorder={(newOrderedVars) => {
                  onVariantReorder(newOrderedVars, prod_i);
                }}
              >
                {product.variants.map((variant) => {
                  return (
                    <Reorder.Item
                      key={variant.id}
                      value={variant}
                      className="border flex"
                    >
                      <RiDraggable onPointerDown={(e) => controls.start(e)} />
                      {variant.title}
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
      <button className="" onClick={addEmptyProduct}>
        Add Product
      </button>
    </main>
  );
}

export default App;
