// eslint-disable
// this is an auto generated file. This will be overwritten

export const updateBalance = `mutation UpdateBalance(
  $userId: String!
  $tradingUserId: String!
  $price: Int!
  $typeFlg: String!
) {
  updateBalance(
    userId: $userId
    tradingUserId: $tradingUserId
    price: $price
    typeFlg: $typeFlg
  ) {
    statusCode
    message
  }
}
`;
export const createItem = `mutation CreateItem($Input: CreateItemInput!) {
  createItem(Input: $Input) {
    statusCode
    body {
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
    errorMessage
  }
}
`;
export const purchaseItem = `mutation PurchaseItem($userId: String!, $itemId: String!) {
  purchaseItem(userId: $userId, itemId: $itemId) {
    statusCode
    body {
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
    errorMessage
  }
}
`;
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    userId
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    userId
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    userId
  }
}
`;
export const createWallet = `mutation CreateWallet($userId: String!) {
  createWallet(userId: $userId) {
    walletId
    balance
  }
}
`;
