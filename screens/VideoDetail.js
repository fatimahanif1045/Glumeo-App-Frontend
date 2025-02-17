import React, { useState, useEffect } from 'react';
import { 
    View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ip_Address } from '../services/user';
import { deleteVideo, likeVideo, commentVideo, getcomments, getLikes } from '../services/video';

const VideoDetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { video } = route.params; 

    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetchLikes();
        fetchComments();
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await getLikes({ video: video._id });
            setLikes(response.length || 0);
            setLiked(response.some(like => like.userId === 'currentUserId')); // Replace with real user check
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await getcomments({ video: video._id });
            setComments(response || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleLike = async () => {
        try {
            await likeVideo({ video: video._id });
            setLiked(!liked);
            setLikes(liked ? likes - 1 : likes + 1);
        } catch (error) {
            console.error('Error liking video:', error);
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            "Delete Video",
            "Are you sure you want to delete this video?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: handleDelete }
            ]
        );
    };

    const handleDelete = async () => {
        try {
            await deleteVideo({ video: video._id });
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    const handleComment = async () => {
        if (newComment.trim() === "") return;
        try {
            await commentVideo({ video: video._id, comment: newComment });
            setNewComment("");
            fetchComments(); 
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <LinearGradient colors={["#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb"]} style={styles.container}>
            {/* Top Buttons */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmDelete}>
                    <Ionicons name="trash" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Video Player */}
            <Video
                source={{ uri: `${ip_Address}/uploads/video/${video.videoName}` }}
                style={styles.videoPlayer}
                controls
                resizeMode="contain"
            />

            {/* Like & Comment Row */}
            <View style={styles.actionRow}>
                <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
                    <Ionicons name="heart" size={24} color={liked ? "pink" : "white"} />
                    <Text style={styles.actionText}>{likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowComments(!showComments)} style={styles.actionButton}>
                    <Ionicons name="chatbubble" size={24} color="white" />
                    <Text style={styles.actionText}>{comments.length}</Text>
                </TouchableOpacity>
            </View>

            {/* Video Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>{video.user?.userName || 'Unknown User'}</Text>
                <Text style={styles.title}>{video.title}</Text>
                <Text style={styles.description}>{video.description || 'No description available'}</Text>
                <Text style={styles.tags}>Tags: {video.tag?.join(', ') || 'No tags'}</Text>
            </View>

            {/* Comment Section */}
            {showComments && (
                <View style={styles.commentSection}>
                    <FlatList
                        data={comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.commentItem}>
                                <Text style={styles.commentUser}>{item.userName}:</Text>
                                <Text style={styles.commentText}>{item.comment}</Text>
                            </View>
                        )}
                    />

                    {/* Add New Comment */}
                    <View style={styles.commentInputContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Write a comment..."
                            placeholderTextColor="#ccc"
                            value={newComment}
                            onChangeText={setNewComment}
                        />
                        <TouchableOpacity onPress={handleComment} style={styles.sendButton}>
                            <Ionicons name="send" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },

    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
    },

    videoPlayer: {
        width: '100%',
        height: 250,
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 20,
    },

    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingHorizontal: 10,
    },

    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    actionText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },

    infoContainer: {
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 10,
    },

    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },

    description: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 10,
    },

    tags: {
        fontSize: 14,
        color: '#ddd',
        marginTop: 10,
    },

    commentSection: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
    },

    commentItem: {
        flexDirection: 'row',
        marginBottom: 5,
    },

    commentUser: {
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 5,
    },

    commentText: {
        color: '#fff',
    },

    commentInputContainer: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
    },

    commentInput: {
        flex: 1,
        color: '#fff',
        paddingVertical: 5,
    },

    sendButton: {
        padding: 10,
    },
});

export default VideoDetail;
