import "@/global.css";
import { useClerk, useUser } from "@clerk/expo";
import { styled } from "nativewind";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Settings = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-2xl font-sans-bold text-primary mb-5">Settings</Text>

      <View className="rounded-3xl border border-border bg-card p-5 gap-4">
        <View className="gap-1">
          <Text className="text-xs font-sans-semibold uppercase tracking-[1px] text-muted-foreground">
            Signed in as
          </Text>
          <Text className="text-base font-sans-semibold text-primary" numberOfLines={1}>
            {user?.emailAddresses[0]?.emailAddress ?? "—"}
          </Text>
        </View>

        <View className="h-px bg-border" />

        <Pressable
          onPress={() => signOut()}
          className="items-center rounded-2xl bg-accent py-4"
        >
          <Text className="text-base font-sans-bold text-primary">Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
