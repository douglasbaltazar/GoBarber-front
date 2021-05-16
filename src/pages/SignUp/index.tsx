import React, { useCallback, useRef } from 'react'
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import { Container, Content, Background } from './styles';
import * as Yup from 'yup';

import Input from '../../components/input'
import Button from '../../components/button'
import getValidationErrors from '../../utils/getValidationErrors'
import logoImg from '../../assets/logo.svg'

const SignUp: React.FC = () => {
    const handleSubmit = useCallback(async (data: object) => {
        formRef.current?.setErrors({});
        console.log(data);
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email valido'),
                password: Yup.string().min(6, 'Senha deve conter no minimo 6 digitos'),
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
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu cadastro</h1>
                    <Input icon={FiUser} name="name" placeholder="Nome" />
                    <Input icon={FiMail} name="email" placeholder="E-mail" />
                    <Input icon={FiLock} name="password" type="password" placeholder="Senha" />
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <a href="registrar">
                    <FiArrowLeft />
                Voltar para Login
            </a>
            </Content>
        </Container>

    )
}

export default SignUp;