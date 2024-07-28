"use client";
import React, {useEffect} from 'react';
import {getThemes, useHomeLogic} from 'common';

import Button from '../../components/button'

import { 
  RoomDiv, 
  Input, 
  Main, 
  Title,
  OnlineRoomDiv,
  Theme,
  Container,
  ContainerT,
  Checkmark,
  InputT
} from './style'

export default function Home({lang, code, changeComponent, currentPlayerUID, indexTheme}: any) {
  const navigateLobby = (params: any) => {
    code(params.roomKey);
    currentPlayerUID(params.nextPlayer);
    changeComponent('Lobby');
  };

  const navigateGame = (params: any) => {
    code(params.codeRoom)
    indexTheme(params.checked);
    changeComponent('Game');
  };

  const showAlert = (message: any) => alert(message);

  const {
    checked,
    setChecked,
    name,
    setName,
    codeRoom,
    setCodeRoom,
    themes,
    createGame,
    setThemes,
    play
  } = useHomeLogic({ lang, navigateLobby, navigateGame, showAlert });

  useEffect(() => {
    const fetchThemes = async () => {
      const data = await getThemes();
      setThemes(data.themes);
    };

    fetchThemes();
  }, [setThemes]);

  if (!lang) {
    return null
  }

  const renderThemes = (item: any, index: number) => (
    <ContainerT key={index}>{item[index].name}
      <InputT data-testid={'checked_id_'+index} type="radio" value={index} checked={checked === index} onChange={() => setChecked(index)} />
      <Checkmark className="checkmark" />
    </ContainerT>
  );

  return (
    <Main>
      <Container>
        <Main>
          <Title>{lang.waiting_title}</Title>

          <Theme>
            {themes.length > 0 ? themes.map((data: any, i: number) => renderThemes(data, i)) : <Title>....</Title>}
          </Theme>

          <Button text={lang.exit_button} press={() => createGame(false)} />
        </Main>

        <Main>
          <Title>{lang.play_with_friends_title}</Title>

          <OnlineRoomDiv>
            <RoomDiv>
              <Input data-testid="name_id" value={name} onChange={(e) => setName(e.target.value)} placeholder={lang.your_name_input} />
              <Input data-testid="code_id" value={codeRoom} onChange={(e) => setCodeRoom(e.target.value)} placeholder={lang.code_input} />
              <Button text={lang.play_again_button} press={() => play()} />
              <Title>{lang.or_title}</Title>
              <Button text={lang.create_room_button} press={() => createGame(true)} />
            </RoomDiv>
          </OnlineRoomDiv>
        </Main>
      </Container>
    </Main>
  );
}

