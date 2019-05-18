import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import { config } from './mysql.datasource-config';

/**
 * Data source for connecting to mysql
 */
export class MysqlDataSource extends juggler.DataSource {
    static dataSourceName = 'mysql';

    constructor(
        @inject('datasources.config.mysql', {optional: true})
        private dsConfig: object = config,
        @inject('mysql.host')
        private host: string,
        @inject('mysql.port')
        private port: number,
        @inject('mysql.username')
        private user: string,
        @inject('mysql.password')
        private password: number
    ) {
        super({...dsConfig, host, port, user, password});
    }
}
