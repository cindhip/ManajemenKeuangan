import React from "react";
import { Div, Icon, Text } from "react-native-magnus";

// Fungsi untuk memformat tanggal
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

// Fungsi untuk memformat nominal uang
const formatCurrency = (amount) => {
  return amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

const List = ({ title, amount, date, type }) => {
  return (
    <Div row justifyContent="space-between" my={10}>
      <Div row alignItems="center">
        <Icon
          name={type === 'income' ? "arrow-circle-up" : "arrow-circle-down"}
          fontFamily="FontAwesome"
          fontSize={32}
          color={type === 'income' ? "#6CB4EE" : "#EE6C99"}
          mr={10}
        />
        <Div>
          <Text fontWeight="900">{title}</Text>
          <Text>{formatDate(date)}</Text>
        </Div>
      </Div>
      <Text 
        fontSize={20} 
        fontWeight="900" 
        color={type === 'income' ? "#6CB4EE" : "#EE6C99"}>
        {formatCurrency(amount)}
      </Text>

    </Div>
  );
};

export default List;
