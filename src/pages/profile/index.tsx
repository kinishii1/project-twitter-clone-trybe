import './profile.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TweetType, User } from '../../utils/types';
import Tweet from '../../components/tweet';

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [tweets, setTweets] = useState<TweetType[] | []>([]);
  const [loading, setLoading] = useState(true);

  const { username } = useParams();

  const fetchUsers = async () => {
    const response = await fetch('https://tweets-api-olive.vercel.app/api/twitter-users');
    const data = await response.json();
    return data;
  };

  const fetchTweets = async () => {
    const response = await fetch('https://tweets-api-olive.vercel.app/api/tweets');
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await fetchUsers();
      const findUser = usersResponse.find(
        (actualUser: User) => actualUser.username === username,
      );

      if (findUser) {
        const getTweets = await fetchTweets();
        const tweetsIds = findUser.tweetsId;

        let newTweets: TweetType[] = [];

        tweetsIds.forEach((id: number) => {
          const findTweet = getTweets.find(
            (tweet: TweetType) => tweet.id === id,
          );
          newTweets = [...newTweets, findTweet];
        });
        setTweets(newTweets);
        setUser(findUser);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="profile-page">
            <div className="profile-container">
              <img className="cover-profile" src={ user?.backgroundPicture } alt="" />
              <div className="bio-container">
                {/* Adicionar aqui o nome, username e bio */}
                <img className="avatar-profile" src={ user?.profilePicture } alt="" />
                <h2>{user?.name}</h2>
                <span>{user?.username}</span>
                <p>{user?.bio}</p>
              </div>
            </div>
          </div>
          <div>
            {tweets.map((tweet) => (
              <Tweet
                key={ tweet.id }
                comments={ tweet.commentsCount }
                image={ tweet.owner.profilePicture }
                likes={ tweet.likesCount }
                name={ tweet.owner.name }
                retweets={ tweet.retweetsCount }
                tweet={ tweet.tweet }
                username={ tweet.owner.username }
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
