import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Sparkle,
  Trash2,
  ArrowLeft,
  BookOpen,
  Hash,
  Lightbulb,
  Palette,
} from "lucide-react";
import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

interface ICreateModalProp {
  isOpen: boolean;
  onClose: () => void;
  onBookCreated: (bookId: string) => void;
}

const CreateBookModal: React.FC<ICreateModalProp> = ({
  isOpen,
  onClose,
  onBookCreated,
}) => {
  const { user }: any = useAuth();

  const [step, setStep] = useState(1);
  const [bookTitle, setBookTitle] = useState("");
  const [numChapters, setNumChapters] = useState(5);
  const [aiTopic, setAiTopic] = useState("");
  const [aiStyle, setAiStyle] = useState("Information");
  const [chapters, setChapters] = useState<any>([]);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [isFinalizingBook, setIsFinalizingBook] = useState(false);
  const chaptersContainerRef = useRef(null);

  const resetModal = () => {
    setStep(1);
    setBookTitle("");
    setNumChapters(5);
    setAiTopic("");
    setAiStyle("Informative");
    setChapters([]);
    setIsGeneratingOutline(false);
    setIsFinalizingBook(false);
  };

  const handleGenerateOutline = async () => {};

  const handleChapterChange = (index: number, field: string, value: any) => {
    const updatedChapters: any = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const handleDeleteChapter = (index: number) => {
    if (chapters.length <= 1) return;
    setChapters(chapters.filter((_: any, i: number) => i !== index));
  };

  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      { title: `Chapter ${chapters.length + 1}`, description: "" },
    ]);
  };

  const handleFinalizeBook = async () => {};
  console.log(onBookCreated);

  useEffect(() => {
    if (step == 2 && chaptersContainerRef.current) {
      const scrollableDiv: any = chaptersContainerRef.current;
      scrollableDiv.scrollTo({
        top: scrollableDiv.scrollHeight,
        behaviour: "smooth",
      });
    }
  }, [chapters.lenght, step]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetModal();
      }}
      title="Create New eBook"
    >
      Content Here
    </Modal>
  );
};

export default CreateBookModal;
