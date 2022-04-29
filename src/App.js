import './App.css';
import {Navbar, Container, Nav} from 'react-bootstrap'
import shoesImg from './img/bg.png'
import React, { useContext, useEffect, useState } from 'react';
import data from './data.js'
import Detail from './routes/Detail.js'
import Cart from './routes/Cart.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import {CSSTransition} from "react-transition-group"
import './Detail.scss'


let InvenContxt = React.createContext();

function App() {

  let [shoes, setshoes] = useState(data)
  let [item, setitem] = useState([10,2,5])
  let [tab, setteb] = useState(0);
  let navigate = useNavigate();
  let [tabswitch, settabswitch] = useState(false);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand onClick={()=>{navigate('/')}}>Dongshop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/Detail/1')}}>Detail</Nav.Link>
          <Nav.Link onClick={()=>{navigate('/Cart')}}>Cart</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <Link to="/">Home</Link>
      <Link to="/Detail/1">detail</Link>
      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg' style={{ backgroundImage:'url(' + shoesImg +')' }}></div>
            <div className='container'>

              <InvenContxt.Provider value={item}>

                <img src={process.env.PUBLIC_URL + '/logo192.png'} />
                <div className='row'>
                  {
                    shoes.map((data, i)=>{
                      return(
                        <Card shoes={data} index={i} navigate={navigate} key={i}/>
                      )
                    })
                  }
                </div>
              </InvenContxt.Provider> 
            </div>
            <Nav className='mt-5' variant="tabs" defaultActiveKey="link-0">
              <Nav.Item>
                <Nav.Link eventKey="link-0" onClick={()=>{ settabswitch(false); setteb(0)}}>Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>{ settabswitch(false); setteb(1)}}>Option 2</Nav.Link>
              </Nav.Item>
            </Nav>

            <CSSTransition in={tabswitch} classNames="wow" timeout={500}>
              <TabContent tab={tab} settabswitch={settabswitch}/>
            </CSSTransition>
          </>
        }>
        </Route>
        <Route path='/Detail/:id'  element={<Detail shoes={shoes} item={item}/>}></Route>               
        <Route path='/event' element={<Event/>}>
          {/* Nescted Routes
            장점 1. route 작성이 간단 2. nested route 접속시엔 하위 element 노출
            하위 element 들은 <Event/> 안에 위치를 설정해서 나타낼수있음 <Outlet></Outlet>
          */}
          <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>}></Route>        
          <Route path='two' element={<p>생일기념 쿠폰받기</p>}></Route>        
        </Route>
        <Route path='/Cart' element={<Cart></Cart>}></Route> 
        <Route path='*' element={<div>404 페이지</div>}></Route>       
      </Routes>
    </div>
  );
}

function TabContent(props){
  useEffect(()=>{
      props.settabswitch(true)
    }
  )
  if(props.tab === 0){
    return <div>{props.tab}번째 내용입니다</div>
  }else if(props.tab === 1){
    return <div>{props.tab}번째 내용입니다</div>
  }else{
    return <div>{props.tab}번째 내용입니다</div>
  }
}

function Event(){
  return (
    <div>
      <h4>오늘의이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  let item = useContext(InvenContxt)
  return(
    <div className='col-md-4'>
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.index +1) +'.jpg'} width="80%" />
      <h4>상품명 : {props.shoes.title}</h4>
      <p>상품설명 : {props.shoes.content}</p>
      <button className="btn btn-danger" onClick={()=>{props.navigate('/Detail/'+props.index)}}>상세보기</button>
      <TestContext/>
    </div>
  )
}

function TestContext(){
  let item = useContext(InvenContxt);
  return <p>재고 : {item[0]}</p>
}

export default App;
