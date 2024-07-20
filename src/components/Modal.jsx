/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, createRef } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import useDebounce from "../utils/Debounce";
import Spinner from "./Spinner";

function Modal({ modalRef, allProducts, setAllProducts }) {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState({
    productFetch: false,
    submit: false,
  });
  const debouncedSearch = useDebounce(searchTerm);
  const parentCheckboxes = useRef([]);

  function onSubmitHandler(values) {
    setLoading({ ...loading, submit: true });
    const selectedProducts = values.items.filter(
      (el) => el.isSelected || el.indeterminate
    );
    selectedProducts.forEach((product) => {
      product.variants = product.variants.filter((vart) => vart.isSelected);
    });

    setAllProducts([
      ...selectedProducts,
      allProducts.find((el) => el.id === -1),
    ]);
    modalRef.current.close();
    setLoading({ ...loading, submit: false });
  }

  function handleClose(resetForm) {
    resetForm();
    modalRef.current.close();
  }

  function onProductSelectionChange(e, values, item_index, setValues) {
    const updatedItems = [...values.items];
    const isChecked = e.target.checked;

    updatedItems[item_index].isSelected = isChecked;
    updatedItems[item_index].variants.forEach((variant) => {
      variant.isSelected = isChecked;
    });

    setValues({
      ...values,
      items: updatedItems,
    });
  }

  function onVariantSelectionChange(
    e,
    values,
    item_index,
    var_index,
    setValues,
    item
  ) {
    const updatedItems = [...values.items];
    const isChecked = e.target.checked;

    updatedItems[item_index].variants[var_index].isSelected = isChecked;
    const noOfSelectionsAfterUpdate = updatedItems[item_index].variants.filter(
      (el) => el.isSelected
    ).length;

    if (noOfSelectionsAfterUpdate === item.variants.length) {
      parentCheckboxes.current[item_index].current.indeterminate = false;
      updatedItems[item_index].indeterminate = false;
      updatedItems[item_index].isSelected = true;
      parentCheckboxes.current[item_index].current.checked = true;
    } else if (noOfSelectionsAfterUpdate === 0) {
      parentCheckboxes.current[item_index].current.indeterminate = false;
      updatedItems[item_index].indeterminate = false;
      updatedItems[item_index].isSelected = false;
      parentCheckboxes.current[item_index].current.checked = false;
    } else {
      parentCheckboxes.current[item_index].current.indeterminate = true;
      updatedItems[item_index].isSelected = false;
      updatedItems[item_index].indeterminate = true;
    }
    setValues({
      ...values,
      items: updatedItems,
    });
  }

  async function getProducts(searchedProd = "Hat") {
    setLoading({ ...loading, productFetch: true });

    const response = await axios.get(
      `http://stageapi.monkcommerce.app/task/products/search?search=${searchedProd}&page=0&limit=10`,
      {
        headers: { "x-api-key": "72njgfa948d9aS7gs5" },
      }
    );
    const fetchedItemsSanitized = response.data.map((item) => {
      return {
        id: item.id,
        isSelected: false,
        title: item.title,
        image: item.image,
        indeterminate: false,
        variants: item.variants.map((el) => {
          return { ...el, isSelected: false };
        }),
      };
    });
    setLoading({ ...loading, productFetch: false });
    return fetchedItemsSanitized;
  }

  useEffect(() => {
    async function loadProducts() {
      const fetchedProds = await getProducts(debouncedSearch);
      parentCheckboxes.current = fetchedProds.map(
        (_, i) => parentCheckboxes.current[i] || createRef()
      );
      setFetchedItems(fetchedProds);
    }
    loadProducts();
  }, [debouncedSearch]);

  return (
    <dialog
      ref={modalRef}
      className="w-[663px] h-[612px] relative pb-[58px] pt-[99px] backdrop:bg-black/20 scrollbar:h-1.5 scrollbar:w-1.5 scrollbar-track:rounded"
    >
      {loading.submit && <Spinner />}
      {!loading.submit && (
        <>
          <div className="border-t rounded-t fixed top-4 w-[663px] text-lg flex flex-col bg-white items-center">
            <div className="flex w-[663px] p-3 border-b items-center justify-between">
              <div className="text-base">Select Products</div>
              <button
                onClick={() => {
                  modalRef.current.close();
                }}
              >
                <MdClose />
              </button>
            </div>
            <div className="p-2 border-b w-[663px] flex justify-center">
              <div className="flex items-center gap-2 border h-8 w-[600px] p-1">
                <IoIosSearch className="ml-3" />
                <input
                  name="searchItem"
                  placeholder="Search products"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  type="text"
                />
              </div>
            </div>
          </div>
          {loading.productFetch && <Spinner />}
          {!loading.productFetch && (
            <Formik
              initialValues={{
                items: fetchedItems,
              }}
              enableReinitialize={true}
              onSubmit={(values) => onSubmitHandler(values)}
            >
              {({ values, setValues, resetForm }) => (
                <Form className="w-full">
                  {values.items.map((item, item_index) => {
                    const noOfVariantsSelected = item.variants.filter(
                      (el) => el.isSelected
                    ).length;
                    return (
                      <div
                        key={item_index}
                        className="flex flex-col align-center"
                      >
                        <div className="flex p-2 border-b gap-3 items-center align-center">
                          <Field
                            id={item.id}
                            type="checkbox"
                            name={`items[${item_index}].isSelected`}
                            checked={
                              values.items[item_index].isSelected ||
                              noOfVariantsSelected === item.variants.length
                            }
                            onChange={(e) => {
                              onProductSelectionChange(
                                e,
                                values,
                                item_index,
                                setValues
                              );
                            }}
                            innerRef={parentCheckboxes.current[item_index]}
                            className="w-6 h-6 ml-4 accent-[#008060]"
                          />
                          <label
                            className="flex items-center gap-3"
                            htmlFor={item.id}
                          >
                            <img
                              src={item.image.src}
                              alt={item.title}
                              className="h-9 w-9 border rounded"
                            />
                            <div className="text-base">{item.title}</div>
                          </label>
                        </div>

                        {item.variants.map((variant, var_index) => (
                          <div
                            key={variant.id}
                            className="flex item-center justify-between p-3 border-b text-base"
                          >
                            <div className="flex items-center gap-5 ml-12">
                              <Field
                                type="checkbox"
                                id={variant.id}
                                name={`items[${item_index}].variants[${var_index}].isSelected`}
                                checked={
                                  item.isSelected ? true : variant.isSelected
                                }
                                onChange={(e) => {
                                  onVariantSelectionChange(
                                    e,
                                    values,
                                    item_index,
                                    var_index,
                                    setValues,
                                    item
                                  );
                                }}
                                className="w-6 h-8 accent-[#008060]"
                              />
                              <label
                                htmlFor={variant.id}
                                className="flex justify-between"
                              >
                                <div>{variant.title}</div>
                              </label>
                            </div>
                            <p>${variant.price}</p>
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  <div className="text-base bg-white flex justify-between items-center p-3 fixed w-[663px] bottom-[19px] border rounded-b">
                    <div>
                      {
                        values.items.filter(
                          (el) => el.isSelected || el.indeterminate
                        ).length
                      }{" "}
                      length products selected
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="text-black rounded border h-8 px-8 text-sm"
                        type="button"
                        onClick={() => handleClose(resetForm)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-[#008060] rounded text-white px-5 py-1 border-2 border-[#008060] text-sm"
                        type="submit"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </>
      )}
    </dialog>
  );
}

export default Modal;
