import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../graphql/mutations'
import * as queries from '../graphql/queries'

export default {
	async getItems() {
		const items = await API.graphql(graphqlOperation(queries.listItems))
		return items.data.listItems.items
	},
	async getItemsByBuyerId(buyerId) {
		const items = await API.graphql(graphqlOperation(queries.listItemsByBuyerIdIndex, { buyerId: buyerId }))
		return items.data.listItemsByBuyerIdIndex.items
	},
	async putItem(sellerId, itemName, author, price, description, itemImage) {
		const itemDetail = {
			sellerId: sellerId,
			itemName: itemName,
			author: author,
			price: price,
			description: description,
			itemImage: itemImage
		}
		const newItem = await API.graphql(graphqlOperation(mutations.createItem, { Input: itemDetail }))
		return newItem.data.createItem.body
	},
	async getTransactions(userId) {
		const transactions = await API.graphql(graphqlOperation(queries.listTransactions, { userId: userId }))
		return transactions.data.listTransactions.transactions
	},
	async purchase(userId, itemId) {
		const item = await API.graphql(graphqlOperation(mutations.purchaseItem, { userId: userId, itemId: itemId }))
		return item.data.purchaseItem
	},
	async remittance(userId, remitterId, amount) {
		const result = await API.graphql(graphqlOperation(mutations.updateBalance, { userId: userId, tradingUserId: remitterId, price: amount, typeFlg: '0' }))
		return result.data.updateBalance
	},
	async getWallet(userId) {
		const wallet = await API.graphql(graphqlOperation(queries.getWallet, { userId: userId }))
		return wallet.data.getWallet
	}
}
