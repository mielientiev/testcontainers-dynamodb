import { DynamoDBContainer, StartedDynamoDbContainer } from './DynamoDBContainer'

const initDataTest = [
  {
    table: {
      TableName: 'newTable',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
    items: [
      {
        id: '1',
        data: '222',
      },
      {
        id: '2',
        data: 'abc',
      },
    ],
  },
  {
    table: {
      TableName: 'emptyTable',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          KeyType: 'HASH',
          AttributeName: 'id',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
    items: [],
  },
]

describe('DynamoDB container', () => {
  jest.setTimeout(120000)

  let startedContainer: StartedDynamoDbContainer
  beforeAll(async() => {
    startedContainer = await new DynamoDBContainer().start()
  })

  afterEach(async() => {
    await startedContainer.resetData()
  })

  afterAll(async() => {
    await startedContainer.stop()
  })

  it('should start dynamodb container', async() => {
    const dynamoClient = startedContainer.createDynamoClient()
    expect(await dynamoClient.listTables().promise()).toEqual({ TableNames: [] })
  })

  it('should override data and reset it in dynamodb', async() => {
    const dynamoClient = startedContainer.createDynamoClient()
    const dynamoDocumentClient = startedContainer.createDocumentClient()
    await startedContainer.resetData(initDataTest)

    const allData = await dynamoDocumentClient.scan({ TableName: 'newTable' }).promise()

    expect(await dynamoClient.listTables().promise()).toEqual({ TableNames: ['emptyTable', 'newTable'] })
    expect(allData.Items).toEqual(initDataTest[0].items)
  })
})
