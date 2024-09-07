// Perbaikan pada komponen Income
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";

function Income() {
    const { incomes, getIncomes, deleteIncome, putIncome, totalIncome } = useGlobalContext();
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedData, setEditedData] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    useEffect(() => {
        getIncomes();
    }, []);

    const handleEdit = (id) => {
        const incomeToEdit = incomes.find(income => income._id === id);
        setEditedData(incomeToEdit);
        setEditingItemId(id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value
        });
    };

    const handleSaveEdit = async () => {
        await putIncome(editingItemId, editedData);
        getIncomes(); // Ambil kembali data setelah penyimpanan berhasil dilakukan
        setEditingItemId(null);
    };

    const handleCancelEdit = () => {
        setEditingItemId(null);
    };

    const handleDelete = (id) => {
        deleteIncome(id);
    };

    return (
        <IncomeStyled>
            <InnerLayout>
                <h2 className="total-income">Total Pemasukan: <span>Rp.{totalIncome().toLocaleString('id-ID')}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form onSave={handleSaveEdit} />
                    </div>
                    <div className="incomes">
                        <table>
                            <thead>
                                <tr>
                                    <th>Keterangan</th>
                                    <th>Nominal</th>
                                    <th>Tanggal</th>
                                    <th>Kategori</th>
                                    <th>Keterangan Tambahan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incomes.map((income) => {
                                    const { _id, title, amount, date, category, description } = income;
                                    return (
                                        <tr key={_id}>
                                            <td>{editingItemId === _id ? <input type="text" name="title" value={editedData.title} onChange={handleInputChange} /> : title}</td>
                                            <td>{editingItemId === _id ? <input type="number" name="amount" value={editedData.amount} onChange={handleInputChange} /> : amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                            <td>{editingItemId === _id ? <input type="date" name="date" value={editedData.date.slice(0, 10)} onChange={handleInputChange} /> : new Date(date).toISOString().slice(0, 10)}</td>
                                            <td>{editingItemId === _id ? <input type="text" name="category" value={editedData.category} onChange={handleInputChange} /> : category}</td>
                                            <td>{editingItemId === _id ? <input type="text" name="description" value={editedData.description} onChange={handleInputChange} /> : description}</td>
                                            <td>
                                                {editingItemId === _id ? (
                                                    <div className="edit-delete-buttons">
                                                        <button className="edit" onClick={handleSaveEdit}>Save</button>
                                                        <button className="edit" onClick={handleCancelEdit}>Cancel</button>
                                                    </div>
                                                ) : (
                                                    <div className="edit-delete-buttons">
                                                        <button className="delete" onClick={() => handleDelete(_id)}>Delete</button>
                                                        <button className="edit" onClick={() => handleEdit(_id)}>Edit</button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .edit-delete-buttons {
        display: flex;
        gap: 5px;
    }
    
    .edit-delete-buttons button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .edit-delete-buttons button.edit, button.delete {
        background-color: #4caf50; /* Warna latar belakang untuk tombol edit */
        color: white; /* Warna teks untuk tombol edit */
    }
    
    .edit-delete-buttons button:hover {
        filter: brightness(90%); /* Efek sedikit memudar saat tombol dihover */
    }    
    button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        background-color: #4caf50;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: #45a049;
        
    }
    .incomes {
        flex: 1;
        overflow: auto; /* Menambahkan fungsi scroll jika konten melebihi ukuran kontainer */
        max-height: 400px; /* Menetapkan tinggi maksimum kontainer agar muncul scroll saat melebihi ukuran tertentu */
        table {
            width: 100%;
            border-collapse: collapse;
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        }
    }
    .income-content {
        display: flex;
        gap: 5rem;
        max-width: 93%;
        .incomes {
            flex: 1;
            table {
                width: 100%;
                border-collapse: collapse;
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            }
        }
    }
`;

export default Income;
