// HomeScreen.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { styles } from "../screenStyles";

const quotes = [
  "Empowering seamless and secure global payments.",
  "Connecting sellers and buyers to thrive in the digital economy.",
  "Your go-to destination for online shopping convenience.",
];

const companies = [
  {
    name: "PaySofter",
    description:
      "Empowering seamless and secure global payments, PaySofter offers a softer payment experience for individuals and businesses alike.",
    url: "https://www.paysofter.com",
  },
  {
    name: "SellAngle",
    description:
      "An innovative online marketplace, SellAngle provides a platform for sellers and buyers to connect, trade, and thrive in today's digital economy.",
    url: "https://www.sellangle.com",
  },
  {
    name: "McDofShop",
    description:
      "Experience the convenience of online shopping with McDofShop, your go-to destination for a wide range of products, from building materials, electronics to fashion.",
    url: "https://www.mcdofshop.com",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderQuoteItem = ({ index }) => (
    <View
      style={{
        ...styles.container,
        height: 60,
        justifyContent: "center",
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 14 }}>
        <FontAwesomeIcon icon={faQuoteLeft} size={14} style={styles.cartIcon} />
        {quotes[index]}
        <FontAwesomeIcon
          icon={faQuoteRight}
          size={14}
          style={styles.cartIcon}
        />
      </Text>
    </View>
  );

  console.log("Hello Softglobal!");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Softglobal!</Text>
          <Text style={{ textAlign: "center", marginBottom: 10 }}>
            Discover our family of innovative companies, partners and experience
            a softer way of doing business.
          </Text>
          <Button
            title="Learn More"
            onPress={() => navigation.navigate("About")}
            style={styles.button}
            disabled
          />
        </View>
        <View style={styles.container}>
          <Carousel
            loop
            width={300}
            height={150}
            autoPlay={true}
            data={quotes}
            renderItem={renderQuoteItem}
          />
        </View>

        <View style={styles.container}>
          <Text
            style={{
              ...styles.title,
              marginBottom: 10,
              textAlign: "center",
              padding: 10,
            }}
          >
            Our Companies and Partners
          </Text>
          {companies.map((company, index) => (
            <View key={index}>
              <Card style={{ textAlign: "center", marginBottom: 10 }}>
                <Card.Content>
                  <Text style={{ ...styles.title, textAlign: "center" }}>
                    {company.name}
                  </Text>
                  <Text style={{ textAlign: "center", marginBottom: 10 }}>
                    {company.description}
                  </Text>
                  <Button
                    title={`Visit ${company.name}`}
                    onPress={() => Linking.openURL(company.url)}
                    style={styles.button}
                  />
                </Card.Content>
              </Card>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
