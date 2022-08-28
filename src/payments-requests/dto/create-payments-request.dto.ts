import { IsCurrency, IsEnum, IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator'

enum paymentConcept {
    MONTHLY_PAYMENT = 'monthly_payment',
    SPECIAL_FEE = 'special_fee'
}
export class CreatePaymentsRequestDto {

    @IsString()
    readonly description: string

    @IsString()
    @IsEnum(paymentConcept)
    readonly concept: paymentConcept
    @IsMongoId()
    readonly community: string

    @IsNumber()
    @IsPositive()
    readonly amount: number

    @IsString()
    readonly currency: string

}
