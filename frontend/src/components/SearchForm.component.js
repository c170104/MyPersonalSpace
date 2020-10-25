import React, { Component } from "react";
import { Redirect } from "react-router-dom";

function SearchRedirect(props) {
    if(props.state.redirect) {
        return <Redirect to={{
            pathname: "/products",
            search: props.state.searchValue
            }}
        />;
    }
    return null
}

class SearchForm extends Component {
    constructor(props)  {
        super(props);

        this.state = {
            searchValue : '',
            redirect: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onChange(event) {
        this.setState({
            searchValue: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({
            redirect: true
        });            
    }

    render() {
        return (
            <div>
                <form className="form-inline" onSubmit={ this.onSubmit }>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={ this.onChange } />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <SearchRedirect state={ this.state } />
            </div>
        );  
    }
}


export default SearchForm;