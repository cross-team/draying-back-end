// import our production apollo-server instance
import { server } from '../../'
import gql from 'graphql-tag'
import { startTestServer, toPromise } from '../__utils'

// const DRAYING_LIST_QUERY = gql`
//   query GetDrayings {
//     drayings(first: 25) {
//       __typename
//       totalCount
//       pageInfo {
//         startCursor
//         endCursor
//         hasNextPage
//         hasPreviousPage
//       }
//       edges {
//         node {
//           id
//           booking
//           client {
//             id
//           }
//           containerSize {
//             name
//           }
//           container
//           __typename
//         }
//       }
//     }
//   }
// `

const LAUNCH_LIST_QUERY = gql`
  {
    drayings(first: 25) {
      __typename
      totalCount
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          booking
          client {
            id
          }
          containerSize {
            name
          }
          container
          __typename
        }
      }
    }
  }
`

describe('Server - e2e', () => {
  let stop, graphql

  beforeEach(async () => {
    const testServer = await startTestServer(server)
    stop = testServer.stop
    graphql = testServer.graphql
  })

  afterEach(() => stop())

  it('gets list of drayings`', async () => {
    try {
      const res = await toPromise(
        graphql({
          query: LAUNCH_LIST_QUERY,
        }),
      )
      expect(res).toMatchSnapshot()
    } catch (error) {
      console.log(`Error Promise: ${error}`)
    }
  })
})
