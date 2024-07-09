import styled from 'styled-components';

// Game
export const LetterContainer = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1em;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(5, 0fr);
  grid-gap: 0px;
  justify-items: center;
  align-items: center;
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
  width: 300px;
`;

export const TimeText = styled.p`
  background: #f5f5fa;
  padding: 3px 6px;
  box-shadow: #ddd inset 1px 1px 0 2px;
  font-size: 16px;
  border: #f5f5fa solid 2px;
  color: #000;
`;