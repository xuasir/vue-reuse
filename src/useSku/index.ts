import { shallowRef, Ref } from 'vue-demi'
import {
  createSkuSelector,
  SpecInstanceType,
  SpecLineInstanceType,
  SpuOps
} from '@xuguo/sku'

type SKU = {
  specTap(spec: SpecInstanceType): void
  skuList: Ref<SpecLineInstanceType[]>
}

type SpuList<T> = {
  [key: string]: T[] | any
}

export function useSku<T>(spu: SpuList<T>, spuOps?: Partial<SpuOps>): SKU {
  const judger = createSkuSelector(spu, spuOps)
  const skuList = shallowRef(judger.specGroup.specLines)
  const specTap = (spec: any) => {
    judger.specTap(spec)
    skuList.value = judger.specGroup.specLines.concat()
  }
  return {
    specTap,
    skuList
  }
}
