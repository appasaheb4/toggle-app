package com.toggler;

import android.app.Activity;
import android.os.Environment;
import android.os.FileObserver;
import android.view.View;
import android.view.ViewTreeObserver;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;

public class ScreenshotDetector extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private FileObserver screenshotObserver;

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
                    startScreenshotObserver();
                }
            });
        }
    }

    private void startScreenshotObserver() {
        String screenshotsPath = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getAbsolutePath() + "/Screenshots";
        screenshotObserver = new FileObserver(screenshotsPath, FileObserver.CREATE) {
            @Override
            public void onEvent(int event, String path) {
                if (event == FileObserver.CREATE && path != null) {
                    WritableMap params = new WritableNativeMap();
                    params.putString("event", "screenshotTaken");
                    params.putString("path", path);
                    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("ScreenshotDetected", params);
                }
            }
        };
        screenshotObserver.startWatching();
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        if (screenshotObserver != null) {
            screenshotObserver.stopWatching();
        }
    }
}