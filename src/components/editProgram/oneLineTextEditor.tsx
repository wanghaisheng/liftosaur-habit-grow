import { h, JSX } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { CodeEditor } from "../../editor";

interface IProps {
  onChange?: (newValue: string) => void;
  onBlur?: (newValue: string) => void;
  value?: string;
  state: Record<string, number>;
}

export function OneLineTextEditor(props: IProps): JSX.Element {
  const divRef = useRef<HTMLDivElement>();
  const codeEditor = useRef(
    new CodeEditor({
      state: props.state,
      onChange: props.onChange,
      onBlur: props.onBlur,
      value: props.value,
      multiLine: false,
    })
  );

  useEffect(() => {
    codeEditor.current.attach(divRef.current!);
  }, []);

  return (
    <div
      className="relative z-10 block w-full px-2 py-2 leading-normal bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:shadow-outline"
      ref={divRef}
    ></div>
  );
}