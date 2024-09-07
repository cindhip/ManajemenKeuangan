import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/globalContext";

function DataAnggota() {
    const { input, getInput, putInput, deleteInput } = useGlobalContext();
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [searchName, setSearchName] = useState('');
    const [sortedInput, setSortedInput] = useState([]);

    useEffect(() => {
        // Urutkan array input berdasarkan nama secara alfabetis
        const sorted = [...input].sort((a, b) => (a.name > b.name) ? 1 : -1);
        setSortedInput(sorted);
    }, [input]);


    const handleEdit = (id) => {
        setEditingItemId(id);
        const editedItem = input.find((item) => item._id === id);
        setEditedData(editedItem);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveEdit = () => {
        if (editedData._id && Object.keys(editedData).length > 1) {
            putInput(editedData._id, editedData)
                .then(() => {
                    setEditingItemId(null);
                    getInput();
                })
                .catch((error) => {
                    console.error("Gagal menyimpan data:", error);
                    alert("Gagal menyimpan data. Silakan coba lagi.");
                });
        } else {
            console.error("Data yang diedit tidak lengkap atau tidak valid.");
            alert("Data yang diedit tidak lengkap atau tidak valid.");
        }
    };

    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };

    const filteredInput = input.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <DataAnggotaStyled>
            <InnerLayout>
                <h2 className="total-income">Data Anggota Koperasi</h2>
                <div className="search-container">
                    <input
                        type="text"
                        value={searchName}
                        onChange={handleSearchNameChange}
                        placeholder="Cari nama..."
                    />
                </div>
                <table className="incomes">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>No. Telepon</th>
                            <th>Simpan</th>
                            <th>Pinjam</th>
                            <th>Status Anggota</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInput.map((income) => {
                            const { _id, name, incom, address,phone, expense, category } = income;
                            return (
                                <tr key={_id}>
                                    <td>{editingItemId === _id ? <input type="text" name="name" value={editedData.name} onChange={handleInputChange} /> : name}</td>
                                    <td>{editingItemId === _id ? <input type="text" name="address" value={editedData.address} onChange={handleInputChange} /> : address}</td>
                                    <td>{editingItemId === _id ? <input type="text" name="phone" value={editedData.phone} onChange={handleInputChange} /> : phone}</td>
                                    <td>{editingItemId === _id ? <input type="text" name="incom" value={editedData.incom} onChange={handleInputChange} /> : incom}</td>
                                    <td>{editingItemId === _id ? <input type="text" name="expense" value={editedData.expense} onChange={handleInputChange} /> : expense}</td>
                                    <td>{editingItemId === _id ? <input type="text" name="category" value={editedData.category} onChange={handleInputChange} /> : category}</td>
                                    <td>
                                        {editingItemId === _id ? (
                                            <>
                                                <button onClick={handleSaveEdit}>Save</button>
                                                <button onClick={() => setEditingItemId(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => deleteInput(_id)}>Delete</button>
                                                <button onClick={() => handleEdit(_id)}>Edit</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </InnerLayout>
        </DataAnggotaStyled>
    );
}

const DataAnggotaStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 30px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 2rem;
        span {
            font-size: 2rem;
            font-weight: 500;
            color: var(--color-green);
        }
    }
    .incomes {
        width: 100%;
        border-collapse: collapse;
    }
    .incomes th,
    .incomes td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    .incomes th {
        background-color: #f2f2f2;
    }
    .incomes tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    .incomes tr:hover {
        background-color: #ddd;
    }
    .incomes td button {
        padding: 5px 10px;
        margin-right: 5px;
        cursor: pointer;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 3px;
    }
    .incomes td button:hover {
        background-color: #45a049;
    }
    .search-container input {
        width: 10%;
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #ddd;
        font-size: 1rem;
        gap: 2rem;
    }
    
    .search-container input:focus {
        border-color: #4caf50;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
        outline: none;
    }
    .search-container {
        margin-bottom: 1rem;
    }
    
    .table-container {
        margin-top: 1rem;
    }
`;
export default DataAnggota;
