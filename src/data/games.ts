//定義一款遊戲資料長什麼樣子(限制資料結構)
//提供整個 App 使用的假資料
//封面圖片由 Vite import，之後會作為字串路徑傳給 <img src={...}>。
import finalKnightImage from '../assets/final-knight.png'
import cyberDriftImage from '../assets/cyber-drift.png'
import billageGugugagaImage from '../assets/billage-gugugaga.png'
import chubiCrossingImage from '../assets/chubi-crossing.png'
import legendOfDoroImage from '../assets/the-legend-of-doro.png'
import metalPhibiSolidImage from '../assets/metal-phibi-solid.png'
import lastOfPhibiChubiImage from '../assets/the-last-of-phibi-chubi.png'
import ashfallProtocolImage from '../assets/ashfall-protocol.png'
import whisperOfTheTidesImage from '../assets/whisper-of-the-tides.png'

// 定義一筆遊戲資料必須包含哪些欄位。
// Game[] 中的每一筆資料都必須符合這個型別。
export type Game = {
  id: number
  title: string
  genre: string
  price: number
  releaseDate: string
  description: string
  image: string
}

// Game Store 使用的假資料。
// 目前不連接 API 或 Database，先用本地資料模擬遊戲清單。
export const games: Game[] = [
  {
    id: 1,
    title: 'Final Knight',
    genre: 'RPG',
    price: 2980,
    releaseDate: '2026-04-18',
    description: 'A young knight begins a journey across a fallen kingdom.',
    image: finalKnightImage,
  },
  {
    id: 2,
    title: 'Cyber Drift',
    genre: 'Racing',
    price: 1980,
    releaseDate: '2025-11-07',
    description: 'Race through a neon city in high-speed futuristic competitions.',
    image: cyberDriftImage,
  },
  {
  id: 4,
  title: 'Gugugaga BillAge',
  genre: 'Simulation',
  price: 1480,
  releaseDate: '2026-01-30',
  description: 'Build a strange little village and watch its unusual residents create chaos.',
  image: billageGugugagaImage,
},
{
  id: 5,
  title: 'Chubi Crossing',
  genre: 'Simulation',
  price: 1980,
  releaseDate: '2025-09-12',
  description: 'Relax on a peaceful island, meet friendly neighbors, and shape your own daily life.',
  image: chubiCrossingImage,
},
{
  id: 6,
  title: 'The Legend of Doro',
  genre: 'RPG',
  price: 2480,
  releaseDate: '2026-02-20',
  description: 'Explore ancient ruins and uncover the mystery behind a forgotten hero.',
  image: legendOfDoroImage,
},
{
  id: 7,
  title: 'Metal Phibi Solid',
  genre: 'Action',
  price: 3280,
  releaseDate: '2025-12-05',
  description: 'Infiltrate a secret military facility using stealth, gadgets, and tactical combat.',
  image: metalPhibiSolidImage,
},
{
  id: 8,
  title: 'The Last Of Phibi Chubi',
  genre: 'Adventure',
  price: 2980,
  releaseDate: '2026-06-14',
  description: 'Travel across a ruined world where survival depends on trust and difficult choices.',
  image: lastOfPhibiChubiImage,
},
{
  id: 9,
  title: 'Ashfall Protocol',
  genre: 'Action',
  price: 3480,
  releaseDate: '2026-09-05',
  description: 'Lead an elite squad through a collapsing city after a mysterious global disaster.',
  image: ashfallProtocolImage,
},
{
  id: 10,
  title: 'Whisper of the Tides',
  genre: 'Adventure',
  price: 2280,
  releaseDate: '2026-07-11',
  description: 'Follow the call of the sea and explore forgotten islands filled with ancient secrets.',
  image: whisperOfTheTidesImage,
},
]