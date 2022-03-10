import axios from 'axios';
import getCurrentBearerToken from '../../authentication/getCurrentBearerToken';
import getAuthorizationHeaders from '../../authentication/getAuthorizationHeaders';
import { ApiContext, Wishlist } from '../../../types';
import { deserializeWishlist } from '../../serializers/wishlist';
import { emptyWishlist, getWishlistInclude } from '../../common/wishlist';

export default async function getWishlistV1({ client, config }: ApiContext): Promise<Wishlist> {
  const url = config.backendUrl.concat(`/api/v2/storefront/wishlists/default?include=${getWishlistInclude}`);
  const bearerToken = await getCurrentBearerToken({ client, config });
  if (!bearerToken) return emptyWishlist;

  const result = await axios.get(url, {
    headers: getAuthorizationHeaders({ bearerToken })
  });

  const { data, included } = result.data;
  return deserializeWishlist(data, included, config);
}
