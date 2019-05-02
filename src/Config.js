
var ConfigDebug = {
  BACKEND: 'http://pc.nui.org:5000',
  FIREBASE_URL: 'https://chatbotcnh.firebaseio.com/z_ext/tkbcnh'
}

var ConfigProduction = {
  BACKEND: 'https://nuichatbot-1.herokuapp.com',
  FIREBASE_URL: 'https://chatbotcnh.firebaseio.com/ext/tkbcnh'
}

var Config = ConfigDebug
var MODE = process.env.REACT_APP_MODE
if (MODE === 'production') Config = ConfigProduction

export default Config