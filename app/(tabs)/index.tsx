import "@/global.css"
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={{ paddingHorizontal: 20, paddingTop: 20 }}>
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="/onboarding" className="mt-4 rounded bg-primary text-white p-4 ">
        Go to Onboarding
      </Link>
      <Link href="/(auth)/sign-in" className="mt-4 rounded bg-primary text-white p-4 ">
        Sign In
      </Link>
      <Link href="/(auth)/sign-up" className="mt-4 rounded bg-primary text-white p-4 ">
        Create Account
      </Link>
      <Link href="/subscriptions/spotify">Spotify Subscription</Link>
      <Link href={{ pathname: "/subscriptions/[id]", params: { id: "claude" } }}>
        Claude Max Subscription
      </Link>
    </SafeAreaView>
  );
}
