import {ButtonText, ButtonWrapper, Button} from './style'

interface PropsButton {
  text: string;
  press?: any;
}

export default function ButtonComp({text, press}: PropsButton) {
  return (
    <Button style={text != 'SAIR' ?  null : {backgroundColor: '#ab473f', borderColor: '#ab473f'}} onPress={() => press()}>
      <ButtonWrapper style={text != 'SAIR' ?  null : {backgroundColor: "#e2584d", borderColor: '#e2584d'}}>
        <ButtonText>{text}</ButtonText>
      </ButtonWrapper>
    </Button>
  )
}
