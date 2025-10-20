import React, {Component} from 'react';
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import CategoryFilterPC from "../../components/CategoryFilterPC/CategoryFilterPC";
import {connect} from 'react-redux';
import BrandFilter from "../../components/BrandFilter/BrandFilter";
import BrandFilterPC from "../../components/BrandFilterPC/BrandFilterPC";
import OrderFilter from "../../components/OrderFilter/OrderFilter";
import { Animate } from "react-animate-mount";
import GroupFilter from "../../components/GroupFIlter/GroupFIlter";
class FilterBar extends Component {
  
    state={ondesktop:false}
  
    componentDidMount(){
        console.log(this.props)
       
this.desktopverifi()
    }
    desktopverifi(){
        if(window.document.body.clientWidth >= 800){
          this.setState({ondesktop:true,filtros:true})
         
        } else if(window.document.body.clientWidth < 800){
          this.setState({ondesktop:false, filtros:false})
        }
      }
    render() {
     console.log(this.props)

        let flechaval = this.state.filtros?"▲":"▼"
        return (
            <div className="col-lg-3">
           
                <div className="contBotonfiltros">
                <span type="button" className=" subtituloArtbtn "
                onClick={()=>{this.setState({filtros:!this.state.filtros})}}
                >{flechaval}</span>
                      </div>
                <Animate show={this.state.filtros}>
                <div className="row">
                <div className="col-12">
                    <GroupFilter grupoPreSelect ={this.props.Grupo}/>
                    </div>
                    <Animate show={this.props.state.groupFilter =="CELULAR"}>
                <div className="col-12">
                    <CategoryFilter categoryPreSelect ={this.props.Categoria} />
                    </div>
                    <div className="col-12">
                    <BrandFilter/>
                    </div>
                    <div className="col-12">
                        <OrderFilter/>
                    </div>
                    </Animate>
                    <Animate show={this.props.state.groupFilter =="COMPUTADOR"}>
                    <div className="col-12">
                    <CategoryFilterPC categoryPreSelect ={this.props.Categoria}/>
                    </div>
                    <div className="col-12">
                    <BrandFilterPC/>
                    </div>
                    <div className="col-12">
                        <OrderFilter/>
                    </div>
                    </Animate>
                </div>
                </Animate>
            </div>
        );
    }
}
const mapStateToProps = (state) => {


    return {
        state
    }

};
export default connect(mapStateToProps)(FilterBar);