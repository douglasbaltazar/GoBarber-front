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
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast();
    const history = useHistory();
    const handleSubmit = useCallback(async (data: SignUpFormData) => {
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

            await api.post('/users', data);

            addToast({
                type: 'success',
                title: 'Cadastro realizado',
                description: `${data.email} // ${data.name}`,
            })

            history.push('/')


        } catch (err) {
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors)
            }
            addToast({
                type: 'error',
                description: 'Ocorreu um erro ao fazer cadastro, cheque as credenciais.',
                title: 'Erro no cadastro',
            });
        }

    }, [addToast, history]);
    
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
            <Link to="/">
                <FiArrowLeft />
                Voltar para Login
            </Link>
            </Content>
        </Container>

    )
}

export default SignUp;