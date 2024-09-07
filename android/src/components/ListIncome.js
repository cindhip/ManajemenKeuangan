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

const ListIncome = ({ title, amount, date, category }) => {
  return (
    <Div row justifyContent="space-between" my={10}>
      <Div row alignItems="center">
      {category== 'Penjualan Produk' ? (
        <Icon
        name="sack"
        fontFamily="MaterialCommunityIcons"
        fontSize={32}
        color="#e287bb"
        mr={10}
        />
        ) : category == 'Simpanan Anggota' ? (
        <Icon
        name="piggy-bank"
        fontFamily="FontAwesome5"
        fontSize={32}
        color="#e287bb"
        mr={10}
        />
        ) :  category == 'Bunga' ?(
        <Icon
        name="coins"
        fontFamily="FontAwesome5"
        fontSize={32}
        color="#e287bb"
        mr={10}
        />
        ) : category == 'Dana Sosial' ? (
        <Icon
        name="hands-helping"
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

export default ListIncome;
