import { SectionsContext } from "@/contexts/SectionsContext";
import { useContext } from "react";

export default function SectionsForm() {
  const sections = useContext(SectionsContext);

  return <ul>{sections && sections.map(({ id, name }) => <li key={id}>{name}</li>)}</ul>;
}
