import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

import {InputRules} from '../components';
import {InputField, PrimaryButton} from '@app/commons';
import {updateIsSignedIn} from '@app/redux/slices';
import {ShowToast, WaitTimeout} from '@app/utils';
import {Colors, Images} from '@app/constants';
import {LoginScreenStyles as Styles} from '@app/assets/styles';

export default function Login({navigation}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();

  const [fetching, setFetching] = useState(false);

  const loginButtonHandler = loginData => {
    setFetching(true);

    WaitTimeout(1000).then(() => {
      setFetching(false);

      // Will navigate to MainStack when value is changed.
      dispatch(updateIsSignedIn(true));

      ShowToast({
        type: 'success',
        title: 'Logged in successfully',
        subtitle: 'Have fun using E-Mistiri',
      });
    });
  };

  return (
    <ScrollView
      style={Styles.mainContainer}
      keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <Spinner
        visible={fetching}
        color={Colors.white}
        overlayColor={Colors.overlaySpinnerBackground}
        animation="fade"
      />

      <View style={Styles.topContainer}>
        <View style={Styles.mainLogoContainer}>
          <Images.mainLogoColor />
        </View>

        <Text style={Styles.titleText}>Welcome Back</Text>

        <Text style={Styles.subtitleText}>Please login to get started</Text>
      </View>

      <View style={Styles.formContainer}>
        <View style={Styles.inputFieldContainer}>
          <InputField
            control={control}
            errors={errors}
            inputName="email"
            rules={InputRules.loginEmail}
            labelText="Email Address"
            keyboardType='email-address'
          />
        </View>

        <View style={Styles.inputFieldContainer}>
          <InputField
            control={control}
            errors={errors}
            inputName="password"
            rules={InputRules.loginPassword}
            labelText="Password"
            isPassword={true}
            passwordIcon={true}
          />
        </View>

        <TouchableOpacity
          onPress={() => {}}
          style={Styles.forgotPasswordContainer}
          activeOpacity={0.5}>
          <Text style={Styles.forgotPasswordLink}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={Styles.loginButtonContainer}>
          <PrimaryButton
            buttonRadius={10}
            buttonLabel="Login"
            buttonHeight={55}
            onPressHandler={handleSubmit(loginButtonHandler)}
          />
        </View>
      </View>

      <View style={Styles.footerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text style={Styles.footerText}>Don't have an account? </Text>

          <TouchableOpacity
            onPress={() => {
              Toast.hide();
              navigation.navigate('Signup');
            }}>
            <Text style={Styles.footerLinkText}>Join us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
