export enum KindPayment {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum Paymethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  BANK_TRANSFER = 'bank_transfer',
  DIGITAL_PAYMENT = 'digital_payment',
  OTHER = 'other',
}

export enum PaymentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  VOID = 'void',
}
