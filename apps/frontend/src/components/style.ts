import styled from 'styled-components';

// HeaderComp
export const Header = styled.div`
  background: #f5f5fa;
  padding: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleHeader = styled.h1`
  color: #25272E;
  font-family: sans-serif;
  text-align: center;
  margin: 0;
  font-weight: bold;
  display: inline;
  font-size: 36px;
`;

export const FontSmall = styled.p`
  color: #e2584d;
  font-size: 12px;
  font-weight: bold;
`;

export const ButtonGreen = styled.button`
  position: relative;
  color: rgba(255,255,255,1);
  font-family: inherit;
  text-decoration: none;
  background-color: #36AA4D;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 4px;
  border: solid 2px #36AA4D;
  -moz-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 9px 0 green ,0 9px 25px rgba(0,0,0,.7);
  margin: 1em auto;
  min-width: 140px;
  max-width: inherit;
  text-align: center;
  cursor: pointer;
  -webkit-transition: all .1s ease;
  -moz-transition: all .1s ease;
  -ms-transition: all .1s ease;
  -o-transition: all .1s ease;
  transition: all .1s ease;

  &:active, &:hover{
    box-shadow: green 1px 1px 0 1px;
  }
`;

export const ButtonRed = styled(ButtonGreen)`
  background-color: #e2584d;
  border-color: #e2584d;
  box-shadow: 0 9px 0 #ab473f ,0 9px 25px rgba(0,0,0,.7);
  
  &:active, &:hover{
    box-shadow: #ab473f 1px 1px 0 1px;
  }
`;

export const CharacterDisplay = styled.button`
  align-items: center;
  align-content: center;
  display: flex;
  justify-content: center;
  border-radius: 2px;
  border: 2px solid #444;
  background-color: #222;
  padding: 10px;
  height: 60px;
  width: 60px;
  margin: 1px;
  /*box-shadow: #000 1px 1px 0 2px;*/
  transition: none;
  cursor: pointer;
  font-family: inherit;

  /*&:hover {
     /*box-shadow: #000 inset 2px 2px 0 3px;
  }*/
`;

export const LetterText = styled.p`
  color: #eee;
  font-size: 24px;
  text-align: center;
`;