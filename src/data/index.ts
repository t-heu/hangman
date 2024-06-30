import animals from './animals.json';
import car_brands from './car_brands.json';
import color from './color.json';
import science_tech from './science_tech.json';
import food from './food.json';
import fruits from './fruits.json';
import parts_human_body from './parts_human_body.json';
import super_heroes from './super_heroes.json';
import random from './random.json';
// import test from './test.json';

interface IWord {
  name: string;
  dica: string;
}

interface IThemeData {
  name: string;
  words: IWord[];
}

interface ITheme {
  [key: string]: () => IThemeData;
}

const themes_prede: ITheme = {
  0: () => random,
  1: () => animals,
  2: () => food,
  3: () => fruits,
  4: () => color,
  5: () => super_heroes,
  6: () => science_tech,
  7: () => car_brands,
  8: () => parts_human_body,
  // 9: () => test
}

const ia = [
  {
    "name": "Aleatório",
    "words": [
      {
        "name": "ESPETACULAR",
        "dica": "Impressionante, magnífico."
      },
      {
        "name": "DESCONHECIDO",
        "dica": "Que não se conhece; ignorado."
      },
      {
        "name": "REFLEXÃO",
        "dica": "Ato de refletir; análise cuidadosa."
      },
      {
        "name": "ABACATE",
        "dica": "Fruta verde, comestível, rica em gordura."
      },
      {
        "name": "JARDIM",
        "dica": "Espaço de terreno onde se cultivam plantas."
      },
      {
        "name": "TELEFONE",
        "dica": "Aparelho usado para comunicação por voz a distância."
      },
      {
        "name": "VIAGEM",
        "dica": "Deslocação, geralmente de longa distância."
      },
      {
        "name": "SONHO",
        "dica": "Sequência de imagens e pensamentos durante o sono."
      },
      {
        "name": "RIQUEZA",
        "dica": "Grande quantidade de bens materiais; fortuna."
      },
      {
        "name": "CONHECIMENTO",
        "dica": "Conjunto de informações e habilidades adquiridas."
      }
    ]
  },
  {
    "name": "Frutas",
    "words": [
      {
        "name": "ABACAXI",
        "dica": "Fruta tropical de sabor ácido e refrescante"
      },
      {
        "name": "BANANA",
        "dica": "Fruta amarela, alongada e de sabor adocicado"
      },
      {
        "name": "CEREJA",
        "dica": "Fruta pequena, vermelha e doce, geralmente utilizada em sobremesas"
      },
      {
        "name": "MORANGO",
        "dica": "Fruta vermelha, suculenta e saborosa, com sementes na superfície"
      },
      {
        "name": "UVA",
        "dica": "Fruta arredondada, geralmente roxa ou verde, utilizada para fazer sucos e vinhos"
      },
      {
        "name": "LARANJA",
        "dica": "Fruta cítrica rica em vitamina C"
      },
      {
        "name": "MAÇÃ",
        "dica": "Fruta geralmente vermelha, verde ou amarela, com casca fina e polpa suculenta"
      },
      {
        "name": "MANGA",
        "dica": "Fruta tropical de sabor doce e aroma intenso"
      },
      {
        "name": "MELANCIA",
        "dica": "Fruta grande, redonda, com casca verde e polpa vermelha e suculenta"
      },
      {
        "name": "ABACATE",
        "dica": "Fruta verde, comestível, rica em gordura."
      }
    ]
  },
  {
    "name": "Animais",
    "words": [
      {
        "name": "LEÃO",
        "dica": "Grande felino conhecido por sua juba"
      },
      {
        "name": "ELEFANTE",
        "dica": "Maior mamífero terrestre, caracterizado por sua tromba"
      },
      {
        "name": "GIRAFA",
        "dica": "Animal de pescoço comprido, encontrado na África"
      },
      {
        "name": "CACHORRO",
        "dica": "Animal doméstico conhecido por sua lealdade"
      },
      {
        "name": "GATO",
        "dica": "Animal doméstico de estimação, conhecido por sua independência"
      },
      {
        "name": "TIGRE",
        "dica": "Grande felino com listras pretas e laranja"
      },
      {
        "name": "URSO",
        "dica": "Animal grande e peludo, encontrado em diversas partes do mundo"
      },
      {
        "name": "MACACO",
        "dica": "Animal ágil e inteligente, que vive em árvores"
      },
      {
        "name": "COELHO",
        "dica": "Pequeno mamífero com orelhas longas e patas traseiras fortes"
      },
      {
        "name": "CAVALO",
        "dica": "Animal usado para montaria e transporte"
      }
    ]
  },
  {
    "name": "Profissões",
    "words": [
      {
        "name": "ENGENHEIRO",
        "dica": "Profissional que projeta e constrói estruturas"
      },
      {
        "name": "MÉDICO",
        "dica": "Profissional que diagnostica e trata doenças"
      },
      {
        "name": "PROFESSOR",
        "dica": "Profissional que ensina e educa"
      },
      {
        "name": "ADVOGADO",
        "dica": "Profissional que defende os interesses de seus clientes em tribunais"
      },
      {
        "name": "POLICIAL",
        "dica": "Profissional responsável pela segurança pública"
      },
      {
        "name": "BOMBEIRO",
        "dica": "Profissional que combate incêndios e realiza resgates"
      },
      {
        "name": "MÚSICO",
        "dica": "Profissional que toca instrumentos musicais"
      },
      {
        "name": "ESCRITOR",
        "dica": "Profissional que escreve livros, artigos, etc."
      },
      {
        "name": "ARTISTA",
        "dica": "Profissional que cria obras de arte"
      },
      {
        "name": "PROGRAMADOR",
        "dica": "Profissional que cria softwares"
      }
    ]
  },
  {
    "name": "Cores",
    "words": [
      {
        "name": "AZUL",
        "dica": "Cor do céu"
      },
      {
        "name": "VERMELHO",
        "dica": "Cor do sangue"
      },
      {
        "name": "AMARELO",
        "dica": "Cor do sol"
      },
      {
        "name": "VERDE",
        "dica": "Cor da grama"
      },
      {
        "name": "LARANJA",
        "dica": "Cor da fruta laranja"
      },
      {
        "name": "ROXO",
        "dica": "Cor da uva"
      },
      {
        "name": "ROSA",
        "dica": "Cor da flor rosa"
      },
      {
        "name": "MARROM",
        "dica": "Cor da terra"
      },
      {
        "name": "CINZA",
        "dica": "Cor do concreto"
      },
      {
        "name": "PRETO",
        "dica": "Cor da noite"
      }
    ]
  }
]

const convertThemeDataToIThemeModel = (data: IThemeData): IThemeData => {
  return {
    ...data
  };
};

const iaThemes: ITheme = ia.reduce((acc, curr, index) => {
  acc[index.toString()] = () => convertThemeDataToIThemeModel(curr);
  return acc;
}, {} as ITheme);

const sources = [themes_prede, iaThemes];
const themes: ITheme = { ...sources[Math.floor(Math.random() * sources.length)] }
 
export const getthemes = () => {
  const allThemes = Object.keys(themes).map(locale => ({
    [locale]: themes[locale]()
  }));
  return { themes: allThemes };
};
