'use server'  
import { createCart } from '@/lib/shopify'  
export async function checkoutAction(variantIds: string[]) { return await createCart(variantIds) } 
