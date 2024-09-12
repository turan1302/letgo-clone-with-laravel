import React, { Component } from "react";
import { ActivityIndicator, Dimensions, FlatList, Image, Text, View } from "react-native";
import products from "../../data/products";
import Ionicons from "react-native-vector-icons/Ionicons";
import PostItem from "../../components/Post/PostItem";
import PostHeader from "../../components/Post/PostHeader";
import styles from "./styles";
import AuthLayout from "../../components/Layout/AuthLayout";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import { inject, observer } from "mobx-react";

@inject("AuthStore")
@observer

export default class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      productData: [],
      isLoading : true,
      windowDimensions: Dimensions.get("window"),
    };

    this.getPosts();
  }

   componentDidMount() {
    this.dimensionsSubscription = Dimensions.addEventListener("change", this.handleResize);

    this.props.navigation.addListener("focus",()=>{
      this.getPosts();
    })
  }

  getPosts = async ()=>{
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.getRequest(AppUrl.posts, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      const status = res.status;

      if (status === 200) {
        this.setState({
          productData: result.data,
          isLoading: false,
        });
      }

      if (status === 401) {
        this.props.AuthStore.removeToken();
      }

    }).catch((err) => {
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  }

  componentWillUnmount() {
    if (this.dimensionsSubscription) {
      this.dimensionsSubscription.remove();
    }
  }

  removePost = (id)=>{
    const {productData} = this.state;

    let newProductData = productData.filter((item)=>{
      return item.pd_id!==id;
    });

    this.setState({
      productData : newProductData
    },()=>{
      this.deletePost(id);
    });
  }

  deletePost = async (id)=>{
    await this.props.AuthStore.getAccessToken();
    const token = this.props.AuthStore.appState.user.access_token;

    RestClient.postRequest(AppUrl.delete_post, {
      ps_id: id,
    }, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const status = res.status;

      if (status===401){
        this.props.AuthStore.removeToken();
      }

    }).catch((err) => {
      console.log(err);
      this.props.AuthStore.removeToken();
    });
  }

  handleResize = ({ window }) => {
    this.setState({ windowDimensions: window });
  };

  render() {
    const { width, height } = this.state.windowDimensions;
    const position = width > height ? "LANDSCAPE" : "PORTRAIT";

    const { productData,isLoading } = this.state;


    return (
     <AuthLayout>
       <View style={styles.container}>
         <PostHeader/>
         {(isLoading) ? ( <View style={{justifyContent : "center",alignItems : "center",flex : 1}}>
           <ActivityIndicator size={40} color={"#f24e61"}></ActivityIndicator>
         </View>) : (
         <FlatList ListEmptyComponent={()=>(
           <View style={{
             marginTop: 10,
             marginHorizontal: 15,
             justifyContent: "center",
             alignItems: "center",
             backgroundColor: "#f24e61",
             paddingVertical: 10,
             borderRadius: 10,
           }}>
             <Text style={{ color: "white", fontWeight: "bold" }}>Herhangi bir ilan bulunamadı</Text>
           </View>
         )} showsVerticalScrollIndicator={false} data={productData} keyExtractor={(item, index) => index}
                   renderItem={({ item, index }) => (
                     <PostItem removePost={this.removePost} item={item} position={position} width={width} height={height} />
                   )} />
         )}
       </View>
     </AuthLayout>
    );
  }
}
