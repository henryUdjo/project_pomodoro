import { Bounce, ToastContainer } from 'react-toastify';

// type MessagesContainerProps = {
//   children: React.ReactNode;
// };

export function MessagesContainer() {
  return (
    <>
      {/* {children} */}
      <ToastContainer
        position='top-right'
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </>
  );
}
