import { ApolloError } from 'apollo-server-express'

const cursorPostion = (results, cursor, getCursor) => {
  return results.findIndex(item => {
    // if an item has a `after` on it, use that, otherwise try to generate one
    const itemCursor = item.id ? item.id : getCursor(item)

    const cursorIndex = fromCursorHash(cursor)
    // eslint-disable-next-line eqeqeq
    return itemCursor ? cursorIndex == itemCursor : false
  })
}

const paginateResults = ({
  before,
  after,
  first,
  last,
  results,
  // can pass in a function to calculate an item's after
  getCursor = () => null,
}) => {
  if (!first && !last) {
    throw new ApolloError(`Must provide either 'first' or 'last'`)
  }
  if (first && last) {
    throw new ApolloError(`Must provide either 'first' or 'last'`)
  }
  if (first < 1 || last < 1) return []

  let afterCursorPosition = 0
  let beforeCursorPosition = results.length > 0 ? results.length - 1 : 0
  if (first) {
    if (!after && !before) return results.slice(0, first)

    if (after) {
      afterCursorPosition = cursorPostion(results, after, getCursor)
    }
    if (before) {
      beforeCursorPosition = cursorPostion(results, before, getCursor)
    }

    return results.slice(
      afterCursorPosition + 1,
      Math.min(beforeCursorPosition, afterCursorPosition + 1 + first),
    )
  }
  if (last) {
    if (!after && !before) {
      return results.slice(results.length - last, results.length)
    }
    if (after) {
      afterCursorPosition = cursorPostion(results, after, getCursor)
    }
    if (before) {
      beforeCursorPosition = cursorPostion(results, before, getCursor)
    }

    return results.slice(
      Math.max(afterCursorPosition + 1, beforeCursorPosition - last),
      Math.min(results.length, beforeCursorPosition),
    )
  }
}

const toCursorHash = string => Buffer.from(string.toString()).toString('base64')

const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii')

const pageInfoReducer = (nodes, results) => {
  const edges = nodes.map(node => ({
    node: node,
    cursor: toCursorHash(node.id),
  }))
  return {
    nodes,
    edges,
    pageInfo: {
      startCursor: nodes.length ? toCursorHash(nodes[0].id) : null,
      endCursor: nodes.length ? toCursorHash(nodes[nodes.length - 1].id) : null,
      hasNextPage: nodes.length
        ? nodes[nodes.length - 1].id !== results[results.length - 1].id
        : false,
      hasPreviousPage: nodes.length ? nodes[0].id !== results[0].id : false,
    },
    totalCount: nodes.length || 0,
  }
}

export { paginateResults, toCursorHash, fromCursorHash, pageInfoReducer }
