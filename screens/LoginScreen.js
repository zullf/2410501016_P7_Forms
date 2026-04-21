import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert, } from "react-native";
import { useFormik } from "formik";
import { FormInput } from "../components/FormInput";
import { LoginSchema } from "../utils/validationSchemas";
import AsyncStorage from "@react-native-async-storage/async-storage";

const behaviorType = Platform.OS === "ios" ? "padding" : "height";

export default function LoginScreen({ navigation, route }) {
  const registeredUser = route.params?.user;

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (!storedUser) {
          setFieldError("email", "Belum ada akun, silakan register");
          return;
        }

        const user = JSON.parse(storedUser);

        if (values.email === user.email && values.password === user.password) {
          navigation.replace("Home", { user });
        } else {
          setFieldError("email", "Email atau password salah");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={behaviorType}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Selamat Datang</Text>

        <FormInput
          label="Email"
          placeholder="contoh@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        <FormInput
          label="Password"
          placeholder="Masukkan password"
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={formik.handleSubmit}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          error={formik.errors.password}
          touched={formik.touched.password}
        />

        <TouchableOpacity
          style={[styles.btn, formik.isSubmitting && { opacity: 0.7 }]}
          onPress={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          <Text style={styles.btnText}>
            {formik.isSubmitting ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ textAlign: "center", marginTop: 15 }}>
            Belum punya akun? Daftar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
