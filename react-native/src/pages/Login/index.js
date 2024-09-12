import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import * as Yup from "yup";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { inject, observer } from "mobx-react";
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

@inject("AuthStore")
@observer

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSecure: true,
    };
  }

  _handleSubmit = (values, { resetForm, setSubmitting }) => {
    const { navigation } = this.props;

    RestClient.postRequest(AppUrl.login, values).then((res) => {
      const status = res.status;
      const result = res.data;

      if (status === 200) {

        let userData = {
          id : result.data.id,
          name : result.data.name,
          email : result.data.email,
          access_token : result.data.access_token,
        }

        let appState = {
          isLoggedIn : true,
          user : userData
        }

        this.props.AuthStore.saveToken(appState);
        setSubmitting(false);
        resetForm();
        navigation.navigate("Welcome");

      } else {
        if (status === 422) {
          alert(result.message);
          setSubmitting(false);
        }
        else if (status===401){
          alert(result.message);
          setSubmitting(false);
        }else{
          alert(result.message);
          setSubmitting(false);
        }
      }

    }).catch((err) => {
      alert(err);
      setSubmitting(false);
    });
  };

  render() {
    const { isSecure } = this.state;
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik initialValues={{
            email: "",
            password: "",
          }} validationSchema={Yup.object().shape({
            email: Yup.string().required("E-Mail Alanı Zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
            password: Yup.string().required("Şifre Alanı Zorunludur").min(8, "Şifreniz 8 karakterden az olamaz").max(16, "Şifreniz 16 karakterden fazla olamaz"),
          })} onSubmit={this._handleSubmit}>
            {({
              touched,
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              isSubmitting,
            }) => (
              <View style={styles.form_area}>
                <View>
                  <Text style={styles.email_text}>E-Mail</Text>
                  <View style={styles.email_area}>
                    <Fontisto name={"email"} color={"gray"} size={20} />
                    <TextInput keyboardType={"email-address"} value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur("email")} style={styles.email_input} placeholderTextColor={"black"}
                      placeholder={'E-Mail Adresiniz...'}
                    />
                  </View>
                  {(touched.email && errors.email) && <Text style={{color : "red"}}>{errors.email}</Text>}
                </View>
                <View style={{ marginTop: 15 }}>
                  <Text style={styles.password_text}>Şifre</Text>
                  <View style={styles.password_area}>
                    <View style={styles.password_left_area}>
                      <MaterialIcons name={"password"} color={"gray"} size={20} />
                      <TextInput value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur("password")} secureTextEntry={(!isSecure) ? false : true} style={styles.password_input}
                                 placeholderTextColor={"black"}
                                 placeholder={"Şifreniz..."} />
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ isSecure: !isSecure })}>
                      <Ionicons name={!isSecure ? "eye" : "eye-off"} size={20} color={"gray"} />
                    </TouchableOpacity>
                  </View>
                  {(touched.password && errors.password) && <Text style={{color : "red"}}>{errors.password}</Text>}
                </View>
                <View style={{ marginTop: 30 }}>
                  <TouchableOpacity disabled={(!isValid || isSubmitting)} onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.button_text}>Giriş Yap</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <View style={styles.form_footer_area}>
            <Text style={styles.form_footer_signup_text}>Hesabın Yok Mu ? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Register")}><Text style={styles.form_footer_signup_button}>Kayıt Ol</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
