import { Client, expect } from '@loopback/testlab';
import { WsFlareJobsApiApplication } from '../..';
import { setupApplication, startMysqlContainer } from './test-helper';
import { Usage } from '../../models';

/**
 * Tests for storing usages on cloud foundry
 */
describe('Usage', () => {
    let app: WsFlareJobsApiApplication;
    let client: Client;
    let container: any;
    let port: number;

    before(async () => {
        ({container, port} = await startMysqlContainer());

        ({app, client} = await setupApplication(port));
    });

    after(async () => {
        await container.stop();
        await app.stop();
    });

    it('should create a new usage statistic', async () => {
        const res = await client.post('/usages').send({
            jobId: 'job1-id',
            appId: 'app1-id',
            mem: 317297899010,
            cpu: 0.23,
            disk: 6008,
            mem_quota: 317297899023,
            disk_quota: 317297899034,
            instance: 0,
            time: '2014-06-19 22:37:58 +0000',
            state: 'RUNNING',
            uptime: 9002,
            name: 'my-super-app'
        }).expect(200);

        expect(res.body.id).not.null();
        expect(res.body.createdAt).not.null();
        expect(res.body.jobId).to.eql('job1-id');
        expect(res.body.appId).to.eql('app1-id');
        expect(res.body.mem).to.eql(317297899010);
        expect(res.body.cpu).to.eql(0.23);
        expect(res.body.mem_quota).to.eql(317297899023);
        expect(res.body.disk_quota).to.eql(317297899034);
        expect(res.body.instance).to.eql(0);
        expect(res.body.time).to.eql('2014-06-19 22:37:58 +0000');
        expect(res.body.state).to.eql('RUNNING');
        expect(res.body.uptime).to.eql(9002);
        expect(res.body.name).to.eql('my-super-app');
    });

    it('should get a list of usage statistics', async () => {
        await client.post('/usages').send({
            jobId: 'job1-id',
            appId: 'app1-id',
            mem: 1024,
            cpu: 0.003,
            disk: 6008,
            mem_quota: 2056,
            disk_quota: 50077,
            instance: 0,
            time: '2014-06-19 22:37:58 +0000',
            state: 'RUNNING',
            uptime: 9002,
            name: 'my-test-usage'
        }).expect(200);
        await client.post('/usages').send({
            jobId: 'job1-id',
            appId: 'app1-id',
            mem: 1024,
            cpu: 2056,
            disk: 6008,
            mem_quota: 2056,
            disk_quota: 50077,
            instance: 0,
            time: '2014-06-19 22:37:58 +0000',
            state: 'RUNNING',
            uptime: 9002,
            name: 'app2'
        }).expect(200);
        await client.post('/usages').send({
            jobId: 'job1-id',
            appId: 'app1-id',
            mem: 1024,
            cpu: 2056,
            disk: 6008,
            mem_quota: 2056,
            disk_quota: 50077,
            instance: 0,
            time: '2014-06-19 22:37:58 +0000',
            state: 'RUNNING',
            uptime: 9002,
            name: 'app3'
        }).expect(200);

        const res = await client.get('/usages').expect(200);

        const testUsage: Usage = res.body.find((usage: Usage) => usage.name === 'my-test-usage');

        expect(testUsage.cpu).to.equal(0.003);

        expect(res.body.length).to.be.greaterThan(2);
    });

});
