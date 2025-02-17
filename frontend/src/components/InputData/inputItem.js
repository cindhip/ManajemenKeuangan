import React, { useState } from "react";
import Button from "../Button/Button";
import { trash, home, aktif, non, hp } from "../../utils/icons";
import styled from "styled-components";

const inputItem = ({
  id,
  name,
  address,
  phone,
  category,
  type,
  indicatorColor,

  deleteItem,
}) => {
  const categoryItem = () => {
    switch (category) {
      case "aktif":
        return aktif;
      case "non":
        return non;
      default:
        return "";
    }
  };

  console.log("type", type);
  return (
    <InputItemStyled indicator={indicatorColor}>
      <div className="icon">{categoryItem()}</div>
      <div className="content">
        <h5 onClick={() => console.log(name, address, phone, category)}>{name}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {home} {address}
            </p>
            <p>{hp} {phone}</p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={"2rem"}
              bRad={"50%"}
              bg={"var(--primary-color"}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </InputItemStyled>
  );
};

const InputItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 108%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 1rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        flex-direction: column;
        gap: 1.1 rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
          margin-bottom: 1em;
        }
      }
    }
  }
`;

export default inputItem;
