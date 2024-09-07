import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import { useGlobalContext } from "../../context/globalContext";
import generatePDF from 'react-to-pdf';

function Laporan() {
    const { incomes, getIncomes, expenses, getExpenses } = useGlobalContext();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Bulan saat ini
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Tahun saat ini
    const targetRef = useRef();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    const groupByMonthAndYear = (data) => {
        return data.reduce((acc, item) => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const key = `${month}-${year}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
    };

    const filteredIncomes = groupByMonthAndYear(incomes);
    const filteredExpenses = groupByMonthAndYear(expenses);

    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [4, 2]
    };

    return (
        <LaporanStyled>
            <InnerLayout>
                <div className="filter-container">
                    <label>Bulan:</label>
                    <select value={selectedMonth} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <label>Tahun:</label>
                    <select value={selectedYear} onChange={handleYearChange}>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <PDFButton onClick={() => generatePDF(targetRef, { filename: 'laporan.pdf', ...options })}>Download PDF</PDFButton>
                </div>
                <div ref={targetRef}>
                    <h2 className="total-income">Laporan Pemasukan</h2>
                    {Object.keys(filteredIncomes).map((key) => {
                        const [month, year] = key.split("-");
                        if (parseInt(month) === selectedMonth && parseInt(year) === selectedYear) {
                            return (
                                <React.Fragment key={key}>
                                    <h3>{`Bulan: ${month}, Tahun: ${year}`}</h3>
                                    <table className="incomes">
                                        <thead>
                                            <tr>
                                                <th>Keterangan</th>
                                                <th>Nominal</th>
                                                <th>Tanggal</th>
                                                <th>Kategori</th>
                                                <th>Keterangan Tambahan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredIncomes[key].map((income) => {
                                                const { _id, title, amount, date, description, category } = income;
                                                return (
                                                    <tr key={_id}>
                                                        <td>{title}</td>
                                                        <td>{amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                                        <td>{new Date(date).toISOString().slice(0, 10)}</td>
                                                        <td>{category}</td>
                                                        <td>{description}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </React.Fragment>
                            );
                        } else {
                            return null;
                        }
                    })}
                    <h2 className="total-income">Laporan Pengeluaran</h2>
                    {Object.keys(filteredExpenses).map((key) => {
                        const [month, year] = key.split("-");
                        if (parseInt(month) === selectedMonth && parseInt(year) === selectedYear) {
                            return (
                                <React.Fragment key={key}>
                                    <h3>{`Bulan: ${month}, Tahun: ${year}`}</h3>
                                    <table className="incomes">
                                        <thead>
                                            <tr>
                                                <th>Keterangan</th>
                                                <th>Nominal</th>
                                                <th>Tanggal</th>
                                                <th>Kategori</th>
                                                <th>Keterangan Tambahan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredExpenses[key].map((expense) => {
                                                const { _id, title, amount, date, description, category } = expense;
                                                return (
                                                    <tr key={_id}>
                                                        <td>{title}</td>
                                                        <td>{amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
                                                        <td>{new Date(date).toISOString().slice(0, 10)}</td>
                                                        <td>{category}</td>
                                                        <td>{description}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </React.Fragment>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </InnerLayout>
        </LaporanStyled>
    );
}

const LaporanStyled = styled.div`
    display: flex;
    overflow: auto;
    .filter-container {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        label {
            margin-right: 0.5rem;
        }
        select {
            padding: 0.5rem;
            border-radius: 5px;
            border: 1px solid #ddd;
            margin-right: 1rem;
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
    }
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
        margin-top: 2em;
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
`;

const PDFButton = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #45a049;
    }
`;

export default Laporan;
