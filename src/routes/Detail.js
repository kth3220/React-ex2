import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import styled from "styled-components";

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;

// let NewBtn = styled.button(YellowBtn);

// let Box = styled.div`
//   padding: 20px;
//   background: grey;
// `;

function Detail(props) {
  let [aalert, setAalert] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setAalert(false);
    }, 2000); //2초동안 보여주고 ui 끄기
    return () => {
      clearTimeout(timer);
    }; //useEffect동작전에 실행되는 코드로 기존 요청은 제거하는 것
  }, []); //[]여기에 실행조건을 넣을 수 있는데 빈배열로 두면 1번만 실행됨

  //useEffect 총정리
  useEffect(() => {}); //1. 재렌더링마다 코드 실행하고 싶으면
  useEffect(() => {}, []); //2. mount시 1회 코드실행하고 싶으면, 5. 특정 state 변경시에만 실행하려면 [state명] 배열안에 넣어주기
  useEffect(() => {
    return () => {
      //3. unmount시 1회 코드실행 하고싶으면
      //4. useEffect 실행전에 뭔가 실행하려면 return()=>{}
    };
  });

  let [value, setValue] = useState("");

  useEffect(() => {
    if (value !== "" && isNaN(Number(value))) {
      alert("숫자만 입력하세요");
    }
  }, [value]);

  let [count, setCount] = useState(0);

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });

  return (
    <div className="container">
      {aalert === true ? (
        <div className="alert alert-warning">2초이내 구매시 할인</div>
      ) : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {" "}
        버튼{" "}
      </button>
      {/* <Box>
        <YellowBtn bg="blue">바보</YellowBtn>
        <YellowBtn bg="orange">바보</YellowBtn>
      </Box>
      <NewBtn bg="blue">바보</NewBtn> */}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
