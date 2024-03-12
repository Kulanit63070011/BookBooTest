import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { db } from '../../../backend/firebase';
import { collection, getDocs } from 'firebase/firestore';
import CalendarDetailsModal from '../../../components/Community/Calendar/CalendarDetailsModal';

const CalendarCommunityScreen = ({ route }) => {
  const { communityId } = route.params || {};
  const [communityEvents, setCommunityEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailsModalVisible, setDetailsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCommunityEvents = async () => {
      try {
        const communityEventsRef = collection(db, 'communities', communityId, 'Calendars');
        const eventsSnapshot = await getDocs(communityEventsRef);
        const eventsData = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCommunityEvents(eventsData);
      } catch (error) {
        console.error('Error fetching community events:', error.message);
      }
    };

    fetchCommunityEvents();
  }, [communityId]);

  const renderEventItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => {
        setSelectedEvent(item);
        setDetailsModalVisible(true);
      }}
    >
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.timestamp}>{item.startDate} {item.startTime}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CalendarCommunity</Text>
      </View>
      <View style={styles.contentContainer}>
        {communityEvents.length > 0 ? (
          <FlatList
            data={communityEvents}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEventItem}
          />
        ) : (
          <Text>No community events available</Text>
        )}
      </View>

      {selectedEvent && (
        <CalendarDetailsModal
          isVisible={isDetailsModalVisible}
          onClose={() => {
            setSelectedEvent(null);
            setDetailsModalVisible(false);
          }}
          event={selectedEvent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 16,
    color: 'gray',
  },
});

export default CalendarCommunityScreen;