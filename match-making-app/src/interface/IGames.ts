export interface IGames {
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