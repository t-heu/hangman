import styled from 'styled-components';

export const ContainerT = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 14px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #f5f5f0;
  flex-wrap: wrap;

  &:hover input ~ .checkmark {
    background-color: #ccc;
  }
`;

export const InputT = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ .checkmark {
    background-color: #222;
    transition: .8s;
    box-shadow: #000 inset 1px 1px 0 2px;
  }
`;

export const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  ${InputT}:checked ~ & {
    background-color: #222;

    &:after {
      display: block;
    }
  }

  &:after {
    top: 9px;
    left: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
`;


export const Theme = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 260px;
  align-items: center;
  justify-items: center;
  align-content: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;

  @media (max-width: 790px) {
    flex-direction: column;
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

  &:focus {
    border-color: #eee;
  }
`;

export const Main = styled.div`
  background-color: #262632;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const OnlineRoomDiv = styled.div`
  justify-content: space-around;
  flex-direction: row;
  display: flex;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const RoomDiv = styled.div`
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-direction: column;
  display: flex;
`;

