export type PostsObj = {
    [key: number]: {
      numberOfComments?: number;
      userId: number;
      id: number;
      title: string;
      body: string;
    };
  };

export type PostType = {
userId: number;
id: number;
title: string;
body: string;
numberOfComments?: number;
};