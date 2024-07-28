import styled from 'styled-components/native';

export const PlayerInfo = styled.Text`
  color: #eee;
  font-family: sourceCodePro;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 2px 10px;
`;

export const PlayerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10px;
  margin-right: 10px;
  max-width: 150px;
  min-width: 'auto';
`;

export const PlayerName = styled.Text`
  color: #fff;
  font-family: sourceCodePro;
  font-size: 16px;
  width: 120px;
`;

export const InfoCode = styled(PlayerInfo)`
  color: #fff;
  font-family: sourceCodePro;
`;