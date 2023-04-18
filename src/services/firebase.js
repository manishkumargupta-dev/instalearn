import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username.toLowerCase())
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

export async function getUserPhotosByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();

  const photos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  return photos;
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", loggedInUserUsername) // karl (active logged in user)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // 1st param: karl's doc id
  // 2nd param: raphael's user id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );

  // 1st param: karl's user id
  // 2nd param: raphael's doc id
  // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
}
