import { View, Text, Image } from "react-native";
import { router } from "expo-router";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">

      <Image
        source={images.empty}
        className="w-[270px] h-[216px]"
        resizeMode='contain'
      />

      <Text className="text-2xl font-psemibold text-white">
        {title}
      </Text>
      
      <Text className="font-pmedium text-sm text-gray-100 mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />

    </View>
  );
};

export default EmptyState;