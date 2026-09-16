//GameCard 本身不管理搜尋、收藏清單或 Detail state，它主要負責顯示一款遊戲。
//需要的資料和事件處理函式都由父元件 App 透過 Props 傳進來。

type GameCardProps = {
    title : string
    genre : string
    price : number
    releaseDate: string
    image: string
    // 父元件傳進來的 callback。
    // 點擊時由 App.tsx 決定要顯示哪一款遊戲的 Detail。
    onViewDetails: () => void
    // 目前這款遊戲是否已加入 Wishlist。
    isWishListed: boolean
    // 點擊 Wishlist 按鈕時，通知父元件切換收藏狀態。
    onToggleWishList: () => void
}

function GameCard({title, genre, price, onViewDetails, isWishListed, releaseDate,
                   image, onToggleWishList} : GameCardProps){
    return (
  <div className="game-card">
  <img src={image} alt={`${title} cover`} />

  <div className="game-card-content">
    <p className="game-genre">{genre}</p>
    <h2>{title}</h2>

    <p className="game-release">
      Release: {releaseDate}
    </p>

    <p className="game-price">
      ¥{price.toLocaleString()}
    </p>

    <div className="game-card-actions">
      <button onClick={onViewDetails}>
        View Details
      </button>

      <button // 已收藏時額外加入 active class，讓 CSS 改變按鈕外觀。
        className={isWishListed ? 'wishlist-button active' : 'wishlist-button'}
        onClick={onToggleWishList}
      >
        {isWishListed ? '♥ Wishlisted' : '♡ Wishlist'}
      </button>
    </div>
  </div>
</div>
    )
}

export default GameCard