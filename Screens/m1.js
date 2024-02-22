// MatchList.js
import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const MatchList = ({ matches }) => {
  const renderMatchItem = ({ item }) => {
    const formattedDate = "2023-01-01";

    const formattedTime = "23:23";
    console.log(item)
    return (
      <View style={styles.matchItem}>
        <View style={styles.teamsAndSeparatorContainer}>
          <View style={styles.teamsContainer}>
            <View style={styles.teamInfo}>
              <Image
                style={styles.teamCrest}
                source={{ uri: item.homeTeam.logo }}
              />
              <Text style={styles.teamName}>{item.homeTeam.name}</Text>
            </View>
            <View style={styles.teamInfo}>
              <Image
                style={styles.teamCrest}
                source={{ uri: item.awayTeam.logo }}
              />
              <Text style={styles.teamName}>{item.awayTeam.name}</Text>
            </View>
          </View>
          <View style={styles.detailsAndSeparatorContainer}>
            <View style={styles.separator} />
            <View style={styles.detailsContainer}>
              <View style={styles.dateTimeContainer}>
                <Text style={styles.date}>{formattedDate}</Text>
                <Text style={styles.date}>{formattedTime}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Add more match details as needed */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Match List</Text>
      <FlatList
        data={matches}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  matchItem: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  teamsAndSeparatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  teamsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "70%",
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  teamCrest: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 8,
  },
  teamName: {
    fontSize: 14,
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
    marginRight: 8,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dateTimeContainer: {
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  detailsAndSeparatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "27%",
  },
});

export default MatchList;