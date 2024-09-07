import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Div, Text } from "react-native-magnus";
import ListIncome from "../components/ListIncome";
import axios from "axios";

// Fungsi untuk memformat nominal uang
const formatCurrency = (amount) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default function Income({ navigation }) {
  const [income, setIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    axios
      .get("http://192.168.167.22:5000/api/v1/get-income")
      .then((result) => {
        const data = result.data;
        setIncome(data);

        // Menghitung total pengeluaran
        const total = data.reduce((sum, item) => sum + item.amount, 0);
        setTotalIncome(total);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Div h="100%" bg="white">
        <Div
          bg="#5AB2FF"
          p={80}
          roundedBottom={20}
          shadow="lg"
          w="100%"
          alignItems="center"
        >
          <Text fontSize={33} fontWeight="900" color="white">
            {formatCurrency(totalIncome)}
          </Text>
          <Text fontSize={18} fontWeight="bold" color="white">
            Pemasukan
          </Text>
        </Div>

        <Div mx={8}>
          <Text my={10} fontWeight="bold" fontSize={20}>
            Riwayat Transaksi
          </Text>

          <Div p={10} px={20} bg="white" h="100%" rounded={20}>
            {income.map((item) => (
              <ListIncome
                key={item.id} // Pastikan setiap item memiliki kunci unik
                title={item.title}
                date={item.date}
                amount={item.amount}
                category={item.category}
              />
            ))}
          </Div>
        </Div>
      </Div>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
