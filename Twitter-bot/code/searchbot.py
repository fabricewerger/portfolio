import tweepy
import time


print('this is my twitter searchbot')


CONSUMER_KEY = ''
CONSUMER_SECRET = ''
ACCESS_KEY = ''
ACCESS_SECRET = ''

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)

# If the authentication was successful, you should
# see the name of the account print out
print(api.me().name)


hastag = "#icantbreathe"
tweetNumber = 10

tweets = tweepy.Cursor(api.search, hastag).items(tweetNumber)

def searchBot():
    for tweet in tweets:
            try:
                tweet.retweet()
                print("Retweet done!")
                time.sleep(5)
            except tweepy.TweepError as e:
                print(e.reason)
                time.sleep(5)

searchBot()