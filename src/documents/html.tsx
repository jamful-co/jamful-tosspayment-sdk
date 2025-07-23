export const htmlString = ({
  stage,
  selector,
}: {
  stage: string;
  selector: string;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>결제하기</title>
  <script src="https://js.tosspayments.com/${stage}/payment-widget"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
</head>
<body style="margin:0;padding:0;overflow:hidden;">
    <div id="${selector}"></div>
</body>
</html>
`;
};

export const defaultInjectedJavascript = `
window.PaymentWidgetReactNativeSDK = {
  message: {
    postMessage: function(message) {
      window.ReactNativeWebView.postMessage(message);
    }
  },
  error: {
    postMessage: function(error) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        name: 'error', 
        params: JSON.parse(error)
      }));
    }
  },
};
true
`;
