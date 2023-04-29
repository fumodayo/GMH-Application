import { View, Text, StyleSheet } from "react-native";
import { ButtonForm, InputForm, PageForm } from "../../components/Form";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../constants";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth.slice";
import { useFocusEffect } from "@react-navigation/native";

const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formState, setFormState] = useState({
    name: "",
    password: "",
  });
  const [isDisableState, setDisableState] = useState(false);

  const [isShowPassword, setIsShowPassword] = useState();

  const handleLogin = () => {
    const { name, password } = formState;
    dispatch(login({ name, password }));
  };

  useEffect(() => {
    setDisableState(!Boolean(formState));
  });

  // useFocusEffect(
  //   useCallback(() => {
  //     setDisableState(!Boolean(formState));
  //   })
  // );

  return (
    <PageForm>
      <Text style={styles.title}>Chào mừng bạn trở lại!</Text>
      <InputForm
        value={formState.name}
        onChangeText={(text) =>
          setFormState((prev) => ({ ...prev, name: text }))
        }
        icon={
          <Feather
            name="user"
            size={20}
            color={Colors.GREEN_TEXT_TWO}
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
          />
        }
        label={"Tên đăng nhập"}
      />
      <InputForm
        value={formState.password}
        onChangeText={(text) =>
          setFormState((prev) => ({ ...prev, password: text }))
        }
        icon={
          <Feather
            name="lock"
            size={20}
            color={Colors.GREEN_TEXT_TWO}
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
          />
        }
        label={"Mật khẩu"}
        inputType="password"
        isShowPassword={isShowPassword}
        lastIcon={
          <Feather
            size={20}
            name={isShowPassword ? "eye" : "eye-off"}
            color={Colors.DEFAULT_GREY}
            style={{ marginLeft: 3, marginRight: 20, marginTop: 3 }}
            onPress={() => setIsShowPassword(!isShowPassword)}
          />
        }
      />
      <Text
        style={{
          color: Colors.GREEN_LOGO_TWO,
          fontFamily: "inter_medium",
          fontSize: 13,
          textDecorationLine: "underline",
          paddingBottom: 20,
        }}
        onPress={() => navigation.navigate("inputphonenumber")}
      >
        Quên mật khẩu?
      </Text>
      <Text
        style={{
          color: Colors.DEFAULT_BLACK,
          fontSize: 16,
          paddingBottom: 20,
          fontFamily: "inter_regular",
        }}
      >
        Bạn chưa có tài khoản?, hãy
        <Text
          style={{ fontWeight: 700 }}
          onPress={() => navigation.navigate("signup")}
        >
          {" "}
          đăng ký
        </Text>
      </Text>
      <ButtonForm
        disable={isDisableState}
        onPress={handleLogin}
        text={"Đăng nhập"}
        width={150}
      />
    </PageForm>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "inter_medium",
    fontSize: 20,
    paddingBottom: 20,
  },
});

export default SignInScreen;
