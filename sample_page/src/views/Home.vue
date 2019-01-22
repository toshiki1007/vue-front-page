<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4 />
      <v-flex xs4 text-xs-center>
        <h3>New Item</h3>
        <v-form>
          <v-text-field v-model="sellerId" label="出品者ID"></v-text-field>
          <v-text-field v-model="itemName" label="商品名"></v-text-field>
          <v-text-field v-model="author" label="著者"></v-text-field>
          <v-text-field v-model="price" label="金額"></v-text-field>
          <v-text-field v-model="description" label="説明"></v-text-field>
        </v-form>
        <v-btn round color="primary" @click="putItem()">create Items</v-btn>
      </v-flex>
      <v-flex xs4 />
      <v-flex xs4 />
      <v-flex xs4 text-xs-left>
          <v-card v-show="newItem!=''">
              <v-card-text>
                <span>商品ID : {{ newItem.itemId }}</span><br>
                <span>購入者ID : {{ newItem.buyerId }}</span><br>
                <span>出品者ID : {{ newItem.sellerId }}</span><br>
                <span>商品名 : {{ newItem.itemName }}</span><br>
                <span>著者 : {{ newItem.author }}</span><br>
                <span>金額 : {{ newItem.price }}</span><br>
                <span>説明 : {{ newItem.description }}</span><br>
                <span>登録日 : {{ newItem.registerDate }}</span><br>
                <span>売却日 : {{ newItem.sellingDate }}</span>
              </v-card-text>
          </v-card>
      </v-flex>
      <v-flex xs4 />
      <v-flex xs4 text-xs-center>
        <h3>Items List</h3>
        <v-btn round color="primary" @click="getItems()">get Items</v-btn>
      </v-flex>
      <v-flex xs4 />
      <v-flex xs4 text-xs-center>
        <h3>Transactions List</h3>
        <v-form>
          <v-text-field v-model="userId" label="入出金履歴取得ユーザID"></v-text-field>
        </v-form>
        <v-btn round color="primary" @click="getTransactions()">get Transactions</v-btn>
      </v-flex>
      <v-flex xs4 v-for="(item, index) in items" :key="index" text-xs-left>
        <v-card>
            <div>
              <span>商品ID : {{ item.itemId }}</span><br>
              <span>購入者ID : {{ item.buyerId }}</span><br>
              <span>出品者ID : {{ item.sellerId }}</span><br>
              <span>商品名 : {{ item.itemName }}</span><br>
              <span>著者 : {{ item.author }}</span><br>
              <span>金額 : {{ item.price }}</span><br>
              <span>説明 : {{ item.description }}</span><br>
              <span>登録日 : {{ item.registerDate }}</span><br>
              <span>売却日 : {{ item.sellingDate }}</span>
            </div>
        </v-card>
      </v-flex>
      <v-flex xs4 v-for="(transaction, index) in transactions" :key="index" text-xs-left>
        <v-card>
            <div>
              <span>取引ID : {{ transaction.transactionId }}</span><br>
              <span>取引明細番号 : {{ transaction.serialNumber }}</span><br>
              <span>ウォレットID : {{ transaction.walletId }}</span><br>
              <span>取引金額 : {{ transaction.transactionAmount }}</span><br>
              <span>取引日 : {{ transaction.transactionDate }}</span><br>
              <span>取引種別 : {{ transaction.transactionType }}</span><br>
              <span>取引先ウォレットID : {{ transaction.tradingWalletId }}</span><br>
              <span>取引先ユーザID : {{ transaction.tradingUserId }}</span>
            </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import graphQL from '../services/graphQL.js'

  export default {
    name: 'Home',
    data() {
      return {
        items: [],
        transactions: [],
        newItem: '',
        sellerId: '123456',
        itemName: 'sample item name',
        author: 'sample author',
        price: 1000,
        description: 'sample description',
        userId: '123456',
        itemDisplay: false
      }
    },
    methods: {
      async getItems() {
        this.items = await graphQL.getItems()
        this.transactions = []
        this.newItem = ''
        this.itemDisplay = true
      },
      async putItem() {
        this.newItem = await graphQL.putItem(this.sellerId, this.itemName, this.author, this.price, this.description, 'sample itemimage')
        if (this.itemDisplay) {
          this.items = await graphQL.getItems()
        }
      },
      async getTransactions() {
        this.transactions = await graphQL.getTransactions(this.userId)
        this.items = []
        this.newItem = ''
        this.itemDisplay = false
      }
    },
    async mounted() {}
  }
</script>
