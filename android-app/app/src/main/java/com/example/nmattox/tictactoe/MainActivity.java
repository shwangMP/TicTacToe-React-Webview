package com.example.nmattox.tictactoe;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;
import com.mparticle.MParticle;
import com.mparticle.MParticleOptions;
import com.mparticle.identity.BaseIdentityTask;
import com.mparticle.identity.IdentityApiResult;
import com.mparticle.identity.IdentityHttpResponse;
import com.mparticle.identity.TaskFailureListener;
import com.mparticle.identity.TaskSuccessListener;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize mParticle
        MParticleOptions options = MParticleOptions.builder(this)
                .credentials("847521b69530a54fa7058cf9c65a4fea", "UldUYfUO8JC0Ro8Ofdm7hhToh3cr0SSXe3SQeDMGDJtxHPCBhizZnwFA-xr2PB6X")
                .environment(MParticle.Environment.Development)
                .logLevel(MParticle.LogLevel.VERBOSE)
                .identifyTask(
                        new BaseIdentityTask()
//                            .addFailureListener(new TaskFailureListener() {
//                                @Override
//                                public void onFailure(@Nullable IdentityHttpResponse identityHttpResponse) {
//
//                                }
//                            })
                                .addSuccessListener(new TaskSuccessListener() {
                                    @Override
                                    public void onSuccess(@NonNull IdentityApiResult identityApiResult) {
                                        // Initialize and display web view
                                        WebView browser = (WebView) findViewById(R.id.webview);
                                        browser.getSettings().setJavaScriptEnabled(true);
                                        MParticle.getInstance().registerWebView(browser);
                                        browser.loadUrl("http://10.0.2.2:3000/");
                                    }
                                })
                )
                .build();
        MParticle.start(options);
    }
}
