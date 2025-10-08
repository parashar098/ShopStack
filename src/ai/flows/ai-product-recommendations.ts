'use server';

/**
 * @fileOverview AI-powered product recommendation flow.
 *
 * This file defines a Genkit flow that suggests related products to a user based on their browsing history and past purchases.
 * It exports:
 *   - `getProductRecommendations`: A function to trigger the product recommendation flow.
 *   - `ProductRecommendationsInput`: The input type for the `getProductRecommendations` function.
 *   - `ProductRecommendationsOutput`: The output type for the `getProductRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  browsingHistory: z.array(z.string()).describe('The user\'s browsing history (list of product IDs).'),
  pastPurchases: z.array(z.string()).describe('The user\'s past purchases (list of product IDs).'),
});

export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProductIds: z.array(z.string()).describe('A list of recommended product IDs.'),
});

export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function getProductRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are an e-commerce recommendation engine. Given a user's browsing history and past purchases, suggest related products that the user might be interested in.

  User ID: {{{userId}}}
  Browsing History: {{#if browsingHistory}}{{{browsingHistory}}}{{else}}None{{/if}}
  Past Purchases: {{#if pastPurchases}}{{{pastPurchases}}}{{else}}None{{/if}}

  Based on this information, recommend a list of product IDs that the user might be interested in.  Only return a list of product IDs, separated by commas.  Do not include any other text.
  `,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await productRecommendationsPrompt(input);
    const recommendedProductIds = output!.recommendedProductIds;
    return {recommendedProductIds: recommendedProductIds};
  }
);
