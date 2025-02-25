export enum NumberTile {
  ONE = '&#x1F007;',
  TWO = '&#x1F008;',
  THREE = '&#x1F009;',
  FOUR = '&#x1F00A;',
  FIVE = '&#x1F00B;',
  SIX = '&#x1F00C;',
  SEVEN = '&#x1F00D;',
  EIGHT = '&#x1F00E;',
  NINE = '&#x1F00F;',
}

export enum BambooTile {
  ONE = '&#x1F010;',
  TWO = '&#x1F011;',
  THREE = '&#x1F012;',
  FOUR = '&#x1F013;',
  FIVE = '&#x1F014;',
  SIX = '&#x1F015;',
  SEVEN = '&#x1F016;',
  EIGHT = '&#x1F017;',
  NINE = '&#x1F018;',
}

export enum CircleTile {
  ONE = '&#x1F019;',
  TWO = '&#x1F01A;',
  THREE = '&#x1F01B;',
  FOUR = '&#x1F01C;',
  FIVE = '&#x1F01D;',
  SIX = '&#x1F01E;',
  SEVEN = '&#x1F01F;',
  EIGHT = '&#x1F020;',
  NINE = '&#x1F021;',
}

export enum HonorTile {
  EAST = '&#x1F000;',
  SOUTH = '&#x1F001;',
  WEST = '&#x1F002;',
  NORTH = '&#x1F003;',
  RED = '&#x1F004;',
  GREEN = '&#x1F005;',
  WHITE = '&#x1F006;',

  // Other
  TILE_BACK = '&#x1F02B;',
}

export type AllTiles = NumberTile | BambooTile | CircleTile | HonorTile;
export const allTiles = [
  ...Object.values(NumberTile),
  ...Object.values(BambooTile),
  ...Object.values(CircleTile),
  ...Object.values(HonorTile),
];

export interface Yaku {
  name: string;
  description?: string;
  example: AllTiles[];

  yakuOpen?: number;
  yakuClose?: number;
}

export const MAX_HAND_TILE = 14;

// Source: https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Falternative-riichi-yakus-cheatsheet-for-beginners-v0-q6rpi02gg0hd1.jpg%3Fwidth%3D3368%26format%3Dpjpg%26auto%3Dwebp%26s%3D8cdcab8b1a4c5b9e1ebc32c18904573e7a51abbd
export enum YakuType {
  RICHI,
  II_PEI_KOU,
  RYAN_PEI_KOU,
  PINFU,
  SAN_SHOKU_DOU_JUN,
  ITTSUU,

  TAN_YAO,
  YAKU_HAI,
  SHOU_SAN_GEN,
  DAI_SAN_GEN,
  SHOU_SUU_SHII,
  DAI_SUU_SHII,
  CHANTA,
  JUN_CHAN,
  HON_ROU_TOU,
  CHIN_ROU_TOU,
  TSUU_IISOU,
  KOKUSHI_MUSOU,

  CHII_TOI_TSU,
  TOI_TOI,
  SAN_ANKOU,
  SUU_ANKOU,
  SAN_SHOKU_DOUKOU,
  SAN_KANTSU,
  SUU_KANTSU,

  HON_ITSU,
  CHIN_ITSU,
  RYUU_IISOU,
  CHUUREN_POUTOU,
}

const YAKUMAN = 9999;

export const YAKU_OTHERS = [YakuType.RICHI];

export const YAKU_SEQUENCE = [
  YakuType.II_PEI_KOU,
  YakuType.RYAN_PEI_KOU,
  YakuType.PINFU,
  YakuType.SAN_SHOKU_DOU_JUN,
  YakuType.ITTSUU,
];

export const YAKU_TERMINAL_HONOR = [
  YakuType.TAN_YAO,
  YakuType.YAKU_HAI,
  YakuType.SHOU_SAN_GEN,
  YakuType.DAI_SAN_GEN,
  YakuType.SHOU_SUU_SHII,
  YakuType.DAI_SUU_SHII,
  YakuType.CHANTA,
  YakuType.JUN_CHAN,
  YakuType.HON_ROU_TOU,
  YakuType.CHIN_ROU_TOU,
  YakuType.TSUU_IISOU,
  YakuType.KOKUSHI_MUSOU,
];

export const YAKU_PAIRS = [
  YakuType.CHII_TOI_TSU,
  YakuType.TOI_TOI,
  YakuType.SAN_ANKOU,
  YakuType.SUU_ANKOU,
  YakuType.SAN_SHOKU_DOUKOU,
  YakuType.SAN_KANTSU,
  YakuType.SUU_KANTSU,
];

