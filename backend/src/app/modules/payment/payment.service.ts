// eslint-disable-next-line @typescript-eslint/no-require-imports
const SSLCommerzPayment = require('sslcommerz-lts');

import config from '../../config';
import UserModel from '../user/user.model';

interface SSLCommerzInstance {
  init(data: Record<string, unknown>): Promise<{ GatewayPageURL?: string }>;
  validate(data: { val_id: string }): Promise<{ status?: string }>;
}

const getSslcz = (): SSLCommerzInstance => {
  const store_id = config.ssl_store_id as string;
  const store_passwd = config.ssl_store_passwd as string;
  const is_live = config.node_env === 'production';
  return new SSLCommerzPayment(store_id, store_passwd, is_live) as SSLCommerzInstance;
};

export const initiatePaymentService = async (
  userId: string,
  email: string,
) => {
  const tranId = `QS_${userId}_${Date.now()}`;

  // Look up name from DB
  const user = await UserModel.findById(userId).select('fullName');
  const name = (user?.fullName as string) || 'QuickShort User';
  const data = {
    total_amount: 9,
    currency: 'USD',
    tran_id: tranId,
    success_url: `${config.base_url}/api/payment/success`,
    fail_url: `${config.base_url}/api/payment/fail`,
    cancel_url: `${config.base_url}/api/payment/cancel`,
    ipn_url: `${config.base_url}/api/payment/ipn`,
    shipping_method: 'No',
    product_name: 'QuickShort Pro',
    product_category: 'Software',
    product_profile: 'non-physical-goods',
    cus_name: name,
    cus_email: email,
    cus_add1: 'N/A',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    cus_phone: '01XXXXXXXXX',
    ship_name: name,
    ship_add1: 'N/A',
    ship_city: 'Dhaka',
    ship_country: 'Bangladesh',
    ship_phone: '01XXXXXXXXX',
  };

  const sslcz = getSslcz();
  const response = await sslcz.init(data);

  if (response?.GatewayPageURL) {
    return { url: response.GatewayPageURL };
  }

  throw new Error('Failed to initialize payment gateway');
};

export const verifyAndUpgradeService = async (val_id: string, tran_id: string) => {
  const sslcz = getSslcz();
  const validation = await sslcz.validate({ val_id });

  if (validation?.status !== 'VALID' && validation?.status !== 'VALIDATED') {
    throw new Error('Payment validation failed');
  }

  // tran_id format: QS_{userId}_{timestamp}
  const parts = tran_id.split('_');
  if (parts.length < 3 || parts[0] !== 'QS') {
    throw new Error('Invalid transaction ID format');
  }

  const userId = parts[1];
  const proExpiresAt = new Date();
  proExpiresAt.setDate(proExpiresAt.getDate() + 30); // 30-day subscription
  await UserModel.findByIdAndUpdate(userId, { status: 'pro-user', proExpiresAt });
};
