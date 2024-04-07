import styled from 'styled-components';

// Game
export const LetterContainer = styled.div`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin: 1em;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(6, 0fr);
  grid-gap: 0px;
  
`;

export const CharacterDisplay = styled.button`
  border-radius: 2px;
  border: 2px solid #444;
  background-color: #222;
  padding: 10px;
  height: 60px;
  width: 60px;
  margin: 1px;
  box-shadow: #000 1px 1px 0 2px;
  transition: none;
  display: inline;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    box-shadow: #000 inset 2px 2px 0 3px;
  }
`;

export const LetterBoxWrapper = styled.div`
  padding: 10px;
  height: 60px;
  width: 60px;
  border-radius: 2px;
  border: 2px solid #444;
  background-color: #222;
  position: absolute;
  bottom: -2px;
  left: 0;
`;

export const LetterText = styled.p`
  color: #eee;
  font-size: 24px;
  text-align: center;
`;

export const InfoHeader = styled.div`
  justify-content: space-around;
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
  display: flex;
`;

export const GuideText = styled.p`
  color: #eee;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 2px 10px;
`;
