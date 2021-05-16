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

const SignIn: React.FC = () => {
    const handleSubmit = useCallback(async (data: object) => {
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
        } catch(err) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors)
        }

    }, []);
    const formRef = useRef<FormHandles>(null)
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
            <a href="registrar">
                <FiLogIn />
                Criar conta
            </a>
        </Content>
        <Background />
    </Container>
    )
}

export default SignIn;