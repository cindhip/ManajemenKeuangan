import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Div, Text } from "react-native-magnus";
import List from "../components/List";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

const formatCurrency = (amount) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default function Home({ navigation }) {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResult = await axios.get(
          "http://192.168.167.22:5000/api/v1/get-income"
        );
        const incomeData = incomeResult.data;
        setIncome(incomeData);

        const incomeTotal = incomeData.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setTotalIncome(incomeTotal);

        const expenseResult = await axios.get(
          "http://192.168.167.22:5000/api/v1/get-expense"
        );
        const expenseData = expenseResult.data;
        setExpense(expenseData);

        const expenseTotal = expenseData.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        setTotalExpense(expenseTotal);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      console.log("Data has been loaded:", {
        income,
        expense,
        totalIncome,
        totalExpense,
      });
    }
  }, [isLoading, income, expense, totalIncome, totalExpense]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const saldo = totalIncome - totalExpense;
  const combinedTransactions = [...income, ...expense]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  const dates = combinedTransactions.map((tr) =>
    new Date(tr.date).toLocaleDateString("id-ID")
  );
  const incomes = combinedTransactions.map((tr) =>
    tr.type === "income" ? tr.amount : 0
  );
  const expenses = combinedTransactions.map((tr) =>
    tr.type === "expense" ? tr.amount : 0
  );

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
            {formatCurrency(saldo)}
          </Text>
          <Text fontSize={18} fontWeight="bold" color="white" mt={5}>
            Saldo Keuangan
          </Text>
        </Div>

        <Div mx={15}>
          <LineChart
            data={{
              labels: dates,
              datasets: [
                {
                  data: incomes,
                  color: (opacity = 1) => `#89CFF0`, 
                  strokeWidth: 2,
                },
                {
                  data: expenses,
                  color: (opacity = 1) => `#e287bb`, 
                  strokeWidth: 2,
                },
                
                        
              ],
              legend: ["Pemasukan", "Pengeluaran"],
            }}
            width={400}
            height={200}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `#bedaef`,
              labelColor: (opacity = 1) => `#539ed6`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffffff",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <Text mt={10} fontWeight="bold" fontSize={20}>
            Riwayat Transaksi
          </Text>
          {combinedTransactions.map((item) => (
            <List
              key={item.id}
              title={item.title}
              date={item.date}
              amount={item.amount}
              type={item.type}
            />
          ))}
        </Div>
      </Div>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
