import Storefront from '@/components/storefront'
import { getProducts } from '@/lib/shopify'

export default async function CatchAllPage() {
  const shopifyProducts = await getProducts().catch((e) => {
    console.error(e)
    return null
  })

  return <Storefront shopifyProducts={shopifyProducts} />
}
