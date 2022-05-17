import React from 'react';
import Icon from "./shared/Icon";


function Post({ 
  profileUrl,
  profileName,
  postUrl,
  profileLikedUrl,
  profileLikedName,
  qtdLikes,
  liked,
  type,
}) {



  const [like, setLike] = React.useState(liked);
  
  function likePost (event) {
   
    if (!like && event.detail === 2) {
      setLike(true);
    }
    
  }

  return (
    <div className="post">
      <div className="post-title">
        <div className="post-profile">
          <img
            className="profile"
            src={profileUrl}
          />
          <h4>{profileName}</h4>
        </div>
        <Icon icon="ellipsis-horizontal-outline" />
      
      </div>
      <div className="post-media">

        {
          type === 'image' ? (<img
            src={postUrl}
            alt="naruto"
            onClick={likePost}
          />) : (<video controls>
            <source src={postUrl} type="video/mp4"/>
          </video>)
        }

      </div>
      <div className="post-actions">
        <div className="left-actions">
          
        <ion-icon name='heart-outline' color={like ? 'primary' : 'danger'} onClick={() => setLike(!like)}></ion-icon>

          <ion-icon name="chatbubble-outline"></ion-icon>
          <ion-icon name="paper-plane-outline"></ion-icon>
        </div>
        <div className="save-actions">
          <ion-icon name="paper-plane-outline"></ion-icon>
        </div>
      </div>
      <div className="post-liked">
        <img
          className="profile"
          src={profileLikedUrl}
          alt=""
        />
        <span>
          Curtido por <strong>{profileLikedName}</strong> e{' '}
          <strong>outras {qtdLikes} pessoas</strong>
        </span>
      </div>
    </div>
  );
}

const posts = [
  {
    profileUrl: "https://i.pinimg.com/originals/1e/c4/62/1ec4624b6606c8c358e41c85ccdd20a9.jpg",
    profileName: "Narutin",
    postUrl: "./images/sasuke.jpeg",
    profileLikedUrl: "https://i.pinimg.com/originals/1e/c4/62/1ec4624b6606c8c358e41c85ccdd20a9.jpg",
    profileLikedName: 'Driven',
    qtdLikes: 100,
    type: 'image',
    liked: true,
  },
  {
    profileUrl: "https://i.pinimg.com/originals/1e/c4/62/1ec4624b6606c8c358e41c85ccdd20a9.jpg",
    profileName: "Narutin",
    postUrl: "./images/video.mp4",
    profileLikedUrl: "https://i.pinimg.com/originals/1e/c4/62/1ec4624b6606c8c358e41c85ccdd20a9.jpg",
    profileLikedName: 'Driven',
    qtdLikes: 100,
    type: 'video',
    liked: false,
  },
  {
    profileUrl: "https://i.pinimg.com/originals/1e/c4/62/1ec4624b6606c8c358e41c85ccdd20a9.jpg",
    profileName: "Narutin",
    postUrl: "https://kanto.legiaodosherois.com.br/w760-h398-cfill/wp-content/uploads/2022/02/legiao_cAB5VJkQYOFz.jpg.jpeg",
    profileLikedUrl: "https://i.pinimg.com/originals/1e/c4/62/1ec4624b6606c8c358e41c85ccdd20a9.jpg",
    profileLikedName: 'Narutin',
    qtdLikes: 10,
    type: 'image',
    liked: true,
  },
  {
    profileUrl: "https://i.pinimg.com/originals/1e/c4/62/1ec4624b6606c8c358e41c85ccdd20a9.jpg",
    profileName: "Narutin",
    postUrl: "https://kanto.legiaodosherois.com.br/w760-h398-cfill/wp-content/uploads/2022/02/legiao_cAB5VJkQYOFz.jpg.jpeg",
    profileLikedUrl: "https://i.pinimg.com/originals/1e/c4/62/1ec4624b6606c8c358e41c85ccdd20a9.jpg",
    profileLikedName: 'Sasuke',
    qtdLikes: 2,
    type: 'image',
    liked: true,
  }
]


export default function Feed() {

  return (
    <div className="feed" >
      { posts.map((post, index) => <Post
        key={index}
        profileUrl={post.profileUrl}
        profileName={post.profileName}
        postUrl={post.postUrl}
        profileLikedUrl={post.profileLikedUrl}
        profileLikedName={post.profileLikedName}
        qtdLikes={post.qtdLikes}
        type={post.type}
        liked={post.liked}
        />)
      }
       
    </div>
  );
}
