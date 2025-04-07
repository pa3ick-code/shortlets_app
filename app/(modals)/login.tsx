import { View, Text, StyleSheet, TextInput } from 'react-native'
import ButtonsUi from '@/components/ui/ButtonsUi'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useState } from 'react';
import { useForm, Controller } from "react-hook-form"
import { emailValidation, passwordValidation } from '@/utils/validations';
import { useAuth, useSignIn, useSignUp, useSSO } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrouser';
import { useRouter } from 'expo-router';
import { Fonts, Colors } from '@/constants';
import Toast from 'react-native-toast-message';
import { showToast } from '@/utils/toast';

enum strategy {
  APPLE='oauth_apple',
  GITHUB='oauth_github',
  FACEBOOK='oauth_facebook',
}


const login = () => {
  useWarmUpBrowser()

  const router = useRouter();

  const { startSSOFlow } =useSSO();

  const { isSignedIn } = useAuth();
  const { isLoaded: signUpLoaded, signUp, setActive: signUpActive } = useSignUp();
  const { isLoaded: signInLoaded, signIn, setActive: signInActive} = useSignIn();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [ signInForm, setSignInForm] = useState(true);
  const [loading, setLoading] = useState(false);

  // handle OAuth
  const handleSSO = useCallback(async (strategy: strategy) => {
    try {
       const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy,
       });
    } catch (error) {
      console.log(error);
    }
  }, [startSSOFlow]);

  const { control, handleSubmit, reset, formState: {errors} } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);

    if (!signUpLoaded || !signInLoaded) {
      console.log('Loading...');
      return;
    }
    if(!data.email || !data.password){
      showToast('error', 'Validation error', 'Please fill all fields');
      return;
    }
    if(!signInForm && !data.username){
      showToast('error', 'Validation error', 'username field is required');
      return;
    }

    try{
      if(!signInForm){
        const result = await signUp.create({
          username: data.username,
          emailAddress: data.email,
          password: data.password
        });

        const status = result.status
        if(status !== 'complete') throw new Error(status!)

        await signUpActive({ session: result.createdSessionId });
        showToast('success', 'Success', 'Account created successfully 🎉');
        reset();
        router.back();
        
      } else {
        const result = await signIn.create({
          identifier: data.email,
          password: data.password
        });

        const status = result.status
        if(status !== 'complete') throw new Error(status!)
        await signInActive({ session: result.createdSessionId });
        showToast('success', 'Success',  'Logged in successfully 🎉');
        reset();
        router.back();
      }
    }catch(err){
      console.log(err);
      if(err instanceof Error){
        showToast('error', 'Error', err.message);
      }
    } finally {
        setLoading(false); 
    }
  })

  if(isSignedIn) {
    return (
      <Text>User is signed in</Text>
    )
  }
  return (
    
    <View style={ styles.container } >
      <View>
        {
          !signInForm && (
            <View style={ styles.inputWrapper } >
              <Controller
                control={control}
                rules={{ required: !signInForm ? true : false }}
                name='username'
                render={({ field: { onChange, onBlur, value }}) => (
                  <TextInput
                    placeholder='Username'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                )}
              />
              { errors.username && (
                <Text style={ styles.formErrors } >
                  { errors.username.message }
                </Text>
              )}
            </View>
          )
        }

        <View style={ styles.inputWrapper } >
          <Controller 
            control={control}
            rules={ emailValidation}
            name='email'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder='Email'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
              />
            )}
          />
          { errors.email && (
            <Text style={ styles.formErrors } >
              { errors.email.message }
            </Text>
          )}
        </View>

        <View style={ styles.inputWrapper } >
          <Controller 
            control={control}
            rules={ !signInForm ? passwordValidation : { required: 'Password is required' } }
            name='password'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder='Password'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles.input}
                secureTextEntry
              />
            )}
          />
          { errors.password && (
            <Text style={ styles.formErrors } >
              { errors.password.message }
            </Text>
          )}
        </View>

        <ButtonsUi 
          title="Continue" 
          colorMode="primary"
          disabled={loading || !signInLoaded || !signUpLoaded} 
          loading={loading} 
          btnAction={onSubmit}
        />

      </View>

      {/* separator */}
      <View style={ styles.separator }>
        <View style={ styles.separatorLine } />
        <Text style={ styles.separatorText } >Or</Text>
      </View>

      {/* OAuths */}
      <View style={{ marginTop: 20 }}>
        <ButtonsUi
          title="Continue with Apple"
          icon={<Ionicons name="logo-apple" size={24} color="black" />}
          btnAction={() => handleSSO(strategy.APPLE)}
        />
        <ButtonsUi
          title="Continue with Facebook"
          icon={<Ionicons name="logo-facebook" size={24} color="black" />}
          btnAction={() => handleSSO(strategy.FACEBOOK)}
        />
        <ButtonsUi
          title="Continue with Github"
          icon={<Ionicons name="logo-github" size={24} color="black" />}
          btnAction={() => handleSSO(strategy.GITHUB)}
        />
      </View>

      <View style={ styles.formState }>
        <Text style={{ color: Colors.grey }} > 
          { signInForm ? "Don't have an account?" : "Have an account?" } 
        </Text>
        <Text 
          style={ styles.formTrigger }
          onPress={ () => setSignInForm(!signInForm) }
        >
          { signInForm ? "Create account" : "Sign in" }
        </Text>
      </View>
      <Toast />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    position: 'relative',
    paddingTop: 50,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grey,
    paddingLeft: 7,
  },

  inputWrapper: {
    marginBottom: 20,
  },

  separator: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    gap: 10,
    position: 'relative',
    marginVertical: 30
  },

  separatorText: {
    backgroundColor: '#fff',
    fontWeight: 700,
    position: 'absolute',
    paddingHorizontal: 20,
    color: Colors.grey
  },

  separatorLine: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey ,
    flex: 1
  },

  formState: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  formTrigger: {
    textAlign:'center',
    fontWeight: 500,
    fontFamily: Fonts.ubuntuBold,
    marginLeft: 5
  },

  formErrors: { 
    color: Colors.error, 
    marginVertical: 2, 
    fontSize: Fonts.small 
  },
})
export default login