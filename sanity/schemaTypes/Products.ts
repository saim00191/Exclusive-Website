import { Rule } from "sanity";

export const Products = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'tag',
        title: 'Tag',
        type: 'string',
        description: 'Category or tag for the product (optional)',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        description: 'Product image (optional)',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'discountPercentage',
        title: 'Discount Percentage',
        type: 'number',
        description: 'Discount percentage for the product (optional)',
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Name or title of the product (optional)',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
        description: 'Description of the product (optional)',
      },
      {
        name: 'buyingPrice',
        title: 'Buying Price',
        type: 'number',
        description: 'Buying price of the product (optional)',
      },
      {
        name: 'profitPrice',
        title: 'Profit Price',
        type: 'number',
        description: 'Profit Price',
      },
      {
        name: 'profitPercentage',
        title: 'Profit Percentage',
        type: 'number',
        description: 'Profit Percentage',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        description: 'Current price of the product (optional)',
      },
      {
        name: 'previousPrice',
        title: 'Previous Price',
        type: 'number',
        description: 'Previous price of the product before discount (optional)',
      },
      {
        name: 'stars',
        title: 'Stars',
        type: 'number',
        description: 'Rating of the product (optional)',
        validation: (Rule : Rule) => Rule.min(0).max(5).precision(1),
      },
      {
        name: 'reviews',
        title: 'Reviews',
        type: 'number',
        description: 'Reviews (optional)',
      },
    ],
  };
  