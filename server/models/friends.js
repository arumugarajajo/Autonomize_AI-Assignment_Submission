// friends.js
const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  friend_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Friend = mongoose.model("Friend", friendSchema);

// Insert mutual friendship
const addMutualFriendship = async (userAId, userBId) => {
  await Friend.create([
    { user_id: userAId, friend_id: userBId },
    { user_id: userBId, friend_id: userAId },
  ]);
};

module.exports = { addMutualFriendship };
