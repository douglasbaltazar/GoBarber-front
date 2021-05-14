import React from 'react'
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi'
import { Container, Content, Background } from './styles';

import Input from '../../components/input'
import Button from '../../components/button'

import logoImg from '../../assets/logo.svg'

const SignUp: React.FC = () => (
    <Container>
        <Background />
        <Content>
            <img src={logoImg} alt="GoBarber" />
            <form>
                <h1>Faça seu cadastro</h1>
                <Input icon={FiUser} name="user" placeholder="Nome" />
                <Input icon={FiMail} name="email" placeholder="E-mail" />
                <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
                <Button type="submit">Cadastrar</Button>
            </form>
            <a href="registrar">
                <FiArrowLeft />
                Voltar para Login
            </a>
        </Content>
    </Container>
)

export default SignUp;