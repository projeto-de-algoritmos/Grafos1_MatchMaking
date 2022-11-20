import { IGames } from "../interface/IGames";

export const BrawlStars:IGames = {
	name: "Brawl Stars",
	data: {
		maxPlayers: 3,
		playerNameMaxLength: 16
	},
	extraFields: {
		ranking: {
			data: ['Bronze', 'Prata', 'Ouro', 'Diamante', 'Mítica', 'Lendária', 'Mestre'],
			equal: true
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
			data: ['Left', 'Mid', 'Right'],
			equal: false
		}
	}
};