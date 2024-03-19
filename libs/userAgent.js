import Constants from 'expo-constants';

const getUserAgent = () => {
  const { deviceName, platform, osVersion } = Constants;

  // Get Safari version (same as iOS version)
  let safariVersion = osVersion ? osVersion : platform.ios.systemVersion;
  safariVersion = safariVersion.replace('.', '_');
  //console.log(deviceName, platform, platform.ios.systemVersion)
  // Construct the user agent string
  let userAgent = `Mozilla/5.0 (${deviceName}; CPU OS ${safariVersion} like Mac OS X)`
  if(safariVersion){
    userAgent += ` AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${safariVersion} Mobile/15E148 Safari/604.1`;
  } else {
    userAgent += ' AppleWebKit/605.1.15 (KHTML, like Gecko) Version/87.0.4280.163 Mobile/15E148 Safari';
  }

  return userAgent;
};

export default getUserAgent;
