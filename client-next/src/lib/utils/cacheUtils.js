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
