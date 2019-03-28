import { DefaultCrudRepository } from '@loopback/repository';
import { Usage } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UsageRepository extends DefaultCrudRepository<Usage,
    typeof Usage.prototype.id> {
    constructor(
        @inject('datasources.mysql') dataSource: MysqlDataSource
    ) {
        super(Usage, dataSource);
    }
}
