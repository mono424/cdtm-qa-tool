"use client";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Strikethrough, Italic, List, ListOrdered } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Check, Hint } from "@/lib/checks/check";
import { Button } from "./ui/button";
import { CheckPopover, CheckState } from "./check-popover";
import { useEffect, useState } from "react";

const RichTextEditor = ({
  value,
  checks,
  onChange,
  onNewHints,
}: {
  value: string;
  checks: Check[];
  onChange: (value: string) => void;
  onNewHints: (hints: Hint[]) => void;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "h-[450px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
    ],
    content: value, // Set the initial content with the provided value
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Call the onChange callback with the updated HTML content
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      {editor ? (
        <RichTextEditorToolbar
          editor={editor}
          checks={checks}
          onNewHints={onNewHints}
        />
      ) : null}
    </>
  );
};

const RichTextEditorToolbar = ({
  editor,
  checks,
  onNewHints,
}: {
  editor: Editor;
  checks: Check[];
  onNewHints: (hints: Hint[]) => void;
}) => {
  const [checksState, setChecksState] = useState<CheckState[]>([]);

  const updateCheckState = (state: CheckState) => {
    setChecksState((checksState) =>
      checksState.map((checkState) =>
        checkState.check === state.check ? state : checkState,
      ),
    );
  };

  useEffect(() => {
    setChecksState(checks.map((check) => ({ check, enabled: true })));
  }, [checks]);

  return (
    <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <div className="flex flex-row px-4 gap-2 items-center">
        <CheckPopover value={checksState} onChange={updateCheckState} />
        <Button
          type="button"
          size="sm"
          onClick={() =>
            onNewHints(
              checksState
                .filter((c) => c.enabled)
                .reduce<
                  Hint[]
                >((res, check) => [...res, ...check.check.onCheck(editor.getText())], []),
            )
          }
        >
          Run Checks
        </Button>
      </div>
      <Separator orientation="vertical" className="w-[1px] h-8" />
      <div className="flex flex-row px-4 gap-2 items-center">
        <span>Words: {editor.getText().split(" ").length}</span>
        <span>Chars: {editor.getText().length}</span>
      </div>
    </div>
  );
};

export default RichTextEditor;
