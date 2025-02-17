import React, { useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/icons';

function InputForm() {
    const {addInput, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        name: '',
        address: '',
        phone: '',
        category: '',
        expense: '',
        incom:'',
    })

    const { name, address, phone, category, expense, incom} = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        setInputState({
            name: '',
            address: '',
            phone: '',
            category: '',
            expense: '',
            incom:'',
        })
        addInput(inputState)
        console.log(inputState)
    }

    return (
        <InputFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input 
                    type="text" 
                    value={name}
                    name={'name'} 
                    placeholder="Masukan Nama"
                    onChange={handleInput('name')}
                />
            </div>
            <div className="input-control">
                <input value={address}  
                    type="text" 
                    name={'address'} 
                    placeholder={'Alamat'}
                    onChange={handleInput('address')} 
                />
            </div>
            <div className="input-control">
                <input value={phone}  
                    type="number" 
                    name={'phone'} 
                    placeholder={'No. Telepon'}
                    onChange={handleInput('phone')} 
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Status Anggota</option>
                    <option value="aktif">Aktif</option>
                    <option value="non">Non Aktif</option>
                    <option value="other">Lainnya</option>  
                </select>
            </div>
            <div className="input-control">
            <input 
                value={expense.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} 
                type="text" 
                name="expense" 
                placeholder='Catatan Pinjam' 
                id="expense" 
                onChange={handleInput('expense')} 
                />
            </div>
            <div className="input-control">
                <input 
                    value={incom.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })} 
                    type="text" 
                    name="incom" 
                    placeholder='Catatan Simpan' 
                    id="incom" 
                    onChange={handleInput('incom')} 
                />
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Tambah Data'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </InputFormStyled>
    )
}


const InputFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;
export default InputForm