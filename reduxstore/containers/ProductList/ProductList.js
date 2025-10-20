import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "../../components/Product/Product";
import {Filter} from"../../../components/filtros/filtrotienda"
import { Animate } from 'react-animate-mount/lib/Animate';
import {brandFilter} from "../../pipes/brandFilter";
import {groupFilter} from "../../pipes/groupFilter";
import {categoryFilter} from "../../pipes/categoryFilter";
import {searcher} from "../../pipes/searcherfilter";
import {orderByFilter} from "../../pipes/orderByFilter";
import LayoutMode from "../../components/LayoutMode/LayoutMode";
import {paginationPipe} from "../../pipes/paginationFilter";
import Pagination from "../../components/Pagination/Pagination";
import { fetchProducts } from "../../actions/myact";
import Autosuggest from '../../../components/suggesters/jwsuggest-tienda';
import {uploadeFilterSeacher, removeFilterSearcher} from "../../actions/myact";
import {resetFilters} from "../../actions/index"
import { CircularProgress } from '@mui/material';
import postal from 'postal';

class ProductList extends Component {

  
    state = {
        
        colValue : 'col-lg-4',
        perPage: 9,
        currentPage: 1,
        pagesToShow: 5,
        gridValue: 3,
        inputval:"",
valor:"",
mounted:false,   
altClass:""
    };
   channel = null;
   channel2 = null;

   componentDidMount() {
    this.props.dispatch(removeFilterSearcher())
    this.channel2 = postal.channel();
    if(this.props.Items.items.length == 0){
        this.props.dispatch(fetchProducts());
    }
    this.channel2.subscribe('resetFilter', (data) => {
   console.log("asd page")
        this.resetPagination()
         
       });
    this.channel = postal.channel();
    this.setState({mounted:true})
      }
      updateData = () => {
        this.props.dispatch(fetchProducts());
       
      }
    changeLayout = (n) => {
        console.log(n)
        this.setState({gridValue: n});

        let realGridValue;
        let alternativeProd 
        

        if(n === 4) {
            realGridValue = 3
            alternativeProd = "alternativeprod"
        } else {
            realGridValue = 4;
            
            alternativeProd = ""
        }

      this.setState({
          colValue: `col-lg-${realGridValue}  `,altClass:alternativeProd
      });
    };


    onPrev = () => {
        const updatedState = {...this.state};
        updatedState.currentPage = this.state.currentPage - 1;
        this.setState(updatedState);
    };


    onNext = () => {
        this.setState({
            ...this.state,
            currentPage: this.state.currentPage + 1
        });
        this.channel.publish('actualizador', {
            message: 'enviado desde PL'
         });
    };

    goPage = (n) => {
        this.setState({
            ...this.state,
            currentPage: n
        });
    };
    getAutoValueold=(valor)=>{
        this.setState({inputval:valor})
        if(valor === ""){
            
            this.props.dispatch(removeFilterSearcher())
}

}
getAutoValue=(valor)=>{
      
   this.setState(    {valor})
  
   if(valor === ""){
            
    this.props.dispatch(removeFilterSearcher())
}
         
     }


    dispatcherSearcher=()=>{

this.props.dispatch(uploadeFilterSeacher(this.state.valor))


    }
    updateSearcher=()=>{
      
            this.dispatcherSearcher()
            this.setState({   currentPage: 1})
       
    }

    resetPagination=()=>{
        this.setState({   currentPage: 1})
    }

