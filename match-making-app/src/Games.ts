interface IGames {
  name: string;
  data: {
    maxPlayers: number,
    playerNameMaxLength?: number,
    playerNameMinLength?: number
  },
  extraFields: {
    [key: string]: string[];
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
      ranking: ['Ferro', 'Bronze', 'Prata', 'Ouro', 'Platina', 'Diamante', 'Mestre', 'Grão Mestre', 'Desafiante'],
      regiao: ['Japanese', 'Korean', 'Chinese', 'Taiwanese', 'Spanish', 'French', 'German', 'Italian', 'Polish', 'Romanian', 'Greek', 'Portuguese', 'Hungarian', 'Russian', 'Turkish'],
      posicao: ['Top', 'Jg', 'Mid', 'Adc', 'Support']
    }
  },
  {
    name: "Brawl Stars",
    data: {
      maxPlayers: 3,
    },
    extraFields: {
      ranking: ['Bronze', 'Prata', 'Ouro', 'Diamante', 'Ametista', 'Esmeralda', 'Rubi', 'Obsidiano']
    }
  }
];