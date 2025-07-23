import React, { Component } from 'react';
import { Alert, Linking } from 'react-native';
import WebView, { type WebViewProps } from 'react-native-webview';
import type { WebViewSharedProps } from 'react-native-webview/lib/WebViewTypes';
import type { Fail } from '../models/Result';

type PaymentsWebViewProps = WebViewSharedProps & WebViewProps;

export class PaymentsWebView extends Component<PaymentsWebViewProps> {
  webRef: React.MutableRefObject<WebView | null>;
  resolveMap: Record<string, (resolve: any) => void>;
  rejectMap: Record<string, (reject: any) => void>;
  renderSuccess?: () => void;
  renderFail?: (fail: Fail) => void;
  isCurrentUrlAboutBlank: boolean = false;

  constructor(props: PaymentsWebViewProps) {
    super(props);
    this.resolveMap = {};
    this.rejectMap = {};
    this.webRef = React.createRef();
  }

  injectJavaScript: (javascript: string) => void = (javascript) => {
    // NOTE(JooYang): iOS에서는 웹뷰 몽키패칭으로 about:blank 로 강제 이동하는데, 이때 스크립트가 실행되면 디버그 모드에서 에러 토스트가 발생하기 때문에 막아 줍니다.
    // @see {https://git.tosspayments.bz/tosspayments/widget-sdk-react-native/pull/1}
    if (this.isCurrentUrlAboutBlank) {
      return;
    }
    this.webRef.current?.injectJavaScript(javascript);
  };

  onMessage: (message: any) => void = (message) => {
    if (message.nativeEvent.data !== undefined) {
      const jsonObject = JSON.parse(message.nativeEvent.data);
      switch (jsonObject.name) {
        case 'resolve':
          const resolve = this.resolveMap[jsonObject.params.key];
          resolve?.(jsonObject.params.data);
          delete this.resolveMap[jsonObject.params.key];
          delete this.rejectMap[jsonObject.params.key];
          break;
        case 'reject':
          const reject = this.rejectMap[jsonObject.params.key];
          reject?.(jsonObject.params.data);
          delete this.resolveMap[jsonObject.params.key];
          delete this.rejectMap[jsonObject.params.key];
          break;
        case 'changePaymentMethod':
          // do nothing;
          break;
        default:
          Alert.alert(`Widget에 ${jsonObject.name} 을 구현해주세요`);
          break;
      }
    }
  };

  override render() {
    return (
      <WebView
        ref={this.webRef}
        style={{
          // NOTE(JooYang): hardwareAccelerated 크래시 해결
          opacity: 0.99,
        }}
        onOpenWindow={(event) => {
          Linking.openURL(event.nativeEvent.targetUrl);
        }}
        {...this.props}
        onLoad={(event) => {
          this.isCurrentUrlAboutBlank = event.nativeEvent.url === 'about:blank';
        }}
      />
    );
  }

  /**
   * asyncEvaluateJavascript
   */
  async asyncEvaluateJavascript(
    script: string,
    randomKey: string = ''
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.resolveMap[randomKey] = (data) => {
        resolve(JSON.stringify(data));
      };
      this.rejectMap[randomKey] = (data) => {
        reject(JSON.stringify(data));
      };
      this.webRef.current?.injectJavaScript(script);
    });
  }
}
