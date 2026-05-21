import "@/global.css";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscriptionsStore } from "@/store/subscriptionsStore";
import { styled } from "nativewind";
import React, { useMemo, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
  const { subscriptions, deleteSubscription } = useSubscriptionsStore();
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return subscriptions;
    return subscriptions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q) ||
        s.plan?.toLowerCase().includes(q)
    );
  }, [query, subscriptions]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <FlatList
        ListHeaderComponent={
          <View>
            <Text className="text-3xl font-sans-bold text-primary mb-5">
              Subscriptions
            </Text>
            <TextInput
              className="rounded-2xl border border-border bg-card px-4 py-4 text-base font-sans-medium text-primary mb-5"
              placeholder="Search subscriptions..."
              placeholderTextColor="rgba(0,0,0,0.4)"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>
        }
        data={filtered}
        keyExtractor={(item: Subscription) => item.id}
        renderItem={({ item }: { item: Subscription }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedId === item.id}
            onPress={() =>
              setExpandedId((current) =>
                current === item.id ? null : item.id
              )
            }
            onCancelPress={() => {
              deleteSubscription(item.id);
              setExpandedId(null);
            }}
          />
        )}
        extraData={expandedId}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="home-empty-state">No subscriptions found.</Text>
        }
        contentContainerClassName="px-5 pt-5 pb-30"
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
      />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Subscriptions;
