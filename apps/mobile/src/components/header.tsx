import { StatusBar } from 'expo-status-bar';

import { 
  Header,
  TitleHeader,
  FontSmall
} from './style'

export default function HeaderComp() {
  return (
    <>
    <StatusBar style="auto" />
    <Header>
      <TitleHeader>Hangman</TitleHeader>
      <FontSmall>game</FontSmall>
    </Header>
    </>
  );
}
