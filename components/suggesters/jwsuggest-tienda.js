import Autosuggest from 'react-autosuggest';

import {connect} from 'react-redux';
import React from "react"
import Link from 'next/link';
import {SearcherUpdate} from"../../components/filtros/filtrotienda"
import { Animate } from "react-animate-mount";
  
// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  function getSuggestions(value, props) {
    console.log(value)
        
    if (value === '') {
      // Mostrar primeras sugerencias cuando no hay texto (mejor UX)
      return  [];
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
      const title = suggestion?.Titulo || '';
      const imgSrc = (Array.isArray(suggestion?.Imagen) && suggestion.Imagen[0])
        ? suggestion.Imagen[0]
        : '/static/fblogo.png';
      const href = `/empresa/${this.props.empresa}/tienda/${(suggestion.Titulo).replace(/ /g, '_').replace(/\//g, '~')}`;
      return (
        <div >
   <Link href={href} >
      <a style={{textDecoration:"none"}} target="_self" rel="noopener noreferrer">
        <div className="suggestion-item" onClick={()=>{this.props.sendClick(title)}}>          <img
            className="suggestion-thumb"
            src={imgSrc}
            alt={title}
            onError={(e)=>{ e.currentTarget.src = '/static/fblogo.png'; }}
          />
          <span className="suggestion-title">{title}</span>
 </div>
 </a>
  </Link>
  

  
        </div>
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
       console.log(this.props.modelos)
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

<button type="button" className="btn btn-outline-danger"
onClick={()=>{
  this.props.remove()
  this.setState({value:""})}


}
>X</button>
</Animate>
<style >{` 
.customsuggest{ /* legado: ya no se usa, pero se mantiene por compatibilidad */
  display: flex;
  width: 100%;
}

ul{
  list-style: none;
  padding: 0px;
  margin: 0;
}

.suggestion-item{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
}
.suggestion-item:hover{
  background: rgba(0,0,0,0.04);
}
.suggestion-thumb{
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #eee;
}
.suggestion-title{
  flex: 1;
  font-size: 0.95rem;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`}</style>
      </div>
    
      );
    }
  }
  
 
  export default Suggestioncompo