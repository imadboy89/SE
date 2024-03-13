import Constants from 'expo-constants';

const getUserAgent = () => {
  const { deviceName, platform, osVersion } = Constants;

  // Get Safari version (same as iOS version)
  const safariVersion = osVersion;

  // Construct the user agent string
  const userAgent = `Mozilla/5.0 (${deviceName}; CPU OS ${osVersion.replace('.', '_')} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/${safariVersion} Mobile/15E148 Safari/604.1`;

  return userAgent;
};

// Example usage
const userAgent = getUserAgent();
console.log('User Agent:', userAgent);
//to be used for _API to generate proper UA instead of the static one