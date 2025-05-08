export function getInventoryMode(): boolean {
  return process.env.NEXT_PUBLIC_INVENTORY_MODE === 'true';
}
