export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

export async function fetchComments(): Promise<Comment[]> {
  return fetch('https://jsonplaceholder.typicode.com/comments').then((res) =>
    res.json()
  );
}
