//* Styles
export const listStyle = {
  display: "flex",
  margin: "0 auto",
  borderBottom: "2px white dotted",
};

export const taskStyle = { margin: "auto 0", width: "500px" };
export const buttonStyle = { margin: "auto 0 auto 1.2rem" };

//* Types
type TStatus = "pending" | "completed";

export interface ITodo {
  id: number;
  task: string;
  status: TStatus;
}
