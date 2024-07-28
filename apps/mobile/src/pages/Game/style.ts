import styled from 'styled-components/native';

// Game
export const LetterContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const InfoHeader = styled.View`
  justify-content: space-around;
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
`;

export const GuideText = styled.Text`
  color: #FDE767;
  font-family: sourceCodePro;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 2px 10px;
`;

export const TimeContainer = styled.View`
  border: 3px solid #fff;
  background: #f5f5fa;
  width: 65px;
  height: 32px;
`;

export const TimeText = styled.Text`
  background: #f5f5fa;
  text-align: center;
  padding-top: 2px;
  font-family: sourceCodePro;
  font-size: 14px;
  border: 2.6px solid #ddd;
  color: #000;
`;