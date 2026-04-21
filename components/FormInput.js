import { View, Text, TextInput, StyleSheet } from "react-native";

/**
* FormInput — Reusable input dengan label dan error message
* Props:
* label : string — label di atas input
* error : string — pesan error dari Formik
* touched : boolean — apakah field sudah disentuh
* ...rest : semua props TextInput standar
*/

export function FormInput({ label, error, touched, style, ...rest }) {
  const hasError = touched && error;
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, hasError && styles.inputError, style]}
        placeholderTextColor="#999"
        {...rest}
      />
      {hasError && <Text style={styles.errorText}> {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: "#fafafa",
    color: "#222",
  },
  inputError: { borderColor: "#E53E3E", backgroundColor: "#FFF5F5" },
  errorText: { fontSize: 12, color: "#E53E3E", marginTop: 5 },
});
