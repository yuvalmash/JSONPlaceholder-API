import { PostType, PostsObj } from "../../types";

type Params = {
  pageStart?: number;
  postsIds?: number[];
  abortControllerPostsRef?: React.MutableRefObject<AbortController | null>;
};

type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const BASE_URL = "https://jsonplaceholder.typicode.com";
const POSTS = "/posts";
const COMMENTS = "/comments";

function changePostsDataStructure(posts: PostType[]) {
  let postsObj: PostsObj = {};
  for (const post of Object.values(posts)) {
    postsObj[post.id] = post;
  }
  return postsObj;
}

async function getPosts(URL: string, params: Params) {
  const response = await fetch(URL, {
    signal: params.abortControllerPostsRef?.current?.signal,
  });
  if (!response.ok) {
    throw new Error("Network response on '/posts' was not ok");
  }
  const jsonPosts = await response.json();
  return changePostsDataStructure(jsonPosts);
}

async function getComments(posts: PostsObj) {
  const postsIds: number[] = Object.keys(posts).map(Number);
  const comments = await Promise.all(
    postsIds.map(async (postId) => {
      const data = await fetch(`${BASE_URL + COMMENTS}?postId=${postId}`);
      return await data.json();
    })
  );
  return comments;
}

function addNumberOfCommentsToPosts(
  posts: PostsObj,
  comments: CommentType[][]
) {
  let commentFixIdIndex = 0;

  for (const postId in posts) {
    if (
      comments[commentFixIdIndex] &&
      comments[commentFixIdIndex].every(
        (comment) => comment.postId === parseInt(postId)
      )
    ) {
      posts[postId].numberOfComments = comments[commentFixIdIndex].length;
    }
    commentFixIdIndex++;
  }
  return posts;
}
export async function getPostsWithComments(params: Params) {
  let URL = BASE_URL + POSTS;
  const parsedPageStart = parseInt(params.pageStart?.toString() ?? "");
  if (!isNaN(parsedPageStart)) {
    URL += `?_start=${parsedPageStart}&_limit=15`;
  }
  if (params.postsIds) {
    URL += "?";
    for (let i = 0; i < params.postsIds.length; i++) {
      if (i > 0) {
        URL += "&";
      }
      URL += `id=${params.postsIds[i]}`;
    }
  }
  const posts = await getPosts(URL, params);
  const comments = await getComments(posts);
  return addNumberOfCommentsToPosts(posts, comments);
}
