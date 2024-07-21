import { useRef, useState } from "react";
import ProductPicker from "./components/ProductPicker";
import ProductList from "./components/ProductList";

function App() {
  const modalRef = useRef(null);
  const [allProducts, setAllProducts] = useState([
    {
      id: 77,
      title: "Fog Linen Chambray Towel - Beige Stripe",
      variants: [
        {
          id: 1,
          product_id: 77,
          title: "XS / Silver",
          price: "49",
        },
        {
          id: 2,
          product_id: 77,
          title: "S / Silver",
          price: "49",
        },
        {
          id: 3,
          product_id: 77,
          title: "M / Silver",
          price: "49",
        },
      ],
      image: {
        id: 266,
        product_id: 77,
        src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
      },
    },
    {
      id: 80,
      title: "Orbit Terrarium - Large",
      variants: [
        {
          id: 64,
          product_id: 80,
          title: "Default Title",
          price: "109",
        },
      ],
      image: {
        id: 272,
        product_id: 80,
        src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
      },
    },
  ]);
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
    <main className="bg-[#F6F6F8] w-full h-screen font-['SF_Pro_Text']">
      <div className="flex flex-col max-w-[645px] mx-auto">
        <h1 className="mt-[100px] self-start font-semibold mb-8">
          Add Products
        </h1>
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
          className="text-[#008060] border-2 self-end px-12 py-3 rounded border-[#008060]"
          onClick={addEmptyProduct}
        >
          Add Product
        </button>
      </div>
    </main>
  );
}

export default App;
