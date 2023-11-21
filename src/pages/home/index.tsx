import "./home.css";
import Tweet from "../../components/tweet";
import { useEffect, useState } from "react";
import { TweetType } from "../../utils/types";

function Home() {
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true);
      const response = await fetch(
        "https://tweets-api-olive.vercel.app/api/tweets"
      );
      const data = await response.json();
      setTweets(data);
      setLoading(false);
    };
    fetchTweets();
  }, []);
  return (
    <div className="home-page">
      {loading && <p>Loading...</p>}
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          comments={tweet.commentsCount}
          image={tweet.owner.profilePicture}
          likes={tweet.likesCount}
          name={tweet.owner.name}
          retweets={tweet.retweetsCount}
          tweet={tweet.tweet}
          username={tweet.owner.username}
        />
      ))}
    </div>
  );
}

export default Home;
