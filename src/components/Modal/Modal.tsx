import { Dialog, Transition } from "@headlessui/react";
import type { PropsWithChildren, ReactNode } from "react";
import { useState } from "react";

type ModalProps = {
  isModalVisible: boolean;
  onClose: () => void;
};

const ModalBase = ({
  children,
  isModalVisible,
  onClose,
}: PropsWithChildren<ModalProps>) => {
  return (
    <Transition appear show={isModalVisible} as="div" className="absolute">
      <Dialog as="div" className={`fixed inset-0 z-50`} onClose={onClose}>
        <div className="py-7 min-h-screen">
          <Transition.Child
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>
          <Transition.Child
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="w-fit mx-auto"
          >
            <div
              className={`p-8 text-textcolor-main m-auto w-[600px] border border-gray-600 bg-gray-800 rounded-md transition-all transform`}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

/**
 * @package
 */
export const useModal = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const handleOpen = () => {
    setIsModalVisible(true);
  };

  const Modal = ({ children }: { children: ReactNode }) => (
    <ModalBase onClose={handleClose} isModalVisible={isModalVisible}>
      {children}
    </ModalBase>
  );

  return { Modal, handleClose, handleOpen, isModalVisible };
};
