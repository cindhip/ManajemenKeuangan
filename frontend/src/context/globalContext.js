import React, { useContext, useState } from "react"
import axios from 'axios'
import numeral from 'numeral';

const BASE_URL = "http://localhost:5000/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [input, setInput] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const putIncome = async (id, editedData) => {
        try {
            const res = await axios.put(`${BASE_URL}put-income/${id}`, editedData);
            return res.data; // Jika perlu, Anda dapat mengembalikan data yang diterima dari backend
        } catch (error) {
            if (error.response) {
                // Tangani kesalahan dari respons server (misalnya: respons dengan kode status selain 2xx)
                throw new Error(`Gagal menyimpan data: ${error.response.data.message}`);
            } else if (error.request) {
                // Tangani kesalahan saat tidak ada respons dari server
                throw new Error("Tidak ada respons dari server. Silakan coba lagi.");
            } else {
                // Kesalahan lainnya
                throw new Error("Terjadi kesalahan saat mengirim permintaan. Silakan coba lagi.");
            }
        }
    }


    //calculate expense
    const addExpense = async (income) => {
        const response = await axios.post(`${BASE_URL}add-expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expense`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const putExpense = async (id, editedData) => {
        try {
            const res = await axios.put(`${BASE_URL}put-expense/${id}`, editedData);
            return res.data; // Jika perlu, Anda dapat mengembalikan data yang diterima dari backend
        } catch (error) {
            if (error.response) {
                // Tangani kesalahan dari respons server (misalnya: respons dengan kode status selain 2xx)
                throw new Error(`Gagal menyimpan data: ${error.response.data.message}`);
            } else if (error.request) {
                // Tangani kesalahan saat tidak ada respons dari server
                throw new Error("Tidak ada respons dari server. Silakan coba lagi.");
            } else {
                // Kesalahan lainnya
                throw new Error("Terjadi kesalahan saat mengirim permintaan. Silakan coba lagi.");
            }
        }
    }

  

    const totalIncome = () => {
        let total = 0;
        incomes.forEach((income) => {
            total += income.amount;
        });
        return total;
    };

    const totalExpenses = () => {
        let total = 0;
        expenses.forEach((expense) => {
            total += expense.amount;
        });
        return total;
    };

    const totalBalance = () => {
        const balance = totalIncome() - totalExpenses();
        return numeral(balance).format('0,0');
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    // input anggota
    const getInput = async () => {
        const response = await axios.get(`${BASE_URL}get-input`)
        setInput(response.data)
        console.log(response.data)
    }
    const addInput = async (input) => {
        const response = await axios.post(`${BASE_URL}add-input`, input)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getInput()
    }

    const deleteInput = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-input/${id}`)
        getInput()
    }

    const putInput = async (id, editedData) => {
        try {
            const res = await axios.put(`${BASE_URL}put-input/${id}`, editedData);
            return res.data; // Jika perlu, Anda dapat mengembalikan data yang diterima dari backend
        } catch (error) {
            throw new Error(error.message); // Melempar error agar dapat ditangkap di tempat pemanggil
        }
    };
    
    

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            putIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            putExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            getInput,
            addInput,
            putInput,
            deleteInput,
            input,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}