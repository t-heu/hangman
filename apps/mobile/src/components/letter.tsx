import {
  CharacterDisplay,
  LetterText
} from './style';

export default function Letter({ item, index, handleSelectLetter }: any) {
  return (
    <CharacterDisplay
      key={index}
      style={{shadowOffset: { width: 0, height: 2 }, shadowColor: '#000', shadowOpacity: 0.5}}
      onPress={() => handleSelectLetter(item)}>
      <LetterText>{item}</LetterText>
    </CharacterDisplay>
  )
}
