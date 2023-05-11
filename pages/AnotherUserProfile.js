// Imports
import axios from 'axios';
import {SERVER_API} from '@env';
import {Button} from 'react-native-paper';
import {AuthContext} from '../context/Auth';
import {IconButton} from 'react-native-paper';
import {useContext, useEffect, useState} from 'react';
import VideosProfilePreview from '../components/VideosProfilePreview';
import {Text, Modal, View, Pressable, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';





// Main function
const AnotherUserProfile = ({isUserModalOpened, setIsUserModalOpened, user, theme, isFollowIconVisible, setIsFollowIconVisible}) => {



    // User
    const {user:registeredUser, update} = useContext(AuthContext);



    // User's posts
    const [posts, setPosts] = useState([]);
    const postsFetcher = async () => {
        try {
            const link = `${SERVER_API}/posts/${user._id}`;
            const res = await axios.get(link);
            setPosts(res.data);
        } catch (err) {
            console.log(err);
        }
    };



    // Follow handler
    const followHandler = async () => {
        try {
            const link = `${SERVER_API}/users/follow/${user._id}`
            const res = await axios.put(link, {followerId:registeredUser._id});
            setIsFollowIconVisible(!isFollowIconVisible);
            update({newFollowing:user._id});
        } catch (err) {
            console.log(err);
        }
    };



    // Use effect
    useEffect(() => {
        postsFetcher();
        setIsFollowIconVisible(registeredUser?.following?.includes(user._id) ? false : true);
    }, [isUserModalOpened]);



    return (
        user &&
        <Modal visible={isUserModalOpened}>
            <View style={styles.container}>
                <Pressable onPress={() => setIsUserModalOpened(false)} style={styles.backButton}>
                    <IconButton icon='arrow-left' iconColor='#fff'/>
                </Pressable>
                <ScrollView>
                    <View style={styles.bioContainer}>
                        <Text style={styles.bio}>{user.bio}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri:user.profilePic}}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{user.username}</Text>
                    </View>
                    <View style={styles.bar}>
                        <View style={styles.item}>
                            <Text style={styles.number}>{user.followingCount || 0}</Text>
                            <Text style={styles.category}>Following</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.number}>{user.followersCount || 0}</Text>
                            <Text style={styles.category}>Followers</Text>
                        </View>
                        <View style={styles.item}>
                            <Text style={styles.number}>{user.likesCount}</Text>
                            <Text style={styles.category}>Likes</Text>
                        </View>
                    </View>
                    {registeredUser && (
                        <Button style={styles.buttonContainer} onPress={followHandler}>
                            <Text style={[styles.button, {color:theme.colors.primary}]}>
                                {isFollowIconVisible ? 'Follow' : 'Unfollow'}
                            </Text>
                        </Button>
                    )}
                    <Text style={styles.hr}>-</Text>
                    <View>
                        <VideosProfilePreview
                            posts={posts}
                            theme={theme}
                        />
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};





const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        height:Dimensions.get('screen').height
    },
    backButton:{
        zIndex:1,
        width:'100%',
        borderColor:'#ccc',
        position:'absolute',
        borderBottomWidth:0.5,
        backgroundColor:'#000'
    },
    bioContainer:{
        width:'100%',
        marginTop:50
    },
    bio:{
        color:'#fff',
        paddingTop:20,
        textAlign:'center'
    },
    imageContainer:{
        width:'100%',
        marginTop:30,
        display:'flex',
        alignItems:'center'
    },
    image:{
        width:100,
        height:100,
        borderRadius:50
    },
    nameContainer:{
        width :'100%'
    },
    name:{
        marginTop:10,
        color:'#fff',
        textAlign:'center',
    },
    bar:{
        width:'100%',
        marginTop:30,
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:50,
        justifyContent:'space-between'
    },
    item:{
        display:'flex',
        alignItems:'center'
    },
    number:{
        color:'#fff'
    },
    category:{
        fontSize:12,
        color:'#ccc'
    },
    buttonContainer:{
        marginTop:20
    },
    button:{
        fontSize:18,
        paddingTop:40,
        fontWeight:300
    },
    hr:{
        fontSize:1,
        width:'100%',
        marginTop:20,
        borderColor:'#ccc',
        borderBottomWidth:1
    }
});





// Export
export default AnotherUserProfile;