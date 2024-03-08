#hier import je verschillende libraries/apis
import tweepy
import time
import random



print('this is my twitterbot')

#hiermee koppel ik de code met het twitteraccount
CONSUMER_KEY = '-'
CONSUMER_SECRET = '-'
ACCESS_KEY = '-'
ACCESS_SECRET = '-'

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)

# als de authenticatie succesvol is, print de terminal de naam van het account
print(api.me().name)


# hier probeerde ik een lijst met tweets te maken waarvan 1 rando werd gestuurd
# ik stopte hiermee omdat je niet meerdere keren hetzelfde kon sturen, dan kwam er 1 error
#tweet_list_v2 = ['Hi, this is a test message', 
#                 'Hello there, we are updating our software', 
#                 'Good day, we are currently updating our software. Please stand by..']
#samplelist3 = random.choices(tweet_list_v2, k=2)
#api.update_status(status= samplelist3)



# dit is mijn tweede poging hierop, en verliep op dezelfde manier
# tweets_list =   ['Hi, this is a test message', 
#                 'Hello there, we are updating our software', 
#                 'Good day, we are currently updating our software. Please stand by..']
# def tweetIt():
#     print('tweeting a random tweet...', flush=True)
#     api.update_status(status= random.sample(tweets_list, 2))




# dit is mijn derde poging hierop, en verliep ook op dezelfde manier
# aSet = {"Hi, this is a test message",
#       "Hello there, we are updating our software", 
#       "Good day, we are currently updating our software. Please stand by.."}
#   sampled_set = random.sample(aSet, 1)
#   api.update_status(status= sampled_set)


# op deze manier lukte het wel, hier word de tweet dmv api.update_status gestuurd
# de print kan je zin in de terminal
def tweetIt1():
    print('tweeting tweet1....', flush=True)
    api.update_status(status= 'What do you think of the George Floyd situation?? (R.I.P) #icantbreathe #GeorgeFloyd #BlackLivesMatter #GeorgeFloydWasMurdered #PoliceBrutality #riots2020 #Trump #news #debate #discuss #discussion Follow us for more news/debates!')

def tweetIt2():
    print('tweeting tweet2....', flush=True)
    api.update_status(status= 'Do you think 5G causes COVID-19?? #5G #COVID-19 #CORONAVIRUS #5GTOWERS #CORONA #news #debate #discuss #discussion Follow us now for more news/debates!')

def tweetIt3():
    print('tweeting tweet3....', flush=True)
    api.update_status(status= 'What is your opinion about the Atlanta/America looting? Do you think it is justified, or do you think it is going to far? #Atlanta #America #JusticeForGeorgeFloyd #news #debate #discuss #discussion Follow us for more news/debates!')

def tweetIt4():
    print('tweeting tweet4....', flush=True)
    api.update_status(status= 'Let your voice be heard. We are in this together. We can not let this racism live on. #BLACK_LIVES_MATTER #news #debate #discuss #discussion Follow us for more news/debates!')

def tweetIt5():
    print('tweeting tweet5....', flush=True)
    api.update_status(status = 'What do you think about Spain opening their borders due to holiday income? Let us know in comments! #COVID-19 #corona #Spain #holiday #vacation #news #debate #discuss #discussion Follow us for more news/debates!')

def tweetIt6():
    print('tweeting tweet6....', flush=True)
    api.update_status(status= 'Did anybody watch the SpaceX shuttle launch a few days ago? What did you think of it? #SpaceX #SpaceXlaunch #NASA #America #news #debate# #discuss #discussion Follow us for more news/debates!')

def tweetIt7():
    print('tweeting tweet7....', flush=True)
    api.update_status(status= 'What do you think of the return of #Anonymous ? Did you know them before, and what do you think of their methods? #Anonymous #Hacking #Justice #News #America #India #Computer #Truth #news #debate #discuss #discussion Follow us for more news/debates!')

def tweetIt8():
    print('tweeting tweet8....', flush=True)
    api.update_status(status= '#Anonymous has come back after 3 years of radiosilence and is exposing Donald #Trump for engaging in child sex trafficking. What are youre thoughts in this? #news #debate #discuss #discussions Follow us for more news/debates!')

def tweetItTest1():
    print('tweeting test1...', flush=True)
    api.update_status(status= 'We are currently testing our software, this is a test tweet..')

def tweetItTest2():
    print('tweeting test2...', flush=True)
    api.update_status(status= 'We are currently testing our software, this is a test tweet2..')



# deze functie zorgt ervoor dat je niet tweets van andere 2 keer zien,
# deze tweet bekijkt de laatste tweet_id in de text file 'last_seen_id'
# hij kijkt dus niet verder dan deze tweet, hierdoor valt je bot niet in herhaling
# verder plakt dit de laatste tweet_id in de file, zodat alles up to date blijft
FILE_NAME = 'last_seen_id.txt'

