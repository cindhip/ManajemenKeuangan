import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Div, Text } from 'react-native-magnus';
import debounce from 'lodash.debounce';

// Fungsi untuk memformat nominal uang
const formatCurrency = (amount) => {
  return amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default function Input({ navigation }) {
  const [anggotaKoperasi, setAnggotaKoperasi] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [initialData, setInitialData] = useState([]);

  const handleSearch = useCallback(
    debounce((keyword) => {
      if (keyword === '') {
        setAnggotaKoperasi(initialData);
      } else {
        const filteredData = initialData.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase())
        );
        setAnggotaKoperasi(filteredData);
      }
    }, 300),
    [initialData]
  );

  useEffect(() => {
    axios
      .get('http://192.168.167.22:5000/api/v1/get-input')
      .then((result) => {
        setAnggotaKoperasi(result.data);
        setInitialData(result.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const onSearchKeywordChange = (text) => {
    setSearchKeyword(text);
    handleSearch(text);
  };

  // Mengambil lebar layar perangkat
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      <Div h="100%" bg="white" alignItems="center">
        <Div w={screenWidth * 0.9} mt={20}>
          <Text my={20} fontWeight="bold" fontSize={30} textAlign="center">
            Data Anggota Koperasi
          </Text>
          <TextInput
            style={[styles.input, { width: screenWidth * 0.9 }]}
            placeholder="Cari berdasarkan nama"
            value={searchKeyword}
            onChangeText={onSearchKeywordChange}
          />
          <Div p={10} bg="white" h="100%" rounded={20}>
            {anggotaKoperasi.map((item) => (
              <Div key={item.id} style={styles.itemContainer}>
                <Text style={styles.itemText}>Nama: {item.name}</Text>
                <Text style={styles.itemText}>Alamat: {item.address}</Text>
                <Text style={styles.itemText}>Hutang: {formatCurrency(item.expense)}</Text>
              </Div>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#5AB2FF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
    color:'white',
  },
});
