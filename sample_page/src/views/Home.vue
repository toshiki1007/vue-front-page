<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs4 text-xs-left>
        <h3>Login User</h3>
        <v-form>
          <v-text-field v-model="userId" label="ログインユーザID"></v-text-field>
        </v-form>
        <p>ウォレットID ： {{wallet.walletId}}</p>
        <p>ウォレット残高 ： {{wallet.balance}}</p>
        <br>
        <v-btn round color="primary" @click="changeUser()">change User</v-btn>
      </v-flex>
      <v-flex xs4 text-xs-center>
        <h3>New Item</h3>
        <v-form>
          <v-text-field v-model="itemName" label="商品名"></v-text-field>
          <v-text-field v-model="author" label="著者"></v-text-field>
          <v-text-field v-model="price" label="金額" maxlength="10"></v-text-field>
          <v-text-field v-model="description" label="説明"></v-text-field>
        </v-form>
        <v-btn round color="primary" @click="putItem()">create Items</v-btn>
      </v-flex>
      <v-flex xs4 text-xs-left>
          <v-card v-show="newItem!=''">
              <v-card-title>Created</v-card-title>
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
      <v-flex xs4 text-xs-center>
        <h3>Items List</h3>
        <v-btn round color="primary" @click="getItems()">get All Items</v-btn>
        <v-btn round color="primary" @click="getPurchaseHistory()">get Purchase History</v-btn>
      </v-flex>
      <v-flex xs4 text-xs-center>
        <h3>Remittance</h3>
        <v-form>
          <v-text-field v-model="remitteeId" label="送金先ユーザID"></v-text-field>
          <v-text-field v-model="amount" label="金額" maxlength="10"></v-text-field>
        </v-form>
        <v-btn round color="primary" @click="remittance()">Remittance</v-btn>
      </v-flex>
      <v-flex xs4 text-xs-center>
        <h3>Transactions List</h3>
        <v-btn round color="primary" @click="getTransactions()">get Transactions History</v-btn>
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
            <div class="item_button">
              <v-btn v-if="item.sellerId != userId && item.sellingDate === '9999-99-99'" round color="primary" @click="purchaseItem(item.itemId)">Purchase</v-btn>
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
        itemName: 'sample item name',
        author: 'sample author',
        price: 1000,
        description: 'sample description',
        userId: '123456',
        isItemDisplay: false,
        remitteeId: 'abcdefg',
        amount: 1000,
        wallet: ''
      }
    },
    methods: {
      async getItems() {
        this.items = await graphQL.getItems()
        this.transactions = []
        this.newItem = ''
        this.isItemDisplay = true
      },
      async getPurchaseHistory() {
        this.items = await graphQL.getItemsByBuyerId(this.userId)
        this.transactions = []
        this.newItem = ''
        this.isItemDisplay = true
      },
      async putItem() {
        this.newItem = await graphQL.putItem(this.userId, this.itemName, this.author, this.price, this.description, 'sample itemimage')
        if (this.isItemDisplay) {
          this.items = await graphQL.getItems()
        }
      },
      async getTransactions() {
        this.transactions = await graphQL.getTransactions(this.userId)
        this.items = []
        this.newItem = ''
        this.isItemDisplay = false
      },
      async purchaseItem(itemId) {
        const result = await graphQL.purchase(this.userId, itemId)
        if (result.statusCode == 400) {
          alert(result.errorMessage)
        }
        else {
          alert("購入完了")
          this.items = await graphQL.getItems()
          this.wallet = await graphQL.getWallet(this.userId)
        }
      },
      async remittance() {
        const result = await graphQL.remittance(this.userId, this.remitteeId, this.amount)
        if (result.statusCode == 400) {
          alert(result.message)
        }
        else {
          alert("送金完了")
          if (this.isItemDisplay) {
            this.items = await graphQL.getItems()
            this.wallet = await graphQL.getWallet(this.userId)
          }
        }
      },
      async changeUser() {
        this.items = await graphQL.getItems()
        this.transactions = []
        this.newItem = ''
        this.isItemDisplay = true
        this.wallet = await graphQL.getWallet(this.userId)
      }
    },
    async mounted() {
      this.wallet = await graphQL.getWallet(this.userId)
    }
  }
</script>

<style>
  .item_button {
    height: 50px;
    float: left;
    text-align: right;
  }
</style>
