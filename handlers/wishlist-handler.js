const Wishlist = require("./../db/wishlist");

async function addToWishList(userId, productId) {
  const wishList = new Wishlist({
    userId: userId,
    productId: productId,
  });
  await wishList.save();
  return wishList.toObject();
}

async function removeFromWishList(userId, productId) {
  await Wishlist.deleteMany({
    userId: userId,
    productId: productId,
  });
}

async function getWishList(userId) {
  let wishLists = await Wishlist.find({ userId: userId }).populate("productId");
  return wishLists.map((x) => x.toObject().productId);
}

module.exports = { addToWishList, removeFromWishList, getWishList };
