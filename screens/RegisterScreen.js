import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert, Keyboard, TouchableWithoutFeedback, } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { FormInput } from "../components/FormInput";
import { RegisterSchema } from "../utils/validationSchemas";

const behaviorType = Platform.OS === "ios" ? "padding" : "height";

export default function RegisterScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Izin Ditolak", "Izinkan akses galeri untuk memilih foto.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        image: profileImage,
      };

      Alert.alert("Sukses", "Register berhasil!");
      navigation.replace("Login", { user: userData });
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={behaviorType}>
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Register</Text>

          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <Text>Pilih Foto</Text>
              </View>
            )}
          </TouchableOpacity>

          <FormInput
            label="Nama"
            placeholder="Nama lengkap"
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            error={formik.errors.name}
            touched={formik.touched.name}
            returnKeyType="next"
          />

          <FormInput
            label="Email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            error={formik.errors.email}
            touched={formik.touched.email}
            returnKeyType="next"
          />

          <FormInput
            label="No HP"
            placeholder="08123..."
            keyboardType="phone-pad"
            value={formik.values.phone}
            onChangeText={formik.handleChange("phone")}
            onBlur={formik.handleBlur("phone")}
            error={formik.errors.phone}
            touched={formik.touched.phone}
            returnKeyType="next"
          />

          <FormInput
            label="Password"
            placeholder="Password"
            secureTextEntry
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
            error={formik.errors.password}
            touched={formik.touched.password}
            returnKeyType="next"
          />

          <FormInput
            label="Konfirmasi Password"
            placeholder="Ulangi password"
            secureTextEntry
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange("confirmPassword")}
            onBlur={formik.handleBlur("confirmPassword")}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
            returnKeyType="done"
            onSubmitEditing={formik.handleSubmit}
          />

          <TouchableOpacity style={styles.btn} onPress={formik.handleSubmit}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  btn: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});