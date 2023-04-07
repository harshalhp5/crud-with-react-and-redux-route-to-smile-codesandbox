import { useEffect, useState } from "react";
import "./styles.css";
import { connect } from "react-redux";
import * as productAction from "./actions/productAction";

const init = {
  title: "",
  description: "",
  price: ""
};

function App({
  products,
  createProduct,
  setProduct,
  deleteProduct,
  updateProduct
}) {
  const [data, setData] = useState(init);
  const [updateId, setUpdateId] = useState(null);

  function handleChange(e) {
    let { name, value } = e.target;
    let object = { ...data, [name]: value };
    setData(object);
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if (updateId !== null) {
      const updatedProduct = { ...data, id: updateId };
      updateProduct(updatedProduct);
      setUpdateId(null);
    } else {
      let object = { ...data, id: products.length + 1 };
      createProduct(object);
    }
    setData(init);
  }

  function handleDelete(id) {
    deleteProduct(id);
  }

  function handleUpdate(id) {
    setUpdateId(id);
    const productToUpdate = products.find((product) => product.id === id);
    if (productToUpdate) {
      setData({
        title: productToUpdate.title || "",
        description: productToUpdate.description || "",
        price: productToUpdate.price || ""
      });
    }
  }

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.products);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <h1>CRUD Application</h1>
        <hr />
        <div>
          <form onSubmit={handleSubmit}>
            <input
              style={{ margin: "10px", padding: "10px" }}
              value={data.title}
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
            <input
              value={data.description}
              style={{ margin: "10px", padding: "10px" }}
              placeholder="Description"
              type="text"
              name="description"
              onChange={handleChange}
            />
            <input
              value={data.price}
              style={{ margin: "10px", padding: "10px" }}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleChange}
            />
            <button type="submit">
              {updateId !== null ? "Update" : "Submit"}
            </button>
          </form>
        </div>
        <hr />
        <table>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid", padding: "10px" }}>
                Product
              </th>
              <th style={{ borderBottom: "1px solid", padding: "10px" }}>
                Description
              </th>
              <th style={{ borderBottom: "1px solid", padding: "10px" }}>
                Price
              </th>
              <th style={{ borderBottom: "1px solid", padding: "10px" }}>
                Update
              </th>
              <th style={{ borderBottom: "1px solid", padding: "10px" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ borderBottom: "1px solid", padding: "10px" }}>
                  {product.title}
                </td>
                <td style={{ borderBottom: "1px solid", padding: "10px" }}>
                  {product.description}
                </td>
                <td style={{ borderBottom: "1px solid", padding: "10px" }}>
                  {product.price}
                </td>
                <td style={{ borderBottom: "1px solid", padding: "10px" }}>
                  <button onClick={() => handleUpdate(product.id)}>
                    Update
                  </button>
                </td>
                <td style={{ borderBottom: "1px solid", padding: "10px" }}>
                  <button onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (product) => dispatch(productAction.createProduct(product)),
    setProduct: (products) => dispatch(productAction.setProduct(products)),
    deleteProduct: (id) => dispatch(productAction.deleteProduct(id)),
    updateProduct: (product) => dispatch(productAction.updateProduct(product))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
