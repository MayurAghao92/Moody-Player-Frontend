const getGradientByMood = (mood) => {
  switch (mood) {
    case "happy":
      return "from-yellow-400 via-pink-400 to-red-400";
    case "sad":
      return "from-blue-800 via-indigo-900 to-gray-800";
    case "angry":
      return "from-red-800 via-red-900 to-yellow-700";
    case "neutral":
    default:
      return "from-purple-700 via-indigo-800 to-purple-900";
  }
};


export default getGradientByMood