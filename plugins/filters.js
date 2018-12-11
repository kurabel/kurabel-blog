import Vue from 'vue'

Vue.filter('priceFormat', val => '￥' + val.toLocaleString() )
