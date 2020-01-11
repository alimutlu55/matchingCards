package com.matchingcards;

import com.facebook.react.ReactActivity;
//import com.matchingcards.R;
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.google.android.gms.ads.MobileAds;
import com.google.android.gms.ads.initialization.InitializationStatus;
import com.google.android.gms.ads.initialization.OnInitializationCompleteListener;

public class MainActivity extends ReactActivity {


  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this,true);  // here
      super.onCreate(savedInstanceState);
    //  setContentView(R.layout.activity_main);
      
      MobileAds.initialize(this, new OnInitializationCompleteListener() {
        @Override
        public void onInitializationComplete(InitializationStatus initializationStatus) {
        }
    });
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "matchingcards";
  }
}
