export const prependToCacheList = ({ cache, query, fieldName, newItem }) => {
  try {
    const data = cache.readQuery({ query });
    if (!data || !data[fieldName]) return;

    cache.writeQuery({
      query,
      data: {
        [fieldName]: [newItem, ...data[fieldName]],
      },
    });
  } catch (err) {
    console.warn(`${fieldName} not in cache yet`, err);
  }
};

export const removeFromCacheList = ({
  cache,
  query,
  fieldName,
  removedItem,
}) => {
  try {
    const data = cache.readQuery({ query });
    if (!data || !data[fieldName]) return;

    const updatedList = data[fieldName].filter(
      (item) => item.id !== removedItem.id
    );

    cache.writeQuery({
      query,
      data: {
        [fieldName]: updatedList,
      },
    });
  } catch (err) {
    console.warn(`${fieldName} not in cache yet`, err);
  }
};
