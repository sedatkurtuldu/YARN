import { ImageBackground, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/home/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Categories from "../screens/home/Categories";
import Shopping from "../screens/home/Shopping";
import MyWallet from "../screens/home/MyWallet";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuths } from "../slices/authsSlice";
import { getIconUrl, selectIconUrls } from "../slices/yarnLogoSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BrandMap from "../screens/home/BrandMap";
import { addResources } from "../../i18n";
import { en, tr } from "../../locales";
import { useTranslation } from "react-i18next";
import expoLanguageDetector from "../../plugins/expoLanguageDetector";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BrandMapStackScreen = ({ route }) => (
  <Stack.Navigator>
    <Stack.Screen
       options={({ navigation }) => ({
        //@ts-ignore
        headerTitle: route.params.brandName,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Categories', {
            screen: 'CategoryBrand'
          })}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: 'white',
        },
        headerShadowVisible: false,
      })}
      name="BrandMap"
    >
      {() => <BrandMap route={route} />}
      
    </Stack.Screen>
  </Stack.Navigator>
);

export default function HomeRoutes({ route }) {
  
  const imageUrl = useSelector(selectIconUrls)
  const dispatch = useDispatch();

  const language = expoLanguageDetector.detect();

  const { t } = useTranslation();
  
  useEffect(() => {
    //@ts-ignore
    dispatch(getIconUrl())
  //@ts-ignore
    dispatch(getAuths())

    if(language == "en") {
      addResources(en);
     }
     else {
      addResources(tr);
     }
  }, []);
  

  return (
      <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => (
          <View>
           <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('MyProfileModal')}>
            <Ionicons style={styles.headerLeftIcon} name="ios-person-outline" size={20} color="black" />
              <View style={styles.dot}>
                <Text style={styles.dotNumber}>7</Text>
              </View>
          </TouchableOpacity>
        </View>
        ),
        headerTitle: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerTitleIcon}>
            <ImageBackground
              source={{ uri: imageUrl }}
              style={{ width: 180, height: 50 }}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={styles.headerRightIcons}>
            <TouchableOpacity>
              <Ionicons name="cart-sharp" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="qr-code" size={28} color="black" />
            </TouchableOpacity>
          </View>
        ),
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf: 'center',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        tabBarLabelStyle: {
          color: 'black',
        },
      })}
      >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
          
            options={{
              tabBarLabel: t("routes.campaigns"),
              tabBarIcon: ({ focused }) => (
                <View style={styles.campaignTabIcons}>
                  <Ionicons name="ios-pricetag" size={24} color={focused ? '#e81f89' : 'black'}  />
                  <Ionicons style={{ right: 15}} name="ios-pricetag-outline" size={24} color={focused ? '#e81f89' : 'black'}  />
                </View>    
              ),
              
            }}


          />
      <Tab.Screen name="Categories" component={Categories}
       options={{
        tabBarLabel: t("routes.categories"),
        tabBarIcon: ({ focused }) => (
          <AntDesign
            name="appstore-o"
            size={24}
            color={focused ? '#e81f89' : 'black'} 
          />
        ),
      }}
      
      />
      <Tab.Screen name="Shopping" component={Shopping}
      options={{
        tabBarLabel: t("routes.shopping"),
        tabBarIcon: ({ focused }) => (
          <MaterialIcons name="storefront" size={24} color={focused ? '#e81f89' : 'black'}  />
        ),
      }}
      
      />
      <Tab.Screen name="MyWallet" component={MyWallet} 
      
      options={{
        tabBarLabel: t("routes.mywallet"),
        tabBarIcon: ({ focused }) => (
          <Ionicons name="ios-wallet-outline" size={24} color={focused ? '#e81f89' : 'black'} />
        ),
      }}
      
      />
      <Tab.Screen 
      name="BrandMapStackScreen" 
      component={BrandMapStackScreen}
      initialParams={route}
      options={{ 
        tabBarButton: () => null, 
        headerLeft: null,
        headerTitle: null,
        headerRight: null,
        headerShown: false
      }} 
    />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleIcon: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  headerLeftIcon: {
    backgroundColor: '#F5F6F8',
    padding: 6 ,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: "#e81f89",
    width: 16,
    height: 16,
    borderRadius: 10,
    position: "absolute",
    right: -2,
    top: -1,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dotNumber: {
    color: "white",
    position: "absolute",
    right: 3,
    top: -2,
    fontSize: 12
  },
  headerRightIcons: {
    paddingRight: 10, 
    flex: 1, 
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16
    
  },
  campaignTabIcons: {
    flexDirection: "row",
  },
  modalContentContainer: {
    
  },
  modalIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
    marginHorizontal: '4%',
    alignItems: 'center'
  },
  modalHeaderText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  personInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '10%',
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
});
