import { Action, ISection, SectionsContext, SectionsDispatchContext } from "@/contexts/SectionsContext";
import { ArrowPathIcon, EyeIcon, EyeSlashIcon, PencilIcon, PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";
import BaseIcon from "../common/elements/BaseIcon";
import axios from "axios";

export default function SectionsForm() {
  const sections = useContext(SectionsContext);
  const dispatch = useContext(SectionsDispatchContext);
  const [inputValue, setInputValue] = useState<ISection | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/section");
      console.log("$ get sections", data);
      if (dispatch) {
        dispatch({ type: Action.SET, values: data });
      }
    })();
  }, [dispatch]);

  async function handleUpdate() {
    let newValue = null;
    if (inputValue?.id) {
      const { data } = await axios.patch("/api/section", { ...inputValue, name: inputRef?.current?.value });
      newValue = data;
    } else {
      const { data } = await axios.post("/api/section", { ...inputValue, name: inputRef?.current?.value });
      newValue = data;
    }
    if (dispatch && inputValue) {
      dispatch({ type: Action.UPDATE, value: newValue });
    }
    setInputValue(null);
  }

  function handleClose() {
    if (dispatch && inputValue && inputValue.name === "") {
      dispatch({ type: Action.DELETE, value: inputValue });
    }
    setInputValue(null);
  }

  function handleAdd() {
    if (dispatch) {
      const newValue: ISection = { id: "", name: "", visible: true };
      setInputValue(newValue);
      dispatch({ type: Action.ADD, value: newValue });
    }
  }

  async function handleVisible(section: ISection) {
    await axios.patch("/api/section", { ...section });
    if (dispatch) {
      dispatch({ type: Action.UPDATE, value: section });
    }
  }

  function SectionRow({ id, name, visible }: { id: string; name: string; visible: boolean }) {
    return (
      <>
        <div className={`mb-2 ${!visible ? "line-through" : ""}`}>{name}</div>
        <div className="flex justify-end gap-4">
          <button onClick={() => setInputValue({ id, name, visible })}>
            <BaseIcon>
              <PencilIcon />
            </BaseIcon>
          </button>
          {visible ? (
            <button onClick={() => handleVisible({ id, name, visible: false })}>
              <BaseIcon>
                <EyeSlashIcon />
              </BaseIcon>
            </button>
          ) : (
            <button onClick={() => handleVisible({ id, name, visible: true })}>
              <BaseIcon>
                <EyeIcon />
              </BaseIcon>
            </button>
          )}
        </div>
      </>
    );
  }

  function SectionEditInput() {
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

    return (
      <>
        <input
          defaultValue={inputValue?.name}
          ref={inputRef}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="flex justify-end gap-4">
          <button onClick={handleUpdate}>
            <BaseIcon>
              <ArrowPathIcon />
            </BaseIcon>
          </button>
          <button onClick={handleClose}>
            <BaseIcon>
              <XMarkIcon />
            </BaseIcon>
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="w-1/2 mx-auto text-gray-600">
      <label className="text-lg font-bold">列名一覧</label>
      <div className="mt-3 px-2">
        {sections &&
          sections.map(({ id, name, visible }) => (
            <div key={id} className="flex justify-between border-b-2 mt-6 gap-6">
              {inputValue && inputValue.id === id ? <SectionEditInput /> : <SectionRow id={id} name={name} visible={visible} />}
            </div>
          ))}
        <div className="mt-6">
          <button onClick={handleAdd}>
            <BaseIcon>
              <PlusCircleIcon />
            </BaseIcon>
          </button>
        </div>
      </div>
    </div>
  );
}
