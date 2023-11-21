export type TweetType = {
  id: number,
  owner: {
    name: string,
    username: string,
    profilePicture: string,
  },
  commentsCount: number,
  tweet: string,
  retweetsCount: number,
  likesCount: number,
};

export type User = {
  id: number,
  name: string,
  username: string,
  profilePicture: string,
  backgroundPicture: string,
  tweetsId: number[],
  following: number,
  followers: number,
  bio: string,
};
