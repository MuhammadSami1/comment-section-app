"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bold,
  Circle,
  Code,
  Delete,
  Italic,
  Pencil,
  Reply,
} from "lucide-react";
import { CSSProperties, HTMLAttributes, useState } from "react";
import Modal from "./modal";

type CommentType = {
  message: string;
  likes: number;
  replys: any;
  id: number;
  isCode: boolean;
  style: CSSProperties | undefined;
};
export default function Home() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [animate, setAnimate] = useState(-1);
  const [deleteId, setDeleteId] = useState(-1);
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [replyId, setReplyId] = useState(-1);
  const handleDelete = (id: number) => {
    setDeleteId(id);
  };
  const handleChange = (value: number) => {
    setEditId(value);
    const updateId = comments.find((ids) => ids.id == value);
    if (updateId) {
      setCommentInput(updateId.message);
    }
  };

  const handleSaveEdit = () => {
    setComments(
      comments.map((comment) =>
        comment.id === editId ? { ...comment, message: commentInput } : comment
      )
    );
    setEditId(-1);
    setCommentInput("");
  };

  const handleReply = (id: number) => {
    setReplyId(id);
  };

  const sendReply = () => {
    setComments(
      comments.map((comment) =>
        comment.id === replyId
          ? { ...comment, replys: [...comment.replys, replyInput] }
          : comment
      )
    );
    setReplyId(-1);
    setReplyInput("");
  };
  return (
    <div className="dark overflow-x-hidden h-screen w-screen flex flex-col justify-center items-center relative">
      <h1 className="text-xl font-bold italic">Comment Section App</h1>
      <div className="space-y-2 mb-2">
        {comments.map((item, index) => {
          const isCode = item.isCode;
          const style = item.style;

          return (
            <AnimatePresence
              key={item.id}
              initial={true}
              mode="wait"
              onExitComplete={() => null}
            >
              {animate !== item.id && (
                <>
                  <motion.div
                    initial={{ height: "0px", opacity: 0.2 }}
                    animate={{ height: "80px", opacity: 1 }}
                    exit={{ height: "0px", opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-20 w-96 p-1 border bg-white rounded-xl text-black"
                  >
                    <div className="flex justify-between">
                      <p>
                        <Circle strokeWidth={2.75} />
                      </p>
                      <div className="flex text-black space-x-1 items-center">
                        <div
                          onClick={() => {
                            setOpenModal(true);
                            setDeleteId(item.id);
                          }}
                          className="h-4 w-4 border rounded-md flex justify-center items-center border-black hover:bg-red-600/20"
                        >
                          <Delete className="h-2.5 w-2.5 " />
                        </div>

                        <div
                          onClick={() => {
                            handleChange(item.id);
                          }}
                          className="h-4 w-4 border rounded-md flex justify-center items-center border-black hover:bg-yellow-500/20"
                        >
                          <Pencil className="h-2.5 w-2.5 " />
                        </div>

                        <div
                          onClick={() => {
                            setComments(
                              comments.map((comment) => {
                                if (comment.id === item.id) {
                                  return {
                                    ...comment,
                                    isCode: !comment.isCode,
                                  };
                                }
                                return comment;
                              })
                            );
                          }}
                          className={`h-4 w-4 border rounded-md flex justify-center items-center border-black  ${
                            isCode
                              ? "bg-purple-600/20 hover:white"
                              : "hover:bg-purple-600/20 "
                          }`}
                        >
                          <Code className="h-2.5 w-2.5 " />
                        </div>
                        <div
                          className="h-4 w-4 border rounded-md flex justify-center items-center border-black hover:bg-blue-500/20"
                          onClick={() => {
                            handleReply(item.id);
                          }}
                        >
                          <Reply className="h-2.5 w-2.5 " />
                        </div>

                        <div>
                          {editId === item.id ? (
                            <button
                              onClick={handleSaveEdit}
                              className=" w-20 bg-black border border-white  rounded-xl text-white"
                            >
                              Save
                            </button>
                          ) : (
                            <div className="flex space-x-1">
                              <div
                                onClick={() => {
                                  setComments(
                                    comments.map((comment) => {
                                      if (comment.id === item.id) {
                                        return {
                                          ...comment,
                                          style: {
                                            ...comment.style,
                                            fontStyle:
                                              comment.style?.fontStyle ===
                                              "italic"
                                                ? "normal"
                                                : "italic",
                                          },
                                        };
                                      }
                                      return comment;
                                    })
                                  );
                                }}
                                className={`h-4 w-4 border rounded-md flex justify-center items-center border-black hover:bg-stone-600/20 ${
                                  style?.fontStyle === "italic"
                                    ? "bg-stone-600/20"
                                    : ""
                                }`}
                              >
                                <Italic className="h-2.5 w-2.5 " />
                              </div>
                              <div
                                onClick={() => {
                                  setComments(
                                    comments.map((comment) => {
                                      if (comment.id === item.id) {
                                        return {
                                          ...comment,
                                          style: {
                                            ...comment.style,
                                            fontWeight:
                                              comment.style?.fontWeight ===
                                              "bold"
                                                ? "normal"
                                                : "bold",
                                          },
                                        };
                                      }
                                      return comment;
                                    })
                                  );
                                }}
                                className={`h-4 w-4 border rounded-md flex justify-center items-center border-black hover:bg-black/20 ${
                                  style?.fontWeight === "bold"
                                    ? "bg-black/20"
                                    : ""
                                }`}
                              >
                                <Bold className="h-2.5 w-2.5 group-hover: strokeWidth={2.75}  " />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      {isCode ? (
                        <>
                          <pre>{item.message}</pre>
                        </>
                      ) : (
                        <p style={style}>{item.message}</p>
                      )}
                    </div>
                  </motion.div>
                  {item.replys.length > 0 && (
                    <div className="flex flex-col items-end">
                      {item.replys.map((reply: string) => (
                        <div
                          key={item.id}
                          className="h-10 w-64 p-1 mb-3 border bg-white rounded-xl text-black"
                        >
                          {reply}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="w-full flex justify-end">
                    {replyId === item.id ? (
                      <div className="flex gap-x-2 mb-4">
                        <textarea
                          value={replyInput}
                          onChange={({ target }) => setReplyInput(target.value)}
                          className="h-10 w-64 p-1 border bg-white rounded-xl text-black"
                          name="text-reply-input"
                          placeholder="Reply"
                          id="text-reply-input"
                        />
                        <button
                          className="w-14 bg-black border border-white text-xs  rounded-xl text-white"
                          onClick={sendReply}
                        >
                          Send
                        </button>
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </AnimatePresence>
          );
        })}
      </div>
      <div>
        <textarea
          value={commentInput}
          onChange={({ target }) => setCommentInput(target.value)}
          className="h-20 w-96 p-1 border bg-white rounded-xl text-black"
          name="text-add-input"
          placeholder="Add a comment"
          id="text-add-input"
        />
      </div>
      <div>
        <button
          onClick={() => {
            setComments([
              ...comments,
              {
                message: commentInput,
                likes: 0,
                replys: [],
                isCode: false,
                style: undefined,
                id: Math.random() * 2000000,
              },
            ]);
            setCommentInput("");
          }}
          className="h-10 w-96 bg-black border border-white mt-4 rounded-xl text-white"
        >
          Add
        </button>
      </div>

      <AnimatePresence initial={false} onExitComplete={() => null}>
        {openModal && (
          <Modal
            handleDelete={() => {
              setAnimate(deleteId);
              setTimeout(() => {
                setComments(
                  comments.filter((comment) => comment.id !== deleteId)
                );
                setDeleteId(-1);
                setOpenModal(false);
              }, 200);
            }}
            handleClose={() => setOpenModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
