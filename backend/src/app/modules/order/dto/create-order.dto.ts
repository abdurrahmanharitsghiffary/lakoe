import {
    IsInt,
    IsOptional,
    IsString,
    IsDecimal,
    IsNotEmpty
} from 'class-validator';

export class CreateOrderDto {
    @IsInt()
    qty: number;

    @IsDecimal()
    pricePerProduct: number;

    @IsDecimal({ decimal_digits: '2,1' })
    @IsOptional()
    discount?: number;

    @IsString()
    @IsNotEmpty()
    receiverAddress: string;

    @IsString()
    @IsNotEmpty()
    receiverPostalCode: string;

    @IsString()
    @IsNotEmpty()
    receiverCityDistrict: string;

    @IsString()
    @IsNotEmpty()
    receiverProvince: string;

    @IsString()
    @IsNotEmpty()
    receiverLatitude: string;

    @IsString()
    @IsNotEmpty()
    receiverLongitude: string;

    @IsInt()
    productVariantId: number;

    @IsInt()
    userId: number;

    @IsOptional()
    courier?: {
        courierCode: string;
        courierServiceCode: string;
        courierServiceName: string;
        price: number;
    };
}
