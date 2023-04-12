// Imports
import axios from 'axios';
import {Video} from 'expo-av';
import PagerView from 'react-native-pager-view';
import {useEffect, useState, useRef} from 'react';
import {IconButton, Avatar} from 'react-native-paper';
import AnotherUserProfile from './AnotherUserProfile';
import {Text, View, StyleSheet, Pressable, Dimensions} from 'react-native';





// Main Function
const Home = ({theme, SERVER_API}) => {



  // Video
  const videoRef = useRef(null);
  const [playingVideoId, setPlayingVideoId] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isUserModalOpened, setIsUserModalOpened] = useState(false);



  // Fetching posts
  const [posts, setPosts] = useState([{}]);
  const postsFetcher = async e => {
    try {
      const link = `${SERVER_API}/posts/`;
      const res = await axios.get(link);
      setPosts(res.data);
      setPlayingVideoId(res.data[0]?._id);
    } catch (err) {
      console.log(err);
    }
  };



  // Video switcher
  const videoSwitcher = e => {
    setPlayingVideoId(posts[e.nativeEvent.position]._id);
    setIsVideoPlaying(true);
  };
  

  
  // Liking post
  const likeHandler = async id => {
    console.log(id);
  };



  // Use effect
  useEffect(() => {
    postsFetcher();
  }, []);



  return (
    <View style={styles.container}>
      <AnotherUserProfile
        isUserModalOpened={isUserModalOpened}
        setIsUserModalOpened={setIsUserModalOpened}
        user={{name:'Dummy name'}}
        theme={theme}
      />
      <View style={styles.topbar}>
        <View style={styles.pages}>
          <Text style={styles.page}>Friends</Text>
          <Text style={styles.page}>Following</Text>
          <Text style={styles.page}>For You</Text>
          <IconButton style={styles.searchIcon} icon='magnify' size={30} iconColor='#fff'/>
        </View>
      </View>
      <PagerView
        style={styles.pagerView}
        scrollEnabled
        orientation='vertical'
        onPageSelected={e => {
          videoSwitcher(e);
        }}
      >
        {posts.map(post => (
          <View>
            <Pressable style={styles.post} onPress={() => setIsVideoPlaying(!isVideoPlaying)}>
              <View style={styles.videoContainer}>
                <Video
                  ref={videoRef}
                  source={{uri:post.video}}
                  resizeMode="contain"
                  isLooping
                  shouldPlay={playingVideoId === post._id ? isVideoPlaying : false}
                  style={styles.video}
                />
              </View>
              <View style={styles.content}>
                <View style={styles.textsContainer}>
                  <View style={styles.texts}>
                    <View style={styles.textsContent}>
                      <Text style={styles.username}>{post.username}</Text>
                      <Text style={styles.description}>{post.body}</Text>
                    </View>
                  </View>
                  <View style={styles.interactions}>
                    <View style={styles.userProfile}>
                      <View>
                        <Pressable onPress={() => setIsUserModalOpened(true)}>
                          <Avatar.Image source={require('../assets/favicon.png')}/>
                        </Pressable>
                        <Avatar.Icon icon='plus' size={25} style={styles.followIcon}/>
                      </View>
                    </View>
                    <Pressable style={styles.itemContainer} onPress={() => likeHandler(post.username)}>
                      <IconButton icon='heart' size={40} iconColor='#fff'/>
                      <Text style={styles.number}>{post.likesCount}</Text>
                    </Pressable>
                    <View style={styles.itemContainer}>
                      <IconButton icon='clipboard-text' size={40} iconColor='#fff'/>
                      <Text style={styles.number}>{post.commentsCount}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <IconButton icon='star' size={40} iconColor='#fff'/>
                      <Text style={styles.number}>{post.favouritesCount}</Text>
                    </View>
                    <View style={styles.itemContainer}>
                      <IconButton icon='arrow-right-thick' size={40} iconColor='#fff'/>
                      <Text style={styles.number}>{post.sharesCount}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        ))}
      </PagerView>
    </View>
  );
};






// Styles
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#000',
    height:Dimensions.get('screen').height
  },
  post:{
    height:Dimensions.get('screen').height
  },
  videoContainer:{
    width:'100%',
    display:'flex',
    alignItems:'center',
    position:'absolute',
    justifyContent:'center',
    height:Dimensions.get('screen').height
  },
  video:{
    width:'100%',
    height:Dimensions.get('screen').height
  },
  content:{
    height:'100%',
    display:'flex',
    paddingBottom:70,
    alignItems:'center',
    justifyContent:'flex-end'
  },
  pagerView:{
    flex:1
  },
  topbar:{
    top:0,
    zIndex:2,
    width:'100%',
    display:'flex',
    alignItems:'center',
    position:'absolute',
    justifyContent:'center'
  },
  pages:{
    width:'50%',
    display:'flex',
    paddingTop:'10%',
    flexDirection:'row',
    position:'relative',
    justifyContent:'space-between'
  },
  page:{
    color:'#fff'
  },
  searchIcon:{
    top:32,
    right:-100,
    position:'absolute'
  },
  textsContainer:{
    width:'100%',
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  texts:{
    width:'75%',
    height:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'flex-start'
  },
  textsContent:{
    paddingVertical:10,
    paddingHorizontal:20
  },
  username:{
    fontSize:15,
    color:'#fff',
    paddingBottom:5
  },
  description:{
    fontSize:12,
    color:'#fff',
    paddingBottom:10
  },
  interactions:{
    display:'flex',
    paddingBottom:20
  },
  userProfile:{
    display:'flex',
    marginBottom:5,
    paddingVertical:20,
    alignItems:'center',
    justifyContent:'center'
  },
  followIcon:{
    left:20,
    bottom:-15,
    position:'absolute'
  },
  itemContainer:{
    display:'flex',
    marginVertical:3,
    alignItems:'center',
    justifyContent:'center',
  },
  number:{
    color:'#fff',
    marginTop:-10,
    marginBottom:10
  }
});






// Export
export default Home;