// Imports
import Post from './Post';
import {useState} from 'react';
import {IconButton} from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import {Modal, View, StyleSheet, Dimensions, Pressable, Text} from 'react-native';





// Main function
const VideosModal = ({posts, theme, isVideosModalOpened, setIsVideosModalOpened}) => {



  // Video
  const [playingVideoId, setPlayingVideoId] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoSwitcher = e => {
    setPlayingVideoId(posts[e.nativeEvent.position]._id);
    setIsVideoPlaying(true);
  };



  // Comment check
  const [isCommentPosted, setIsCommentPosted] = useState(false);



  return (
    <Modal visible={isVideosModalOpened}>
        <View style={styles.container}>
            <Pressable onPress={() => setIsVideosModalOpened(false)} style={styles.backButton}>
                <IconButton icon='arrow-left' iconColor='#fff'/>
                <Text style={styles.username}>{posts[0]?.username}</Text>
            </Pressable>
            <PagerView
                style={styles.pagerView}
                scrollEnabled
                orientation='vertical'
                onPageSelected={e => {
                    videoSwitcher(e);
                }}
            >
                {posts.map(post => (
                    <>
                        <Post
                            post={post}
                            isVideoPlaying={isVideoPlaying}
                            playingVideoId={playingVideoId}
                            setIsVideoPlaying={setIsVideoPlaying}
                            theme={theme}
                            setIsCommentPosted={setIsCommentPosted}
                            isCommentPosted={isCommentPosted}
                            fromProfile={true}
                        />
                    </>
                ))}
            </PagerView>
          </View>
    </Modal>
  );
};





// Styles
const styles = StyleSheet.create({
    container:{
      paddingBottom:50,
        backgroundColor:'#000',
        height:Dimensions.get('screen').height
    },
    pagerView:{
        flex:1
    },
    backButton:{
      zIndex:1,
      width:'100%',
      display:'flex',
      borderColor:'#ccc',
      flexDirection:'row',
      position:'absolute',
      borderBottomWidth:0.5,
      backgroundColor:'#000'
    },
    username:{
      color:'#fff',
      width:'100%',
      paddingTop:18,
      paddingRight:50,
      textAlign:'center'
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
});





// Export
export default VideosModal;