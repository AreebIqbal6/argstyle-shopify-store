import Storefront from '@/components/storefront'
import { getProducts } from '@/lib/shopify'

export default async function CatchAllPage() {
  // Disabling the Shopify fetch temporarily so you can see your UI without errors!
  // const shopifyProducts = await getProducts().catch((e) => {
  //   console.error(e)
  //   return null
  // })

  return <Storefront shopifyProducts={null} />
}
