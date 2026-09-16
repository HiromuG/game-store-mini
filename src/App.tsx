//大部分資料流都在這裡。

import { useState,useEffect } from 'react'
import './App.css'
import GameCard from './components/GameCard'
import { games,type Game } from './data/games'


function App() {
  // 搜尋框目前輸入的文字
  const [searchTerm, setSearchTerm] = useState('')
  
  // 目前選擇的遊戲類型；All 代表不限制 Genre
  const [selectedGenre, setSelectedGenre] = useState('All')
  
  // 目前的排序方式，例如價格升冪、降冪、最新發售等
  const [sortOrder, setSortOrder] = useState('none')
  
  // 目前正在查看詳細資訊的遊戲。
  // null 代表現在沒有開啟任何遊戲的 Detail Modal。
  const [selectedGame,setSelectedGame] = useState<Game | null>(null)

  // 第一次建立 wishlist state 時，先嘗試從 localStorage 讀取收藏資料。
  // localStorage 保存的是字串，因此需要用 JSON.parse() 轉回 number[]。
  const [wishList,setWishList] = useState<number[]>(() => {
    const savedWishList = localStorage.getItem('wishlist')
    return savedWishList ? JSON.parse(savedWishList):[]
  })

  // wishlist 每次改變時，把最新收藏狀態存回 localStorage。
  // JSON.stringify() 會把 number[] 轉成可以儲存的字串。
  useEffect(() => {
    localStorage.setItem('wishlist',JSON.stringify(wishList))
  },[wishList])

  // 收藏／取消收藏。
  // 如果 wishlist 已經包含這個 gameId，就用 filter() 把它移除；
  // 如果還沒有收藏，就把新的 gameId 加進陣列。
  const toggleWishList = (gameId:number) => {
    if(wishList.includes(gameId)){
      setWishList(wishList.filter((id) => id !== gameId))
    }else{
      setWishList([...wishList,gameId])
    }
  }

  // 先依照搜尋文字和 Genre 篩選遊戲。
  // Search 和 Genre 兩個條件都符合時，該遊戲才會被保留下來。
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre

    return matchesSearch && matchesGenre
  })


  // 先複製 filteredGames，避免 sort() 直接修改原本的陣列。
  const sortedGames = [...filteredGames]
  
  // a - b：數字由小到大
  if (sortOrder === 'low'){
    sortedGames.sort((a,b) => a.price - b.price)
  }

  // b - a：數字由大到小
  if (sortOrder === 'high'){
    sortedGames.sort((a,b) => b.price - a.price)
  }

  // 日期先用 getTime() 轉成數字後再比較。
  // b - a：較新的日期排前面。
  if(sortOrder === 'newest'){
    sortedGames.sort((a,b) => new Date(b.releaseDate).getTime()
                            - new Date(a.releaseDate).getTime()
  )}
  // a - b：較舊的日期排前面。
  if(sortOrder === 'oldest'){
    sortedGames.sort((a,b) => new Date(a.releaseDate).getTime()
                            - new Date(b.releaseDate).getTime()
  )}
  
  


  return (
    <main className='app'>

      {/* 頁面標題與目前顯示中的遊戲數量 */}
      <header className="store-header">
        <div>
          <p className="store-label">GAME DISCOVERY</p>
          <h1>Game Store Mini</h1>
          <p className="app-subtitle">
            Discover your next game.
          </p>
        </div>

        <div className="game-count">
          {sortedGames.length} Games
        </div>
      </header>     

      {/* Search / Genre Filter / Sort */}
      <div className='controls'>
        <input 
          type = 'text'
          placeholder = 'Search games...'
          value = {searchTerm}
          onChange = {(event) => setSearchTerm(event.target.value)}
        />

        <select
          value = {selectedGenre}
          onChange = {(event) => setSelectedGenre(event.target.value)}
        >
          <option value = 'All'>All</option>
          <option value = 'RPG'>RPG</option>
          <option value = 'Racing'>Racing</option>
          <option value = 'Adventure'>Adventure</option>
          <option value = "Action">Action</option>
          <option value = "Simulation">Simulation</option>        
        </select>

        <select
          value = {sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="none">Default</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value='newest'>Newest</option>
          <option value='oldest'>Oldest</option>
        </select>
      </div>

      {/* 沒有符合條件的遊戲時顯示提示，否則用 map() 產生 GameCard */}
      <div className = 'game-list'>
        {sortedGames.length === 0 ? (
          <p>No games found.</p>
        ) : (
        sortedGames.map((game)=>(
          <GameCard 
            key = {game.id}
            title = {game.title}
            genre = {game.genre}
            price = {game.price}
            releaseDate = {game.releaseDate}
            image = {game.image}
            onViewDetails = {() => setSelectedGame(game)} 
            isWishListed = {wishList.includes(game.id)}
            onToggleWishList = {() => toggleWishList(game.id)}
          />
        )))}
      </div>

      {/* selectedGame 有值時才顯示 Detail Modal */}
      {selectedGame && (
      <div className="modal-overlay" onClick={() => setSelectedGame(null)}>
        <div className="game-modal"
            // 阻止 Modal 內部的 click 傳到 overlay，避免誤觸關閉
            onClick={(event) => event.stopPropagation()}>
          <img
            src={selectedGame.image}
            alt={`${selectedGame.title} cover`}
          />

          <div className="game-modal-content">
            <p className="game-genre">{selectedGame.genre}</p>

            <h2>{selectedGame.title}</h2>

            <p className="game-release">
              Release: {selectedGame.releaseDate}
            </p>

            <p>{selectedGame.description}</p>

            <p className="game-price">
              ¥{selectedGame.price.toLocaleString()}
            </p>

            <button onClick={() => setSelectedGame(null)}>
              Close
            </button>
          </div>
        </div>
      </div>
)}
    </main>
  )
}

export default App
