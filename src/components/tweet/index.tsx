import { Link } from 'react-router-dom';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import { AiOutlineRetweet } from 'react-icons/ai';
import './tweet.css';

type TweetProps = {
  image: string;
  username: string;
  name: string;
  tweet: string;
  comments: number;
  retweets: number;
  likes: number;
};

function Tweet({
  image,
  username,
  name,
  tweet,
  comments,
  retweets,
  likes,
}: TweetProps) {
  return (
    <div className='tweet-card'>
      <div className='user-img'>
        <img src={image} alt={username} />
      </div>
      <div className='user-info'>
        <span className='info-name'>
          <Link
            to={`/profile/${username}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            {name}
          </Link>
        </span>
        <span>
          <Link to={`/profile/${username}`}>{`@${username}`}</Link>
        </span>
        <p>{tweet}</p>
        <div className='interaction-container'>
          <FaRegComment />
          <span>{comments}</span>
          <AiOutlineRetweet />
          <span>{retweets}</span>
          <FaRegHeart />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
