import { games } from "./Games";

interface IObjectKeys {
  [key: string]: Node[];
}

class Node {
  name: string | null;
  adjacents: string[];
  nodeType: string;

  constructor(name: string | null, adjacents: string[], nodeType: string) {
    this.name = name;
    this.adjacents = adjacents;
    this.nodeType = nodeType;
  };
}

const graph: IObjectKeys = {};

function startGraph() {
  // Inicializa todos os jogos com entradas extras
  games.forEach((game) => {
    graph[game.name.replaceAll(' ', '')] = [];
    Object.getOwnPropertyNames(game.extraFields).forEach((extraField) => {
      game.extraFields[extraField].forEach((value) => {
        insertGraph(game.name.replaceAll(' ', ''), null, [value], extraField);
      })
    });
  });
};

function insertGraph(game: string, playerName: string | null, playerData: string[], nodeType: string) {
  let newPlayer = new Node(playerName, playerData, nodeType);
  graph[game].push(newPlayer);
};

function search(game: string, data: string[], playerName: string) {
  return graph[game]?.filter((u) => {
    let found = true;
    if (u.nodeType === "player" && u.name !== playerName) {
      for (let i = 0; (i < u.adjacents.length && found); i++) {
        found = data.includes(u.adjacents[i])
      };
      return found;
    };
    return false;
  });
}

startGraph();

export { insertGraph, search }