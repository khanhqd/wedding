package com.wedding2;

import android.app.Application;
import com.reactnativenavigation.NavigationApplication;

import android.support.annotation.Nullable;

import com.facebook.react.ReactApplication;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import com.reactnativenavigation.controllers.ActivityCallbacks;
import android.content.Intent;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
   public boolean isDebug() {
       // Make sure you are using BuildConfig from your own application
       return BuildConfig.DEBUG;
   }
  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    // Add additional packages you require here
  //  return Arrays.<ReactPackage>asList(
  //      // eg. new VectorIconsPackage()
  //  );
    return Arrays.<ReactPackage>asList(
         new FBSDKPackage(mCallbackManager)
    );
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    // If you want to use AppEventsLogger to log events.
    AppEventsLogger.activateApp(this);
    setActivityCallbacks(new ActivityCallbacks() {

            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                super.onActivityResult(requestCode, resultCode, data);
                MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
            }
        });

  }
}
