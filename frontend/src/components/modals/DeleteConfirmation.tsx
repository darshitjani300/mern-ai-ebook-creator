import Button from "../ui/Button";

interface IconfirmationModelProp {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmationModal: React.FC<IconfirmationModelProp> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-25 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">{title}</h3>
          <p className="text-slate-600 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" className="" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
