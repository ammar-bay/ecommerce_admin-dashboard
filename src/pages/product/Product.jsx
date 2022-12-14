import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useEffect, useMemo, useState } from "react";
import axios from "../../utils/axios";
import { useContext } from "react";
import { Store } from "../../utils/Store";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const { state, dispatch } = useContext(Store);
  const { products } = state;
  // console.log(products);
  const filteredProduct = products?.find(
    (product) => product._id === productId
  );
  const [product, setProduct] = useState(filteredProduct || {});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProductById = async () => {
      const res = await axios.get(`/products/find/${productId}`);
      setProduct(res.data);
      setLoading(false);
    };
    if (!products) {
      setLoading(true);
      getProductById();
    }
  }, []);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("orders/admin/income?pid=" + productId);
        console.log(res);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newproduct">
              <button className="productAddButton">Create</button>
            </Link>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img src={product.img} alt="" className="productInfoImg" />
                <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id:</span>
                  <span className="productInfoValue">{product._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">sales:</span>
                  <span className="productInfoValue">5123</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">in stock:</span>
                  <span className="productInfoValue">
                    {product.countInStock}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" placeholder={product.name} />
                <label>Product Description</label>
                <input type="text" placeholder={product.desc} />
                <label>Price</label>
                <input type="text" placeholder={product.price} />
                <label>In Stock</label>
                <select name="inStock" id="idStock">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img src={product.img} alt="" className="productUploadImg" />
                  <label for="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="productButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
