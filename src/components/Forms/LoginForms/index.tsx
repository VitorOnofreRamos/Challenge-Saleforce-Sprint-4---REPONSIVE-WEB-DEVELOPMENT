'use client'

import axios from 'axios';
import { useState } from 'react';

import '../styles.css';

const LoginForms = () => {
    // Estados para os campos de entrada
    const [usuario, setUsername] = useState('');
    const [senha, setPassword] = useState('');

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
            usuario: usuario,
            senha: senha,
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
                <label htmlFor='usuario'>Nome do usuário</label>
                <input className="input" type="text" name="usuario" placeholder=" email@email.com" value={usuario} onChange={handleInputChange}/>
                
                <label htmlFor='password'>Senha</label>
                <input className="input" type="password" name="password" placeholder=" Digite sua senha aqui" value={senha} onChange={handleInputChange}/>
                
                <input type="submit" className="login-btn" value="Login"/>
            </form>
        </div>
        </>
    );
}

export default LoginForms;
