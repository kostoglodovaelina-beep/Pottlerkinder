export type ProductOption = {
  name: string
  value: string
}

export type ProductVariant = {
  id: string
  price?: string
  compareAtPrice?: string | null
  sku?: string
  availableForSale?: boolean
  selectedOptions?: ProductOption[]
}

type VariantProduct = {
  variants?: ProductVariant[]
  colorOptions?: Array<{
    label: string
    value: string
  }>
}

export function findProductVariant(
  product: VariantProduct,
  size: string,
  color: string,
) {
  const colorLabel =
    product.colorOptions?.find((item) => item.value === color)?.label || color
  return product.variants?.find((variant) => {
    if (variant.availableForSale === false) return false
    const options = variant.selectedOptions || []
    const sizeOption = options.find((option) =>
      ["größe", "groesse", "size"].includes(option.name.toLowerCase()),
    )
    const colorOption = options.find((option) =>
      ["farbe", "color"].includes(option.name.toLowerCase()),
    )
    return (
      (!sizeOption || sizeOption.value === size) &&
      (!colorOption || colorOption.value === colorLabel)
    )
  })
}

export function formatVariantPrice(value: string | null | undefined) {
  if (value == null || value.trim() === "" || !Number.isFinite(Number(value)))
    return null
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value))
}
