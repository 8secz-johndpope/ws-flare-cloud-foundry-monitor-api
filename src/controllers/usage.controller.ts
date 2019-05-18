import {
    Count,
    CountSchema,
    Filter,
    repository,
    Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getFilterSchemaFor,
    getWhereSchemaFor,
    patch,
    put,
    del,
    requestBody,
} from '@loopback/rest';
import {Usage} from '../models';
import {UsageRepository} from '../repositories';

/**
 * Controller for /usages endpoint
 */
export class UsageController {
    constructor(
        @repository(UsageRepository)
        public usageRepository: UsageRepository,
    ) {
    }

    /**
     * Creates a new usage object
     *
     * @param usage - The usage to create
     */
    @post('/usages', {
        responses: {
            '200': {
                description: 'Usage model instance',
                content: {'application/json': {schema: {'x-ts-type': Usage}}},
            },
        },
    })
    async create(@requestBody() usage: Usage): Promise<Usage> {
        return await this.usageRepository.create(usage);
    }

    /**
     * Count usages with a given filter
     *
     * @param where - The filter to apply
     */
    @get('/usages/count', {
        responses: {
            '200': {
                description: 'Usage model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.query.object('where', getWhereSchemaFor(Usage)) where?: Where,
    ): Promise<Count> {
        return await this.usageRepository.count(where);
    }

    /**
     * Get a list of usages within a given filter
     *
     * @param filter - The filter to apply
     */
    @get('/usages', {
        responses: {
            '200': {
                description: 'Array of Usage model instances',
                content: {
                    'application/json': {
                        schema: {type: 'array', items: {'x-ts-type': Usage}},
                    },
                },
            },
        },
    })
    async find(
        @param.query.object('filter', getFilterSchemaFor(Usage)) filter?: Filter,
    ): Promise<Usage[]> {
        return await this.usageRepository.find(filter);
    }

    /**
     * Update a usage at a given filter
     *
     * @param usage - The usage to update
     * @param where - The filter to apply
     */
    @patch('/usages', {
        responses: {
            '200': {
                description: 'Usage PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody() usage: Usage,
        @param.query.object('where', getWhereSchemaFor(Usage)) where?: Where,
    ): Promise<Count> {
        return await this.usageRepository.updateAll(usage, where);
    }

    /**
     * Get a usage model by id
     *
     * @param id - The id to search for
     */
    @get('/usages/{id}', {
        responses: {
            '200': {
                description: 'Usage model instance',
                content: {'application/json': {schema: {'x-ts-type': Usage}}},
            },
        },
    })
    async findById(@param.path.string('id') id: string): Promise<Usage> {
        return await this.usageRepository.findById(id);
    }

    /**
     * Update a usage model by id
     * @param id - The usage id
     * @param usage - The usage model to update to
     */
    @patch('/usages/{id}', {
        responses: {
            '204': {
                description: 'Usage PATCH success',
            },
        },
    })
    async updateById(
        @param.path.string('id') id: string,
        @requestBody() usage: Usage,
    ): Promise<void> {
        await this.usageRepository.updateById(id, usage);
    }

    /**
     * Update a usage model by id
     * @param id - The usage id
     * @param usage - The usage model to update to
     */
    @put('/usages/{id}', {
        responses: {
            '204': {
                description: 'Usage PUT success',
            },
        },
    })
    async replaceById(
        @param.path.string('id') id: string,
        @requestBody() usage: Usage,
    ): Promise<void> {
        await this.usageRepository.replaceById(id, usage);
    }

    /**
     * Delete a usage model by id
     *
     * @param id - The usage model id to delete
     */
    @del('/usages/{id}', {
        responses: {
            '204': {
                description: 'Usage DELETE success',
            },
        },
    })
    async deleteById(@param.path.string('id') id: string): Promise<void> {
        await this.usageRepository.deleteById(id);
    }
}
