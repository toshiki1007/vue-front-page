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
	}
}
