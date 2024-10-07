import { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import bg from "./img/bg.png";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); //페이지 이동을 도와주는 함수
  let [click, setClick] = useState(0);
  let [isloading, setIsLoading] = useState(false);
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate(-1)}>Home</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            {/*Link는 페이지 이동 버튼임 */}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{ backgroundImage: "url(" + bg + ")" }}
              ></div>
              <div className="Container">
                <div className="row">
                  {shoes.map((a, i) => {
                    {
                      /*a는 배열의 각 신발 정보를 나타내고, i는 그 신발이 배열에서 몇 번째인지 나타냄 */
                    }
                    return <Card shoes={shoes[i]} i={i} key={i}></Card>;
                  })}
                </div>
              </div>

              {isloading && (
                <div className="alert alert-warning">로딩중입니다.</div>
              )}

              <button
                onClick={() => {
                  setIsLoading(true); //로딩시작

                  setClick(click + 1); //클릭횟수증가
                  if (click == 1) {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((결과) => {
                        console.log(결과.data);
                        let copy = [...shoes, ...결과.data];
                        // ...은 괄호를 벗겨줌
                        setShoes(copy); //새로운 데이터 추가
                        setIsLoading(false); //로딩 끝
                      })
                      .catch(() => {
                        setIsLoading(false); //로딩 끝
                        console.log("axios 실패");
                      });
                  }
                  if (click == 2) {
                    axios
                      .get("https://codingapple1.github.io/shop/data3.json")
                      .then((결과) => {
                        console.log(결과.data);
                        let copy = [...shoes, ...결과.data];
                        // ...은 괄호를 벗겨줌
                        setShoes(copy); //새로운 데이터 추가
                        setIsLoading(false); //로딩 끝
                      })
                      .catch(() => {
                        setIsLoading(false); //로딩 끝
                        console.log("axios 실패");
                      });
                  }
                  if (click >= 3) {
                    alert("더이상 상품이 없습니다.");
                    setIsLoading(false);
                  }

                  //fetch로 데이터를 가져오게되면 JSON->array/object변환과정 필요함
                  // fetch('url')
                  // .then(결과=>결과.json())
                  // .then(data=>{})

                  //한번에 요청을 보낼때
                  // Promise.all([axios.get('/url1'), axios.get('/url2')])
                  // .then(()=>{
                  // })
                }}
              >
                더보기
              </button>
              {/* 서버한테 데이터를 요청해서 가져오기
              (GET,POST 요청을 할 때 새로고침 없이 데이터를 주고받게 해주는)ajax를
               쓰려면 옵션 3개중 택1
              1. XMLHttpRequest
              2. fetch()
              3. axios (보통 리액트에서는 axios사용함)
              요청 결과는 axious.get('url').then()*/}

              {/* 데이터를 가져올 때는 보통 GET 고르면 되고 
            데이터를 서버로 보낼 때는 POST */}
            </>
          }
        />

        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

        <Route path="*" element={<div>존재하지 않는 페이지입니다.</div>} />
        <Route path="/about" element={<About />}>
          <Route path="location" element={<div>위치정보임</div>} />
          <Route path="member" element={<div>멤버임</div>} />
        </Route>
        {/* nested routes는 여러 유사한 페이지들이 필요할때 사용함 */}

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route>
      </Routes>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet />
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  let i = 0;
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
