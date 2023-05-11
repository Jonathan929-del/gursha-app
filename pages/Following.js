// Imports
import axios from 'axios';
import {SERVER_API} from '@env';
import Post from '../components/Post';
import {Link} from 'react-router-native';
import {AuthContext} from '../context/Auth';
import PagerView from 'react-native-pager-view';
import {useContext, useEffect, useState} from 'react';
import {IconButton, ActivityIndicator} from 'react-native-paper';
import {Text, View, StyleSheet, Dimensions, Pressable} from 'react-native';





// Main Function
const Following = ({theme}) => {



  // User
  const {user:registeredUser} = useContext(AuthContext);



  // Video
  const [playingVideoId, setPlayingVideoId] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);



  // Fetching posts
  const [posts, setPosts] = useState([{}]);
  const postsFetcher = async e => {
    try {
      const link = `${SERVER_API}/posts/following/${registeredUser?._id}`;
      const res = await axios.get(link);
      setPosts(res.data.sort(
        (a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
    ));
      setPlayingVideoId(res.data[0]?._id);
    } catch (err) {
      console.log(err);
    }
  };



  // Video switcher
  const videoSwitcher = e => {
    setPlayingVideoId(posts[e.nativeEvent.position]?._id);
    setIsVideoPlaying(true);
  };



  // Comment check
  const [isCommentPosted, setIsCommentPosted] = useState(false);



  // Use effect
  useEffect(() => {
    postsFetcher();
  }, [isCommentPosted]);



  return (
      posts[0]?._id ? (
        <View style={styles.container}>
          <View style={styles.topbar}>
              <View style={styles.pages}>
                <Pressable onPress={() => setIsVideoPlaying(true)}>
                  <Text style={styles.selectedPage}>Following</Text>
                </Pressable>
                <Pressable onPress={() => setIsVideoPlaying(true)}>
                  <Link to='/' underlayColor='transparent'>
                    <Text style={styles.page}>For You</Text>
                  </Link>
                </Pressable>
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
              {posts?.map(post => (
                  <>
                    <Post
                        post={post}
                        isVideoPlaying={isVideoPlaying}
                        playingVideoId={playingVideoId}
                        setIsVideoPlaying={setIsVideoPlaying}
                        theme={theme}
                        setIsCommentPosted={setIsCommentPosted}
                        isCommentPosted={isCommentPosted}
                        fromFollowing={true}
                      />
                  </>
              ))}
            </PagerView>
          </View>
        ) : (
          <View style={styles.progressContainer}>
            <ActivityIndicator animating={true} color='#fff' size={50}/>
          </View>
        )
    )
};






// Styles
const styles = StyleSheet.create({
  container:{
    backgroundColor:'#000',
    height:Dimensions.get('screen').height - 100
  },
  pagerView:{
    flex:1
  },
  progressContainer:{
    height:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
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
  selectedPage:{
    color:'#fff',
    textDecorationLine:'underline'
  },
  searchIcon:{
    top:32,
    right:-100,
    position:'absolute'
  },
});






// Export
export default Following;