    getClick=(e)=>{

        this.props.dispatch(resetFilters())
      var padre = document.getElementById("padre")
 
      var field = document.createElement('input');
     
    field.setAttribute('type', 'text');
    field.setAttribute('style', 'height: 0px; width: 0px;');
    setTimeout(()=> {
        field.focus();
        
        setTimeout(()=> {
        field.setAttribute('style', 'display:none;');
       
        }, 50);
        }, 50);
 
   
    padre.insertBefore(field, null)
    setTimeout(()=> {
        field.focus();
        
        setTimeout(()=> {
     
       
        }, 50);
        }, 50);
        this.props.dispatch(uploadeFilterSeacher(e))
     
      }
    itemsRender = () =>{
  
    
        let primerbloque= this.props.products.filter(a=> a.Imagen[0]!= '' && a.Existencia > 0).sort()
        let segundobloqueymedios= this.props.products.filter(a=> a.Imagen[0]!= '' && a.Existencia == 0)
      
        let segundobloque= this.props.products.filter(a=> a.Imagen[0]== '' && a.Existencia > 0)

        let tercerbloque= this.props.products.filter(a=> a.Imagen[0]== '' && a.Existencia == 0)
        
            let nuevoarray = primerbloque.concat(segundobloque).concat(segundobloqueymedios).concat(tercerbloque)
    
    
        const arr = paginationPipe(nuevoarray, this.state)
    
        return(arr)
    }
    render() {





        let isActive = this.state.colValue[this.state.colValue.length -1];

        return (
            <div className="col-lg-9">
                <div className="row mb-3">
                <div className="col-12" >
               
                <div className="card">
                        <div className="card-header d-flex justify-content-end align-items-center mycard">
                  
                        <Autosuggest  
                        remove ={()=>{
                            this.props.dispatch(removeFilterSearcher())
                        }}
                        value ={this.state.valor}
                        sendClick={this.getClick}
                        resetPagination={this.resetPagination}
                        getvalue={(item)=>{this.getAutoValue(item)}} 
                         modelos={this.props.Items.items}  />

                        <button className="btn btn-primary" style={{marginLeft:"8px"}} onClick={this.updateSearcher}>
                        <img  src="/icons/search.svg" />
                        </button>
                        <button style={{marginLeft:"10px",color:"white", borderRadius:"36px", background:"lightgreen",  paddingTop:"5px"}}   onClick={this.updateData}>
                        <img  src="/icons/update.png" />
         </button>
      
                        </div>
                        </div>
                        
                   </div>
                
                    <div className="col-12 d-none d-lg-block d-xl-block">
                      
                        <div className="card ">
                            <div className="card-header d-flex justify-content-end">
                                <span className="mr-3">Cambia la visualización: </span>
                                <LayoutMode len={3} isActive={this.state.gridValue === 3} click={this.changeLayout} />
                                <LayoutMode len={4} isActive={this.state.gridValue === 4}  click={this.changeLayout} />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="padre" style={{display:"flex", justifyContent:"flex-end"}} >
             
                </div>
                <div className="row" >
              
              {this.props.Items.loading === false && this.state.mounted ?this.itemsRender().map((product,i)=>{
 let classes = `${this.state.colValue} col-6 col-sm-4 mb-4`;
 
               return(<div className={classes} key={i}>
                <Product key={product._id} producto={product} altClass ={this.state.altClass} />
            </div>)
               }):
<div className="jwContFlexCenter" style={{width:"100%"}}>
               <CircularProgress size={80} />
               </div>      
               }
                </div>
                <div className="d-flex justify-content-end">
                <Pagination
                        totalItemsCount={this.props.products.length}
                        currentPage={this.state.currentPage}
                        perPage={this.state.perPage}
                        pagesToShow={this.state.pagesToShow}
                        onGoPage={this.goPage}
                        onPrevPage={this.onPrev}
                        onNextPage={this.onNext}
                    />
                </div>
                <style jsx>
                    {`
                   
                    .mycard{
                        margin: 5px 0px;
                        padding:1px;
                        padding-right:10px;
                    }
                    `}
                </style>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const inputFilter = state.searcherReducer;
    const brands = state.brandFilter;
    const orderBy = state.orderBy;
    const category = state.categoryReducer
    const Items = state.productReducer
    const group = state.groupFilter
    console.log(group)
    const groupOrderBy = groupFilter(Items.items,group )

    const arrCategoryFilter = categoryFilter(groupOrderBy, category)
    console.log(arrCategoryFilter)
    const filterByBrandArr = brandFilter(arrCategoryFilter, brands);

 const filterOrderBy = orderByFilter(filterByBrandArr,orderBy )



const productos = searcher(filterOrderBy, inputFilter )



    return {products: productos, Items,  brands, category }
};

export default connect(mapStateToProps, null)(ProductList);
