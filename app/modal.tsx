import { motion } from "framer-motion";

const dropIn:any = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      position: "absolute",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "-100vh",
      position: "absolute",
      opacity: 0,
    },
  };
  

const Modal = ({ handleClose, handleDelete }:any) => {

    return (
      <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="absolute h-40 w-40 bg-white rounded-xl p-2 flex flex-col justify-center items-center"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button onClick={handleDelete} className="h-[50%] w-full border bg-red-600 text-white rounded-xl">Delete</button>
            <button onClick={handleClose} className="h-[50%] w-full border bg-black text-white rounded-xl">Close</button>
          </motion.div>
      </Backdrop>
    );
  };

  
  export default Modal;


export const Backdrop = ({ children, onClick }:any) => {
 
  return (
    <motion.div
      onClick={onClick}
      className="absolute h-screen w-screen bg-black/50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
;