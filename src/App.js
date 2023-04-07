import { useEffect, useState } from "react";
import "./styles.css";
import { connect } from "react-redux";
import * as productAction from "./actions/productAction";
const init = {
  title: "",
  description: "",
  price: ""
};

function App({ products, createProduct, setProduct, updateProduct }) {
  const [data, setData] = useState(init);

  function handleChange(e) {
    let { name, value } = e.target;
    let object = { ...data, [name]: value };
    setData(object);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (updateId !== null) {
      const updatedProduct = {...data, id: updateId}
      updateProduct(updatedProduct)
      setUpdateId(null);
    }else {
      let object = { ...data, id: products.length };
      createProduct(object);
    }
    setData(init);
  }

  function handleDelete(id) {
    deleteProduct(id);
  }

  const [updateId, setUpdateId] = useState(null)

  function handleUpdate(id) {
    setUpdateId(id);
    const productToUpdate = products.find(product => product.id === id);
    setData(productToUpdate)
  }

  useEffect(() => {
    fetch(" https://dummyjson.com/products")
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
          <input
            style={{ margin: "10px", padding: "5px" }}
            value={data.title}
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <input
            value={data.description}
            style={{ margin: "10px", padding: "5px" }}
            placeholder="Description"
            type="text"
            name="description"
            onChange={handleChange}
          />
          <input
            value={data.price}
            style={{ margin: "10px", padding: "5px" }}
            type="number"
            placeholder="Price"
            name="price"
            onChange={handleChange}
          />
          <button className="p-2 m-2" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <table>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
          {products.map((product, i) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleUpdate(product.id)}>Update</button>
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (product) => dispatch(productAction.createProduct(product)),
    setProduct: (products) => dispatch(productAction.setProduct(products)),
    deleteProduct: (id) => dispatch(productAction.deleteProduct(id)),
    updateProduct: (id) => dispatch(productAction.updateProduct(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
