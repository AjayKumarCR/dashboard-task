export const parseItemList = (itemList) => {
  const itemSet = {};
  const items = itemList?.split(";");
  if (items) {
    items.map((item) => {
      const quantity = item.split(":");
      return (itemSet[quantity[0]] = itemSet[quantity[0]]
        ? parseInt(itemSet[quantity[0]]) + parseInt(quantity[1])
        : quantity[1]);
    });
    var stringifiedResult = JSON.stringify(itemSet);
    stringifiedResult = stringifiedResult.replace("{", "");
    stringifiedResult = stringifiedResult.replace("}", "");
    stringifiedResult = stringifiedResult.replace(/"/g, "");
    return stringifiedResult.split(",");
  } else {
    return [];
  }
};
