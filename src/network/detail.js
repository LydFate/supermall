import {request} from './request';

/**
 * 请求商品数据 传入iid
 */
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  }) 
}

/**
 * 商品信息
 */
export class detailGoods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.title = itemInfo.title
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

/**
 * 店铺信息
 */
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}