export const YAKU_SUITS = [
  YakuType.HON_ITSU,
  YakuType.CHIN_ITSU,
  YakuType.RYUU_IISOU,
  YakuType.CHUUREN_POUTOU,
];

export const YAKUS: Partial<Record<YakuType, Yaku>> = {
  [YakuType.II_PEI_KOU]: {
    name: 'Pure double sequence',
    description: 'Two sequences of the same type',
    example: [
      BambooTile.ONE,
      BambooTile.TWO,
      BambooTile.THREE,
      BambooTile.SEVEN,
      BambooTile.EIGHT,
      BambooTile.NINE,
    ],
    yakuClose: 1,
  },
  [YakuType.RYAN_PEI_KOU]: {
    name: 'Two Pure double sequence',
    description: '2x Two sequences of the same type',
    example: [
      BambooTile.ONE,
      BambooTile.TWO,
      BambooTile.THREE,
      BambooTile.SEVEN,
      BambooTile.EIGHT,
      BambooTile.NINE,
      CircleTile.ONE,
      CircleTile.TWO,
      CircleTile.THREE,
      CircleTile.SEVEN,
      CircleTile.EIGHT,
      CircleTile.NINE,
    ],
    yakuClose: 3,
  },
  [YakuType.PINFU]: {
    name: 'Pinfu',
    description: '4 sequences and a pair',
    example: [
      BambooTile.ONE,
      BambooTile.TWO,
      BambooTile.THREE,
      BambooTile.FOUR,
      BambooTile.FIVE,
      BambooTile.SIX,
      CircleTile.ONE,
      CircleTile.TWO,
      CircleTile.THREE,
      CircleTile.FOUR,
      CircleTile.FIVE,
      CircleTile.SIX,
      CircleTile.SEVEN,
      CircleTile.EIGHT,
      CircleTile.NINE,
      HonorTile.EAST,
      HonorTile.EAST,
    ],
    yakuClose: 1,
  },
  [YakuType.SAN_SHOKU_DOU_JUN]: {
    name: 'Three colored sequences',
    description: 'Three sequences of different types and same numbers',
    example: [
      BambooTile.ONE,
      BambooTile.TWO,
      BambooTile.THREE,
      CircleTile.ONE,
      CircleTile.TWO,
      CircleTile.THREE,
      NumberTile.ONE,
      NumberTile.TWO,
      NumberTile.THREE,
    ],
    yakuOpen: 1,
    yakuClose: 2,
  },
  [YakuType.ITTSUU]: {
    name: 'Pure straight',
    example: [
      BambooTile.ONE,
      BambooTile.TWO,
      BambooTile.THREE,
      BambooTile.FOUR,
      BambooTile.FIVE,
      BambooTile.SIX,
      BambooTile.SEVEN,
      BambooTile.EIGHT,
      BambooTile.NINE,
    ],
    yakuOpen: 1,
    yakuClose: 2,
  },
  [YakuType.TAN_YAO]: {
    name: 'All simples',
    example: [
      BambooTile.TWO,
      BambooTile.THREE,
      BambooTile.FOUR,
      CircleTile.FIVE,
      CircleTile.SIX,
      CircleTile.SEVEN,
      CircleTile.THREE,
      CircleTile.FOUR,
      CircleTile.FIVE,
      NumberTile.SEVEN,
      NumberTile.SEVEN,
    ],
    yakuOpen: 1,
    yakuClose: 1,
  },
  [YakuType.YAKU_HAI]: {
    name: 'Value Triplet',
    example: [HonorTile.GREEN, HonorTile.GREEN, HonorTile.GREEN],
    yakuOpen: 1,
    yakuClose: 1,
  },
  [YakuType.SHOU_SAN_GEN]: {
    name: 'Small Three Dragons',
    example: [
      HonorTile.WHITE,
      HonorTile.WHITE,
      HonorTile.WHITE,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.RED,
      HonorTile.RED,
    ],
    yakuOpen: 2,
    yakuClose: 2,
  },
  [YakuType.DAI_SAN_GEN]: {
    name: 'Big Three Dragons',
    example: [
      HonorTile.WHITE,
      HonorTile.WHITE,
      HonorTile.WHITE,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.RED,
      HonorTile.RED,
      HonorTile.RED,
    ],
    yakuOpen: YAKUMAN,
    yakuClose: YAKUMAN,
  },
  [YakuType.SHOU_SUU_SHII]: {
    name: 'Little Four Wind',
    example: [
      HonorTile.NORTH,
      HonorTile.NORTH,
      HonorTile.NORTH,
      HonorTile.SOUTH,
      HonorTile.SOUTH,
      HonorTile.SOUTH,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.WEST,
      HonorTile.WEST,
    ],
    yakuOpen: YAKUMAN,
    yakuClose: YAKUMAN,
  },
  [YakuType.DAI_SUU_SHII]: {
    name: 'Big Four Wind',
    example: [
      HonorTile.NORTH,
      HonorTile.NORTH,
      HonorTile.NORTH,
      HonorTile.SOUTH,
      HonorTile.SOUTH,
      HonorTile.SOUTH,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.WEST,
      HonorTile.WEST,
      HonorTile.WEST,
    ],
    yakuOpen: YAKUMAN,
    yakuClose: YAKUMAN,
  },
  [YakuType.CHANTA]: {
    name: 'Terminal and Honors Everywhere',
    example: [
      BambooTile.ONE,
      BambooTile.TWO,
      BambooTile.THREE,
      CircleTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.GREEN,
      CircleTile.SEVEN,
      CircleTile.EIGHT,
      CircleTile.NINE,
      NumberTile.NINE,
      NumberTile.NINE,
    ],
    yakuOpen: 1,
    yakuClose: 2,
  },
  [YakuType.JUN_CHAN]: {
    name: 'Terminal Everywhere',
    example: [
      BambooTile.ONE,
      BambooTile.TWO,
      BambooTile.THREE,
      CircleTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      NumberTile.NINE,
      NumberTile.NINE,
      NumberTile.NINE,
      CircleTile.SEVEN,
      CircleTile.EIGHT,
      CircleTile.NINE,
      BambooTile.ONE,
      BambooTile.ONE,
    ],
    yakuOpen: 2,
    yakuClose: 3,
  },
  [YakuType.HON_ROU_TOU]: {
    name: 'All Terminals and Honors',
    example: [
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      CircleTile.NINE,
      CircleTile.NINE,
      CircleTile.NINE,
      CircleTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.EAST,
      HonorTile.EAST,
    ],
    yakuOpen: 2,
    yakuClose: 2,
  },
  [YakuType.CHIN_ROU_TOU]: {
    name: 'All Terminals',
    example: [
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      CircleTile.NINE,
      CircleTile.NINE,
      CircleTile.NINE,
      CircleTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      NumberTile.NINE,
      NumberTile.NINE,
      NumberTile.NINE,
      NumberTile.ONE,
      NumberTile.ONE,
    ],
    yakuOpen: YAKUMAN,
    yakuClose: YAKUMAN,
  },
  [YakuType.TSUU_IISOU]: {
    name: 'All Honors',
    example: [
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.WHITE,
      HonorTile.WHITE,
      HonorTile.WHITE,
      HonorTile.NORTH,
      HonorTile.NORTH,
      HonorTile.NORTH,
      HonorTile.SOUTH,
      HonorTile.SOUTH,
    ],
    yakuOpen: YAKUMAN,
    yakuClose: YAKUMAN,
  },
  [YakuType.KOKUSHI_MUSOU]: {
    name: 'Thirteen Orphans',
    example: [
      BambooTile.ONE,
      BambooTile.NINE,
      CircleTile.ONE,
      CircleTile.NINE,
      NumberTile.ONE,
      NumberTile.NINE,
      HonorTile.EAST,
      HonorTile.SOUTH,
      HonorTile.WEST,
      HonorTile.NORTH,
      HonorTile.RED,
      HonorTile.GREEN,
      HonorTile.WHITE,
      HonorTile.WHITE,
    ],
    yakuClose: YAKUMAN,
  },
  [YakuType.CHII_TOI_TSU]: {
    name: 'Seven Pairs',
    description: 'Double pairs are not allowed',
    example: [
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.TWO,
      BambooTile.TWO,
      CircleTile.THREE,
      CircleTile.THREE,
      NumberTile.FOUR,
      NumberTile.FOUR,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.RED,
      HonorTile.RED,
      HonorTile.GREEN,
      HonorTile.GREEN,
    ],
    yakuClose: 2,
  },
  [YakuType.TOI_TOI]: {
    name: 'All Triplets',
    example: [
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      CircleTile.TWO,
      CircleTile.TWO,
      CircleTile.TWO,
      NumberTile.THREE,
      NumberTile.THREE,
      NumberTile.THREE,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.WHITE,
      HonorTile.WHITE,
    ],
    yakuOpen: 2,
    yakuClose: 2,
  },
  [YakuType.SAN_ANKOU]: {
    name: 'Three Concealed Triplets',
    description: 'Three triplets needs to be concealed',
    example: [
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      CircleTile.TWO,
      CircleTile.TWO,
      CircleTile.TWO,
      NumberTile.THREE,
      NumberTile.THREE,
      NumberTile.THREE,
    ],
    yakuOpen: 2,
    yakuClose: 2,
  },
  [YakuType.SUU_ANKOU]: {
    name: 'Four Concealed Triplets',
    description: 'Four triplets needs to be concealed',
    example: [
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      CircleTile.TWO,
      CircleTile.TWO,
      CircleTile.TWO,
      NumberTile.THREE,
      NumberTile.THREE,
      NumberTile.THREE,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.EAST,
    ],
    yakuClose: YAKUMAN,
  },
  [YakuType.SAN_SHOKU_DOUKOU]: {
    name: 'Three Colored Triplets',
    description: 'Three triplets of the same number but different suits',
    example: [
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      NumberTile.ONE,
      NumberTile.ONE,
      NumberTile.ONE,
    ],
    yakuOpen: 2,
    yakuClose: 2,
  },
  [YakuType.SAN_KANTSU]: {
    name: 'Three Quads',
    example: [
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      NumberTile.ONE,
      NumberTile.ONE,
      NumberTile.ONE,
      NumberTile.ONE,
      HonorTile.EAST,
      HonorTile.EAST,
    ],
    yakuOpen: 2,
    yakuClose: 2,
  },
  [YakuType.SUU_KANTSU]: {
    name: 'Four Quads',
    example: [
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      BambooTile.ONE,
      CircleTile.THREE,
      CircleTile.THREE,
      CircleTile.THREE,
      CircleTile.THREE,
      NumberTile.NINE,
      NumberTile.NINE,
      NumberTile.NINE,
      NumberTile.NINE,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.EAST,
    ],
    yakuOpen: YAKUMAN,
    yakuClose: YAKUMAN,
  },
  [YakuType.HON_ITSU]: {
    name: 'Half Flush',
    description: 'A single suit and honors',
    example: [
      CircleTile.TWO,
      CircleTile.TWO,
      CircleTile.TWO,
      CircleTile.FOUR,
      CircleTile.FIVE,
      CircleTile.SIX,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.EAST,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.GREEN,
      CircleTile.NINE,
      CircleTile.NINE,
    ],
    yakuOpen: 2,
    yakuClose: 3,
  },
  [YakuType.CHIN_ITSU]: {
    name: 'Full Flush',
    description: 'A single suit',
    example: [
      CircleTile.TWO,
      CircleTile.TWO,
      CircleTile.TWO,
      CircleTile.FOUR,
      CircleTile.FIVE,
      CircleTile.SIX,
      CircleTile.SEVEN,
      CircleTile.EIGHT,
      CircleTile.NINE,
      CircleTile.NINE,
      CircleTile.NINE,
      CircleTile.NINE,
      CircleTile.THREE,
      CircleTile.THREE,
    ],
    yakuOpen: 5,
    yakuClose: 6,
  },
  [YakuType.RYUU_IISOU]: {
    name: 'All Green',
    example: [
      BambooTile.TWO,
      BambooTile.TWO,
      BambooTile.TWO,
      BambooTile.FOUR,
      BambooTile.FIVE,
      BambooTile.SIX,
      BambooTile.SEVEN,
      BambooTile.EIGHT,
      BambooTile.NINE,
      HonorTile.GREEN,
      HonorTile.GREEN,
      HonorTile.GREEN,
      BambooTile.THREE,
      BambooTile.THREE,
    ],
    yakuOpen: YAKUMAN,
    yakuClose: YAKUMAN,
  },
  [YakuType.CHUUREN_POUTOU]: {
    name: 'Nine Gates',
    example: [
      CircleTile.ONE,
      CircleTile.ONE,
      CircleTile.ONE,
      CircleTile.TWO,
      CircleTile.THREE,
      CircleTile.FOUR,
      CircleTile.FIVE,
      CircleTile.SIX,
      CircleTile.SEVEN,
      CircleTile.EIGHT,
      CircleTile.NINE,
      CircleTile.NINE,
      CircleTile.NINE,
    ],
    yakuClose: YAKUMAN,
  },
  [YakuType.RICHI]: {
    name: 'Richi',
    example: [
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
      HonorTile.TILE_BACK,
    ],
    yakuClose: 1,
  },
};
