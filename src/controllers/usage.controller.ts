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

export class UsageController {
  constructor(
    @repository(UsageRepository)
    public usageRepository : UsageRepository,
  ) {}

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
