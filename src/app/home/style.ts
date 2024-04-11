import styled from 'styled-components';

export const Theme = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 275px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.p`
  color: #fff;
  font-size: 18px;
  margin: 20px 0;
`;

export const Input = styled.input`
  border-radius: 5px;
  border: solid 2px #444;
  color: #777;
  padding: 5px 10px;
  height: 40px;
  width: 140px;
  margin-bottom: 5px;
  background-color: #262632;
`;

export const Main = styled.div`
  background-color: #262632;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const GuideText = styled.p`
  color: #eee;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 2px 10px;
`;

export const OnlineRoomDiv = styled.div`
  justify-content: space-around;
  flex-direction: row;
  display: flex;
  width: 50%;

  /* Media query para telas pequenas */
  @media (max-width: 768px) {
    width: 100%; /* Ou qualquer outra largura desejada para telas pequenas */
  }
`;

export const RoomDiv = styled.div`
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-direction: column;
  display: flex;
`;

