package com.toggler;

import android.app.Activity;
import android.app.Application;
import android.view.View;
import android.view.ViewTreeObserver;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class ScreenshotDetector extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private boolean screenshotTaken = false;

    public ScreenshotDetector(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ScreenshotDetector";
    }

    @ReactMethod
    public void startListening() {
        final Activity activity = getCurrentActivity();
        if (activity != null) {
            View rootView = activity.getWindow().getDecorView().findViewById(android.R.id.content);
            rootView.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
                @Override
                public void onGlobalLayout() {
                    boolean isScreenshot = detectScreenshot();
                    if (isScreenshot) {
                        WritableMap params = new WritableNativeMap();
                        params.putString("event", "screenshotTaken");
                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ScreenshotDetected", params);
                    }
                }
            });
        }
    }

    private boolean detectScreenshot() {
        // Your logic to detect screenshot
        return screenshotTaken;
    }
}