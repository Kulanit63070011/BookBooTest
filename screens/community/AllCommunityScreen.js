import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import BottomNavigator from '../../navigation/BottomNavigator';
import FloatingButton from '../../components/common/FloatingAddButton';
import { signUpStyles } from '../../style/user/SignUpStyle';
import { allCommunityStyles } from '../../style/community/AllCommunityStyle';
import CommunityDetailsModal from '../../components/Community/CommunityDetailsModal';
import CommuColumnOfCards from '../../components/Community/Calendar/CommuColumnOfCards';

const AllCommunityScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
  });

  const [communities, setCommunities] = useState([
    { name: 'Community 1', description: 'Description for Community 1' },
    { name: 'Community 2', description: 'Description for Community 2' },
    { name: 'Community 3', description: 'Description for Community 3' },
    { name: 'Community 4', description: 'Description for Community 4' },
    // Add more communities as needed
  ]);

  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addCommunity = () => {
    const isCommunityExist = communities.some((community) => community.name === newCommunity.name);
    if (!isCommunityExist) {
      setCommunities([...communities, newCommunity]);
      setNewCommunity({ name: '', description: '' });
    } else {
      alert('This community already exists.');
    }
  };

  useEffect(() => {
    console.log('Modal visibility inside component:', isModalVisible);
  }, [isModalVisible]);

  useEffect(() => {
    console.log('Community details inside component:', selectedCommunity);
  }, [selectedCommunity]);

  const openCommunityDetails = (community) => {
    console.log('Opening community details for:', community);
    setSelectedCommunity(community);
    setIsModalVisible(true);
  };

  const deleteCommunity = () => {
    // Implement community deletion logic here
    // ...
    setIsModalVisible(false); // Close the modal after deletion
  };

  const navigateToCreateCommunity = () => {
    navigation.navigate('CreateCommunityScreen'); // Navigate to CreateCommunityScreen
  };

  return (
    <View style={signUpStyles.container}>
      <SafeAreaView>
        <View style={signUpStyles.titleContainer}>
          <Text style={allCommunityStyles.title}>หาชุมชน</Text>
        </View>
      </SafeAreaView>
      <View style={[allCommunityStyles.contentContainer]}>
        <View style={allCommunityStyles.bookInputContainer}>
          <TextInput
            style={allCommunityStyles.input}
            placeholder="Community Name"
            value={newCommunity.name}
            onChangeText={(text) => setNewCommunity({ ...newCommunity, name: text })}
          />
          {/* ... (other TextInput fields) */}
          <TouchableOpacity onPress={() => alert('Perform search')} style={{ paddingLeft: 20 }}>
            <Image
              source={require('../../assets/icons/searchIcon.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>
            {communities.length > 0 ? (
              <CommuColumnOfCards cards={communities} onPress={openCommunityDetails} />
            ) : (
              <Text>No communities available</Text>
            )}
          </View>
        </ScrollView>
      </View>
      <FloatingButton targetScreen="CreateCommunity" />
      <BottomNavigator style={allCommunityStyles.bottomNavigator} />
      <CommunityDetailsModal
        visible={isModalVisible}
        communityDetails={selectedCommunity}
        onClose={() => setIsModalVisible(false)}
        onDelete={deleteCommunity}
      />
    </View>
  );
};

export default AllCommunityScreen;
