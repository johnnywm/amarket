import Autosuggest from 'react-autosuggest';

import {connect} from 'react-redux';
import React from "react"
import {SearcherUpdate} from"../../components/filtros/filtrotienda"
import { Animate } from "react-animate-mount";
  
// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value, props) {
    console.log(value)
        
    if (value === '') {
      return [];
    }



const Search = SearcherUpdate(props, value)


 


    return Search
  }
  
  function getSuggestionValue(suggestion) {
    return suggestion.Titulo;
  }

  
  class Suggestioncompo extends React.Component {
    constructor() {
      super();

      this.state = {
        value: '',
        suggestions: []
      };    
    }
    
 renderSuggestion=(suggestion) => {
   
      return (
        <span  className="customsuggest"  onClick={()=>{this.props.sendClick(suggestion.Titulo)}}>{suggestion.Titulo}</span>
      );
    }
    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });

      this.props.getvalue(newValue)
      this.props.resetPagination()
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
   
      this.setState({
        suggestions: getSuggestions(value, this.props.modelos)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };
  
    render() {
       
      const { value, suggestions } = this.state;
      const inputProps = {
        placeholder: "Busca tu producto",
        value,
        onChange: this.onChange
      };
  
      return (
      <div className="contSuggester">
     
<Autosuggest 



suggestions={suggestions}
onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
onSuggestionsClearRequested={this.onSuggestionsClearRequested}
getSuggestionValue={getSuggestionValue}
renderSuggestion={this.renderSuggestion}
inputProps={inputProps} />

<Animate show={this.state.value !== ""}>

<button type="button" class="btn btn-outline-danger"
onClick={()=>{
  this.props.remove()
  this.setState({value:""})}


}
>X</button>
</Animate>
<style >{` 
.customsuggest{
  display: flex;
  width: 100%;
 
}

ul{
  list-style: none;
    padding: 0px;
}

`}</style>
      </div>
    
      );
    }
  }
  
 
  export default Suggestioncompo