import { Platform } from 'react-native';
import { AdEventType,AdsConsent, AdsConsentStatus, InterstitialAd, BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { isWeb } from '../Styles/general';

const requestOptions = {
  keywords: ['health', 'berth','home',"family","text","fonts","sport","football","highlights"],
}

function is_test_ads(){
    return true;
}
function is_android(){
  return Platform.OS == "android";
}
async function Admob_init(){
  if (__DEV__){
    return ;
  }
  let _status = 0;
  const consentInfo = await AdsConsent.requestInfoUpdate();
  //alert("consentInfo.status:"+consentInfo.status);
  if(consentInfo.status==AdsConsentStatus.REQUIRED){
    const { status } = await AdsConsent.loadAndShowConsentFormIfRequired();
    _status = status;
    //alert("consentInfo.status:"+status);
  }
  return _status;

}
function Interstitial_load(onloaded,onclosed){

  if (isWeb){
    return ;
  }

  try {
      const adUnitId = get_adUnitId(false,true); 
      const interstitial = InterstitialAd.createForAdRequest(adUnitId, requestOptions);
      interstitial.load();
      interstitial_addLoadedEvent(interstitial, onloaded);
      interstitial_addClosedEvent(interstitial, onclosed)
      return interstitial;

  } catch (error) {
    return ;
  }

    
}
function interstitial_addLoadedEvent(interstitial, callback){
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED,callback);
    return unsubscribeLoaded;
}

function interstitial_addClosedEvent(interstitial, callback){
    const unsubscribeClosed= interstitial.addAdEventListener(AdEventType.CLOSED,() => {
        callback();
        interstitial.load();
    });
    return unsubscribeClosed;
}



function get_adUnitId(is_banner=false, is_inters=false){
    let adUnitId = false;
    if(__DEV__){
      if(is_banner){
        adUnitId = TestIds.BANNER;
      }else if(is_inters){
        adUnitId = TestIds.INTERSTITIAL;
      }
    }else{
      if(Platform.OS == "android"){
        if(is_banner){
          adUnitId = global.adUnitId_banner;
        }else if(is_inters){
          adUnitId = global.adUnitId_inters;
        }
      }else if(Platform.OS == "ios"){
        if(is_banner){
          adUnitId = global.adUnitId_banner_ios;
        }else if(is_inters){
          adUnitId = global.adUnitId_inters_ios;
        }
      }
    }
    return adUnitId;
}
function BannerAd2(){
  if (__DEV__){
    return null;
  }
  try {  
      const adUnitId = get_adUnitId(true);
      //console.log(adUnitId);
      //BannerAdSize.ANCHORED_ADAPTIVE_BANNER  INLINE_ADAPTIVE_BANNER
      return (
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER }
            requestOptions={requestOptions}
          />
        );
  } catch (error) {
    return ;
  }

}


export {BannerAd2, Interstitial_load, Admob_init, interstitial_addLoadedEvent,interstitial_addClosedEvent};