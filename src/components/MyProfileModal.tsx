import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileCard from "../components/ProfileCard";
import ProfileInviteCard from "../components/ProfileInviteCard";
import ProfileModalButton from "../components/ProfileModalButton";
import { Ionicons } from "@expo/vector-icons";
import expoLanguageDetector from '../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../i18n';
import { en, tr } from '../../locales';
import { auth } from '../services/firebase';
import { useSelector } from 'react-redux';
import { selectAuths } from '../slices/authsSlice';

const MyProfileModal = ({ navigation }) => {

    const language = expoLanguageDetector.detect();

    const auths = useSelector(selectAuths);

    // const [userEmail, setUserEmail] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {
    
        if(language == "en") {
          addResources(en);
         }
         else {
          addResources(tr);
         }

        //  setUserEmail(auth.currentUser.email)

      }, []);

      const logOut = () => {
        auth.signOut()
          .then(() => {
            navigation.navigate("AuthRoutes");
          })
          .catch((error) => {
            console.error("Çıkış yaparken hata oluştu: ", error);
          });
      };      

  return (
    <ScrollView style={styles.modalContainer} showsVerticalScrollIndicator={false}>
    <View style={styles.personInfoContainer}>
      <View style={styles.personImage}>
      <Octicons name="person" size={30} color="black" />
        <TouchableOpacity style={styles.cameraIcon}>
        <Ionicons name="ios-camera" size={16} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.personEmail}>{auths.email}</Text>
      </View>
      <TouchableOpacity>
      <MaterialCommunityIcons name="square-edit-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
    <View style={styles.profileCard}>
      <ProfileCard iconName='shopping-bag' cardText='0' titleText={t("profile.button.myorders")} />
      <ProfileCard iconName='bookmark' cardText='1' titleText={t("profile.button.mylists")}/>
      <ProfileCard iconName='link' cardText='3' titleText={t("profile.button.myshares")}/>
    </View>
    
    <View style={styles.shadowContainer}>
      <ProfileInviteCard />
    </View>

    <View>
      <ProfileModalButton text={t("profile.card.mycomments")} isSurvey={false} isArrow={true} iconComponentName={'Feather'} iconName={'message-circle'} logout={""} />
      <ProfileModalButton text={t("profile.card.myaddress")}  isSurvey={false} isArrow={true} iconComponentName={'Feather'} iconName={'map'} logout={""}/> 
      <ProfileModalButton text={t("profile.card.games")}  isSurvey={false} isArrow={true} iconComponentName={'MaterialCommunityIcons'} iconName={'puzzle-outline'} logout={""}/> 
      <ProfileModalButton text={t("profile.card.settings")}  isSurvey={false} isArrow={true} iconComponentName={'Feather'} iconName={'settings'} logout={""}/> 
      <ProfileModalButton text={t("logout")} isSurvey={false} isArrow={false}  iconComponentName={'MaterialIcons'} iconName={'logout'} logout={logOut}/> 
    </View>
   
   </ScrollView>
  )
}

export default MyProfileModal

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white'
    },
      personInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: '5%',
        marginLeft: '10%',
        alignItems: 'center',
        gap: 20
      },
      personImage: {
        width: '20%',
        padding: 20,
        justifyContent: 'center',
        alignItems:'center',
        borderWidth: 3,
        borderRadius: 100,
        borderColor: '#dadde4'
      },
      personEmail: {
        fontWeight: 'bold',
        fontSize: 15
      },
      cameraIcon: {
        position: 'absolute',
        right: -8,
        bottom: -2,
        padding: 5,
        backgroundColor: '#dadde4',
        borderRadius: 30
      },
      profileCard:{
        flexDirection: 'row',
        marginTop: '10%',
        justifyContent: 'space-evenly'
      },
      shadowContainer: {
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: '4%',
        marginHorizontal: '4%',
        marginVertical: '4%'
      },

})