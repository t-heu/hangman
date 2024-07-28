import styled from 'styled-components/native';

export const Input = styled.TextInput`
  border-color: #444;
  border-width: 2px;
  border-radius: 5px;
  color: #777;
  font-family: sourceCodePro;
  padding: 5px 10px;
  height: 40px;
  width: 140px;
  margin-bottom: 5px;
`;

export const OnlineRoomDiv = styled.View`
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

export const RoomDiv = styled.View`
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const ThemeOptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
  margin-right: 10px;
  max-width: 150px;
  min-width: 'auto';
`;

export const ThemeOptionText = styled.Text`
  color: #fff;
  font-family: sourceCodePro;
  font-size: 16px;
  width: 120px;
`;
