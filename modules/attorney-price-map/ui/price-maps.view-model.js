export const PriceMapsViewModelType = {
  Loading: 'Loading',
  Rejected: 'Rejected',
  WithPriceMaps: 'WithPriceMaps',
  WithoutPriceMaps: 'WithoutPriceMaps',
}

export const priceMapsViewModel = (store) => {
  const priceMaps = store.attorneyPriceMap.priceMaps
  const priceMapsState = store.attorneyPriceMap.state

  if (priceMapsState === 'pending') {
    return {
      type: PriceMapsViewModelType.Loading,
    }
  }

  if (priceMapsState === 'rejected') {
    return {
      type: PriceMapsViewModelType.Rejected,
    }
  }
  if ((priceMaps.length === 0 && priceMaps === 'fulfilled') || priceMaps === 'idle') {
    return {
      type: PriceMapsViewModelType.WithoutPriceMaps,
    }
  }

  return {
    type: PriceMapsViewModelType.WithPriceMaps,
    priceMaps: priceMaps,
  }
}
