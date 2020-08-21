export const MockData = [
  {
    skuId: '1',
    spuSpecValues: [
      {
        specId: 'a',
        specName: '颜色',
        specValueId: '11',
        specValueRemark: '黑色',
      },
      {
        specId: 'b',
        specName: '尺寸',
        specValueId: '101',
        specValueRemark: 'L',
      },
    ],
  },
  {
    skuId: '2',
    spuSpecValues: [
      {
        specId: 'a',
        specName: '颜色',
        specValueId: '12',
        specValueRemark: '绿色',
      },
      {
        specId: 'b',
        specName: '尺寸',
        specValueId: '102',
        specValueRemark: 'S',
      },
    ],
  },
  {
    skuId: '2',
    spuSpecValues: [
      {
        specId: 'a',
        specName: '颜色',
        specValueId: '12',
        specValueRemark: '绿色',
      },
      {
        specId: 'b',
        specName: '尺寸',
        specValueId: '103',
        specValueRemark: 'XS',
      },
    ],
  },
]

export function generateSku() {
  return MockData.map(sku => {
    return sku.spuSpecValues.map(spec => spec.specValueRemark).join('-')
  })
}

export const MockDataCustomKey = {
  skuList: [
    {
      skuId: '1',
      specs: [
        {
          specId: 'a',
          specName: '颜色',
          specValueId: '11',
          specValueRemark: '黑色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '101',
          specValueRemark: 'L',
        },
      ],
    },
    {
      skuId: '2',
      specs: [
        {
          specId: 'a',
          specName: '颜色',
          specValueId: '12',
          specValueRemark: '绿色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '102',
          specValueRemark: 'S',
        },
      ],
    },
    {
      skuId: '2',
      specs: [
        {
          specId: 'a',
          specName: '颜色',
          specValueId: '12',
          specValueRemark: '绿色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '103',
          specValueRemark: 'XS',
        },
      ],
    },
  ]
}

export const spuOpt = {
  getSkuList(spu) {
    return spu.skuList
  },
  getSkuSpecList(sku) {
    return sku.specs
  },
}