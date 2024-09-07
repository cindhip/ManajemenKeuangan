import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
  bitcoin,
  calender,
  cdollar,
  comment,
  kitchen,
  holding,
  house,
  piggy,
  trash,
  sack,
  landmark,
  coins,
  edit,
} from "../../utils/icons";
import Button from "../Button/Button";

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  editItem,
  indicatorColor,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case "Simpanan Anggota":
        return piggy;
      case "Penjualan Produk":
        return sack;
      case "Bunga":
        return cdollar;
      case "Dana Sosial":
        return holding;
      case "Lainnya":
        return bitcoin;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "Biaya Operasional":
        return house;
      case "Pembelian Inventaris":
        return kitchen;
      case "pembayaran Pajak":
        return landmark;
      case " pengeluaran Sosial":
        return coins;
      case "Lainnya":
        return bitcoin;
      default:
        return "";
    }
  };

  console.log("type", type);

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="icon">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5 onClick={() => console.log(category)}>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>Rp.{amount}</p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="bungkus">
            <div className="actions">
              <Button
                icon={edit}
                bPad={"2rem"}
                bRad={"50%"}
                bg={"var(--primary-color"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                onClick={() => editItem(id)}
              />
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
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
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
        align-items: center;
        gap: 1.1 rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }

    .bungkus {
        display: flex;
        flex-direction: row;
    }
  }
`;

export default IncomeItem;
