// eslint-disable
// this is an auto generated file. This will be overwritten

export const getItem = `query GetItem($itemId: String!) {
  getItem(itemId: $itemId) {
    itemId
    buyerId
    sellerId
    itemName
    author
    price
    description
    itemImage
    registerDate
    sellingDate
  }
}
`;
export const listItems = `query ListItems(
  $filter: TableItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      itemId
      buyerId
      sellerId
      itemName
      author
      price
      description
      itemImage
      registerDate
      sellingDate
    }
    nextToken
  }
}
`;
export const listItemsBySellerIdIndex = `query ListItemsBySellerIdIndex(
  $sellerId: String!
  $first: Int
  $after: String
) {
  listItemsBySellerIdIndex(sellerId: $sellerId, first: $first, after: $after) {
    items {
      itemId
      buyerId
      sellerId
      itemName
      author
      price
      description
      itemImage
      registerDate
      sellingDate
    }
    nextToken
  }
}
`;
export const listItemsByBuyerIdIndex = `query ListItemsByBuyerIdIndex($buyerId: String!, $first: Int, $after: String) {
  listItemsByBuyerIdIndex(buyerId: $buyerId, first: $first, after: $after) {
    items {
      itemId
      buyerId
      sellerId
      itemName
      author
      price
      description
      itemImage
      registerDate
      sellingDate
    }
    nextToken
  }
}
`;
export const listTransactions = `query ListTransactions($userId: String!) {
  listTransactions(userId: $userId) {
    statusCode
    transactions {
      transactionId
      serialNumber
      transactionAmount
      transactionDate
      transactionType
      tradingWalletId
      tradingUserId
      walletId
    }
  }
}
`;
export const getWallet = `query GetWallet($userId: String!) {
  getWallet(userId: $userId) {
    walletId
    balance
  }
}
`;
