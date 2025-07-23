# widget-sdk-react-native

Payment SDK for React Native

## Installation

```sh
# npm
npm install @tosspayments/widget-sdk-react-native

# yarn
yarn add @tosspayments/widget-sdk-react-native
```

## Usage

```tsx
import { PaymentWidgetProvider,
  usePaymentWidget,
  AgreementWidget,
  PaymentMethodWidget } from "@tosspayments/widget-sdk-react-native";
import type {
  AgreementWidgetControl,
  PaymentMethodWidgetControl,
  AgreementStatus,
} from '@tosspayments/widget-sdk-react-native';

// ...
export default function App() {
  return <PaymentWidgetProvider
    clientKey={`test_ck_0Poxy1XQL8R4P1zpv14V7nO5Wmlg`}
    customerKey={`094ee04fe5d32758ec6e7f56285ad8b2`}
  >
    <CheckoutPage />
  </PaymentWidgetProvider>
}


function CheckoutPage() {
  const paymentWidgetControl = usePaymentWidget();
  const [paymentMethodWidgetControl, setPaymentMethodWidgetControl] =
    useState<PaymentMethodWidgetControl | null>(null);
  const [agreementWidgetControl, setAgreementWidgetControl] =
    useState<AgreementWidgetControl | null>(null);

  return (
    <>
      <PaymentMethodWidget
        selector="payment-methods"
        onLoadEnd={() => {
          paymentWidgetControl
            .renderPaymentMethods(
              'payment-methods',
              {value: 50_000},
              {
                variantKey: 'DEFAULT',
              },
            )
            .then(control => {
              setPaymentMethodWidgetControl(control);
            });
        }}
      />
      <AgreementWidget
        selector="agreement"
        onLoadEnd={() => {
          paymentWidgetControl
            .renderAgreement('agreement', {
              variantKey: 'DEFAULT',
            })
            .then(control => {
              setAgreementWidgetControl(control);
            });
        }}
      />
      <Button
        title="결제요청"
        onPress={async () => {
          if (paymentWidgetControl == null || agreementWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.');
            return;
          }

          const agreeement = await agreementWidgetControl.getAgreementStatus();
          if (agreeement.agreedRequiredTerms !== true) {
            Alert.alert('약관에 동의하지 않았습니다.');
            return;
          }

          paymentWidgetControl.requestPayment({
            orderId: 'OrderId_123',
            orderName: '파란티셔츠 외 2건',
          });
        }}
      />
      <Button
        title="선택된 결제수단"
        onPress={async () => {
          if (paymentMethodWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.');
            return;
          }

          Alert.alert(
            `선택된 결제수단: ${JSON.stringify(
              await paymentMethodWidgetControl.getSelectedPaymentMethod(),
            )}`,
          );
        }}
      />
      <Button
        title="결제 금액 변경"
        onPress={async () => {
          if (paymentMethodWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.');
            return;
          }

          await paymentMethodWidgetControl.updateAmount(100_000);
          Alert.alert('결제 금액이 100000원으로 변경되었습니다.');
        }}
      />
    </>
  );
}
```

## License

MIT