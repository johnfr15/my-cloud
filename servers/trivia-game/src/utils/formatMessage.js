module.exports = (playerName, message) => {
    return {
      playerName,
      message,
      createdAt: new Date().getTime(),
    };
  };