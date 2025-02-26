package com.toggler;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
 
import android.view.WindowManager;
 
import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;
 
public class ScreenshotModule extends ReactContextBaseJavaModule {
    private static final String SCREENSHOT_ERROR_CODE = "SCREENSHOT_ERROR_CODE";
    private final ReactApplicationContext reactContext;
 
    ScreenshotModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }
 
    @Override
    public String getName() {
        return "ScreenshotModule";
    }
 
    @ReactMethod
    public void disable(Promise promise) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    getCurrentActivity().getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
                    promise.resolve("Screenshot taking locked.");
                } catch(Exception e) {
                    promise.reject(SCREENSHOT_ERROR_CODE, "Disable screenshot taking failure.");
                }
            }
        });
    }
 
    @ReactMethod
    public void allow(Promise promise) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    getCurrentActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
                    promise.resolve("Screenshot taking unlocked.");
                } catch (Exception e) {
                    promise.reject(SCREENSHOT_ERROR_CODE, "Allow screenshot taking failure.");
                }
            }
        });
    }
}