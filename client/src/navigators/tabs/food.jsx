import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  TypeProduct,
  SuggestionScreen,
  ChatScreen,
  SearchScreen,
  DetailScreen,
} from "../../screens/food";

const Stack = createNativeStackNavigator();

const FoodNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="suggest_product"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="type_product" component={TypeProduct} />
      <Stack.Screen name="suggest_product" component={SuggestionScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default FoodNavigator;