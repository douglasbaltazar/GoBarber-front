import React from 'react';
import { Container } from './styles';
import { ToastMessage } from '../../context/ToastContext'
import Toast from './Toast';
import { useTransition } from 'react-spring'

interface ToastContainerProps {
    messages: ToastMessage[];
}
// ESSE FUNCIONA
// const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
//     return (
//         <Container>
//             {messages.map((message) => (
//                 <Toast key={message.id} message={message} style={{}}/>
//             ))}
//         </Container>
//     );
// };


// ESSE NAO
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const messagesWithTransitions = useTransition(
      messages,
      {
        key: messages,
        from: { right: '-120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '-120%', opacity: 0 },
      },
    );
  
    return (
      <Container>
        {messagesWithTransitions((props, item) => (
          <Toast key={item.id} message={item} style={props} />
        ))}
      </Container>
    );
  };

export default ToastContainer;