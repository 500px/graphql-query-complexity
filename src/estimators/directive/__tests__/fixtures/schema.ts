/**
 * Created by Ivo Meißner on 28.07.17.
 */

import {
  buildSchema
} from 'graphql';

export default buildSchema(`
type Query {
  scalar: String @complexity(value: 5)
  negativeCostScalar: String @complexity(value: -20)
  multiDirective: String @cost(value: 1) @complexity(value: 2)
  
  childList(
    limit: Int, 
    ids: [ID],
    first: Int,
    filter: Filter
  ): [ChildType] @complexity(
    value: 3, 
    multipliers: ["first", "limit", "ids", "filter.limit", "filter.filters.0.limit"]
  )
}

input Filter {
  limit: Int
  ids: [ID]
  filters: [Filter]
}

type ChildType {
  scalar: String @complexity(value: 2)
}
`);
