package com.toggler;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import androidx.annotation.Nullable;

public class ScreenshotDetectorModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    ScreenshotDetectorModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;

        IntentFilter filter = new IntentFilter();
        filter.addAction("com.toggler.SCREENSHOT_TAKEN");

        BroadcastReceiver screenshotReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                sendEvent("ScreenshotTaken", null);
            }
        };

        reactContext.registerReceiver(screenshotReceiver, filter);
    }

    @Override
    public String getName() {
        return "ScreenshotDetectorModule";
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }
}