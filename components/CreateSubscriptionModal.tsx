import "@/global.css";
import clsx from "clsx";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const DOMAIN_OVERRIDES: Record<string, string> = {
  aib: "aib.ie",
  "tuath housing": "tuathhousing.ie",
  tuath: "tuathhousing.ie",
};

const getDomain = (name: string): string => {
  const lower = name.trim().toLowerCase();
  const firstWord = lower.split(/\s+/)[0];
  return DOMAIN_OVERRIDES[lower] ?? DOMAIN_OVERRIDES[firstWord] ?? `${firstWord}.com`;
};

const CATEGORIES = [
  "Entertainment",
  "AI Tools",
  "Developer Tools",
  "Design",
  "Productivity",
  "Cloud",
  "Music",
  "Other",
] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<Category, string> = {
  Entertainment: "#ffd6a5",
  "AI Tools": "#b8d4e3",
  "Developer Tools": "#e8def8",
  Design: "#f5c542",
  Productivity: "#caffbf",
  Cloud: "#a0c4ff",
  Music: "#ffc6ff",
  Other: "#ffe0b2",
};

interface CreateSubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (subscription: Subscription) => void;
}

const CreateSubscriptionModal = ({
  visible,
  onClose,
  onSubmit,
}: CreateSubscriptionModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frequency, setFrequency] = useState<"Weekly" | "Monthly" | "Yearly">("Monthly");
  const [category, setCategory] = useState<Category>("Entertainment");

  const parsedPrice = parseFloat(price);
  const isValid = name.trim().length > 0 && !isNaN(parsedPrice) && parsedPrice > 0;

  const handleClose = () => {
    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory("Entertainment");
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid) return;
    const startDate = dayjs().toISOString();
    const renewalDate = (
      frequency === "Weekly"
        ? dayjs().add(1, "week")
        : frequency === "Monthly"
        ? dayjs().add(1, "month")
        : dayjs().add(1, "year")
    ).toISOString();

    const domain = getDomain(name);
    const icon = { uri: `https://logos-api.apistemic.com/domain:${domain}` };

    onSubmit({
      id: `${name.trim().toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      icon,
      name: name.trim(),
      price: parsedPrice,
      currency: "EUR",
      billing: frequency,
      frequency,
      category,
      status: "active",
      startDate,
      renewalDate,
      color: CATEGORY_COLORS[category],
    });

    setName("");
    setPrice("");
    setFrequency("Monthly");
    setCategory("Entertainment");
  };

  const sheet = (
    <>
      <Pressable style={{ flex: 1 }} onPress={handleClose} />
      <View className="modal-container">
        <View className="modal-header">
          <Text className="modal-title">New Subscription</Text>
          <Pressable className="modal-close" onPress={handleClose}>
            <Text className="modal-close-text">✕</Text>
          </Pressable>
        </View>

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="modal-body">
            <View className="auth-field">
              <Text className="auth-label">Name</Text>
              <TextInput
                className="auth-input"
                placeholder="e.g. Netflix"
                placeholderTextColor="rgba(0,0,0,0.4)"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
              />
            </View>

            <View className="auth-field">
              <Text className="auth-label">Price</Text>
              <TextInput
                className="auth-input"
                placeholder="0.00"
                placeholderTextColor="rgba(0,0,0,0.4)"
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
                returnKeyType="done"
              />
            </View>

            <View className="auth-field">
              <Text className="auth-label">Frequency</Text>
              <View className="picker-row">
                {(["Weekly", "Monthly", "Yearly"] as const).map((opt) => (
                  <Pressable
                    key={opt}
                    className={clsx("picker-option", frequency === opt && "picker-option-active")}
                    onPress={() => setFrequency(opt)}
                  >
                    <Text
                      className={clsx(
                        "picker-option-text",
                        frequency === opt && "picker-option-text-active"
                      )}
                    >
                      {opt}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View className="auth-field">
              <Text className="auth-label">Category</Text>
              <View className="category-scroll">
                {CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat}
                    className={clsx("category-chip", category === cat && "category-chip-active")}
                    onPress={() => setCategory(cat)}
                  >
                    <Text
                      className={clsx(
                        "category-chip-text",
                        category === cat && "category-chip-text-active"
                      )}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Pressable
              className={clsx("auth-button", !isValid && "auth-button-disabled")}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text className="auth-button-text">Add Subscription</Text>
            </Pressable>

            <View className="h-5" />
          </View>
        </ScrollView>
      </View>
    </>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          behavior="padding"
        >
          {sheet}
        </KeyboardAvoidingView>
      ) : (
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
          {sheet}
        </View>
      )}
    </Modal>
  );
};

export default CreateSubscriptionModal;
