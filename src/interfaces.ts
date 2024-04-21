"use client";
import { Dispatch, SetStateAction } from 'react';

interface LanguageDictionaries {
  home: {
    waiting_title: string;
    play_with_friends_title: string;
    or_title: string;
    exit_button: string;
    play_again_button: string;
    create_room_button: string;
    your_name_input: string;
    code_input: string;
    copied_alert: string;
    invalid_copied_alert: string;
    game_started_error_alert: string;
    invalid_code_error_alert: string;
    try_again_error_alert: string;
  }
  lobby: {
    waiting_title: string;
    exit_button: string;
    errors_text: string;
    word_text: string;
    copied_alert: string;
  }
  game: {
    errors_text: string;
    word_text: string;
    waiting_to_play_text_part_1: string;
    waiting_to_play_text_part_2: string;
    letter_already_used_text: string;
    tip_text: string;
    exit_button: string;
    play_again_button: string;
    winner_text: string;
    game_over_text: string;
    winner_solo_text: string;
    game_over_solo_text: string;
    game_status_text: string;
  }
}

export interface IHome {
  lang: LanguageDictionaries['home'];
  changeComponent: (component: string) => void;
  code: Dispatch<SetStateAction<string>>;
  currentPlayerUID: Dispatch<SetStateAction<string>>;
  indexTheme: Dispatch<SetStateAction<number>>;
}

export interface IGame {
  lang: LanguageDictionaries['game'];
  changeComponent: (component: string) => void;
  code: string;
  currentPlayerUID: string;
  indexTheme: number;
}

export interface ILobby {
  lang: LanguageDictionaries['lobby'];
  changeComponent: (component: string) => void;
  code: string;
  currentPlayerUID: string;
}
