import type { EscrowProduct } from './EscrowProduct';
import type { Product } from './Product';
import type { Shipping } from './Shipping';

export interface PaymentInfo {
  /** 주문을 구분하는 ID입니다. 충분히 무작위한 값을 생성해서 각 주문마다 고유한 값을 넣어주세요. 영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열이어야 합니다. */
  orderId: string;

  /** 주문명입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최대 길이는 100자입니다. */
  orderName: string;

  /** 고객의 이메일입니다. 이메일을 파라미터로 전달하면 해당 이메일로 결제 내용을 통보합니다. 최대 길이는 100자입니다. */
  customerEmail?: string;

  /** 고객의 이름입니다. 최대 길이는 100자입니다. */
  customerName?: string;

  /** 웹뷰로 연동할 때 상점의 앱 스킴을 지정하면 외부 앱(페이북/ISP)에서 상점 앱으로 돌아올 수 있습니다. 예를 들면 testapp://같은 형태입니다. */
  appScheme?: string;

  /** 결제할 금액 중 면세 금액입니다. 값을 넣지 않으면 기본값인 0으로 설정됩니다.
   * 면세 상점 혹은 복합 과세 상점일 때만 설정한 금액이 적용되고, 일반 과세 상점인 경우에는 적용되지 않습니다. 더 자세한 내용은 세금 처리하기에서 살펴보세요. */
  taxFreeAmount?: number;

  /** 과세를 제외한 결제 금액(컵 보증금 등)입니다. 값을 넣지 않으면 기본값인 0으로 설정됩니다. 카드 결제 또는 간편결제로 계좌이체할 때 사용하세요.
   * 과세 제외 금액이 있는 카드 결제는 부분 취소가 안 됩니다.*/
  taxExemptionAmount?: string;

  /** 가상계좌, 계좌이체결제일 때 적용할 수 있는 문화비(도서, 공연 티켓, 박물관·미술관 입장권 등) 지출 여부입니다. */
  cultureExpense?: boolean;

  /** 가상계좌, 계좌이체결제일 때 적용할 수 있는 에스크로 사용 여부입니다. 값을 주지 않으면 결제창에서 고객이 직접 에스크로 결제 여부를 선택합니다. */
  useEscrow?: boolean;

  /** 각 상품의 상세 정보 객체를 담는 배열입니다. 가상계좌, 계좌이체에서 에스크로를 사용하는 상점이라면 필수 파라미터입니다.
   * 예를 들어 사용자가 세 가지 종류의 상품을 구매했다면 길이가 3인 배열이어야 합니다. */
  escrowProducts?: EscrowProduct[];

  /** 고객의 휴대폰 번호입니다. 가상계좌 결제에는 입금 안내가 전송되고, 퀵계좌결제창에서는 고객의 휴대폰 번호를 자동 완성합니다. */
  customerMobilePhone?: string;

  /** 가상계좌 결제창에서 휴대폰 번호 입력 필드 노출 여부입니다. false를 넘기면 가상계좌 결제창에서 휴대폰 번호 입력 필드를 보여주지 않습니다. 기본값은 true 입니다. */
  showCustomerMobilePhone?: boolean;

  /** 휴대폰 결제창에서 선택할 수 있는 통신사를 제한합니다. 배열에 통신사 코드를 추가하면 해당 통신사 코드만 선택할 수 있는 결제창이 뜹니다.
    값을 넣지 않으면 모든 통신사 코드를 선택할 수 있는 결제창이 뜹니다. 통신사 코드를 참고하세요.
    */
  mobileCarrier?: string[];

  /** 고객이 구매한 각 상품의 상세 정보 객체를 담는 배열입니다. 예를 들어 고객이 세 가지 종류의 상품을 구매했다면 길이가 3인 배열이어야 합니다.
   * products 정보는 필수가 아니지만 이 정보를 보내려면 아래 항목은 모두 필수입니다.
   */
  products?: Product[];

  /** 고객이 구매한 각 상품의 배송 정보 객체입니다. */
  shipping?: Shipping;

  /** 결제수단의 추가 파라미터를 담는 객체입니다. 결제수단이나 결제사 별로 파라미터를 제공합니다. PayPal을 연동할 때는 paypal을 사용합니다. */
  paymentMethodOptions?: {
    /** PayPal의 추가 파라미터를 담는 객체입니다. */
    payPal?: {
      /**
       * PayPal에서 추가로 요청하는 STC(Set Transaction Context) 정보를 객체로 전달하는 필드입니다. 이 정보는 PayPal에서 부정거래, 결제 취소, 환불 등 리스크 관리에 활용합니다. 결제 거래의 안전성과 신뢰성을 확보하려면 이 정보를 전달해야 합니다. PayPal STC 문서를 참고해서 업종에 따라 필요한 파라미터를 추가해주세요. 문서의 표에 있는 ‘Data Field Name’ 컬럼 값을 객체의 ‘key’로, ‘Description’에 맞는 값을 객체의 ‘value’로 넣어주시면 됩니다.
       * 예를 들어 이벤트/티케팅 업종에 종사하고 있다면, STC 문서 3페이지에 해당하는 모든 파라미터를 setTransactionContext 객체에 추가하세요.
       * 이 정보는 토스페이먼츠에서 관리하지 않습니다.
       */
      setTransactionContext: any;
    };
  };

  /** 해외카드(Visa, MasterCard, JCB, UnionPay 등) 결제 여부입니다. 값이 true면 해외카드 결제가 가능한 다국어 결제창이 열립니다. */
  useInternationalCardOnly?: boolean;

  /** 결제 관련 정보를 추가할 수 있는 객체입니다. 최대 5개의 키-값(key-value) 쌍을 자유롭게 추가해주세요. 키는 [ , ] 를 사용하지 않는 최대 40자의 문자열, 값은 최대 500자의 문자열입니다. */
  metadata?: Record<string | symbol | number, unknown> | null;
}
