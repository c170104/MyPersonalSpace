import React, { Component } from "react"; 

const axios = require('axios');

function RenderProducts(props) {
  if (props.products)
    return props.products.map( product => {
      return <li>{ product.name }</li>
    });
  return null
}

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products : []
    };

    this.searchProduct = this.searchProduct.bind(this);

  }

  searchProduct(searchTerm) {
    axios.get(`http://localhost:8000/api/product/${searchTerm}`)
      .then( res => {
        this.setState({
          products: res.data.data
        });
      })
      .catch( err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.searchProduct("");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search)
      this.searchProduct(this.props.location.search);
  }

  render() {
    return (
     <div>
       { console.log(this.props)}
       { console.log(this.state.products) }
       <ol>
        { <RenderProducts products={ this.state.products } /> }
       </ol>
     </div>
    );
  }
}



export default Product;