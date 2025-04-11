import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    if (email && password && password === confirmPassword) {
      setError("");
      router.push("/");
    } else {
      setError("Please enter valid email and matching passwords.");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create your account</Text>
        <Text style={styles.subtext}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={handleLoginRedirect}>
            Log In
          </Text>
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.cardContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.terms}>
              By signing up, you agree to the{" "}
              <Text style={styles.link}>Terms of Service</Text> and{" "}
              <Text style={styles.link}>Data Processing Agreement</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f1f1f",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? "20%" : "15%",
    paddingHorizontal: "6%",
    paddingBottom: "6%",
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
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingVertical: "10%",
    paddingHorizontal: "6%",
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: "2%",
    color: "#333",
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: "4%",
    borderRadius: 12,
    marginBottom: "6%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF5722",
    paddingVertical: "5%",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: "6%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  error: {
    color: "#e53935",
    marginBottom: "4%",
    textAlign: "center",
  },
  terms: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
    marginTop: "6%",
  },
});
