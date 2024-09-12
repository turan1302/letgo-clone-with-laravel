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

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSecure: true,
      isSecureConfirm : true
    };
  }

  _handleSubmit = (values, { resetForm, setSubmitting }) => {
    const {navigation} = this.props;

    RestClient.postRequest(AppUrl.register,values).then((res)=>{
      const status = res.status;
      const result = res.data;

      if (status===201){
        alert(result.message);
          resetForm();
          setSubmitting(false);
          navigation.navigate('Login');
      }else{
        if (status===422){
          alert(result.message);
          setSubmitting(false);
        }else{
          alert(result.message);
          setSubmitting(false);
        }
      }
    }).catch((err)=>{
        alert(err);
        setSubmitting(false);
    })
  };

  render() {
    const { isSecure,isSecureConfirm } = this.state;
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik initialValues={{
            name: "",
            email: "",
            password: "",
            password_confirmation : ""
          }} validationSchema={Yup.object().shape({
            name: Yup.string().required("Ad Soyad Alanı Zorunludur"),
            email: Yup.string().required("E-Mail Alanı Zorunludur").email("Lütfen geçerli bir E-Mail adresi giriniz"),
            password: Yup.string().required("Şifre Alanı Zorunludur").min(8, "Şifreniz 8 karakterden az olamaz").max(16, "Şifreniz 16 karakterden fazla olamaz"),
            password_confirmation: Yup.string().required("Şifre Tekrarı Alanı Zorunludur").min(8, "Şifre Tekrar alanı 8 karakterden az olamaz").max(16, "Şifre tekrar alanı 16 karakterden fazla olamaz").oneOf([Yup.ref('password'), null], "Şifreler eşleşmiyor")
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
                  <Text style={styles.name_text}>Ad Soyad</Text>
                  <View style={styles.name_area}>
                    <Fontisto name={"male"} color={"gray"} size={20} />
                    <TextInput keyboardType={"email-address"} value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur("name")} style={styles.name_input} placeholderTextColor={"black"}
                               placeholder={'Adınız Soyadınız...'}
                    />
                  </View>
                  {(touched.name && errors.name) && <Text style={{color : "red"}}>{errors.name}</Text>}
                </View>
                <View style={{marginTop : 15}}>
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
                <View style={{ marginTop: 15 }}>
                  <Text style={styles.confirm_password_text}>Şifre Tekrar</Text>
                  <View style={styles.confirm_password_area}>
                    <View style={styles.confirm_password_left_area}>
                      <MaterialIcons name={"password"} color={"gray"} size={20} />
                      <TextInput value={values.password_confirmation} onChangeText={handleChange('password_confirmation')} onBlur={handleBlur("password_confirmation")} secureTextEntry={(!isSecureConfirm) ? false : true} style={styles.confirm_password_input}
                                 placeholderTextColor={"black"}
                                 placeholder={"Şifreniz (Tekrar)..."} />
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ isSecureConfirm: !isSecureConfirm })}>
                      <Ionicons name={!isSecureConfirm ? "eye" : "eye-off"} size={20} color={"gray"} />
                    </TouchableOpacity>
                  </View>
                  {(touched.password_confirmation && errors.password_confirmation) && <Text style={{color : "red"}}>{errors.password_confirmation}</Text>}
                </View>
                <View style={{ marginTop: 30 }}>
                  <TouchableOpacity disabled={(!isValid || isSubmitting)} onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.button_text}>Kayıt Ol</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <View style={styles.form_footer_area}>
            <Text style={styles.form_footer_signup_text}>Zaten üye misin ? </Text>
            <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={styles.form_footer_signup_button}>Giriş yap</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
