package com.toggler;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.provider.MediaStore;
import android.database.ContentObserver;
import android.net.Uri;
import android.os.Handler;
import android.util.Log;

public class ScreenshotDetectorService extends Service {

    private static final String TAG = "ScreenshotDetector";

    private ContentObserver screenshotObserver;

    @Override
    public void onCreate() {
        super.onCreate();

        screenshotObserver = new ContentObserver(new Handler()) {
            @Override
            public void onChange(boolean selfChange, Uri uri) {
                super.onChange(selfChange, uri);

                if (uri.toString().matches(MediaStore.Images.Media.EXTERNAL_CONTENT_URI.toString() + "/\\d+")) {
                    Log.d(TAG, "Screenshot taken: " + uri.toString());
                    // Call the React Native function here
                    Intent intent = new Intent("com.yourapp.SCREENSHOT_TAKEN");
                    sendBroadcast(intent);
                }
            }
        };

        getContentResolver().registerContentObserver(
                MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                true,
                screenshotObserver
        );
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        getContentResolver().unregisterContentObserver(screenshotObserver);
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}