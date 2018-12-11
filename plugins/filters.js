import Vue from 'vue'

Vue.filter('priceFormat', val => '￥' + val.toLocaleString() )

Vue.filter('capitalize', val => val.toUpperCase())
