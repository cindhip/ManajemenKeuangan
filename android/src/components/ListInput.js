import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ListInput = ({ title, amount, date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {title}</Text>
      <Text style={styles.amount}>Amount: {amount}</Text>
      <Text style={styles.date}>Date: {date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ListInput;
