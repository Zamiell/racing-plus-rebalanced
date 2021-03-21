import { CATALOG_ITEM_PRICE, SHOP_PRICES, TWO_HEART_ITEMS } from "../constants";
import g from "../globals";
import { CollectibleState, CollectibleTypeCustom } from "../types/enums.custom";

export default (): void => {
  const pedestals = Isaac.FindByType(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COLLECTIBLE,
    -1,
    false,
    false,
  );
  for (const pedestal of pedestals) {
    const pickup = pedestal.ToPickup();
    if (pickup === null) {
      continue;
    }

    // Collectible states start at 0
    // Racing+ sets the state to 1 when it is finished replacing the pedestal
    // (we must wait until it has replaced the pedestal, or we will inadvertently duplicate it)
    if (
      pickup.SubType !== CollectibleType.COLLECTIBLE_NULL &&
      pickup.State !== CollectibleState.NORMAL
    ) {
      checkDDPrice(pickup);
      checkShopPrice(pickup);
      checkSetBossItem(pickup);
    }
  }
};

// We need to make some items cost 2 red hearts without modifying the "items.xml" file
function checkDDPrice(pickup: EntityPickup) {
  // Local variables
  const roomType = g.r.GetType();

  if (
    roomType !== RoomType.ROOM_CURSE && // 10
    roomType !== RoomType.ROOM_DEVIL && // 14
    roomType !== RoomType.ROOM_BLACK_MARKET // 22
  ) {
    return;
  }

  // We only care about items that have a negative price,
  // as those are the ones that cost red hearts or soul hearts
  if (pickup.Price === 0 || pickup.Price === PickupPrice.PRICE_FREE) {
    return;
  }

  const DDPrice = getDDPrice(pickup.SubType);
  if (pickup.Price !== DDPrice) {
    // Update the price to what it should be
    pickup.AutoUpdatePrice = false;
    pickup.Price = DDPrice;
  }
}

function getDDPrice(subType: CollectibleType | CollectibleTypeCustom) {
  // Local variables
  const maxHearts = g.p.GetMaxHearts();

  // If we have no red hearts, then all devil items will cost 3 soul hearts
  if (maxHearts === 0) {
    return -3;
  }

  // Judas' Tongue causes all 2 red heart items to cost 1 red heart
  if (g.p.HasTrinket(TrinketType.TRINKET_JUDAS_TONGUE)) {
    return -1;
  }

  // Good items should cost 2 red hearts
  if (TWO_HEART_ITEMS.includes(subType)) {
    return -2;
  }

  // By default, all items cost 1 red heart
  return -1;
}

// Items will have custom prices instead of always being 15 cents
function checkShopPrice(pickup: EntityPickup) {
  if (
    pickup.Price === 0 ||
    pickup.Price === PickupPrice.PRICE_ONE_HEART ||
    pickup.Price === PickupPrice.PRICE_TWO_HEARTS ||
    pickup.Price === PickupPrice.PRICE_THREE_SOULHEARTS
  ) {
    return;
  }

  const price = getPrice(pickup);
  if (pickup.Price !== price) {
    // Change the price to the custom value
    pickup.AutoUpdatePrice = false;
    pickup.Price = price;
  }
}

function getPrice(pickup: EntityPickup) {
  // Local variables
  const numSteamSales = g.p.GetCollectibleNum(
    CollectibleType.COLLECTIBLE_STEAM_SALE,
  );

  if (g.p.HasTrinket(TrinketType.TRINKET_STORE_CREDIT)) {
    return PickupPrice.PRICE_FREE;
  }
  if (numSteamSales === 2) {
    return PickupPrice.PRICE_FREE;
  }

  let price: int;

  const shopPrice = SHOP_PRICES.get(pickup.SubType);
  if (shopPrice === undefined) {
    const data = pickup.GetData();
    if (data.catalogItem !== undefined) {
      price = CATALOG_ITEM_PRICE;
    } else {
      price = 15; // Default price
    }
  } else {
    price = shopPrice;
  }

  if (numSteamSales === 1) {
    price = math.floor(price / 2);
  }

  return price;
}

function checkSetBossItem(pedestal: EntityPickup) {
  // Local variables
  const roomType = g.r.GetType();

  if (roomType !== RoomType.ROOM_BOSS) {
    return;
  }

  if (
    pedestal.SubType === CollectibleType.COLLECTIBLE_CUBE_OF_MEAT || // 73
    pedestal.SubType === CollectibleType.COLLECTIBLE_LITTLE_CHAD || // 96
    pedestal.SubType === CollectibleType.COLLECTIBLE_LITTLE_GISH || // 99
    pedestal.SubType === CollectibleType.COLLECTIBLE_LITTLE_STEVEN || // 100
    pedestal.SubType === CollectibleType.COLLECTIBLE_PONY || // 130
    pedestal.SubType === CollectibleType.COLLECTIBLE_WHITE_PONY || // 181
    pedestal.SubType === CollectibleType.COLLECTIBLE_BALL_OF_BANDAGES // 207
  ) {
    const newEntity = g.g.Spawn(
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_COLLECTIBLE,
      pedestal.Position,
      pedestal.Velocity,
      pedestal.Parent,
      0,
      pedestal.InitSeed,
    );
    const newPedestal = newEntity.ToPickup();
    if (newPedestal !== null) {
      newPedestal.TheresOptionsPickup = pedestal.TheresOptionsPickup;
    }
    pedestal.Remove();
  }
}
