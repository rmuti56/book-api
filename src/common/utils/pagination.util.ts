import { SelectQueryBuilder } from 'typeorm';

import { ComparisonOperator } from '../enums/comparison-operator.enum';
import { LogicalOperator } from '../enums/logical-operator.enum';
import { QueryOptionDto } from '../dto/query-option.dto';

export class PaginationUtil<T> {
  constructor(
    private queryBuilder: SelectQueryBuilder<T>,
    private readonly aliasName: string,
    private readonly queryOption: QueryOptionDto,
  ) {}

  private offset =
    this.queryOption && this.queryOption.offset ? this.queryOption.offset : 0;

  private limit = this.queryOption && this.queryOption.limit ? this.queryOption.limit : 10;

  private addWhere() {
    this.queryOption.wheres.forEach((item, index) => {
      let queryString = undefined;
      let parameters = undefined;


      let comparisonOperator = 'like';
      let value = `%${item.value}%`;

      if (item.comparison === ComparisonOperator.EQUAL) {
        comparisonOperator = '=';
        value = item.value;
      }

      if(item.comparison === ComparisonOperator.NOT_EQUAL){
        comparisonOperator = '!=';
        value = item.value;
      }


      if (item.column.includes('.')) {
        const [columnName, keyName] = item.column.split('.');
        queryString = `${this.aliasName}.${columnName} ::json ->> '${keyName}' ${comparisonOperator} :${keyName}`;
        parameters = { [keyName]: value };
      } else {
        queryString = `${this.aliasName}.${item.column} ${comparisonOperator} :${item.column}`;
        parameters = { [item.column]: value };
      }


      if (index === 0) {
        this.queryBuilder = this.queryBuilder.where(queryString, parameters);
      } else if (item.logical === LogicalOperator.AND) {
        this.queryBuilder = this.queryBuilder.andWhere(queryString, parameters);
      } else if (item.logical === LogicalOperator.OR) {
        this.queryBuilder = this.queryBuilder.orWhere(queryString, parameters);
      }
    });
  }

  private addOrder() {
    const queryObject = this.queryOption.orders.reduce((prevVal, current) => {
      prevVal[`${this.aliasName}.${current.column}`] = current.by;
      return prevVal;
    }, {});
    this.queryBuilder = this.queryBuilder.orderBy(queryObject);
  }

  private addOffset() {
    this.queryBuilder = this.queryBuilder.skip(this.offset);
  }

  private addLimit() {
    this.queryBuilder = this.queryBuilder.take(this.limit);
  }

  async paginate() {
    if (this.queryOption) {
      if (this.queryOption.wheres) {
        this.addWhere();
      }
      if (this.queryOption.orders) {
        this.addOrder();
      }
    }
    this.addOffset();
    this.addLimit();

    const [entities, totalCount] = await this.queryBuilder.getManyAndCount();

    const hasNext = totalCount - (this.offset + this.limit) > 0;

    return {
      entities,
      totalCount,
      hasNext,
    };
  }
}
