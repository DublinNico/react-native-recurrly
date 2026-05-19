import { formatCurrency } from "@/lib/utils";
import React from "react";
import { Image, Text, View } from "react-native";

interface Props {
  data: UpcomingSubscription;
}

const UpcommingSubscriptionCard = ({ data }: Props) => {
  const { name, price, daysLeft, icon, currency } = data;
  return (
    <View className="upcoming-card">
      <View className="upcoming-row">
        <Image source={icon} className="upcoming-icon" resizeMode="contain" />
        <View>
          <Text className="upcoming-price">{formatCurrency(price)}</Text>
        </View>
      </View>
    </View>
  );
};

export default UpcommingSubscriptionCard;
