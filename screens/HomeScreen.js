import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route, navigation }) {
  const user = route.params?.user;
  const handleLogout = async () => {
  navigation.replace('Login');
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {user?.image ? (
          <Image source={{ uri: user.image }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder} />
        )}

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{user?.name || "Guest"}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
      <Text style={styles.welcome}>Selamat datang </Text>

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={{ marginTop: 20, color: "blue" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
  },
});
