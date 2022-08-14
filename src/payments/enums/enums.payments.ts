export enum KindPayment {
    INCOME = 'income',
    EXPENSE = 'expense'
}

export enum Paymethod {
    CASH = 'cash',
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    BANK_TRANSFER = 'bank_transfer',
    PAGO_MOVIL = 'pago_movil',
    PAYPAL = 'paypal',
    OTHER = 'other',
    ZELLE = 'zelle'
}

export enum PaymentStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    VOID = 'void',
}