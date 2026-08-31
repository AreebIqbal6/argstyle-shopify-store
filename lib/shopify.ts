const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// You can update this to the latest Shopify API version
const apiVersion = "2024-01"; 

export async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string;
  variables?: any;
}) {
  if (!domain || !storefrontAccessToken) {
    throw new Error("Shopify credentials are not set in environment variables.");
  }

  const isAdminToken = storefrontAccessToken.startsWith("shpss_") || storefrontAccessToken.startsWith("shpat_");
  
  // Use the correct endpoint and headers depending on whether it's an Admin token or Storefront token
  const endpoint = isAdminToken 
    ? `https://${domain}/admin/api/${apiVersion}/graphql.json`
    : `https://${domain}/api/${apiVersion}/graphql.json`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (isAdminToken) {
    headers["X-Shopify-Access-Token"] = storefrontAccessToken;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = storefrontAccessToken;
  }

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const body = await result.json();

    if (body.errors) {
      console.error("Shopify API Errors:", body.errors);
      throw new Error("Failed to fetch from Shopify API.");
    }

    return body.data;
  } catch (error) {
    console.error("Error connecting to Shopify:", error);
    throw error;
  }
}

export async function getProducts() {
  const query = `
    query getProductList {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            productType
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query });
  
  // Format the Shopify Admin API data to match the shape of the products your frontend expects
  return data.products.edges.map(({ node }: any, index: number) => {
    return {
      id: node.id,
      name: node.title,
      category: node.productType || "General",
      price: parseFloat(node.variants?.edges[0]?.node?.price?.amount || "0"),
      image: node.images?.edges[0]?.node?.url || "/dudesdrop-products.png",
      badge: index === 0 ? "NEW" : undefined,
    };
  });
}
