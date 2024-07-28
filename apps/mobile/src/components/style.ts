import styled from 'styled-components/native';

// HeaderComp
export const Header = styled.Text`
  background-color: #f5f5fa;
  padding: 30px;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: row;
  text-align: center;
`;

export const TitleHeader = styled.Text`
  color: #25272E;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 36px;
  vertical-align: middle;
`;

export const FontSmall = styled.Text`
  color: #e2584d;
  font-size: 12px;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  height: 35px;
  background-color: #008000;
  border-width: 2px;
  margin-top: 16px;
  border-color: #008000;
  border-radius: 5px;
  padding: 6px 4px;
  width: 140px;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const ButtonWrapper = styled.View`
  height: 35px;
  width: 140px;
  border-radius: 5px;
  background-color: #36AA4D;
  position: absolute;
  bottom: 5px;
  left: -2px;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #eee;
  text-transform: uppercase;
  font-family: sourceCodePro;
  font-size: 14px;
  text-align: center;
`;

export const CharacterDisplay = styled.TouchableOpacity`
  border-radius: 2px;
  border: 2px solid #444;
  background-color: #222;
  padding: 10px;
  height: 60px;
  width: 60px;
  margin: 1px;
`;

export const LetterText = styled.Text`
  color: #eee;
  font-family: sourceCodePro;
  font-size: 24px;
  text-align: center;
`;