def retrieve_last_seen_id(file_name):
    f_read = open(file_name, 'r')
    last_seen_id = int(f_read.read().strip())
    f_read.close()
    return last_seen_id

def store_last_seen_id(last_seen_id, file_name):
    f_write = open(file_name, 'w')
    f_write.write(str(last_seen_id))
    f_write.close()
    return


# hier worden de replies gemaakt. het print een bepaalde message in de terminal
# over het feit dat ie een tweet gevonden heeft, hij laat zien wat de id is en wat er in staat
# als de tweet een paar keywords bevat reageert het met een bepaalde reactie
# die is gekoppeld aan die keywords
def reply_to_tweets():
    print('retrieving and replying to tweets...', flush=True)
    
    last_seen_id = retrieve_last_seen_id(FILE_NAME)
    mentions = api.mentions_timeline(
                        last_seen_id,
                        tweet_mode='extended')
    for mention in reversed(mentions):
        print(str(mention.id) + ' - ' + mention.full_text, flush=True)
        last_seen_id = mention.id
        store_last_seen_id(last_seen_id, FILE_NAME)
        if '#helloworld' in mention.full_text.lower():
            print('found #helloworld!', flush=True)
            print('responding back...', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    '#HelloWorld back to you!', mention.id)
        
        if 'i disagree' in mention.full_text.lower():
            print('found #disagreement!', flush=True)
            print('responding back...', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' Why is that?', mention.id)

        if 'the cop went to far' in mention.full_text.lower():
            print('found #copwenttofar!', flush=True)
            print('responding back...', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' Indeed, the cop went to far.', mention.id)
        
        if 'stay safe' in mention.full_text.lower():
            print('found #staysafe', flush=True)
            print('respondig back...', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' Staying safe should be a number 1 priority!', mention.id)
        
        if '2020' in mention.full_text.lower():
            print('found #2020', flush=True)
            print('respondig back...', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' 2020 has been a crazy year so far.', mention.id)

        if 'looting' in mention.full_text.lower():
            print('found #riot', flush=True)
            print('respondig back...', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' Eveybody has the right to be angry, I do not think looting is a good way to show it..', mention.id)

        if 'account is this' in mention.full_text.lower():
            print('found #infoaccount', flush=True)
            print('respondig back...', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' This is a debate account, I was created to have interesting discussions with strangers!', mention.id)
            
        if 'is this' in mention.full_text.lower():
            print('found #infoaccount2', flush=True)
            print('respondig back...', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' This is a debate account, I was created to provoke discssusions with strangers!', mention.id)

        if 'politics' in mention.full_text.lower():
            print('found #politics', flush=True)
            print('responding back....', flush=True)
            api.update_status('@' + mention.user.screen_name +
                        ' I try to be as neutral as possible..', mention.id)

        if 'are you from' in mention.full_text.lower():
            print('found #location', flush=True)
            print('responding back....', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' I am based in the Netherlands!', mention.id)
        
        if 'you a robot' in mention.full_text.lower():
            print('found #robot', flush=True)
            print('responding back....', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' Ofcourse I am not a robot, or am I?...', mention.id)

        if 'beep' in mention.full_text.lower():
            print('found #beep', flush=True)
            print('responding back....', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' BOOP!', mention.id)
        
        if 'marco' in mention.full_text.lower():
            print('found #marco', flush=True)
            print('responding back....', flush=True)
            api.update_status('@' + mention.user.screen_name +
                    ' POLO!', mention.id)
        
        


        
        
# hier worden de tweets gecalled, na elke functie zie je een time.sleep(x aantal seconden)
# dit zorgt voor de interval tussen de tweets en replies

while True:
    reply_to_tweets()
    time.sleep(5)

    tweetItTest1()
    time.sleep(50)

    tweetItTest2()
    time.sleep(10)

    tweetIt8()
    time.sleep(720)

    tweetIt6()
    time.sleep(2000)

    tweetIt7()
    time.sleep(4000)

    tweetIt5()
    time.sleep(8000)

    tweetIt4()
    time.sleep(12000)

    tweetIt3()
    time.sleep(16000)

    tweetIt2()
    time.sleep(20000)

    tweetIt1()
    time.sleep(22000)

    exit()



# dit delete elke tweet die ik hiervoor heb getweet
# ik heb deze een keer gebruikt, is niet echt handig maar vind het wel
# handig om dit te bewaren
    # for status in tweepy.Cursor(api.user_timeline).items():
    # try:
    #     api.destroy_status(status.id)
    # except:
    #     pass
