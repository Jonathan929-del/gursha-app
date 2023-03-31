// Imports
import axios from 'axios';
import {useNavigate} from 'react-router-native';
import {useContext, useState} from 'react';
import {AuthContext} from '../context/Auth';
import {Form, FormItem, Label} from 'react-native-form-component';
import {Text, View, StyleSheet, ScrollView} from 'react-native';





// Main Function
const Register = ({theme, SERVER_API}) => {


    // Values
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });


    // Registering user
    const registerUser = async () => {
        try {
            const link = `${SERVER_API}/users/register`;
            const res = await axios.post(link, values);
            setIsClicked(true);
            context.login(res.data);
            setValues({
                username:'',
                email:'',
                password:'',
                confirmPassword:''
            });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            setErrors(err.response.data);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.loginTextContainer}>
                <Text style={styles.text}>Register to</Text>
                <Text style={{color:theme.colors.primary, paddingLeft:10, fontSize:25}}>Gursha</Text>
            </View>
            <ScrollView style={styles.formContainer}>
                <Form
                    buttonStyle={[styles.buttonStyle, {backgroundColor:theme.colors.primary, marginTop:errors.confirmPassword ? 20 : 0}]}
                    onButtonPress={registerUser}
                >
                    <FormItem
                        label='Username'
                        value={values.username}
                        labelStyle={styles.label}
                        onChangeText={text => setValues({...values, username:text})}
                    />
                    {errors.username && <Label text={errors.username} style={styles.errorMessage} textStyle={styles.errorText}/>}
                    <FormItem
                        label='Email'
                        value={values.email}
                        labelStyle={[styles.label, {marginTop:errors.username ? 20 : 0}]}
                        onChangeText={text => setValues({...values, email:text})}
                    />
                    {errors.email && <Label text={errors.email} style={styles.errorMessage} textStyle={styles.errorText}/>}
                    <FormItem
                        label='Password'
                        secureTextEntry
                        labelStyle={[styles.label, {marginTop:errors.email ? 20 : 0}]}
                        value={values.password}
                        onChangeText={text => setValues({...values, password:text})}
                    />
                    {errors.password && <Label text={errors.password} style={styles.errorMessage} textStyle={styles.errorText}/>}
                    <FormItem
                        label='Confirm password'
                        secureTextEntry
                        labelStyle={[styles.label, {marginTop:errors.password ? 20 : 0}]}
                        value={values.confirmPassword}
                        onChangeText={text => setValues({...values, confirmPassword:text})}
                    />
                    {errors.confirmPassword && <Label text={errors.confirmPassword} style={styles.errorMessage} textStyle={styles.errorText}/>}
                </Form>
                {isClicked && (
                    <View style={styles.loginUser}>
                        <Text style={styles.loginUserText}>Login user...</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
};





// Styles
const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        backgroundColor:'#000'
    },
    loginTextContainer:{
        width:'100%',
        display:'flex',
        paddingTop:20,
        flexDirection:'row',
        justifyContent:'center'
    },
    text:{
        color:'#fff',
        fontSize:25
    },
    formContainer:{
        width:'80%',
        marginTop:'10%'
    },
    buttonStyle:{
        marginTop:0   
    },
    label:{
        color:'#fff',
        marginBottom:5
    },
    errorMessage:{
        borderRadius:5,
        marginTop:-15,
        paddingVertical:5,
        paddingHorizontal:15,
        backgroundColor:'#ff3333'
    },
    errorText:{
        fontSize:12,
        color:'#fff'
    },
    loginUser:{
        borderRadius:5,
        paddingVertical:5,
        paddingHorizontal:10,
        backgroundColor:'#5cb85c'
    },
    loginUserText:{
        color:'#fff',
        textAlign:'center'
    }
});





// Export
export default Register;