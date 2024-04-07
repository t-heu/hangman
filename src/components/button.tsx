import {Button} from './style'

interface PropsButton {
  text: string;
  press?: any;
}

export default function ButtonComp({text, press}: PropsButton) {
  return (
    <Button style={text != 'SAIR' ?  {} : {backgroundColor: '#e2584d', borderColor: '#e2584d', boxShadow: '0 9px 0 #ab473f ,0 9px 25px rgba(0,0,0,.7)'}} onClick={() => press()}>
      {text}
    </Button>
  )
}
