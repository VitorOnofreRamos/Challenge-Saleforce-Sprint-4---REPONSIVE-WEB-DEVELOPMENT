'use client'

import axios from 'axios';
import { useState } from 'react';

import Button from '../../Button';
import '../styles.css';

const LoginForms = () => {
    // Estados para os campos de entrada
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Função para lidar com a mudança nos campos
    const handleInputChange = (event: any) => {
        if (event.target.name === 'username') {
          setUsername(event.target.value);
        } else if (event.target.name === 'password') {
          setPassword(event.target.value);
        }
    };

    // Função para enviar os dados do formulário
    const handleSubmit = (event: any) => {
        event.preventDefault(); // Previne o comportamento padrão de recarga da página
        axios.post('http://localhost:8082/login', {
        username: username,
        password: password,
        }).then((response) => {
        console.log('Login realizado com sucesso:', response.data);
        // Redireciona para outra página após o login bem-sucedido
        window.location.href = '/Products';
     }).catch((error) => {
         console.error('Erro ao realizar login:', error);
        });
    };

    return(
        <>
        <div className='flex form'>
            <form className="form-login" onSubmit={handleSubmit}>
                <label htmlFor='username'>Nome do usuário</label>
                <input className="input" type="text" name="username" placeholder="email@email.com" value={username} onChange={handleInputChange}/>
                
                <label htmlFor='password'>Senha</label>
                <input className="input" type="password" name="password" placeholder=" Digite sua senha aqui" value={password} onChange={handleInputChange}/>
                
                <input type="submit" className="login-btn" value="Login" />
            </form>
        </div>
        </>
    );
}

export default LoginForms;
