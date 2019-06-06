//
//  ViewController.swift
//  ios-app
//
//  Created by Steve Hwang on 6/5/19.
//  Copyright © 2019 Steve Hwang. All rights reserved.
//

import UIKit
import WebKit
import mParticle_Apple_SDK

class ViewController: UIViewController, WKNavigationDelegate {
    
    var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let url = URL(string: "http://localhost:3000//")!
        
        MParticle.sharedInstance().initializeWKWebView(webView)
        webView.load(URLRequest(url: url))
    }
    override func loadView() {
        webView = WKWebView()
        webView.navigationDelegate = self
        view = webView
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        title = webView.title
    }
}



