import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
const { height: screenHeight } = Dimensions.get("window");

const dummyUser = {
  email: "test@test.com",
  password: "test",
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (email === dummyUser.email && password === dummyUser.password) {
      setError("");
      router.push("/welcome");
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleSignupRedirect = () => {
    router.push("/signup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sign in to your Account</Text>
        <Text style={styles.subtext}>
          Don’t have an account?{" "}
          <Text style={styles.link} onPress={handleSignupRedirect}>
            Sign Up
          </Text>
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.rememberRow}>
          <Text style={styles.rememberText}>Remember me</Text>
          <TouchableOpacity style={{ marginLeft: "auto" }}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <Text style={styles.divider}>Or login with</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Text>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text>Facebook</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          By signing up, you agree to the{" "}
          <Text style={styles.link}>Terms of Service</Text> and{" "}
          <Text style={styles.link}>Data Processing Agreement</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 80 : 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    color: "#bbb",
    fontSize: 14,
  },
  link: {
    color: "#FF5722",
    fontWeight: "600",
  },
  cardContainer: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
  },
  form: {
    backgroundColor: "#fff",
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    minHeight: screenHeight * 0.65,
    height: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    fontSize: 16,
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  checkedBox: {
    backgroundColor: "#FF5722",
  },
  rememberText: {
    color: "#555",
  },
  forgotText: {
    color: "#FF5722",
    fontSize: 14,
    marginLeft: "auto",
  },
  button: {
    backgroundColor: "#FF5722",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  divider: {
    textAlign: "center",
    color: "#888",
    marginVertical: 20,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  socialButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginHorizontal: 6,
    backgroundColor: "#fff",
  },
  error: {
    color: "#e53935",
    marginBottom: 8,
    textAlign: "center",
  },
  terms: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginTop: 12,
    paddingHorizontal: 10,
  },
});
