interface IGames {
  name: string;
  data: {
    maxPlayers: number,
    playerNameMaxLength?: number,
    playerNameMinLength?: number
  },
  extraFields: {
    [key: string]: {
      data: string[],
      equal: boolean
    };
  }
};

export const games: IGames[] = [
  {
    name: "League of Legends",
    data: {
      maxPlayers: 5,
      playerNameMaxLength: 16,
    },
    extraFields: {
      ranking: {
        data: ['Ferro', 'Bronze', 'Prata', 'Ouro', 'Platina', 'Diamante', 'Mestre', 'Grão Mestre', 'Desafiante'],
        equal: true,
      },
      regiao: {
        data: [
          'Brazil (BR)',
          'Europe Nordic & East (EUNE)',
          'Europe West (EUW)',
          'Latin America North (LAN)',
          'Latin America South (LAS)',
          'North America (NA)',
          'Oceania (OCE)',
          'Russia (RU)',
          'Turkey (TR)',
          'Japan (JP)',
          'Republic of Korea (KR)'
        ],
        equal: true,
      },
      posicao: {
        data: [
          'TOP',
          'JG',
          'MID',
          'ADC',
          'SUPPORT'
        ],
        equal: false
      }
    }
  },
  {
    name: "Brawl Stars",
    data: {
      maxPlayers: 3,
    },
    extraFields: {
      ranking: {
        data: ['Bronze', 'Prata', 'Ouro', 'Diamante', 'Ametista', 'Esmeralda', 'Rubi', 'Obsidiano'],
        equal: true
      }
    }
  }
];