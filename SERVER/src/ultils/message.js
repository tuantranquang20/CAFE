let currentMessage = 1;

const createMessage = (user, messageText) => {
    console.log(user, "tai sao");
  return {
    _id: currentMessage++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: "https://placeimg.com/140/140/any",
    },
  };
};
const handleMessage = (socket, users) => {
    console.log(users, "?????");
  socket.on("message", (messageText) => {
    const user = users[socket.id];
    const message = createMessage(user, messageText);
    socket.broadcast.emit("message", message);
  });
};

module.exports = handleMessage;
