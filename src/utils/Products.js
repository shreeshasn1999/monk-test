import { useEffect, useState } from "react";
import axios from "axios";
export default function useProductSearch(searchTerm, pageNo) {
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [error, setError] = useState("");
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setFetchedProducts([]);
  }, [searchTerm]);

  useEffect(() => {
    let cancel;
    async function getProducts(searchedProd, pageNo) {
      setLoadingFetch(true);
      setError("");
      try {
        const response = await axios.get(
          `http://stageapi.monkcommerce.app/task/products/search`,
          {
            headers: { "x-api-key": "72njgfa948d9aS7gs5" },
            params: { search: searchedProd, page: pageNo, limit: 5 },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }
        );
        if (!response.data) {
          setHasMore(false);
          setLoadingFetch(false);
        } else {
          const fetchedItemsSanitized = response.data.map((item) => {
            return {
              id: item.id,
              isSelected: false,
              title: item.title,
              image: item.image,
              indeterminate: false,
              isShowingVariants: false,
              variants: item.variants.map((el) => {
                return { ...el, isSelected: false };
              }),
            };
          });
          setFetchedProducts((prevfetchedProds) => [
            ...prevfetchedProds,
            ...fetchedItemsSanitized,
          ]);
          setHasMore(response.data.length > 0);
          setLoadingFetch(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError(error);
      }
    }
    getProducts(searchTerm, pageNo);

    return () => cancel();
  }, [searchTerm, pageNo]);
  return { loadingFetch, hasMore, error, fetchedProducts };
}
