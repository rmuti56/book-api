import {
  IsOptional,
  ArrayNotEmpty,
  ValidateNested,
  IsNumber,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LogicalOperator } from '../enums/logical-operator.enum';
import { ComparisonOperator } from '../enums/comparison-operator.enum';
import { OrderByType } from '../enums/order-by.enum';


class WhereDto {
  @IsNotEmpty({ message: 'column_required' })
  column: string;

  @IsNotEmpty({ message: 'value_required' })
  value: string;

  @IsOptional()
  @IsEnum(LogicalOperator)
  logical?: LogicalOperator;

  @IsOptional()
  @IsEnum(ComparisonOperator)
  comparison?: ComparisonOperator;
}

class OrderByDto {
  @IsNotEmpty({ message: 'column_required' })
  column: string;

  @IsEnum(OrderByType)
  by: OrderByType;
}

export class QueryOptionDto {
  @IsOptional()
  @ArrayNotEmpty({ message: 'where_invalid' })
  @ValidateNested({ message: 'where_invalid' })
  @Type(() => WhereDto)
  wheres?: WhereDto[];

  @IsOptional()
  @IsNumber({}, { message: 'offet_invalid' })
  offset?: number;

  @IsOptional()
  @IsNumber({}, { message: 'limit_invalid' })
  limit?: number;

  @IsOptional()
  @ArrayNotEmpty({ message: 'order_invalid' })
  @ValidateNested({ message: 'order_invalid' })
  @Type(() => OrderByDto)
  orders?: OrderByDto[];
}
