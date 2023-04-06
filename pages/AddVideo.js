// Imports
import axios from 'axios';
import {Video} from 'expo-av';
import {Link} from 'react-router-native';
import awsconfig from '../src/aws-exports';
import {AuthContext} from '../context/Auth';
import {Amplify, Storage} from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';
import {useState, useRef, useContext} from 'react';
import {FormItem} from 'react-native-form-component';
import {IconButton, ProgressBar} from 'react-native-paper';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
Amplify.configure(awsconfig);





// Main Function
const AddVideo = ({theme, SERVER_API}) => {



  // Authenticated user
  const {user} = useContext(AuthContext);



  // Uploading video
  const [videoResult, setVideoResult] = useState({});
  const [input, setInput] = useState('');
  const [videoUploadUri, setVideoUploadUri] = useState();
  const [progress, setProgress] = useState({loaded:null, total:null, uploaded:false});
  let theProgress = Math.round((progress.loaded / progress.total) * 10) / 10;
  const fetchVideoUri = async uri => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };
  const uploadFile = async file => {
    const video = await fetchVideoUri(file.assets[0].uri);
    return Storage.put(`my-video-filename-${Math.random()}.mp4`, video, {
      level:'public',
      contentType:video.type,
      progressCallback:uploadProgress => {
        setProgress({loaded:uploadProgress.loaded, total:uploadProgress.total});
      }
    })
    .then(res => {
      Storage.get(res.key)
      .then(result => {
        let videoResult = result.substring(0, result.indexOf('?'));
        setVideoUploadUri(videoResult);
        setProgress({loaded:null, total:null, uploaded:true});
        setTimeout(() => {
          setProgress({loaded:null, total:null, uploaded:false});
        }, 3000)
      })
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  };



  // Selecting video
  const videoRef = useRef(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Videos,
      allowsEditing:true,
      aspect:[4, 3],
      quality:1
    });
    if (!result.canceled) {
      setVideoResult(result);
      setVideoPreview(result.assets[0].uri);
    }
  };
  const postVideo = async () => {
    uploadFile(videoResult);
    setVideoPreview(null);

    if(videoUploadUri){
      try {
        const link = `${SERVER_API}/posts`;
        const res = await axios.post(link, {
          video:videoUploadUri,
          body:input
        },{
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        });
        console.log(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
  };



  return (
    <View style={styles.container}>
      {user === null ? (



        <View style={styles.authenticatedContainer}>
          <Text style={styles.authenticationText}>Login to be able to publish videos..</Text>
          <Link to='/register'>
            <Text style={[styles.authenticationText, {marginBottom:15, marginTop:30}]}>Register</Text>
          </Link>
          <Link to='/login'>
            <Text style={styles.authenticationText}>Login</Text>
          </Link>
        </View>



      ) : (



        <>
          {videoPreview && (
            <View style={[styles.videoContainer, {borderColor:theme.colors.primary}]}>
              <TouchableOpacity onPress={() => setVideoPreview(null)} style={styles.closeIcon}>
                <IconButton icon='close' iconColor='#fff'/>
              </TouchableOpacity>
              <Video
                ref={videoRef}
                source={{uri:videoPreview}}
                useNativeControls
                resizeMode="contain"
                isLooping
                style={styles.video}
              />
            </View>
          )}
          <View>

            {videoPreview && (
              <>              
                <FormItem
                  placeholder='Enter description'
                  style={[styles.input, {borderColor:theme.colors.primary}]}
                  textInputStyle={{color:'#fff'}}
                  onChangeText={text => setInput(text)}
                />
                <TouchableOpacity style={[styles.replaceVideo]} onPress={pickVideo}>
                  <Text style={styles.replaceText}>Choose another video</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity style={[styles.addVideo, {backgroundColor:theme.colors.primary}]} onPress={videoPreview ? postVideo : pickVideo}>
              <Text style={styles.addText}>{videoPreview ? 'Publish video' : 'Add video'}</Text>
              {!videoPreview && <Text style={styles.addIcon}>+</Text>}
            </TouchableOpacity>
            {progress.total !== null && (
              <>
                <Text style={styles.publishText}>Publishing</Text>
                <ProgressBar color={theme.colors.primary} style={{marginTop:20}} animatedValue={theProgress}/>
              </>
            )}
            {
              progress.uploaded && <Text style={{color:'#4BB543', textAlign:'center', marginTop:30}}>Video uploaded!</Text>
            }
          </View>
        </>



      )}
    </View>
  )
};





// Styles
const styles = StyleSheet.create({
  container:{
    height:'100%',
    display:'flex',
    alignItems:'center',
    backgroundColor:'#000',
    justifyContent:'center'
  },
  authenticatedContainer:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  authenticationText:{
    color:'#fff'
  },
  addVideo:{
    borderRadius:7,
    display:'flex',
    paddingVertical:8,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    justifyContent:'center'
  },
  addText:{
    fontSize:18,
    color:'#fff'
  },
  addIcon:{
    fontSize:30,
    color:'#fff',
    marginLeft:10
  },
  publishText:{
    color:'#fff',
    marginTop:30,
    textAlign:'center'
  },
  successMessage:{
    marginTop:30,
    color:'#4BB543',
    textAlign:'center'
  },
  replaceVideo:{
    display:'flex',
    marginBottom:20,
    alignItems:'center',
    paddingHorizontal:20,
    justifyContent:'center'
  },
  replaceText:{
    color:'#fff'
  },
  videoContainer:{
    width:'70%',
    height:'50%',
    borderWidth:1,
    borderRadius:5,
    marginBottom:50
  },
  closeIcon:{
    zIndex:10,
    width:'100%',
    display:'flex',
    position:'absolute',
    alignItems:'flex-end'
  },
  video:{
    width:'100%',
    height:'100%'
  },
  input:{
    borderWidth:1,
    backgroundColor:'#000',
  }
});





// Export
export default AddVideo;