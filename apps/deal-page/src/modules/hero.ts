import { getUrlParam } from 'ui';

const LOCATION_ASSET_CDN_BASE_URL =
  'https://res.cloudinary.com/podocu/image/upload/hopper-destinations';

function getHeroImageUrl(locationCode: string): string {
  return `${LOCATION_ASSET_CDN_BASE_URL}/${locationCode}_5x.jpg`;
}

export default function hero() {
  const locationCode = getUrlParam('location');
  if (!locationCode) throw Error('No "location" parameter is set.');

  const heroImageUrl = getHeroImageUrl(locationCode);
  const heroImage = <HTMLImageElement>(
    document.querySelector('[bun-ref="hero-img"]')
  );

  heroImage.src = heroImageUrl;
}
