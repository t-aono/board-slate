import { Action, ISection, SectionsContext, SectionsDispatchContext } from "@/contexts/SectionsContext";
import { ArrowPathIcon, EyeIcon, EyeSlashIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";
import BaseIcon from "../common/elements/BaseIcon";
import axios from "axios";
import MultiRowLayout from "./MultiRowLayout";
import { OrganizationContext } from "@/contexts/OrganizationContext";

export default function SectionsForm() {
  const sections = useContext(SectionsContext);
  const dispatch = useContext(SectionsDispatchContext);
  const organization = useContext(OrganizationContext);
  const [inputValue, setInputValue] = useState<ISection | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      const newValue: ISection = { id: "", name: "", visible: true, organization_id: organization.id };
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

  function SectionRow(section: ISection) {
    return (
      <>
        <div className={`mb-2 ${!section.visible ? "line-through" : ""}`}>{section.name}</div>
        <div className="flex justify-end gap-4">
          <button onClick={() => setInputValue(section)}>
            <BaseIcon>
              <PencilIcon />
            </BaseIcon>
          </button>
          {section.visible ? (
            <button onClick={() => handleVisible({ ...section, visible: false })}>
              <BaseIcon>
                <EyeSlashIcon />
              </BaseIcon>
            </button>
          ) : (
            <button onClick={() => handleVisible({ ...section, visible: true })}>
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
    <MultiRowLayout title="列名" handleAdd={handleAdd}>
      {sections &&
        sections.map((section) => (
          <div key={section.id} className="flex justify-between border-b-2 mt-6 gap-6">
            {inputValue && inputValue.id === section.id ? <SectionEditInput /> : <SectionRow {...section} />}
          </div>
        ))}
    </MultiRowLayout>
  );
}
