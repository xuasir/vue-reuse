import { useSku } from '../src'
import { isRef } from 'vue-demi'

describe('test useSku', () => {
  const MockData = [
    {
      skuId: '1',
      spuSpecValues: [
        {
          specId: 'a',
          specName: '颜色',
          specValueId: '2',
          specValueRemark: '黑色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '3',
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
          specValueId: '3',
          specValueRemark: '蓝色',
        },
        {
          specId: 'b',
          specName: '尺寸',
          specValueId: '4',
          specValueRemark: 'S',
        },
      ],
    },
  ]

  test('should return a skuList and a func', () => {
    const { specTap, skuList } = useSku(MockData)
    expect(specTap).toBeDefined()
    expect(isRef(skuList)).toBeTruthy()
  })

  test('default data', () => {
    const { skuList } = useSku(MockData)

    skuList.value.forEach((specLine) => {
      specLine.specs.forEach((spec) => {
        expect(spec.status).toEqual('pending')
      })
    })
  })

  test('tap spec', () => {
    const { specTap, skuList } = useSku(MockData)
    const getSpec = (row: number, col: number) => skuList.value[row].specs[col]
    specTap(getSpec(0, 0))
    expect(getSpec(0, 0).status).toEqual('selected')
    expect(getSpec(0, 1).status).toEqual('pending')
    expect(getSpec(1, 0).status).toEqual('pending')
    expect(getSpec(1, 1).status).toEqual('disabled')
  })
})
