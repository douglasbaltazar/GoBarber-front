import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Container, Content, Background } from './styles';
import { Form } from '@unform/web'
import * as Yup from 'yup'

import Input from '../../components/input'
import Button from '../../components/button'

import logoImg from '../../assets/logo.svg'
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext';

import { Link } from 'react-router-dom';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { user, signIn } = useAuth() 
    const { addToast } = useToast();
    console.log(user)
    const handleSubmit = useCallback(async (data: SignInFormData) => {
        formRef.current?.setErrors({});
        console.log(data);
        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email valido'),
                password: Yup.string().required('Senha obrigatória'),
            })
            await schema.validate(data, {
                abortEarly: false,
            });
            await signIn({
                email: data.email,
                password: data.password,
            });
        } catch(err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors)
            }
            addToast({
                type: 'error',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
                title: 'Erro na autenticação',
            });
        }

    }, [signIn, addToast]);

    
    return (
    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>
                <Input icon={FiMail} name="email" placeholder="E-mail" />
                <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
                <Button type="submit">Entrar</Button>
                <a href="forgot">Esqueci minha senha</a>
            </Form>
            <Link to="/signup">
                <FiLogIn />
                Criar conta
            </Link>
        </Content>
        <Background />
    </Container>
    )
}

export default SignIn;