import styled from 'styled-components';
import { shade } from 'polished'

import signInBackgroundImage from '../../assets/sign-in-background.png'




export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    place-content: center;
    width: 100%;
    max-width: 700px;
    align-items: center;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        h1 {
            margin-bottom: 24px;
        }

        > a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: 0.2s;

            &:hover {
                color: ${shade(0.2, '#f4EDE8')}
            }

        }
    }

    > a {
        color: #FF9000;
        display: flex;
        align-items: center;
        margin-top: 24px;
        text-decoration: none;
        transition: 0.2s; 
        svg {
            margin-right: 16px;
        }
        &:hover {
            color: ${shade(0.2, '#FF9000')}
        }
    }

`;

export const Background = styled.div`
    flex: 1;
    background: url(${signInBackgroundImage}) no-repeat center;
    background-size: cover;
`;