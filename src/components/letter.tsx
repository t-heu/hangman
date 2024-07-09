import { 
  CharacterDisplay,
  LetterText,
} from './style'

export default function Letter({ item, index, handleSelectLetter }: any) {
  return (
    <CharacterDisplay
      key={index}
      onClick={() => handleSelectLetter(item)}>
      <LetterText>{item}</LetterText>
    </CharacterDisplay>
  );
}
