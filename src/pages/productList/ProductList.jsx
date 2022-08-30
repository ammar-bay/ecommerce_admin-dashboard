import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useContext } from "react";
import { Store } from "../../utils/Store";

export default function ProductList() {
  // const dispatch = useDispatch();
  // const products = useSelector((state) => state.product.products);
  // const [products, setProducts] = useState([]);
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    if (!state.products) {
      try {
        const getProducts = async () => {
          const res = await axios.get("/products");
          // console.log(res);
          dispatch({ type: "SET_PRODUCTS", payload: res.data });
          // setProducts(res.data);
        };
        getProducts();
      } catch (error) {}
    }
  }, []);

  const handleDelete = async (id) => {
    // console.log(id);
    dispatch({ type: "DELETE_PRODUCT", payload: id });
    try {
      const res = await axios.delete(`/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "countInStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={state.products || []}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
