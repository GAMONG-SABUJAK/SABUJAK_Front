export const getBookmarks = () => {
  const saved = localStorage.getItem("bookmarks");
  return saved ? JSON.parse(saved) : [];
};

export const toggleBookmark = (id) => {
  let bookmarks = getBookmarks();

  if (bookmarks.includes(id)) {
    bookmarks = bookmarks.filter((b) => b !== id);
  } else {
    bookmarks.push(id);
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  return bookmarks;
};

export const isBookmarked = (id) => {
  return getBookmarks().includes(id);
};
