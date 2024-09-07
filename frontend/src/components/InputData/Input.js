import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layout';
import InputForm from './InputForm';
import InputItem from './inputItem';


function Input(){
    const {input, getInput, putInput, deleteInput} = useGlobalContext()

    useEffect(() => {
        getInput()
    },[])
    const handleDelete = (id) => {
        deleteInput(id);
    };

    const handleEdit = (id, newData) => {
        putInput(id, newData);
    };
    return (
        <InputStyled>
            <InnerLayout>
                <h2 className="total-income">DaftarAnggota</h2>
                <div className='income-content'>
                    <div className='form-content'>
                        <InputForm />
                    </div>
                    <div className="incomes">
                        {input.slice(0, 4).map((income) => {
                            const { _id, name, address, expense, type, phone, category, incom } = income;
                            return (
                                <InputItem
                                    key={_id}
                                    id={_id}
                                    name={name}
                                    type={type}
                                    phone={phone}
                                    category={category}
                                    expense={expense}
                                    incom={incom}
                                    address={address}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={handleDelete} // Menggunakan fungsi handleDelete untuk menghapus item
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </InputStyled>
    );
}

const InputStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
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
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 5rem;
        max-width: 93%;
        .incomes{
            flex: 1;
        }
    }
`;

export default Input