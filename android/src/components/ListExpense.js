import React from "react";
import { Div, Icon, Text } from "react-native-magnus";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};
const formatCurrency = (amount) => {
  return amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

const ListExpense = ({ title, amount, date , category}) => {
  return (
    <Div row justifyContent="space-between" my={10}>
      <Div row alignItems="center">
        {category== 'Biaya Operasional' ? (

          <Icon
          name="power-plug"
          fontFamily="Entypo"
          fontSize={32}
          color="#e287bb"
          mr={10}
          />
        ) : category == 'Pembelian Inventaris' ? (
          <Icon
          name="shopping-bag"
          fontFamily="Entypo"
          fontSize={32}
          color="#e287bb"
          mr={10}
          />
        ) :  category == 'Pembayaran Pajak' ?(
          <Icon
          name="arrow-circle-down"
          fontFamily="FontAwesome"
          fontSize={32}
          color="#e287bb"
          mr={10}
          />
        ) : category == 'Pengeluaran Sosial' ? (
          <Icon
          name="hand-holding-usd"
          fontFamily="FontAwesome5"
          fontSize={32}
          color="#e287bb"
          mr={10}
          />
        ) : (
          <Icon
          name="arrow-circle-down"
          fontFamily="FontAwesome"
          fontSize={32}
          color="#e287bb"
          mr={10}
          />
      )}
        <Div>
          <Text fontWeight="900">{title}</Text>
          <Text>{formatDate(date)}</Text>
        </Div>
      </Div>
      <Text fontSize={20} fontWeight="900">
        {formatCurrency(amount)}
      </Text>
    </Div>
  );
};

export default ListExpense;
