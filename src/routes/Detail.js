import { useParams } from "react-router-dom";
import styled from 'styled-components';

function Detail(props){
  let {id} = useParams()
  let product = props.shoes.find((x)=>{
    return x.id == id
  })
  
  let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
  `
  let BlackBox = styled.div`
    background : grey;
    padding : 20px;
  `
  let NewBtn = styled.button(YellowBtn)

  return(
    <div className="container">
      <BlackBox>
        <YellowBtn bg="blue">버튼</YellowBtn>
        <NewBtn >qqqq</NewBtn>
      </BlackBox>
    <div className="row">
        <div className="col-md-6">
        <img src={"https://codingapple1.github.io/shop/shoes"+ (product.id +1) +".jpg"} width="100%" />
        </div>
        <div className="col-md-6">
        <h4 className="pt-5">상품명 : {props.shoes[id].title}</h4>
        <p>상품설명 : {props.shoes[id].content}</p>
        <p>가격 : {props.shoes[id].price}원</p>
        <Info item={props.item} id={product.id}></Info>
        <button className="btn btn-danger">주문하기</button> 
        </div>
    </div>
    </div> 
  )
}

function Info(props){
  return(
    <div>재고 : {props.item[props.id]}</div>
  )
}
export default Detail;