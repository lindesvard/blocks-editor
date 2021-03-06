export const validLink = (url: string) =>
  Boolean(
    url.match(
      /((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\+~#?&//=]*)/
    )
  );

export const getTweetId = (url: string) => {
  const splits = url.split("/");
  return splits[splits.length - 1].replaceAll("/", "");
};
