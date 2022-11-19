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

let graph: IObjectKeys = {};

function startGraph() {
  const storageData = getUpdatedGraph();
  if (!storageData) {
    // Inicializa todos os jogos com entradas extras
    games.forEach((game) => {
      const gameName = game.name.replaceAll(' ', '');
      graph[gameName] = [];
      Object.getOwnPropertyNames(game.extraFields).forEach((extraField) => {
        game.extraFields[extraField].data.forEach((value) => {
          let newPlayer = new Node(null, [value], extraField);
          graph[gameName].push(newPlayer);
        });
      });
    });
    window.localStorage.setItem("@Graph", JSON.stringify(graph));
  } else {
    graph = storageData;
  }
};

function insertGraph(game: string, playerName: string, playerData: string[], nodeType: string) {
  const updatedGraph = getUpdatedGraph();
  if (updatedGraph) {
    let newPlayer = new Node(playerName, playerData, nodeType);
    updatedGraph[game].push(newPlayer);
    graph = updatedGraph;
    window.localStorage.setItem("@Graph", JSON.stringify(graph));
    return newPlayer;
  }
  return null;
};

function search(game: string, searchParams: Array<Array<string>>, playerName: string) {
  graph = getUpdatedGraph();
  if (graph) {
    const results = graph[game]?.filter((u: any) => {
      let found = true;
      if (u.nodeType === "player" && u.name !== playerName) {
        for (let i = 0; (i < u.adjacents.length && found); i++) {
          if (searchParams[i].constructor === String) {
            found = searchParams[i] === u.adjacents[i]
          } else {
            found = searchParams[i].includes(u.adjacents[i])
            if (found) {
              searchParams[i].splice(searchParams[i].indexOf(u.adjacents[i]), 1);
            }
          }
        };
        return found;
      };
      return false;
    });
    return results;
  }
  return [];
};

function getUpdatedGraph() {
  const storageData = window.localStorage.getItem("@Graph");
  if (storageData) return JSON.parse(storageData);
  return null;
}

startGraph();

export { insertGraph, search }