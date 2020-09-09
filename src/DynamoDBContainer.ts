import { GenericContainer, StartedTestContainer, StoppedTestContainer } from 'testcontainers'
import { Command, ContainerName, ExecResult } from 'testcontainers/dist/docker-client'
import { Host } from 'testcontainers/dist/docker-client-factory'
import { Id } from 'testcontainers/dist/container'
import { Port } from 'testcontainers/dist/port'
import { StopOptions } from 'testcontainers/dist/test-container'
import { DynamoDB } from 'aws-sdk'

export class StartedDynamoDBContainer implements StartedTestContainer {
  constructor(
    private readonly startedContainer: StartedTestContainer,
    private readonly initData: Array<TableInitStructure>,
  ) {
  }

  exec(command: Command[]): Promise<ExecResult> {
    return this.startedContainer.exec(command)
  }

  getContainerIpAddress(): Host {
    return this.startedContainer.getContainerIpAddress()
  }

  getId(): Id {
    return this.startedContainer.getId()
  }

  getMappedPort(port: Port): Port {
    return this.startedContainer.getMappedPort(port)
  }

  getName(): ContainerName {
    return this.startedContainer.getName()
  }

  logs(): Promise<NodeJS.ReadableStream> {
    return this.startedContainer.logs()
  }

  stop(options?: Partial<StopOptions>): Promise<StoppedTestContainer> {
    return this.startedContainer.stop(options)
  }

  endpointUrl(): string {
    return `http://${this.startedContainer.getContainerIpAddress()}:${this.startedContainer.getMappedPort(DynamoDBContainer.MAPPED_PORT)}`
  }

  private get clientConfig(): object {
    return {
      endpoint: this.endpointUrl(),
      region: 'eu-central-1',
      credentials: {
        accessKeyId: 'dummy',
        secretAccessKey: 'dummy',
      },
    }
  }

  createDocumentClient(): DynamoDB.DocumentClient {
    return new DynamoDB.DocumentClient(this.clientConfig)
  }

  createDynamoClient(): DynamoDB {
    return new DynamoDB(this.clientConfig)
  }

  async resetData(overrideData?: Array<TableInitStructure>): Promise<void> {
    const createTableClient = this.createDynamoClient()
    const documentClient = this.createDocumentClient()
    for (const tableStructure of (overrideData || this.initData)) {
      // delete table if exist
      await createTableClient.deleteTable({ TableName: tableStructure.table.TableName }).promise().catch(err => {
        if (err.code !== 'ResourceNotFoundException') {
          throw err
        }
      })
      // create table
      await createTableClient.createTable(tableStructure.table).promise()

      // init data
      if (tableStructure.items && tableStructure.items.length > 0) {
        const tableName = tableStructure.table.TableName
        const putRequests = tableStructure.items.map(x => ({ PutRequest: { Item: x } }))
        await documentClient.batchWrite({
          RequestItems: {
            [tableName]: putRequests,
          },
        }).promise()
      }
    }
  }
}

export interface TableInitStructure {
  table: DynamoDB.Types.CreateTableInput
  items?: Array<object>
}

export class DynamoDBContainer extends GenericContainer {
  private static readonly IMAGE_NAME = 'amazon/dynamodb-local'
  public static readonly MAPPED_PORT = 8000

  constructor(private readonly initStructure: Array<TableInitStructure> = []) {
    super(DynamoDBContainer.IMAGE_NAME)
    this.withExposedPorts(DynamoDBContainer.MAPPED_PORT)
  }

  async start(): Promise<StartedDynamoDBContainer> {
    const startedContainer = new StartedDynamoDBContainer(await super.start(), this.initStructure)
    await startedContainer.resetData()

    return startedContainer
  }
}
